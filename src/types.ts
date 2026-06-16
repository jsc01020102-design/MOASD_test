export interface Service {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  benefits: string[];
  features: string[];
  iconName: string;
  impactScore: number;
  imageUrl?: string;
  titleEn?: string;
  subtitleEn?: string;
  descriptionEn?: string;
  benefitsEn?: string[];
  featuresEn?: string[];
}

export interface Strength {
  id: string;
  title: string;
  badge: string;
  description: string;
  accent: string;
  titleEn?: string;
  descriptionEn?: string;
}

export interface CaseStudy {
  id: string;
  client: string;
  industry: string;
  challenge: string;
  solution: string;
  result: string;
  metrics: { label: string; value: string; labelEn?: string; trend: 'up' | 'down' }[];
  clientEn?: string;
  industryEn?: string;
  challengeEn?: string;
  solutionEn?: string;
  resultEn?: string;
}
