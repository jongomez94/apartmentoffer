import type { Metadata } from "next";
import { isValidLocale } from "@/lib/i18n/config";
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
import { getGardenStudioContent } from "@/lib/content/garden-studio";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isValidLocale(locale)) return {};
  const c = getGardenStudioContent(locale);
  return {
    title: c.metaTitle.split("|")[0].trim(),
    description: c.metaDescription,
  };
}

export default function GardenStudioPage() {
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
