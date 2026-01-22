import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const resend = new Resend(process.env.RESEND_API_KEY!);

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
    // ✅ ESSENCIAL NA VERCEL
    const body = await req.json();

    const { nome, telefone, email, servico } = body;

    if (!nome || !telefone || !email || !servico) {
      return json(400, { ok: false, error: "Campos obrigatórios." });
    }

    const { error: dbError } = await supabase
      .from("odontocare")
      .insert([{ Nome: nome, Telefone: telefone, Email: email, Servico: servico }]);

    if (dbError) {
      console.error(dbError);
      return json(500, { ok: false, error: "Erro no banco." });
    }

    await resend.emails.send({
      from: process.env.EMAIL_FROM!,
      to: process.env.EMAIL_TO!,
      subject: `Novo contato — ${nome}`,
      html: `
        <p><b>Nome:</b> ${nome}</p>
        <p><b>Telefone:</b> ${telefone}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Serviço:</b> ${servico}</p>
      `,
    });

    return json(200, { ok: true });
  } catch (error) {
    console.error("API error:", error);
    return json(500, { ok: false, error: "Erro interno." });
  }
}
