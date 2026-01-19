import { useState } from "react";
import { ContactForm } from "../components/sections/ContacForm";
import { Button } from "../components/common/Button";
export const App = () => {
  const [showForm, setShowForm] = useState(false); // <- estado do modal

  return (
    <div>
      {/* BOTÃO TELEFONE */}
      <Button onClick={() => setShowForm(true)}>📞 Agendar Consulta</Button>

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
    </div>
  );
};
