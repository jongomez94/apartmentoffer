"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useContent } from "@/context/ContentContext";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.15 },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export default function TheSpaceSection() {
  const { content } = useContent();
  return (
    <section className="relative overflow-hidden bg-white py-24 md:py-32 lg:py-40">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-16 lg:grid-cols-2 lg:gap-24 lg:items-center">
          {/* Portal (11) from gallery */}
          <motion.div
            className="relative aspect-[4/3] overflow-hidden rounded-sm bg-stone-200"
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <Image
              src="/gallery/Portal%20%20%2811%29.jpeg"
              alt={content.space.title}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority={false}
            />
          </motion.div>

          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            className="space-y-8"
          >
            <motion.h2
              variants={item}
              className="font-serif text-3xl font-medium text-stone-900 md:text-4xl lg:text-5xl"
            >
              {content.space.title}
            </motion.h2>
            <motion.p
              variants={item}
              className="font-sans text-lg leading-relaxed text-stone-600"
            >
              {content.space.intro}
            </motion.p>
            <ul className="grid gap-3 sm:grid-cols-2">
              {content.space.features.map((feature, i) => (
                <motion.li
                  key={i}
                  variants={item}
                  className="flex items-start gap-3 font-sans text-stone-700"
                >
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-sage" />
                  <span>{feature}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
