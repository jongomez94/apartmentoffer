# Casa Portal de la Montaña — Lifestyle Landing Page

A high-end, visually stunning lifestyle landing page for a private mountain apartment in Los Planes de Renderos, San Salvador. Built with **Next.js (App Router)**, **Tailwind CSS**, and **Framer Motion**, optimized for Vercel deployment.

---

## Quick start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Deploy on Vercel

1. Push this project to GitHub (or connect your repo in Vercel).
2. In [Vercel](https://vercel.com), **Import** the repository.
3. Leave build settings as default: **Framework Preset: Next.js**, **Root Directory: .**
4. Deploy.

Or use the [Vercel CLI](https://vercel.com/docs/cli):

```bash
npm i -g vercel
vercel
```

---

## Editing content

All copy, prices, and links are in **`lib/content.ts`**. Edit that file to change:

- **Hero**: headline, subheadline, CTA text, video URL (when ready)
- **Lifestyle**: story paragraphs and highlight tags
- **Space**: apartment features and intro
- **Daily experience**: morning / midday / evening text
- **Amenities**: list and icons
- **Pricing**: plan names, prices, features
- **Gallery**: image paths and alt text (or keep placeholders)
- **Video**: `videoUrl` and `placeholder` flag
- **Location**: title and description
- **Final CTA**: headline, subheadline, CTA text
- **Site**: `whatsappNumber` and pre-filled WhatsApp message

---

## Adding your media

- **Hero video**: Set `hero.videoSrc` in `lib/content.ts` and uncomment the `<video>` block in `components/HeroSection.tsx` (and remove or keep the background image as fallback).
- **Gallery**: Put images in `public/gallery/` (e.g. `1.jpg`, `2.jpg`) and reference them in `lib/content.ts` as `/gallery/1.jpg`, or keep using the current placeholder URLs.
- **Video section**: Set `videoSection.videoUrl` in `lib/content.ts`. Supports a direct video URL or you can add a YouTube/Vimeo embed in `components/VideoSection.tsx`.

---

## WhatsApp button

Update **`lib/content.ts`**:

- `site.whatsappNumber`: full number with country code, no `+` or spaces (e.g. `50312345678` for El Salvador).
- `site.whatsappMessage`: message pre-filled when the user clicks the button.

---

## Project structure

```
├── app/
│   ├── layout.tsx      # Root layout, fonts, metadata
│   ├── page.tsx        # Home page (all sections)
│   └── globals.css     # Tailwind + custom CSS
├── components/
│   ├── HeroSection.tsx
│   ├── LifestyleStorySection.tsx
│   ├── TheSpaceSection.tsx
│   ├── DailyExperienceSection.tsx
│   ├── AmenitiesSection.tsx
│   ├── PricingSection.tsx
│   ├── GallerySection.tsx
│   ├── VideoSection.tsx
│   ├── LocationSection.tsx
│   ├── FinalCTASection.tsx
│   └── WhatsAppButton.tsx
├── lib/
│   └── content.ts      # All editable content
├── public/             # Static assets (add /gallery/* here)
└── ...
```

---

## Tech stack

- **Next.js 15** (App Router)
- **Tailwind CSS**
- **Framer Motion** (animations, parallax)
- **next/image** for optimized images
- Responsive, smooth scrolling, subtle parallax on hero

---

## License

Private use for Casa Portal de la Montaña.
