'use client'
import { useRef, useEffect } from 'react';

export default function InfoPage() {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    if (iframeRef.current) {
      iframeRef.current.src = "https://www.youtube.com/embed/WCAFgCcPOI4?autoplay=1&mute=0";
    }
  }, []);

  return (
    <div className="flex gap-4 p-8">
      <div className="w-full max-w-2xl">
        <iframe
          ref={iframeRef}
          width="100%"
          height="400"
          src="https://www.youtube.com/embed/WCAFgCcPOI4?autoplay=1&mute=0"
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; autoplay"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
}

/*
export default function InfoPage() {
  return (
    <div className="flex gap-4 p-8">
     
    </div>
  );
}
*/