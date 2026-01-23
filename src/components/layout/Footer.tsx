import { useState } from "react";
import { Linkedin, Instagram, MapPin } from "lucide-react";
import { ContactForm } from "../sections/ContacForm";

export const Footer = () => {
  const [showForm, setShowForm] = useState(false); // estado do modal

  return (
    <footer className="bg-cleam text-white relative px-8">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          {/* LOGO / NOME */}
          <div className="text-center md:text-left text-gray-500">
            <h3 className="text-primary text-2xl">Odonto Care</h3>

            <p className="text-1xl text-gray-100 ">
              Cuidando do seu sorriso <br />
              com excelência
            </p>
          </div>
          <div className="text-center md:text-left">
            <div className="flex items-center gap-2 justify-center md:justify-start">
              <h1 className="text-xl font-bold text-gray-500">Endereço</h1>
              <MapPin
                size={24}
                className="text-secondary hover:text-gray-700 transition-colors"
              />
            </div>

            <p className="mt-4 text-1xl text-gray-100">
              Rua Fictícia, 123 - Bairro Imaginário, São Paulo
            </p>
          </div>

          {/* REDES SOCIAIS */}
          <div className="text-center ">
            <h5 className="mb-2 font-semibold text-gray-500">Redes Sociais</h5>
            <div className="flex gap-4 justify-center md:justify-start">
              <a
                href="https://www.linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-100 hover:text-gray-100 transition-colors"
              >
                <Linkedin size={24} />
              </a>
              <a
                href="https://www.instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-100 hover:text-gray-100 transition-colors"
              >
                <Instagram size={24} />
              </a>
            </div>

            {/* BOTÃO TELEFONE */}
            <div className="mt-4 text-bege bg-secondary rounded-2xl">
              <a
                href="https://wa.me/5511999999999?text=Olá!%20Gostaria%20de%20agendar%20uma%20consulta."
                target="_blank"
                rel="noopener noreferrer"
              ></a>
            </div>
          </div>
        </div>

        {/* LINHA */}
        <div className="border-t border-white/60 mt-8 pt-6 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} Clínica Odonto. Todos os direitos
          reservados.
        </div>
      </div>

      {/* MODAL */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-3xl p-6 max-w-lg w-full relative">
            {/* BOTÃO FECHAR */}
            <button
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
              onClick={() => setShowForm(false)}
            >
              ✕
            </button>

            {/* FORMULÁRIO */}
            <ContactForm />
          </div>
        </div>
      )}
    </footer>
  );
};
