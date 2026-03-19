import HeroSection from "@/components/HeroSection";
import LifestyleStorySection from "@/components/LifestyleStorySection";
import TheSpaceSection from "@/components/TheSpaceSection";
import DailyExperienceSection from "@/components/DailyExperienceSection";
import AmenitiesSection from "@/components/AmenitiesSection";
import PricingSection from "@/components/PricingSection";
import GallerySection from "@/components/GallerySection";
import VideoSection from "@/components/VideoSection";
import LocationSection from "@/components/LocationSection";
import FinalCTASection from "@/components/FinalCTASection";

export default function Home() {
  return (
    <main className="overflow-x-hidden">
      <HeroSection />
      <LifestyleStorySection />
      <TheSpaceSection />
      <DailyExperienceSection />
      <AmenitiesSection />
      <PricingSection />
      <GallerySection />
      <VideoSection />
      <LocationSection />
      <FinalCTASection />
    </main>
  );
}
