
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
    console.log(`Fetching ${contentType} from Supabase...`);
    
    const { data, error } = await supabase
      .from('cms_content')
      .select('data')
      .eq('content_type', contentType)
      .single();
    
    if (error) {
      console.error(`Error fetching ${contentType}:`, error);
      return null;
    }
    
    console.log(`Successfully fetched ${contentType}:`, data?.data);
    return data?.data as T || null;
  } catch (error) {
    console.error(`Exception fetching ${contentType}:`, error);
    return null;
  }
}

/**
 * Update content in Supabase
 * This function accepts any data type and safely converts it to JSON
 */
export async function updateContent<T>(contentType: ContentType, data: T): Promise<boolean> {
  try {
    console.log(`Preparing to update ${contentType} with data:`, data);
    
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
    
    // Create a clean copy of the data by serializing and deserializing
    // This removes any circular references or non-JSON values
    const jsonSafeData = JSON.parse(JSON.stringify(data)) as Json;
    console.log(`Sanitized data for ${contentType}:`, jsonSafeData);
    
    let result;
    
    if (existingData) {
      // Update existing record
      console.log(`Updating existing ${contentType} record with ID: ${existingData.id}`);
      result = await supabase
        .from('cms_content')
        .update({ 
          data: jsonSafeData,
          updated_at: new Date().toISOString()
        })
        .eq('content_type', contentType);
    } else {
      // Insert new record
      console.log(`Creating new ${contentType} record`);
      result = await supabase
        .from('cms_content')
        .insert({ 
          content_type: contentType, 
          data: jsonSafeData,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        });
    }
    
    if (result.error) {
      console.error(`Error saving ${contentType}:`, result.error);
      console.error('Full data that failed:', jsonSafeData);
      return false;
    }
    
    console.log(`Successfully saved ${contentType}`);
    return true;
  } catch (error) {
    console.error(`Exception updating ${contentType}:`, error);
    console.error('Data that failed:', data);
    return false;
  }
}

/**
 * Initialize content by fetching all content types at once
 * Returns an object with all content types
 */
export async function initializeContent() {
  try {
    console.log('Initializing all CMS content from Supabase');
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
        console.log(`Loaded content type: ${item.content_type}`);
      });
    }
    
    console.log('Initialized content map:', contentMap);
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
      
      console.log(`Uploading file ${file.name} to media storage`);
      
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
      
      console.log(`File uploaded successfully. Public URL: ${publicUrl}`);
      
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
      
      console.log(`Deleting file: ${path}`);
      
      const { error } = await supabase.storage
        .from('media')
        .remove([path]);
      
      if (error) {
        console.error('Error deleting file:', error);
        return false;
      }
      
      console.log('File deleted successfully');
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
      console.log('Listing all files in media storage');
      
      const { data, error } = await supabase.storage
        .from('media')
        .list();
      
      if (error) {
        console.error('Error listing files:', error);
        return [];
      }
      
      const assets: MediaAsset[] = data.map(file => {
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
      
      console.log(`Found ${assets.length} files in storage`);
      return assets;
    } catch (error) {
      console.error('Error listing files:', error);
      return [];
    }
  }
};
