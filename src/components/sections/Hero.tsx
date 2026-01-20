import React, { useState } from "react";
import { Button } from "../common/Button";
import heroBg from "../../assets/images/heroBg.jpg";

export const Hero = () => {
  const specialties = [
    "Ortodontia",
    "Invisalign",
    "Clareamento",
    "Coroa",
    "Implantes",
    "Odontopediatria",
    "Próteses",
  ];

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

    const API_URL = import.meta.env.VITE_API_URL;

    try {
      const res = await fetch(`${API_URL}/send`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok || data.status !== "sucesso") {
        throw new Error(data?.mensagem || "Erro ao enviar");
      }

      setStatus("success");
      setMsg("Enviado com sucesso! Em breve entraremos em contato.");
      setForm({ nome: "", telefone: "", email: "", servico: "" });
    } catch (err) {
      console.error(err);
      setStatus("error");
      setMsg("Erro de conexão com o servidor.");
    } finally {
      setTimeout(() => setStatus("idle"), 3000);
    }
  };

  return (
    <section id="home" className="w-full">
      <div className="relative min-h-[103vh] w-full -mt-24 overflow-hidden">
        {/* BACKGROUND DE VÍDEO */}
        <div className="absolute inset-0 z-0 -translate-y-28">
          <img src={heroBg} className="w-full h-full object-cover object-top" />
        </div>

        {/* CONTEÚDO SUPERIOR */}
        <div className="absolute top-65 py-8 px-10 left-8 h-[24vh] rounded-xl rounded-br-xl lg:left-8 z-20 bg-white/70">
          <h1 className="text-gray-700   text-6xl lg:text-8xl xl:text-7xl font-black mb-8">
            Especialistas <br></br>
            <span className="text-4xl text-gray-600"> em </span>{" "}
            <span className="italic text-primary  ">Ortodontia</span>
          </h1>

          <div className="overflow-hidden w-full max-w-lg">
            <div className="flex animate-scroll gap-12 whitespace-nowrap">
              {specialties.concat(specialties).map((spec, index) => (
                <span
                  key={index}
                  className="text-white font-semibold text-lg lg:text-xl"
                >
                  {spec}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* FAIXA DE AGENDAMENTO */}
        <div className="absolute bottom-0  w-full bg-cleam py-18 lg:py-8 z-20">
          <div className="max-w-7xl mx-auto px-6 flex flex-col gap-6">
            <h2 className="text-gray-500 font-display text-2xl ">
              <span className="text-secondary"> Agende </span> uma avaliação
            </h2>

            {/* FORMULÁRIO */}
            <form
              onSubmit={handleSubmit}
              className="flex flex-wrap w-full lg:flex-nowrap gap-2 lg:gap-4 mb-10 "
            >
              <input
                name="nome"
                value={form.nome}
                onChange={handleChange}
                type="text"
                placeholder="Nome"
                className="flex-1 p-3 rounded-xl  border border-slate-200 outline-none focus:border-secondary text-white"
                required
              />
              <input
                name="telefone"
                value={form.telefone}
                onChange={handleChange}
                type="tel"
                placeholder="WhatsApp"
                className="flex-1 p-3 rrounded-xl  border border-slate-200 outline-none focus:border-secondary text-white"
                required
              />
              <input
                name="email"
                value={form.email}
                onChange={handleChange}
                type="email"
                placeholder="E-mail"
                className="flex-1 p-3 rounded-xl  border border-slate-200 outline-none focus:border-secondary text-white"
                required
              />
              <input
                name="servico"
                value={form.servico}
                onChange={handleChange}
                type="text"
                placeholder="Tipo de serviço"
                className="flex-1 p-3 rounded-xl  border border-slate-200 outline-none focus:border-secondary text-white"
                required
              />
              <Button
                type="submit"
                disabled={status === "loading" || status === "success"}
                className="w-sm !py-4 rounded-xl uppercase font-black bg-secondary text-white hover:bg-secondary/90 transition-all disabled:opacity-60"
              >
                {status === "loading"
                  ? "Enviando..."
                  : status === "success"
                    ? "Enviado com sucesso!"
                    : "Enviar"}
              </Button>
            </form>

            {/* FEEDBACK */}
            {status !== "idle" && (
              <p className="text-sm">
                {status === "success" ? (
                  <span className="text-green-700">{msg}</span>
                ) : status === "error" ? (
                  <span className="text-red-700">{msg}</span>
                ) : null}
              </p>
            )}
          </div>
        </div>

        {/* ANIMAÇÃO DO CARROSSEL */}
        <style>
          {`
            @keyframes scroll {
              0% { transform: translateX(0); }
              100% { transform: translateX(-50%); }
            }
            .animate-scroll {
              display: inline-flex;
              animation: scroll 20s linear infinite;
            }
          `}
        </style>
      </div>
    </section>
  );
};
