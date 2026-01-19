import React from "react";
import service1 from "../../assets/images/clear.png";
import service2 from "../../assets/images/service1.png";
import service3 from "../../assets/images/service3.png";
import service4 from "../../assets/images/service4.png";

export const Services = () => {
  const services = [
    {
      name: "Invisalign",
      img: service4,
      alt: "Invisalign",
      desc: "Alinhadores transparentes modernos",
    },
    {
      name: "Clareamento",
      img: service1,
      alt: "Clareamento",
      desc: "Sorriso mais branco e saudável",
    },
    {
      name: "Aparelho Movel",
      img: service2,
      alt: "Coroa",
      desc: "Proteção e estética dental",
    },
    {
      name: "Aparelho Fixo",
      img: service3,
      alt: "Implantes",
      desc: "Substituição de dentes perdidos",
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
              className="flex flex-col items-center bg-secondary rounded-2xl p-6 shadow hover:shadow-lg transition h-[350px]"
            >
              <div className="w-28 h-28 mb-4 flex items-center justify-center">
                <img
                  src={service.img}
                  alt={service.alt}
                  className="w-full h-full object-contain"
                />
              </div>
              <h3 className="text-xl font-semibold mb-2">{service.name}</h3>
              <p className="text-gray-200 text-center">{service.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
