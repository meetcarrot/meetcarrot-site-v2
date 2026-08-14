/** Colour pairing a testimonial card is rendered with, as Tailwind class fragments. */
export type TestimonialTheme =
  | "bg-gray-400 text-white"
  | "bg-orange text-white"
  | "bg-pink text-white"
  | "bg-white text-gray-400";

export interface Testimonial {
  /** Uppercase avatar initials, e.g. "CP". */
  initials: string;
  name: string;
  quote: string;
  theme: TestimonialTheme;
}

export interface Faq {
  id: string;
  question: string;
  slug: string;
  /** Trusted, pre-sanitised HTML string from the source CMS. */
  answer: string;
}

export interface ProductLink {
  title: string;
  description: string;
  href: string;
  /** Path to the Lottie JSON under `public/lottie`. */
  lottie: string;
  lottieDark: string;
}

export interface FooterLink {
  label: string;
  href: string;
}
