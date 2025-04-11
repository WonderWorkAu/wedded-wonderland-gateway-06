
export interface Benefit {
  title: string;
  description: string;
  highlight: string;
  icon: string;
  image?: string;
}

export interface BenefitsContent {
  title?: string;
  subtitle?: string;
  cta?: string;
  benefits: Benefit[];
  backgroundImage?: string;
}
