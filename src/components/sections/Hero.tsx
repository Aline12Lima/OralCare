import { Button } from "../common/Button";
import heroBg from "../../assets/images/heroVideo.mp4";

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

  return (
    <section id="home" className="w-full">
      <div className="relative min-h-[103vh] w-full -mt-24 overflow-hidden">
        {/* BACKGROUND DE VÍDEO */}
        <div className="absolute inset-0 z-0 -translate-y-28">
          <video
            src={heroBg}
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover object-top"
          />
        </div>

        {/* OVERLAY */}
        <div className="absolute inset-0 bg-black/10 z-0"></div>

        {/* CONTEÚDO SUPERIOR */}
        <div className="absolute top-46 left-6 lg:left-10 z-20">
          {/* H1 */}
          <h1 className="text-white  text-6xl lg:text-8xl xl:text-7xl font-black mb-4">
            Especialistas em{" "}
            <span className="italic text-primary bg-white/60 rounded-2xl ">
              <br /> Ortodontia
            </span>
          </h1>

          {/* MINI CARROSSEL DE NOMES */}
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
        <div className="absolute bottom-0 left-0 w-full bg-cleam py-12 lg:py-6 z-20">
          <div className="max-w-7xl mx-auto px-6 flex flex-col gap-6">
            {/* TÍTULO */}
            <h2 className="text-gray-800 font-tech text-2xl uppercase mb-2">
              Agende uma <span className="text-secondary">avaliação</span>
            </h2>

            {/* FORMULÁRIO */}
            <form className="flex flex-wrap w-full lg:flex-nowrap gap-2 lg:gap-4">
              <input
                type="text"
                placeholder="Nome"
                className="flex-1 p-3 rounded-none border border-slate-200 outline-none focus:border-secondary text-white"
              />
              <input
                type="tel"
                placeholder="WhatsApp"
                className="flex-1 p-3 rounded-none border border-slate-200 outline-none focus:border-secondary text-white"
              />
              <input
                type="email"
                placeholder="E-mail"
                className="flex-1 p-3 rounded-none border border-slate-200 outline-none focus:border-secondary text-white"
              />
              <input
                type="Serviço"
                placeholder="Tipo de serviço "
                className="flex-1 p-3 rounded-none border border-slate-200 outline-none focus:border-secondary text-white"
              />

              <Button className="w-sm !py-4 !rounded-none uppercase font-black bg-secondary text-white hover:bg-secondary/90 transition-all">
                Enviar
              </Button>
            </form>
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
