"use client";

import { motion } from "framer-motion";
import { pricing } from "@/lib/content";

export default function PricingSection() {
  return (
    <section className="relative overflow-hidden bg-cream py-24 md:py-32 lg:py-40">
      <div className="mx-auto max-w-5xl px-6">
        <motion.h2
          className="mb-16 text-center font-serif text-3xl font-medium text-stone-900 md:text-4xl lg:text-5xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {pricing.title}
        </motion.h2>

        <div className="grid gap-8 md:grid-cols-2">
          <motion.article
            className="flex flex-col rounded-lg border border-stone-200 bg-white p-8 shadow-sm transition-shadow hover:shadow-md"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="font-serif text-2xl font-medium text-stone-900">
              {pricing.option1.name}
            </h3>
            <div className="mt-4 flex items-baseline gap-1">
              <span className="font-serif text-4xl font-medium text-stone-900">
                {pricing.option1.price}
              </span>
              <span className="font-sans text-stone-500">
                {pricing.option1.period}
              </span>
            </div>
            <ul className="mt-6 flex-1 space-y-3">
              {pricing.option1.features.map((feature, i) => (
                <li
                  key={i}
                  className="flex items-center gap-2 font-sans text-stone-600"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-stone-400" />
                  {feature}
                </li>
              ))}
            </ul>
          </motion.article>

          <motion.article
            className="relative flex flex-col rounded-lg border-2 border-sage bg-white p-8 shadow-md"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <div className="absolute -top-3 left-6 bg-sage px-3 py-1 font-sans text-xs font-medium uppercase tracking-wider text-white">
              Most popular
            </div>
            <h3 className="font-serif text-2xl font-medium text-stone-900">
              {pricing.option2.name}
            </h3>
            <div className="mt-4 flex items-baseline gap-1">
              <span className="font-serif text-4xl font-medium text-sage">
                {pricing.option2.price}
              </span>
              <span className="font-sans text-stone-500">
                {pricing.option2.period}
              </span>
            </div>
            <ul className="mt-6 flex-1 space-y-3">
              {pricing.option2.features.map((feature, i) => (
                <li
                  key={i}
                  className="flex items-center gap-2 font-sans text-stone-600"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-sage" />
                  {feature}
                </li>
              ))}
            </ul>
          </motion.article>
        </div>
      </div>
    </section>
  );
}
