import Navbar from "@/components/sections/Navbar";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Stack from "@/components/sections/Stack";
import Projects from "@/components/sections/Projects";
import Experience from "@/components/sections/Experience";
import Documents from "@/components/sections/Documents";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/sections/Footer";

/**
 * William Jiang — Portfolio
 * Brand: "Ship production-grade software, not proof-of-concepts."
 * Palette: deep-space #0B0F19 · violet #8B5CF6 · teal #3ECF8E · orange #D97757
 */
export default function Home() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-background text-foreground">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Stack />
        <Projects />
        <Experience />
        <Documents />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
