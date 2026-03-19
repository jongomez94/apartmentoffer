"use client";

import { motion } from "framer-motion";
import { useContent } from "@/context/ContentContext";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.2 },
  },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0 },
};

export default function LifestyleStorySection() {
  const { content } = useContent();
  return (
    <section
      id="lifestyle"
      className="relative overflow-hidden bg-cream py-24 md:py-32 lg:py-40"
    >
      <div className="mx-auto max-w-3xl px-6">
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="space-y-10"
        >
          <motion.h2
            variants={item}
            className="font-serif text-3xl font-medium text-stone-900 md:text-4xl lg:text-5xl"
          >
            {content.lifestyle.title}
          </motion.h2>

          {content.lifestyle.paragraphs.map((paragraph, i) => (
            <motion.p
              key={i}
              variants={item}
              className="font-sans text-lg leading-relaxed text-stone-600 md:text-xl"
            >
              {paragraph}
            </motion.p>
          ))}

          <motion.ul
            variants={item}
            className="flex flex-wrap gap-3 pt-4"
          >
            {content.lifestyle.highlights.map((highlight, i) => (
              <li key={i}>
                <span className="inline-block rounded-full border border-stone-300 bg-white/60 px-4 py-2 font-sans text-sm font-medium text-stone-700">
                  {highlight}
                </span>
              </li>
            ))}
          </motion.ul>
        </motion.div>
      </div>
    </section>
  );
}
