import { useState } from 'react';
import { ArrowLeft, ArrowRight, X } from 'lucide-react';

const OfficeGallerySection = () => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const images = [
    {
      src: '/images/dr-wong-office-1.png',
      alt: 'Dr. Wong Office Interior - Zen Garden',
    },
    {
      src: '/images/dr-wong-office-2.png',
      alt: 'Dr. Wong Office Interior - Zen Garden View',
    },
    {
      src: '/images/dr-wong-office-3.png',
      alt: 'Dr. Wong Office Interior - Courtyard',
    },
    {
      src: '/images/dr-wong-office-4.png',
      alt: 'Dr. Wong Office Interior - Treatment Room View',
    },
    {
      src: '/images/dr-wong-reception.png',
      alt: 'Dr. Wong Office - Reception Area',
    },
    {
      src: '/images/dr-wong-waiting-room.png',
      alt: 'Dr. Wong Office - Waiting Room',
    },
    {
      src: '/images/dr-wong-lab-1.png',
      alt: 'Dr. Wong Office - Treatment Room',
    },
    {
      src: '/images/dr-wong-lab-2.png',
      alt: 'Dr. Wong Office - Dental Chair',
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

  return (
    <>
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold font-heading text-[#333333] mb-4">Our Office</h2>
            <p className="text-[#333333] max-w-3xl mx-auto">
              Experience our modern, comfortable dental office designed with your relaxation and care in mind.
            </p>
            <div className="w-24 h-1 bg-primary mx-auto mt-4"></div>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {images.map((image, index) => (
              <div 
                key={index} 
                className="overflow-hidden rounded-lg shadow-md cursor-pointer transition-transform hover:scale-105"
                onClick={() => setSelectedImage(index)}
              >
                <img 
                  src={image.src} 
                  alt={image.alt} 
                  className="w-full h-64 object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {selectedImage !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90 p-4">
          <button 
            className="absolute top-4 right-4 text-white hover:text-gray-300"
            onClick={closeModal}
          >
            <X className="h-8 w-8" />
          </button>
          
          <button 
            className="absolute left-4 text-white hover:text-gray-300"
            onClick={handlePrevious}
          >
            <ArrowLeft className="h-8 w-8" />
          </button>
          
          <button 
            className="absolute right-4 text-white hover:text-gray-300"
            onClick={handleNext}
          >
            <ArrowRight className="h-8 w-8" />
          </button>
          
          <div className="max-w-4xl max-h-[80vh] overflow-hidden">
            <img 
              src={images[selectedImage].src} 
              alt={images[selectedImage].alt} 
              className="max-h-[80vh] max-w-full object-contain"
            />
            <p className="text-white text-center mt-4">{images[selectedImage].alt}</p>
          </div>
        </div>
      )}
    </>
  );
};

export default OfficeGallerySection;