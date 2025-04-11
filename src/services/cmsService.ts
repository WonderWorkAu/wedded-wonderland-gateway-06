
import { supabase } from '@/integrations/supabase/client';
import { MediaAsset } from '@/store/types/mediaTypes';
import { Json } from '@/integrations/supabase/types';

// Define content types for type safety
export type ContentType = 'heroContent' | 'statsContent' | 'benefitsContent' | 'networkContent' | 'testimonials' | 'mediaAssets';

interface CmsContent<T> {
  id: string;
  content_type: ContentType;
  data: T;
  created_at: string;
  updated_at: string;
}

/**
 * Fetch content from Supabase by content type
 */
export async function fetchContent<T>(contentType: ContentType): Promise<T | null> {
  try {
    const { data, error } = await supabase
      .from('cms_content')
      .select('data')
      .eq('content_type', contentType)
      .single();
    
    if (error) {
      console.error(`Error fetching ${contentType}:`, error);
      return null;
    }
    
    return data?.data as T || null;
  } catch (error) {
    console.error(`Error fetching ${contentType}:`, error);
    return null;
  }
}

/**
 * Update content in Supabase
 */
export async function updateContent<T extends Json>(contentType: ContentType, data: T): Promise<boolean> {
  try {
    // First check if the content exists
    const { data: existingData, error: queryError } = await supabase
      .from('cms_content')
      .select('id')
      .eq('content_type', contentType)
      .single();
    
    if (queryError && queryError.code !== 'PGRST116') { // PGRST116 is the code for "no rows returned"
      console.error(`Error checking ${contentType}:`, queryError);
      return false;
    }
    
    if (existingData) {
      // Update existing record
      const { error } = await supabase
        .from('cms_content')
        .update({ data: data as Json })
        .eq('content_type', contentType);
      
      if (error) {
        console.error(`Error updating ${contentType}:`, error);
        return false;
      }
    } else {
      // Insert new record
      const { error } = await supabase
        .from('cms_content')
        .insert({ content_type: contentType, data: data as Json });
      
      if (error) {
        console.error(`Error inserting ${contentType}:`, error);
        return false;
      }
    }
    
    return true;
  } catch (error) {
    console.error(`Error updating ${contentType}:`, error);
    return false;
  }
}

/**
 * Initialize content by fetching all content types at once
 * Returns an object with all content types
 */
export async function initializeContent() {
  try {
    const { data, error } = await supabase
      .from('cms_content')
      .select('content_type, data');
    
    if (error) {
      console.error('Error initializing content:', error);
      return null;
    }
    
    // Transform array of records into an object keyed by content_type
    const contentMap: Record<string, any> = {};
    if (data) {
      data.forEach((item: any) => {
        contentMap[item.content_type] = item.data;
      });
    }
    
    return contentMap;
  } catch (error) {
    console.error('Error initializing content:', error);
    return null;
  }
}

/**
 * Service for handling media assets with Supabase Storage
 */
export const mediaService = {
  /**
   * Upload a file to the media bucket
   */
  async uploadFile(file: File): Promise<{ url: string; name: string; id: string; storagePath: string } | null> {
    try {
      const fileName = `${Date.now()}_${file.name}`;
      const filePath = `${fileName}`;
      
      const { data, error } = await supabase.storage
        .from('media')
        .upload(filePath, file);
      
      if (error) {
        console.error('Error uploading file:', error);
        return null;
      }
      
      // Get the public URL
      const { data: { publicUrl } } = supabase.storage
        .from('media')
        .getPublicUrl(filePath);
      
      return {
        url: publicUrl,
        name: file.name,
        id: `${Date.now()}`,
        storagePath: filePath,
      };
    } catch (error) {
      console.error('Error uploading file:', error);
      return null;
    }
  },
  
  /**
   * Delete a file from the media bucket
   */
  async deleteFile(path: string): Promise<boolean> {
    try {
      if (!path) {
        console.error('No path provided for file deletion');
        return false;
      }
      
      const { error } = await supabase.storage
        .from('media')
        .remove([path]);
      
      if (error) {
        console.error('Error deleting file:', error);
        return false;
      }
      
      return true;
    } catch (error) {
      console.error('Error deleting file:', error);
      return false;
    }
  },
  
  /**
   * List all files in the media bucket
   */
  async listFiles(): Promise<MediaAsset[]> {
    try {
      const { data, error } = await supabase.storage
        .from('media')
        .list();
      
      if (error) {
        console.error('Error listing files:', error);
        return [];
      }
      
      return data.map(file => {
        const { data: { publicUrl } } = supabase.storage
          .from('media')
          .getPublicUrl(file.name);
          
        return {
          id: file.id,
          name: file.name,
          url: publicUrl,
          type: file.metadata?.mimetype?.startsWith('image/') ? 'image' : 'video',
          uploadedAt: file.created_at,
          storagePath: file.name
        };
      });
    } catch (error) {
      console.error('Error listing files:', error);
      return [];
    }
  }
};
