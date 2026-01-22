import { parse } from "yaml";
import doctorsRaw from "../../content/doctors.md?raw";

type Doctor = {
  name: string;
  role: string;
  image: string;
};

const frontmatter = doctorsRaw.split("---").slice(1, 2).join("");

const data = parse(frontmatter);
const doctors: Doctor[] = data.doctors || [];

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
          {doctors.map((doctor, index) => (
            <div
              key={index}
              className="group relative h-[460px] rounded-3xl overflow-hidden"
            >
              <img
                src={doctor.image}
                alt={doctor.name}
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute bottom-0 p-4 bg-white/90">
                <h3>{doctor.name}</h3>
                <p>{doctor.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
