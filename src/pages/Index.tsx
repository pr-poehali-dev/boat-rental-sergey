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
      className={`fixed bottom-6 right-6 z-40 flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-navy/20 bg-white/80 backdrop-blur text-navy/70 hover:text-navy hover:bg-white hover:border-navy/40 transition-all duration-300 shadow-sm text-xs font-body ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"}`}
    >
      <Icon name="ChevronUp" size={14} />
      <span>Наверх</span>
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