import { Navbar } from "./components/layout/Navbar";
import { Hero } from "./components/sections/Hero";
import { Services } from "./components/sections/Services";
import { Doctors } from "./components/sections/Doctors";
import { Testimonials } from "./components/sections/Testimonials";
import { Footer } from "./components/layout/Footer";

function App() {
  return (
    <div className="antialiased text-slate-900 bg-white min-h-screen">
      <Navbar />
      <main className="pt-20">
        <Hero />
        <Services />
        <Doctors />
        <Testimonials />
        <Footer />
      </main>
    </div>
  );
}

export default App;
