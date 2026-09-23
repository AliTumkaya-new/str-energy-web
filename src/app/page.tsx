import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import StatsSection from "@/components/StatsSection";
import ProductsGrid from "@/components/ProductsGrid";
import LiveEnergyDashboard from "@/components/LiveEnergyDashboard";
import LatestInsightsSection from "@/components/LatestInsightsSection";
import AboutSection from "@/components/AboutSection";
import PartnerSection from "@/components/PartnerSection";
import DeviceSection from "@/components/DeviceSection";
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
        <ProductsGrid />
        <LiveEnergyDashboard />
        <LatestInsightsSection />
        <AboutSection />
        <PartnerSection />
        <DeviceSection />
        <FAQSection />
      </main>
      <Footer />
    </>
  );
}
