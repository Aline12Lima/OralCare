import React, { useMemo, useState } from "react";
import { Button } from "../common/Button";
import heroBg from "../../assets/images/heroBg.jpg";

export const Hero = () => {
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

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
    setStatus("loading");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        throw new Error("Erro ao enviar formulário");
      }

      // sucesso real
      setStatus("success");
      setForm({
        nome: "",
        telefone: "",
        email: "",
        servico: "",
      });
    } catch (err) {
      console.error("Erro no envio:", err);

      // erro real → volta ao estado inicial
      setStatus("idle");
    } finally {
      // feedback visual por 3s apenas quando sucesso
      setTimeout(() => {
        setStatus("idle");
      }, 3000);
    }
  };

  return (
    <section id="home" className="w-full">
      <div className="relative min-h-[85vh] w-full -mt-24 overflow-hidden">
        {/* BACKGROUND */}
        <div className="absolute inset-0 z-0">
          <img
            src={heroBg}
            alt="Imagem de fundo"
            className="w-full h-full object-cover object-center"
          />
        </div>

        <div className="absolute inset-0 z-10 bg-black/10" />

        {/* TEXTO */}
        <div className="relative z-20 max-w-7xl mx-auto px-6 pt-32 pb-40 min-h-screen flex items-center">
          <div className="max-w-2xl bg-white/40 rounded-xl p-6">
            <h1 className="mt-6 text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-tight">
              Especializados <br /> em{" "}
              <span className="text-gray-700">Ortodontia</span>
            </h1>

            <div className="mt-6 overflow-hidden whitespace-nowrap w-full">
              <style>{`
                @keyframes marquee {
                  0% { transform: translateX(0); }
                  100% { transform: translateX(-50%); }
                }
                .carousel-container {
                  display: flex;
                  width: max-content;
                  animation: marquee 20s linear infinite;
                }
              `}</style>

              <div className="carousel-container">
                {specialties.concat(specialties).map((item, i) => (
                  <span
                    key={i}
                    className="text-xl sm:text-2xl font-semibold text-primary mx-8"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* FORM */}
        <div className="absolute bottom-0 w-full bg-cleam py-4 z-20">
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
                className="flex-1 p-3 rounded-xl border border-white bg-transparent text-white placeholder:text-gray-500"
                required
              />

              <input
                name="telefone"
                value={form.telefone}
                onChange={handleChange}
                placeholder="WhatsApp"
                className="flex-1 p-3 rounded-xl border border-white bg-transparent text-white placeholder:text-gray-500"
                required
              />

              <input
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                placeholder="E-mail"
                className="flex-1 p-3 rounded-xl border border-white bg-transparent text-white placeholder:text-gray-500"
                required
              />

              <input
                name="servico"
                value={form.servico}
                onChange={handleChange}
                placeholder="Tipo de serviço"
                className="flex-1 p-3 rounded-xl border border-white bg-transparent text-white placeholder:text-gray-500"
                required
              />

              <Button
                type="submit"
                loading={status === "loading"}
                text={status === "success" ? "Enviado com sucesso!" : "Enviar"}
                className={`${
                  status === "success"
                    ? "!bg-green-600 !text-white"
                    : "bg-primary"
                } rounded-xl`}
                disabled={status !== "idle"}
              />
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
