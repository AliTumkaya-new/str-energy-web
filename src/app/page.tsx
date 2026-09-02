import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import PartnerSection from "@/components/PartnerSection";
import DeviceSection from "@/components/DeviceSection";
import FAQSection from "@/components/FAQSection";
import Footer from "@/components/Footer";
import DeferredLiveEnergyDashboard from "@/components/DeferredLiveEnergyDashboard";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <AboutSection />
        <PartnerSection />
        <DeviceSection />
        <DeferredLiveEnergyDashboard />
        <FAQSection />
      </main>
      <Footer />
    </>
  );
}
