"use client";

import { useContent } from "@/context/ContentContext";
import PricingCards from "@/components/PricingCards";

export default function PricingSection() {
  const { content } = useContent();
  return <PricingCards pricing={content.pricing} />;
}
