import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import MainForm from "../components/MainForm";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <div className="flex flex-col">
        <MainForm />
      </div>
    </>
  );
}
