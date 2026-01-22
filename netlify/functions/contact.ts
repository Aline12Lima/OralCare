import type { Handler } from "@netlify/functions";
import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const resend = new Resend(process.env.RESEND_API_KEY!);

export const handler: Handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: "Method Not Allowed",
    };
  }

  try {
    const data = JSON.parse(event.body || "{}");

    const { nome, telefone, email, servico } = data;

    // 1️⃣ Salvar no Supabase
    const { error: supabaseError } = await supabase
      .from("contacts")
      .insert([
        {
          nome,
          telefone,
          email,
          servico,
        },
      ]);

    if (supabaseError) {
      console.error("Erro Supabase:", supabaseError);
      throw new Error("Erro ao salvar no Supabase");
    }

    // 2️⃣ Enviar e-mail
    await resend.emails.send({
      from: process.env.EMAIL_FROM!,
      to: process.env.EMAIL_TO!,
      subject: "Novo contato pelo site",
      html: `
        <h2>Novo contato</h2>
        <p><strong>Nome:</strong> ${nome}</p>
        <p><strong>Telefone:</strong> ${telefone}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Serviço:</strong> ${servico}</p>
      `,
    });

    // 3️⃣ Sucesso real
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: "Formulário enviado com sucesso",
      }),
    };
  } catch (error) {
    console.error("Erro geral:", error);

    return {
      statusCode: 500,
      body: JSON.stringify({
        message: "Erro ao processar formulário",
      }),
    };
  }
};
