import perfil1 from "../../assets/images/perfilJose.webp";
import perfil2 from "../../assets/images/perfilPaulo.webp";
import perfil3 from "../../assets/images/KidsDentist.webp";
import perfil4 from "../../assets/images/perfilClient.webp";

const doctors = [
  {
    name: "Dra. Ana Silveira",
    role: "Ortodontista",
    image: perfil1,
  },
  {
    name: "Dr. Carlos Mendes",
    role: "Implantodontista",
    image: perfil2,
  },
  {
    name: "Dra. Marina Luz",
    role: "Odontopediatra",
    image: perfil3,
  },
  {
    name: "Dr. Felipe Rocha",
    role: "Periodontista",
    image: perfil4,
  },
];

export const Doctors = () => {
  return (
    <section id="especialistas" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* TÍTULO */}
        <div className="text-center mb-12">
          <h2 className="text-4xl lg:text-5xl font-black text-primary mb-4">
            NossoTime de Profissionais
          </h2>
          <p className="text-gray-700 text-lg">
            Conheça os profissionais que cuidam do seu sorriso com excelência
          </p>
        </div>

        {/* GRID DE PROFESSORES */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {doctors.map((doctor, index) => (
            <div
              key={index}
              className="flex flex-col items-center bg-gray-100/80 rounded-2xl p-6 hover:shadow-xl transition-all"
            >
              <div className="w-32 h-32 mb-4 flex items-center justify-center overflow-hidden rounded-full">
                <img
                  src={doctor.image}
                  alt={doctor.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-slate-900">
                {doctor.name}
              </h3>
              <p className="text-primary font-medium">{doctor.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
