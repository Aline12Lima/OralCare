import React, { useState } from "react";
import { Button } from "../common/Button";
import heroBg from "../../assets/images/heroBg.jpg";

export const Hero = () => {
  const [form, setForm] = useState({
    nome: "",
    telefone: "",
    email: "",
    servico: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // 🔍 TESTE 2 — handleSubmit COM FETCH VISÍVEL
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    console.log("HANDLE SUBMIT ENTROU");

    try {
      const API_URL = import.meta.env.VITE_API_URL;
      console.log("API_URL:", API_URL);

      const res = await fetch(`${API_URL}/send`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      console.log("REQUEST FEITO", res.status);
      alert("FETCH EXECUTADO");
    } catch (err) {
      console.error("ERRO FETCH:", err);
      alert("ERRO NO FETCH");
    }
  };

  return (
    <section id="home" className="w-full">
      <div className="relative min-h-[103vh] w-full -mt-24 overflow-hidden">
        {/* BACKGROUND */}
        <div className="absolute inset-0 z-0 -translate-y-28">
          <img src={heroBg} className="w-full h-full object-cover object-top" />
        </div>

        {/* FAIXA DE AGENDAMENTO */}
        <div className="absolute bottom-0 w-full bg-cleam py-8 z-20">
          <div className="max-w-7xl mx-auto px-6 flex flex-col gap-6">
            <h2 className="text-gray-500 text-2xl">
              <span className="text-secondary">Agende</span> uma avaliação
            </h2>

            {/* FORM — TESTE 2 */}
            <form
              onSubmit={handleSubmit}
              className="flex flex-wrap w-full lg:flex-nowrap gap-4 mb-10"
            >
              <input
                name="nome"
                value={form.nome}
                onChange={handleChange}
                placeholder="Nome"
                className="flex-1 p-3 rounded-xl border"
              />
              <input
                name="telefone"
                value={form.telefone}
                onChange={handleChange}
                placeholder="WhatsApp"
                className="flex-1 p-3 rounded-xl border"
              />
              <input
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="E-mail"
                className="flex-1 p-3 rounded-xl border"
              />
              <input
                name="servico"
                value={form.servico}
                onChange={handleChange}
                placeholder="Tipo de serviço"
                className="flex-1 p-3 rounded-xl border"
              />

              <Button
                type="submit"
                className="px-8 py-4 bg-secondary text-white"
              >
                Enviar
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
