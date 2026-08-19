export interface Testimonial {
  /** Uppercase avatar initials, e.g. "CP". */
  initials: string;
  name: string;
  quote: string;
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
