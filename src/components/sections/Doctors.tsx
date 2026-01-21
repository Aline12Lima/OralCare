import perfil1 from "../../assets/images/perfilClient.webp";
import perfil2 from "../../assets/images/perfilJose.webp";
import perfil3 from "../../assets/images/perfilPaulo.webp";
import perfil4 from "../../assets/images/KidsDentist.webp";

const doctors = [
  { id: "1", name: "Dra. Camila Souza", role: "Ortodontia", image: perfil1 },
  { id: "2", name: "Dr. José Almeida", role: "Implantodontia", image: perfil2 },
  { id: "3", name: "Dr. Paulo Lima", role: "Endodontia", image: perfil3 },
  {
    id: "4",
    name: "Dra. Ana Ribeiro",
    role: "Odontopediatria",
    image: perfil4,
  },
];

export const Doctors = () => {
  return (
    <section id="especialistas" className="py-24 min-h-screen bg-bege">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl lg:text-5xl font-black text-gray-700 mb-4">
            Nosso Time de Profissionais
          </h2>
          <p className="text-gray-700 text-lg">
            Conheça os profissionais que cuidam do seu sorriso com excelência
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {doctors.map((doctor) => (
            <div
              key={doctor.id}
              className="group relative h-[460px] rounded-3xl overflow-hidden bg-gray-100 shadow-md hover:shadow-2xl transition-all"
            >
              <img
                src={doctor.image}
                alt={doctor.name}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent"></div>

              <div className="absolute bottom-0 left-0 w-full p-5">
                <div className="bg-white/90 backdrop-blur-md rounded-2xl p-4">
                  <h3 className="text-lg font-black text-gray-900">
                    {doctor.name}
                  </h3>
                  <p className="text-sm font-semibold text-primary">
                    {doctor.role}
                  </p>
                </div>
              </div>

              <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-gray-800">
                Especialista
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
