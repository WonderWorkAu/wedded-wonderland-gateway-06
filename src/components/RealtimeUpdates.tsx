
import React, { useEffect } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { refreshCMSFromSupabase } from '@/store/cmsStore';

interface RealtimeUpdatesProps {
  onVersionChange: (updateFn: (prev: number) => number) => void;
  initialLoadDone: boolean;
}

const RealtimeUpdates = ({ onVersionChange, initialLoadDone }: RealtimeUpdatesProps) => {
  const { toast } = useToast();

  // Set up listener for Supabase realtime updates to refresh content
  useEffect(() => {
    // Listen for updates to the cms_content table
    const channel = supabase
      .channel('cms_changes')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'cms_content' },
        async (payload) => {
          console.log('CMS content changed:', payload);
          
          // Only refresh if initial load is complete
          if (initialLoadDone) {
            toast({
              title: "Content Change Detected",
              description: "Refreshing content from the CMS...",
              variant: "default"
            });
            
            // Refresh CMS data when changes occur
            const success = await refreshCMSFromSupabase();
            
            if (success) {
              onVersionChange(v => v + 1);
              toast({
                title: "Content Updated",
                description: "The content has been refreshed from the CMS",
                variant: "default"
              });
            } else {
              toast({
                title: "Refresh Failed",
                description: "Could not refresh content from the CMS",
                variant: "destructive"
              });
            }
          }
        }
      )
      .subscribe((status) => {
        console.log("Realtime subscription status:", status);
      });

    // Clean up subscription on unmount
    return () => {
      console.log("Cleaning up Supabase realtime channel");
      supabase.removeChannel(channel);
    };
  }, [toast, onVersionChange, initialLoadDone]);
  
  return null;
};

export default RealtimeUpdates;
