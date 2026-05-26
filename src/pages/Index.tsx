import { useState, useEffect } from "react";
import { NavBar, HeroSection, FleetSection, BookingSection } from "./TopSections";
import { ServicesSection, ReviewsSection, CtaSection, GallerySection, FaqSection, ContactsSection, Footer } from "./BottomSections";
import Icon from "@/components/ui/icon";

function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Наверх"
      className={`fixed top-20 left-5 z-40 w-11 h-11 rounded-full bg-transparent border-2 border-[hsl(var(--gold-light))] shadow-lg flex flex-col items-center justify-center gap-0 transition-all duration-300 hover:bg-[hsl(var(--navy))] hover:scale-110 group ${visible ? "opacity-100 scale-100" : "opacity-0 scale-90 pointer-events-none"}`}
    >
      <Icon name="ChevronUp" size={11} className="text-[hsl(var(--gold-light))] -mb-1" />
      <Icon name="Anchor" size={16} className="text-[hsl(var(--gold-light))] rotate-180 group-hover:rotate-[185deg] transition-transform duration-300" />
    </button>
  );
}

export default function Index() {
  return (
    <div className="min-h-screen">
      <NavBar />
      <HeroSection />
      <FleetSection />
      <BookingSection />
      <ServicesSection />
      <ReviewsSection />
      <CtaSection />
      <GallerySection />
      <FaqSection />
      <ContactsSection />
      <Footer />
      <ScrollToTop />
    </div>
  );
}