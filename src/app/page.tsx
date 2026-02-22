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

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <StatsSection />
        <LiveEnergyDashboard />
        <ProductsGrid />
        <AboutSection />
        <PartnerSection />
        <DeviceSection />

        <FAQSection />
      </main>
      <Footer />
    </>
  );
}
