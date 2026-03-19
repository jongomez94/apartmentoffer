"use client";

import { motion } from "framer-motion";
import { useContent } from "@/context/ContentContext";

export default function DailyExperienceSection() {
  const { content } = useContent();
  const { dailyExperience } = content;
  const times = [
    {
      key: "morning",
      ...dailyExperience.morning,
      icon: "☀️",
      gradient: "from-amber-100/80 to-orange-50/80",
    },
    {
      key: "midday",
      ...dailyExperience.midday,
      icon: "☁️",
      gradient: "from-sky-100/80 to-slate-50/80",
    },
    {
      key: "evening",
      ...dailyExperience.evening,
      icon: "🌙",
      gradient: "from-indigo-100/80 to-slate-100/80",
    },
  ] as const;

  return (
    <section className="relative overflow-hidden bg-cream py-24 md:py-32 lg:py-40">
      <div className="mx-auto max-w-6xl px-6">
        <motion.h2
          className="mb-16 text-center font-serif text-3xl font-medium text-stone-900 md:text-4xl lg:text-5xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {dailyExperience.title}
        </motion.h2>

        <div className="grid gap-8 md:grid-cols-3">
          {times.map((block, i) => (
            <motion.article
              key={block.key}
              className={`relative overflow-hidden rounded-lg bg-gradient-to-br ${block.gradient} p-8 backdrop-blur-sm`}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
            >
              <span className="text-3xl" aria-hidden>
                {block.icon}
              </span>
              <h3 className="mt-4 font-serif text-2xl font-medium text-stone-900">
                {block.title}
              </h3>
              <p className="mt-3 font-sans text-stone-600 leading-relaxed">
                {block.description}
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
