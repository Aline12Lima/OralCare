import React, { useMemo, useState } from "react";
import { Button } from "../common/Button";
import heroBg from "../../assets/images/heroBg.jpg";

/* =======================
   TIPOS (FORA DO JSX)
======================= */
type FormData = {
  nome: string;
  telefone: string;
  email: string;
  servico: string;
};

type FormField = keyof FormData;

type Status = "idle" | "loading" | "success" | "error";

/* =======================
   COMPONENTE
======================= */
export const Hero = () => {
  const [status, setStatus] = useState<Status>("idle");

  const [form, setForm] = useState<FormData>({
    nome: "",
    telefone: "",
    email: "",
    servico: "",
  });

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

  /* =======================
     HANDLERS
  ======================= */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === "loading") return;

    setStatus("loading");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data: { ok: boolean; error?: string } = await res.json();

      if (!res.ok || !data.ok) {
        throw new Error(data?.error || "Falha no envio");
      }

      setStatus("success");
      setForm({
        nome: "",
        telefone: "",
        email: "",
        servico: "",
      });

      setTimeout(() => setStatus("idle"), 3000);
    } catch (error) {
      console.error("Erro ao enviar formulário:", error);
      setStatus("error");

      setTimeout(() => setStatus("idle"), 3000);
    }
  };

  /* =======================
     JSX
  ======================= */
  return (
    <section id="home" className="w-full">
      <div className="relative min-h-[85vh] w-full -mt-24 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={heroBg}
            alt="Imagem de fundo"
            className="w-full h-full object-cover object-center"
          />
        </div>

        <div className="absolute inset-0 z-10 bg-black/10" />

        <div className="relative z-20 max-w-7xl mx-auto px-6 pt-32 pb-40 min-h-screen flex items-center">
          <div className="max-w-2xl bg-white/40 rounded-xl p-6">
            <h1 className="mt-6 text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-tight">
              Especializados <br /> em{" "}
              <span className="text-gray-700">Ortodontia</span>
            </h1>

            <div className="mt-6 overflow-hidden whitespace-nowrap w-full">
              <div className="flex animate-marquee">
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

        {/* FORMULÁRIO */}
        <div className="absolute bottom-0 w-full bg-cleam py-4 z-20">
          <div className="max-w-7xl mx-auto px-6 flex flex-col gap-6">
            <h2 className="text-gray-500 text-2xl">
              <span className="text-secondary">Agende</span> uma avaliação
            </h2>

            <form
              onSubmit={handleSubmit}
              className="flex flex-wrap w-full lg:flex-nowrap gap-4 mb-10"
            >
              {(Object.keys(form) as FormField[]).map((field) => (
                <input
                  key={field}
                  name={field}
                  value={form[field]}
                  onChange={handleChange}
                  placeholder={
                    field === "servico"
                      ? "Tipo de serviço"
                      : field.charAt(0).toUpperCase() + field.slice(1)
                  }
                  className="flex-1 p-3 rounded-xl border border-white bg-transparent text-white placeholder:text-gray-500"
                  required
                />
              ))}

              <Button
                type="submit"
                loading={status === "loading"}
                disabled={status !== "idle"}
                text={
                  status === "success"
                    ? "Enviado com sucesso!"
                    : status === "error"
                      ? "Erro ao enviar"
                      : "Enviar"
                }
                className={`rounded-xl ${
                  status === "success"
                    ? "!bg-green-600 text-white"
                    : status === "error"
                      ? "!bg-red-600 text-white"
                      : "bg-primary"
                }`}
              />
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
