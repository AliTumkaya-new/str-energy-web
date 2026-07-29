import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import StatsSection from "@/components/StatsSection";
import LiveEnergyDashboard from "@/components/LiveEnergyDashboard";
import ProductsGrid from "@/components/ProductsGrid";
import AboutSection from "@/components/AboutSection";
import PartnerSection from "@/components/PartnerSection";
import DeviceSection from "@/components/DeviceSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import FAQSection from "@/components/FAQSection";
import Footer from "@/components/Footer";
import EnergyPulseAnnouncement from "@/components/EnergyPulseAnnouncement";

export default function Home() {
  return (
    <>
      <Header withAnnouncement />
      <main>
        <EnergyPulseAnnouncement />
        <HeroSection />
        <StatsSection />
        <LiveEnergyDashboard />
        <ProductsGrid />
        <AboutSection />
        <PartnerSection />
        <DeviceSection />
        <TestimonialsSection />
        <FAQSection />
      </main>
      <Footer />
    </>
  );
}
