import { useEffect, useRef } from 'react';

interface TypeFormEmbedProps {
  formId: string;
  className?: string;
  style?: React.CSSProperties;
}

const TypeFormEmbed = ({ formId, className, style }: TypeFormEmbedProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Load the Typeform embed script
    const script = document.createElement('script');
    script.src = '//embed.typeform.com/next/embed.js';
    script.async = true;
    document.body.appendChild(script);

    // Clean up function to remove the script when component unmounts
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      data-tf-live={formId}
      className={className}
      style={style}
    ></div>
  );
};

export default TypeFormEmbed;