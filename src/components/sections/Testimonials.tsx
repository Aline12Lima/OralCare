import imageBg from "../../assets/images/pace.jpg";

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
    <section
      className="py-24 bg-center bg-cover bg-no-repeat relative"
      style={{ backgroundImage: `url(${imageBg})` }}
    >
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
                  className="min-w-[320px] max-w-[320px] bg-white/10 backdrop-blur-lg p-8 rounded-3xl border border-white/20 hover:bg-white/20 transition-all"
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
                  <p className="text-gray-600 text-lg leading-relaxed mb-6 italic">
                    "{t.text}"
                  </p>

                  {/* AUTOR */}
                  <div>
                    <p className="text-secondary font-bold">{t.name}</p>
                    <p className="text-secondary text-sm">{t.role}</p>
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
