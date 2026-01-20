import { useEffect, useState } from "react";
import { client, urlFor } from "../../lib/sanity";

type Doctor = {
  _id: string;
  name: string;
  role: string;
  image: unknown;
};

export const Doctors = () => {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    client
      .fetch(
        `*[_type == "doctor"] | order(_createdAt asc) {
          _id,
          name,
          role,
          image
        }`,
      )
      .then((data: Doctor[]) => {
        console.log("DOCTORS from Sanity:", data);
        setDoctors(data);
      })
      .catch((err: unknown) => console.error("Sanity fetch error:", err))
      .finally(() => setLoading(false));
  }, []);

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

        {loading ? (
          <p className="text-center text-gray-700">
            Carregando profissionais...
          </p>
        ) : doctors.length === 0 ? (
          <p className="text-center text-gray-700">
            Nenhum profissional cadastrado no momento.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {doctors.map((doctor) => (
              <div
                key={doctor._id}
                className="group relative h-[460px] rounded-3xl overflow-hidden bg-gray-100 shadow-md hover:shadow-2xl transition-all"
              >
                <img
                  src={urlFor(doctor.image).width(800).height(800).url()}
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
        )}
      </div>
    </section>
  );
};
