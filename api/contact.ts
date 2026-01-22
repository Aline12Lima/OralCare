import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const resend = new Resend(process.env.RESEND_API_KEY!);

export async function POST(request: Request) {
  try {
    // ✅ forma correta na Vercel
    const { nome, telefone, email, servico } = await request.json();

    if (!nome || !telefone || !email || !servico) {
      return new Response(
        JSON.stringify({ message: "Dados incompletos" }),
        { status: 400 }
      );
    }

    // salvar no Supabase
    const { error } = await supabase
      .from("odontocare")
      .insert([
        {
          Nome: nome,
          Telefone: telefone,
          Email: email,
          Servico: servico,
        },
      ]);

    if (error) {
      console.error(error);
      return new Response(
        JSON.stringify({ message: "Erro no banco" }),
        { status: 500 }
      );
    }

    // enviar email
    await resend.emails.send({
      from: process.env.EMAIL_FROM!,
      to: process.env.EMAIL_TO!,
      subject: "Novo contato pelo site",
      html: `
        <p><strong>Nome:</strong> ${nome}</p>
        <p><strong>Telefone:</strong> ${telefone}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Serviço:</strong> ${servico}</p>
      `,
    });

    return new Response(
      JSON.stringify({ message: "Formulário enviado com sucesso" }),
      { status: 200 }
    );
  } catch (err) {
    console.error("Erro geral:", err);
    return new Response(
      JSON.stringify({ message: "Erro interno" }),
      { status: 500 }
    );
  }
}
