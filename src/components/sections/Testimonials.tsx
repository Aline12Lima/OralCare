import imageBg from "../../assets/images/heroVideo.mp4";

export const Testimonials = () => {
  const testimonials = [
    {
      name: "Ana Paula",
      role: "Paciente",
      rating: 5,
      text: "Atendimento excelente, profissionais incríveis!",
    },
    {
      name: "Carlos Silva",
      role: "Paciente",
      rating: 5,
      text: "Clínica moderna e muito organizada.",
    },
    {
      name: "Juliana Rocha",
      role: "Paciente",
      rating: 4,
      text: "Me senti muito segura durante todo o tratamento.",
    },
  ];

  return (
    <section className="relative min-h-[70vh] overflow-hidden">
      {/* VÍDEO DE FUNDO */}
      <video
        src={imageBg}
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* OVERLAY PARA CONTRASTE */}
      <div className="absolute inset-0 bg-black/40"></div>

      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-primary font-bold uppercase tracking-widest text-sm mb-3">
            Depoimentos
          </h2>
          <p className="text-3xl md:text-4xl font-extrabold text-prymary">
            O que nossos pacientes dizem
          </p>
        </div>
        {/* componente carrossel*/}
        <div className="relative">
          {/* CONTAINER QUE ESCONDE */}
          <div className="overflow-hidden">
            {/* FAIXA ANIMADA */}
            <div className="flex gap-8 animate-scroll w-max">
              {testimonials.concat(testimonials).map((t, index) => (
                <div
                  key={index}
                  className="min-w-[320px] max-w-[320px] bg-white/10  p-8 rounded-3xl border border-white/20 hover:bg-white/20 transition-all"
                >
                  {/* ESTRELAS */}
                  <div className="flex gap-1 mb-4">
                    {[...Array(t.rating)].map((_, i) => (
                      <span key={i} className="text-yellow-400 text-lg">
                        ★
                      </span>
                    ))}
                  </div>

                  {/* TEXTO */}
                  <p className="text-gray-100 text-lg leading-relaxed mb-6 italic">
                    "{t.text}"
                  </p>

                  {/* AUTOR */}
                  <div>
                    <p className="text-primary font-bold">{t.name}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CSS DA ANIMAÇÃO */}
          <style>
            {`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        .animate-scroll {
          animation: scroll 30s linear infinite;
        }
      `}
          </style>
        </div>
      </div>
    </section>
  );
};
