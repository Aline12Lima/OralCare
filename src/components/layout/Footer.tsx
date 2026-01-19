import { useState } from "react";
import { Linkedin, Instagram } from "lucide-react";
import { ContactForm } from "../sections/ContacForm";
import { Button } from "../common/Button";

export const Footer = () => {
  const [showForm, setShowForm] = useState(false); // estado do modal

  return (
    <footer className="bg-cleam text-white relative">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          {/* LOGO / NOME */}
          <div className="text-center md:text-left text-gray-500">
            <h3 className="text-primary text-2xl">
              Odonto <span className="text-white text-2xl">Care</span>
            </h3>

            <p className="text-sm text-white mt-2">
              Cuidando do seu sorriso com excelência
            </p>

            <div className="mt-4 text-sm text-white/70">
              Endereço: Rua Fictícia, 123 - <br /> Bairro Imaginário, São Paulo
            </div>
          </div>

          {/* REDES SOCIAIS */}
          <div className="text-center md:text-left">
            <h5 className="mb-2 font-semibold">Redes Sociais</h5>
            <div className="flex gap-4 justify-center md:justify-start">
              <a
                href="https://www.linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-secondary transition-colors"
              >
                <Linkedin size={24} />
              </a>
              <a
                href="https://www.instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-secondary transition-colors"
              >
                <Instagram size={24} />
              </a>
            </div>

            {/* BOTÃO TELEFONE */}
            <div className="mt-4">
              <Button onClick={() => setShowForm(true)}>
                📞 Agendar Consulta
              </Button>
            </div>
          </div>
        </div>

        {/* LINHA */}
        <div className="border-t border-white/60 mt-8 pt-6 text-center text-sm text-white">
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
