import { NavBar, HeroSection, FleetSection, BookingSection } from "./TopSections";
import { ServicesSection, ReviewsSection, GallerySection, FaqSection, ContactsSection, Footer } from "./BottomSections";

export default function Index() {
  return (
    <div className="min-h-screen">
      <NavBar />
      <HeroSection />
      <FleetSection />
      <BookingSection />
      <ServicesSection />
      <ReviewsSection />
      <GallerySection />
      <FaqSection />
      <ContactsSection />
      <Footer />
    </div>
  );
}