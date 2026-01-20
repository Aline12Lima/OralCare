// Hero.tsx (corrigido – removido specialties)

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

  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [msg, setMsg] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setStatus("loading");
    setMsg("");

    try {
      const API_URL = import.meta.env.VITE_API_URL;

      const res = await fetch(`${API_URL}/send`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data?.mensagem || "Erro");

      setStatus("success");
      setMsg("Enviado com sucesso!");
      setForm({ nome: "", telefone: "", email: "", servico: "" });
    } catch {
      setStatus("error");
      setMsg("Erro ao enviar formulário.");
    }
  };

  return (
    <section id="home" className="w-full">
      <div className="relative min-h-[103vh] w-full -mt-24 overflow-hidden">
        <div className="absolute inset-0 z-0 -translate-y-28">
          <img src={heroBg} className="w-full h-full object-cover object-top" />
        </div>

        <div className="absolute bottom-0 w-full bg-cleam py-8 z-20">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-gray-500 text-2xl mb-4">
              <span className="text-secondary">Agende</span> uma avaliação
            </h2>

            <form
              onSubmit={handleSubmit}
              className="flex flex-wrap lg:flex-nowrap gap-4"
            >
              <input
                name="nome"
                value={form.nome}
                onChange={handleChange}
                placeholder="Nome"
                required
                className="flex-1 p-3 rounded-xl border"
              />
              <input
                name="telefone"
                value={form.telefone}
                onChange={handleChange}
                placeholder="WhatsApp"
                required
                className="flex-1 p-3 rounded-xl border"
              />
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                placeholder="E-mail"
                required
                className="flex-1 p-3 rounded-xl border"
              />
              <input
                name="servico"
                value={form.servico}
                onChange={handleChange}
                placeholder="Tipo de serviço"
                required
                className="flex-1 p-3 rounded-xl border"
              />

              <Button
                type="submit"
                disabled={status === "loading"}
                className="px-8 py-3 rounded-xl bg-secondary text-white font-bold"
              >
                {status === "loading" ? "Enviando..." : "Enviar"}
              </Button>
            </form>

            {msg && (
              <p
                className={`mt-3 text-sm ${
                  status === "success" ? "text-green-700" : "text-red-700"
                }`}
              >
                {msg}
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
