import Navbar from "@/components/Navbar";
import HeroScrolly from "@/components/HeroScrolly";
import StatsStrip from "@/components/StatsStrip";
import Positioning from "@/components/Positioning";
import HowItWorks from "@/components/HowItWorks";
import Platforms from "@/components/Platforms";
import Industries from "@/components/Industries";
import TechStack from "@/components/TechStack";
import Partners from "@/components/Partners";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import WheelLetter from "@/components/WheelLetter";

export default function Home() {
  return (
    <main className="w-full flex flex-col min-h-screen">
      <Navbar />
      <WheelLetter />
      <HeroScrolly />
      <StatsStrip />
      <Positioning />
      <HowItWorks />
      <Platforms />
      <Industries />
      <TechStack />
      <Partners />
      <Contact />
      <Footer />
    </main>
  );
}
