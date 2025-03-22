import { useState, useEffect } from 'react';
import { ArrowLeft, ArrowRight, X, ImageIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const OfficeGallerySection = () => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  
  // Minimum swipe distance (in px)
  const minSwipeDistance = 50;

  // Gallery images
  const images = [
    {
      src: '/images/dr-wong-office-1.png',
      alt: 'Dr. Wong Office Interior - Zen Garden',
      description: 'Our tranquil Zen garden provides a calming atmosphere for patients.'
    },
    {
      src: '/images/dr-wong-office-2.png',
      alt: 'Dr. Wong Office Interior - Zen Garden View',
      description: 'Relax and enjoy the peaceful view while waiting for your appointment.'
    },
    {
      src: '/images/dr-wong-office-3.png',
      alt: 'Dr. Wong Office Interior - Courtyard',
      description: 'Our courtyard features natural light and a connection to nature.'
    },
    {
      src: '/images/dr-wong-office-4.png',
      alt: 'Dr. Wong Office Interior - Treatment Room View',
      description: 'Enjoy calming views during your dental procedure.'
    },
    {
      src: '/images/dr-wong-reception.png',
      alt: 'Dr. Wong Office - Reception Area',
      description: 'Our welcoming reception area combines comfort and modern design.'
    },
    {
      src: '/images/dr-wong-waiting-room.png',
      alt: 'Dr. Wong Office - Waiting Room',
      description: 'Comfortable seating and a relaxing atmosphere to ease any dental anxiety.'
    },
    {
      src: '/images/dr-wong-lab-1.png',
      alt: 'Dr. Wong Office - Treatment Room',
      description: 'State-of-the-art equipment in a comfortable, clean environment.'
    },
    {
      src: '/images/dr-wong-lab-2.png',
      alt: 'Dr. Wong Office - Dental Chair',
      description: 'Ergonomic dental chairs with the latest technology for your comfort.'
    },
  ];

  const handleNext = () => {
    if (selectedImage === null) return;
    const nextIndex = (selectedImage + 1) % images.length;
    setSelectedImage(nextIndex);
  };

  const handlePrevious = () => {
    if (selectedImage === null) return;
    const prevIndex = (selectedImage - 1 + images.length) % images.length;
    setSelectedImage(prevIndex);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  // Handle keyboard navigation
  useEffect(() => {
    if (selectedImage === null) return;
    
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowRight':
          handleNext();
          break;
        case 'ArrowLeft':
          handlePrevious();
          break;
        case 'Escape':
          closeModal();
          break;
        default:
          break;
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    
    // Add overflow hidden to body when modal is open
    document.body.style.overflow = 'hidden';
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [selectedImage]);
  
  // Touch event handlers for mobile swipe
  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };
  
  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };
  
  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    
    if (isLeftSwipe) {
      handleNext();
    }
    if (isRightSwipe) {
      handlePrevious();
    }
  };

  return (
    <>
      <section className="py-10 sm:py-16" id="office-gallery">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section header */}
          <motion.div 
            className="text-center mb-8 sm:mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-heading text-[#333333] mb-3">
              Our Office
            </h2>
            <p className="text-[#333333] max-w-3xl mx-auto text-sm sm:text-base">
              Experience our modern, comfortable dental office designed with your relaxation and care in mind.
            </p>
            <div className="w-16 sm:w-24 h-1 bg-primary mx-auto mt-4"></div>
          </motion.div>
          
          {/* Gallery grid - responsive from 1 to 4 columns */}
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, staggerChildren: 0.1 }}
            viewport={{ once: true }}
          >
            {images.map((image, index) => (
              <motion.div 
                key={index} 
                className="group overflow-hidden rounded-lg shadow-md cursor-pointer relative"
                whileHover={{ scale: 1.02 }}
                onClick={() => setSelectedImage(index)}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2, delay: index * 0.05 }}
                viewport={{ once: true, margin: "-50px" }}
              >
                {/* Image container with fixed aspect ratio */}
                <div className="aspect-w-4 aspect-h-3 relative">
                  <img 
                    src={image.src} 
                    alt={image.alt} 
                    className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105"
                    loading={index < 4 ? "eager" : "lazy"}
                  />
                  
                  {/* Hover overlay with info */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3 sm:p-4">
                    <div className="text-white">
                      <h3 className="font-bold text-sm sm:text-base">{image.alt.split(' - ')[1]}</h3>
                      <p className="text-xs sm:text-sm text-white/80 hidden sm:block">{image.description}</p>
                    </div>
                  </div>
                </div>
                
                {/* Small indicator on mobile */}
                <div className="absolute top-2 right-2 bg-black/50 rounded-full p-1 sm:hidden">
                  <ImageIcon className="h-4 w-4 text-white" />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Lightbox Modal - with responsive design for mobile touch */}
      <AnimatePresence>
        {selectedImage !== null && (
          <motion.div 
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-95 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
          >
            {/* Close button - bigger touch target */}
            <button 
              className="absolute top-3 right-3 text-white hover:text-gray-300 z-10 p-2"
              onClick={closeModal}
              aria-label="Close gallery"
            >
              <X className="h-6 w-6 sm:h-8 sm:w-8" />
            </button>
            
            {/* Navigation buttons - hidden on smallest screens (use swipe instead) */}
            <div className="absolute inset-x-0 flex justify-between items-center px-2 sm:px-4">
              <button 
                className="hidden sm:flex text-white hover:text-gray-300 p-2 bg-black/30 hover:bg-black/50 rounded-full"
                onClick={handlePrevious}
                aria-label="Previous image"
              >
                <ArrowLeft className="h-5 w-5 sm:h-6 sm:w-6" />
              </button>
              
              <button 
                className="hidden sm:flex text-white hover:text-gray-300 p-2 bg-black/30 hover:bg-black/50 rounded-full"
                onClick={handleNext}
                aria-label="Next image"
              >
                <ArrowRight className="h-5 w-5 sm:h-6 sm:w-6" />
              </button>
            </div>
            
            {/* Image and caption container */}
            <motion.div 
              className="max-w-5xl max-h-[85vh] overflow-hidden"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <img 
                src={images[selectedImage].src} 
                alt={images[selectedImage].alt} 
                className="max-h-[70vh] max-w-full object-contain mx-auto rounded-md"
              />
              <div className="text-white text-center mt-4 px-2">
                <h3 className="font-bold text-base sm:text-lg mb-1">{images[selectedImage].alt}</h3>
                <p className="text-xs sm:text-sm text-gray-300">{images[selectedImage].description}</p>
              </div>
              
              {/* Mobile instruction */}
              <p className="text-gray-400 text-xs text-center mt-4 sm:hidden">Swipe left or right to navigate</p>
              
              {/* Image counter */}
              <div className="text-gray-400 text-xs sm:text-sm text-center mt-2">
                {selectedImage + 1} / {images.length}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default OfficeGallerySection;