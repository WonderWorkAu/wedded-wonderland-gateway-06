
import React, { useState, useRef } from 'react';
import { useCMSStore, refreshCMSFromSupabase } from '@/store/cmsStore';
import { useStylingStore } from '@/store/stylingStore';
import LoadingScreen from '@/components/LoadingScreen';
import ErrorScreen from '@/components/ErrorScreen';
import MainContent from '@/components/MainContent';
import CMSInitializer from '@/components/CMSInitializer';
import RealtimeUpdates from '@/components/RealtimeUpdates';
import CustomCSSManager from '@/components/CustomCSSManager';

const Index = () => {
  // Get styling store
  const stylingStore = useStylingStore();
  
  // State
  const [version, setVersion] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const initialLoadDone = useRef(false);
  
  // Handler for manual retry
  const handleRetry = async () => {
    initialLoadDone.current = false;
    await refreshCMSFromSupabase();
    setError(null);
  };

  // Use a key based on version to force full re-render when data changes
  return (
    <div 
      key={`page-container-${version}`}
      className="min-h-screen" 
      style={{ fontFamily: stylingStore.globalStyles.fontFamily }}
      data-cms-version={version}
    >
      {/* CMS Initializer */}
      <CMSInitializer 
        onVersionChange={setVersion} 
        onLoadingChange={setLoading} 
        onErrorChange={setError} 
      />
      
      {/* Real-time updates */}
      <RealtimeUpdates 
        onVersionChange={setVersion} 
        initialLoadDone={initialLoadDone.current} 
      />
      
      {/* Custom CSS Manager */}
      <CustomCSSManager customCSS={stylingStore.globalStyles.customCSS} />
      
      {loading ? (
        <LoadingScreen />
      ) : error ? (
        <ErrorScreen error={error} onRetry={handleRetry} />
      ) : (
        <MainContent />
      )}
    </div>
  );
};

export default Index;
