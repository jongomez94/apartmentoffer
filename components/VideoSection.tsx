"use client";

import { motion } from "framer-motion";
import { useContent } from "@/context/ContentContext";

export default function VideoSection() {
  const { content } = useContent();
  const { videoSection } = content;
  const hasVideo = videoSection.videoUrl && !videoSection.placeholder;

  return (
    <section className="relative overflow-hidden bg-stone-900 py-24 md:py-32 lg:py-40">
      <div className="mx-auto max-w-5xl px-6">
        <motion.h2
          className="mb-12 text-center font-serif text-3xl font-medium text-white md:text-4xl lg:text-5xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {videoSection.title}
        </motion.h2>

        <motion.div
          className="relative aspect-video w-full overflow-hidden rounded-lg bg-stone-950"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {hasVideo ? (
            <video
              key={videoSection.videoUrl}
              src={videoSection.videoUrl}
              controls
              playsInline
              preload="auto"
              className="absolute inset-0 h-full w-full object-contain bg-black"
            >
              Your browser does not support the video tag.
            </video>
          ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 text-stone-500">
              <svg
                className="h-16 w-16 text-stone-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <p className="font-sans text-sm">Video coming soon</p>
              <p className="max-w-sm text-center font-sans text-xs text-stone-600">
                Add your cinematic video URL in <code className="rounded bg-stone-800 px-1 py-0.5">lib/content.ts</code> under <code className="rounded bg-stone-800 px-1 py-0.5">videoSection.videoUrl</code>
              </p>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
