
export interface HeroSection {
  title: string;
  subtitle: string;
  banner_image: string;
}

export interface PromoBanner {
  active: boolean;
  text: string;
  discount: number;
}

export interface ContactInfo {
  email: string;
  phone: string;
  address: string;
}

export interface FrontendSetting {
  id: string;
  setting_key: string;
  setting_value: any;
  description?: string;
  updated_by?: string;
  updated_at: string;
}

export type FeaturedCategories = string[];

export interface FrontendSettings {
  hero_section?: HeroSection;
  featured_categories?: FeaturedCategories;
  promo_banner?: PromoBanner;
  contact_info?: ContactInfo;
}
