
import React, { useEffect, useRef, useState } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { initializeCMSFromSupabase, refreshCMSFromSupabase } from '@/store/cmsStore';
import { supabase } from '@/integrations/supabase/client';

interface CMSInitializerProps {
  onVersionChange: (version: number) => void;
  onLoadingChange: (loading: boolean) => void;
  onErrorChange: (error: string | null) => void;
}

const CMSInitializer = ({ onVersionChange, onLoadingChange, onErrorChange }: CMSInitializerProps) => {
  const { toast } = useToast();
  const initialLoadDone = useRef(false);
  const dataLoadAttempts = useRef(0);
  
  // Initialize content from Supabase when component mounts
  useEffect(() => {
    const initializeCMS = async () => {
      if (!initialLoadDone.current) {
        console.log("Initializing CMS data - one time operation");
        onLoadingChange(true);
        onErrorChange(null);
        dataLoadAttempts.current += 1;
        
        try {
          // First try to refresh CMS data from Supabase
          let success = await refreshCMSFromSupabase();
          
          if (!success && dataLoadAttempts.current < 3) {
            console.log(`Initialization attempt ${dataLoadAttempts.current} failed, retrying...`);
            // Wait a moment before retrying
            await new Promise(resolve => setTimeout(resolve, 1500));
            success = await refreshCMSFromSupabase();
          }
          
          if (success) {
            console.log("CMS data initialized from Supabase");
            
            toast({
              title: "Content Updated",
              description: "The latest content has been loaded from the CMS",
            });

            // Force a re-render after content is loaded
            onVersionChange(prev => prev + 1);
          } else {
            console.log("Using default content since Supabase initialization failed");
            // Even on failure, we should proceed with default content
            toast({
              title: "Using Default Content",
              description: "Could not load content from the CMS, using default values",
              variant: "default"
            });
            
            // Force a re-render with default content
            onVersionChange(prev => prev + 1);
          }
          
          // Mark initialization as complete even if it failed
          initialLoadDone.current = true;
        } catch (error) {
          console.error("Error initializing CMS data:", error);
          onErrorChange("Failed to load content. Using default content instead.");
          
          toast({
            title: "Error Loading Content",
            description: "There was an issue loading the latest content",
            variant: "destructive"
          });
          
          // Force a re-render with default content
          onVersionChange(prev => prev + 1);
          
          // Mark initialization as complete even if it failed
          initialLoadDone.current = true;
        } finally {
          onLoadingChange(false);
        }
      }
    };
    
    initializeCMS();
  }, [toast, onVersionChange, onLoadingChange, onErrorChange]);
  
  return null;
};

export default CMSInitializer;
