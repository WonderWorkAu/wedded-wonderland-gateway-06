
export interface StatsContent {
  heading?: string;
  brands?: string[];
  stats?: Array<{
    value: string;
    label: string;
    detail: string;
  }>;
  brandLogos?: string[];
}
