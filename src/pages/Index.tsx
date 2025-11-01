import Header from "@/components/Header";
import Hero from "@/components/Hero";
import StoriesCarousel from "@/components/StoriesCarousel";
import AboutSection from "@/components/AboutSection";
import CreatorStudio from "@/components/CreatorStudio";
import BetaCTA from "@/components/BetaCTA";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Hero />
      <StoriesCarousel />
      <AboutSection />
      <CreatorStudio />
      <BetaCTA />
      <Footer />
    </div>
  );
};

export default Index;
