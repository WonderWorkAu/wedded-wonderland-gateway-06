
export interface NetworkCategory {
  title: string;
  description: string;
  icon: string;
  image?: string;
}

export interface NetworkContent {
  title?: string;
  description?: string;
  categories: NetworkCategory[];
  backgroundImage?: string;
}
