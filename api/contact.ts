import type { Handler } from "@netlify/functions";
import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";

// Supabase client (service role)
const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// Resend client
const resend = new Resend(process.env.RESEND_API_KEY!);

export const POST: Handler = async (request) => {
  

  try {
    // 📥 dados vindos do frontend (camelCase)
    const data = JSON.parse(request.body || "{}");

    const { nome, telefone, email, servico } = data;

    // 🛑 validação mínima (opcional, mas recomendada)
    if (!nome || !telefone || !email || !servico) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          message: "Dados incompletos",
        }),
      };
    }

    // 1️⃣ Salvar no Supabase (colunas da tabela)
    const { error: supabaseError } = await supabase
      .from("odontocare")
      .insert([
        {
          Nome: nome,
          Telefone: telefone,
          Email: email,
          Servico: servico,
        },
      ]);

    if (supabaseError) {
      console.error("Erro Supabase:", supabaseError);
      throw new Error("Erro ao salvar no Supabase");
    }

    // 2️⃣ Enviar email
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

    // 3️⃣ Resposta de sucesso
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
