
export interface MediaAsset {
  id: string;
  type: 'image' | 'video';
  url: string;
  name: string;
  uploadedAt: string;
  storagePath?: string; // Path in Supabase storage
}
