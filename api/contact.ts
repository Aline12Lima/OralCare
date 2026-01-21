import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";

function requireEnv(name: string) {
  const value = process.env[name];
  if (!value || value.trim() === "") {
    throw new Error(`Missing environment variable: ${name}`);
  }
  return value;
}

// ✅ pega e valida ENV (se faltar, quebra com erro claro)
const SUPABASE_URL = requireEnv("SUPABASE_URL");
const SUPABASE_SERVICE_ROLE_KEY = requireEnv("SUPABASE_SERVICE_ROLE_KEY");
const RESEND_API_KEY = requireEnv("RESEND_API_KEY");
const EMAIL_TO = requireEnv("EMAIL_TO");
const EMAIL_FROM = requireEnv("EMAIL_FROM");

// ✅ cria clients usando as env validadas
const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);
const resend = new Resend(RESEND_API_KEY);


function isEmailValid(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

type LeadPayload = {
  nome: string;
  telefone: string;
  email: string;
  servico: string;
};

function json(status: number, data: unknown) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

export default async function handler(req: Request) {
  if (req.method !== "POST") {
    return json(405, { ok: false, error: "Method not allowed" });
  }

  try {
    const body = (await req.json()) as Partial<LeadPayload>;

    const nome = (body.nome ?? "").trim();
    const telefone = (body.telefone ?? "").trim();
    const email = (body.email ?? "").trim();
    const servico = (body.servico ?? "").trim();

    if (!nome || !telefone || !email || !servico) {
      return json(400, { ok: false, error: "Campos obrigatórios." });
    }
    if (!isEmailValid(email)) {
      return json(400, { ok: false, error: "E-mail inválido." });
    }

    // 1) salva no Supabase
   const { error: dbError } = await supabase.from("odontocare").insert([
  { Nome: nome, Telefone: telefone, Email: email, Servico: servico },
]);

    if (dbError) {
      console.error("Supabase insert error:", dbError.message, dbError.details, dbError.hint);
      return json(500, { ok: false, error: "Erro ao salvar no banco." });
    }

    // 2) envia e-mail
    const emailTo = EMAIL_TO;
    const emailFrom = EMAIL_FROM;

    await resend.emails.send({
      from: emailFrom,
      to: emailTo,
      subject: `Novo contato — ${nome}`,
      html: `
        <h2>Novo lead do site</h2>
        <p><b>Nome:</b> ${nome}</p>
        <p><b>Telefone:</b> ${telefone}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Serviço:</b> ${servico}</p>
      `,
    });

    return json(200, { ok: true });
  } catch (err) {
    console.error("API error:", err);
    const message = err instanceof Error ? err.message : "Erro interno.";
    return json(500, { ok: false, error: message });
  }
}
