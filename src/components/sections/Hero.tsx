import React, { useEffect, useMemo, useState } from "react";
import { Button } from "../common/Button";
import heroBg from "../../assets/images/heroBg.jpg";

export const Hero = () => {
  const specialties = useMemo(
    () => [
      "Ortodontia",
      "Invisalign",
      "Clareamento",
      "Coroas",
      "Implantes",
      "Odontopediatria",
      "Próteses",
    ],
    [],
  );

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((prev) => (prev + 1) % specialties.length);
    }, 1800);
    return () => clearInterval(id);
  }, [specialties.length]);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    console.log("HANDLE SUBMIT ENTROU");

    try {
      const res = await fetch(`/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      console.log("REQUEST FEITO", res.status);

      if (!res.ok) {
        const text = await res.text().catch(() => "");
        console.error("RES NOT OK:", res.status, text);
        alert(`Erro ao enviar: ${res.status}`);
        return;
      }

      alert("Enviado com sucesso!");
      setForm({ nome: "", telefone: "", email: "", servico: "" });
    } catch (err) {
      console.error("ERRO FETCH:", err);
      alert("Erro na conexão com o servidor.");
    }
  };

  return (
    <section id="home" className="w-full">
      <div className="relative min-h-[103vh] w-full -mt-24 overflow-hidden">
        {/* BACKGROUND */}
        <div className="absolute inset-0 z-0 -translate-y-28">
          <img
            src={heroBg}
            alt="Imagem de fundo"
            className="w-full h-full object-cover object-top"
          />
        </div>

        {/* Overlay (opcional, ajuda a leitura do texto) */}
        <div className="absolute inset-0 z-10 bg-black/10" />

        {/* CONTEÚDO (texto + carrossel) */}
        <div className="relative z-20 max-w-7xl mx-auto px-6 pt-32 pb-40 min-h-screen flex items-center">
          <div className="max-w-2xl">
            <p className="inline-flex items-center gap-2 bg-white/15 text-white px-4 py-2 rounded-full text-sm font-semibold backdrop-blur">
              Atendimento humanizado • Tecnologia moderna
            </p>

            <h1 className="mt-6 text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-tight">
              Seu sorriso em boas mãos.
            </h1>

            <p className="mt-4 text-white/90 text-base sm:text-lg">
              Consultas e procedimentos com conforto, segurança e profissionais
              experientes.
            </p>

            {/* Carrossel pequeno */}
            <div className="mt-6 flex items-center gap-3">
              <span className="text-white/80 text-sm font-semibold">
                Especialidades:
              </span>

              <div className="h-9 overflow-hidden rounded-full bg-white/15 backdrop-blur px-4 flex items-center">
                <span className="text-white font-bold">
                  {specialties[index]}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* FAIXA DE AGENDAMENTO */}
        <div className="absolute bottom-0 w-full bg-cleam py-8 z-20">
          <div className="max-w-7xl mx-auto px-6 flex flex-col gap-6">
            <h2 className="text-gray-500 text-2xl">
              <span className="text-secondary">Agende</span> uma avaliação
            </h2>

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
                required
              />
              <input
                name="telefone"
                value={form.telefone}
                onChange={handleChange}
                placeholder="WhatsApp"
                className="flex-1 p-3 rounded-xl border"
                required
              />
              <input
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="E-mail"
                className="flex-1 p-3 rounded-xl border"
                type="email"
                required
              />
              <input
                name="servico"
                value={form.servico}
                onChange={handleChange}
                placeholder="Tipo de serviço"
                className="flex-1 p-3 rounded-xl border"
                required
              />

              {/* Compatível com seu Button antigo (text/onClick) */}
              <Button text="Enviar" />
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
