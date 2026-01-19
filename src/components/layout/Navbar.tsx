import { Button } from "../common/Button";
import { Phone } from "lucide-react";

export const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-transparent">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* ===== BLOCO ESQUERDO ===== */}
        <div className="flex items-end leading-none">
          <span className="bg-white/30 backdrop-blur-md text-primary text-2xl lg:text-3xl font-black px-3 py-1 rounded-lg">
            Odonto
          </span>
          <span className="text-white text-xl lg:text-2xl ml-2 font-semibold drop-shadow-lg">
            Care
          </span>
        </div>

        {/* ===== BLOCO DIREITO ===== */}
        <div className="flex flex-row items-center gap-4">
          <div className="hidden md:flex flex-row-reverse items-center gap-4">
            {/* Botão Contato */}
            <a href="#contactForm">
              <Button className="!bg-white !text-gray-600 !p-2 rounded-full shadow-lg transition-all hover:!bg-primary hover:!text-white">
                <Phone size={24} />
              </Button>
            </a>

            {/* Menu */}
            {[
              { label: "Especialistas", href: "#services" },
              { label: "Profissionais", href: "#especialistas" },
              { label: "Início", href: "#home" },
            ].map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="
              bg-white
              px-6 py-2
              rounded-full
              shadow-sm
              text-gray-600
              font-bold
              transition-all
              hover:bg-primary
              hover:text-white
            "
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};
