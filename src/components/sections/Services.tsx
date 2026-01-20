import service1 from "../../assets/images/Clareamento-Dental-à-Laser-e1533923203485-1920w.webp";
import service2 from "../../assets/images/orto.jpg";
import service3 from "../../assets/images/clientWoman.webp";
import service4 from "../../assets/images/orto.webp";

export const Services = () => {
  const services = [
    {
      name: "Ortodontia",
      img: service4,
      alt: "Invisalign",
      desc: "Alinhadores transparentes modernos",
    },
    {
      name: "Clareamentos",
      img: service1,
      alt: "Clareamento",
      desc: "Sorriso mais branco e saudável",
    },
    {
      name: "Periodontia",
      img: service2,
      alt: "Coroa",
      desc: "Proteção e estética dental",
    },
    {
      name: "Clínico Geral",
      img: service3,
      alt: "Implantes",
      desc: "Restaurações e tratamentos",
    },
  ];

  return (
    <section id="services" className="w-full bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 py-20">
        {/* ======================= */}
        {/* NOSSAS ESPECIALIDADES */}
        {/* ======================= */}
        <div className="mb-12 text-center">
          <h2 className="text-4xl lg:text-5xl font-black text-gray-400 mb-4">
            Nossas <span className="text-secondary">Especialidades</span>
          </h2>
          <p className="text-gray-700 text-lg">
            Conheça os serviços que oferecemos para cuidar do seu sorriso com
            qualidade e profissionalismo.
          </p>
        </div>

        {/* CARDS LADO A LADO */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service) => (
            <div
              key={service.name}
              className="relative h-[400px] rounded-2xl overflow-hidden shadow-lg group"
            >
              {/* IMAGEM COMO BACKGROUND */}
              <img
                src={service.img}
                alt={service.alt}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />

              {/* FAIXA BRANCA COM TEXTO */}
              <div className="absolute bottom-0 left-0 w-full bg-cleam  p-4">
                <h3 className="text-lg font-bold text-gray-700">
                  {service.name}
                </h3>
                <p className="text-sm text-gray-600">{service.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
