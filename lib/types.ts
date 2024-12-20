
export interface TrendItem {
  month: string; // "YYYY-MM" format
  mechanism_slug: string;
  mechanism_name: string;
  value: number; // usd
}

export type Mechanism = {
  id: number;
  title: string;
  description: string;
  slug: string;
  background_img: string;
  background_color: string;
};

export type Course = {
  id: number;
  title: string;
  description: string;
  slug: string;
  background_img: string;
  background_color: string;
  starts_at?: string;
  register_url: string;
};

export enum EXPERT_IN {
  ALLO_MECHANISMS = "allo_mechanisms",
  ALLO_DEV = "allo_dev",
}

export type Expert = {
  id: number;
  name: string;
  slug: string;
  description: string;
  expert_in: EXPERT_IN;
  contact_info_telegram: string;
  contact_info_twitter: string;
  contact_info_email: string;
  created_at: string;
  updated_at: string;
  avatar: string;
};

export type Build = {
  id: number;
  title: string;
  description: string;
  slug: string;
  background_img: string;
  background_color: string;
  type: string;
  status: string;
  metadata: Record<string, unknown>;
};
