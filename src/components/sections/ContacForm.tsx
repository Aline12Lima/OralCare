import { useState } from "react";
import { Button } from "../common/Button";

export const ContactForm = () => {
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    const formData = new FormData(event.currentTarget);

    // Substitua pelo seu Access Key real do Web3Forms
    formData.append("access_key", "d4f339a2-72b3-4942-b9a2-9ba0ba0c92d6");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        setSent(true);
      } else {
        alert("Erro: " + data.message);
      }
    } catch (error) {
      console.error("Falha técnica no Web3Forms:", error);
      alert("Ocorreu um erro ao enviar. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  if (sent)
    return (
      <div className="text-center p-10 bg-green-50 rounded-3xl border border-green-100">
        <h3 className="text-2xl font-bold text-green-700">
          Agendamento solicitado!
        </h3>
        <p className="text-green-600">Entraremos em contato em breve.</p>
      </div>
    );

  return (
    <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100 shadow-xl">
      <h2 className="text-3xl font-bold text-slate-900 mb-6 text-center">
        Agende sua Consulta
      </h2>

      <form
        onSubmit={onSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        <input
          name="name"
          type="text"
          placeholder="Nome Completo"
          required
          className="p-3 rounded-xl border border-slate-200 outline-none"
        />

        <input
          name="email"
          type="email"
          placeholder="E-mail"
          required
          className="p-3 rounded-xl border border-slate-200 outline-none"
        />

        <input
          name="phone"
          type="tel"
          placeholder="WhatsApp"
          required
          className="p-3 rounded-xl border border-slate-200 outline-none"
        />

        <select
          name="service"
          required
          className="p-3 rounded-xl border border-slate-200 outline-none"
        >
          <option value="">Selecione o Serviço</option>
          <option value="ortodontia">Ortodontia</option>
          <option value="implante">Implante</option>
          <option value="limpeza">Limpeza</option>
        </select>

        <div className="md:col-span-2 mt-2">
          <Button
            type="submit"
            loading={loading}
            text="Solicitar Agendamento"
          />
        </div>
      </form>
    </div>
  );
};
