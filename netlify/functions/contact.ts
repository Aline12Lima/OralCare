import type { Handler } from "@netlify/functions";

export const handler: Handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: "Method Not Allowed",
    };
  }

  try {
    const data = JSON.parse(event.body || "{}");

    console.log("Dados recebidos:", data);

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: "Formulário enviado com sucesso",
      }),
    };
  } catch {
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: "Erro interno",
      }),
    };
  }
};
