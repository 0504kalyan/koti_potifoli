import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Modules } from './components/Modules';
import { Processes } from './components/Processes';
import { Expertise } from './components/Expertise';
import { Experience } from './components/Experience';
import { Skills } from './components/Skills';
import { About } from './components/About';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';

export default function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Modules />
        <Processes />
        <Expertise />
        <Experience />
        <Skills />
        <About />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
