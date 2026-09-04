import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import StatsSection from "@/components/StatsSection";
import LiveEnergyDashboard from "@/components/LiveEnergyDashboard";
import ProductsGrid from "@/components/ProductsGrid";
import AboutSection from "@/components/AboutSection";
import PartnerSection from "@/components/PartnerSection";
import DeviceSection from "@/components/DeviceSection";
import FAQSection from "@/components/FAQSection";
import Footer from "@/components/Footer";
import EnergyPulseAnnouncement from "@/components/EnergyPulseAnnouncement";
import StartupSection from "@/components/StartupSection";

export default function Home() {
  return (
    <>
      <Header withAnnouncement />
      <main>
        <EnergyPulseAnnouncement />
        <HeroSection />
        <StatsSection />
        <ProductsGrid />
        <StartupSection />
        <LiveEnergyDashboard />
        <AboutSection />
        <PartnerSection />
        <DeviceSection />
        <FAQSection />
      </main>
      <Footer />
    </>
  );
}
