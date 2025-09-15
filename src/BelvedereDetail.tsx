import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

interface BelvedereDetailProps {
  projectId: string;
}

function BelvedereDetail({ projectId }: BelvedereDetailProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      // Cambia a transparente después de 100px de scroll
      setIsScrolled(scrollPosition > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Imágenes del proyecto Belvedere
  const projectImages = [
    'https://ehhvwmzxcjyupjdonkvl.supabase.co/storage/v1/object/public/projects/BELVEDERE/0003-MSPH3792.JPG',
    'https://ehhvwmzxcjyupjdonkvl.supabase.co/storage/v1/object/public/projects/BELVEDERE/0006-MSPH3797.JPG',
    'https://ehhvwmzxcjyupjdonkvl.supabase.co/storage/v1/object/public/projects/BELVEDERE/0009-MSPH3802.JPG',
    'https://ehhvwmzxcjyupjdonkvl.supabase.co/storage/v1/object/public/projects/BELVEDERE/0015-MSPH3815.JPG',
    'https://ehhvwmzxcjyupjdonkvl.supabase.co/storage/v1/object/public/projects/BELVEDERE/0022-MSPH3829.JPG',
    'https://ehhvwmzxcjyupjdonkvl.supabase.co/storage/v1/object/public/projects/BELVEDERE/0024-MSPH3834.JPG',
    'https://ehhvwmzxcjyupjdonkvl.supabase.co/storage/v1/object/public/projects/BELVEDERE/0036-MSPH3857.JPG',
    'https://ehhvwmzxcjyupjdonkvl.supabase.co/storage/v1/object/public/projects/BELVEDERE/0040-MSPH3864.JPG',
    'https://ehhvwmzxcjyupjdonkvl.supabase.co/storage/v1/object/public/projects/BELVEDERE/0056-MSPH3894.JPG',
    'https://ehhvwmzxcjyupjdonkvl.supabase.co/storage/v1/object/public/projects/BELVEDERE/0068-MSPH3920.JPG',
    'https://ehhvwmzxcjyupjdonkvl.supabase.co/storage/v1/object/public/projects/BELVEDERE/0080-MSPH3956.JPG'
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        isScrolled 
          ? 'bg-transparent' 
          : 'bg-white/95 backdrop-blur-sm border-b border-gray-100'
      }`}>
        <div className="w-full px-16 py-6">
          <div className="flex justify-between items-center">
            <Link to="/" className={`text-sm font-dm-sans font-medium tracking-widest uppercase transition-all duration-500 ${
              isScrolled 
                ? 'text-white/90 hover:text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]' 
                : 'text-black hover:opacity-50'
            }`}>
              ← VOLVER
            </Link>
            <div className="h-8">
              <svg className="h-full w-auto" viewBox="0 0 296.87 36.17" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <style>
                    {`.cls-1 { fill: #212423; }`}
                  </style>
                </defs>
                <g>
                  <path className="cls-1" d="M2.51,29.1h1.06l2.11,5.58h-.97l-.55-1.44H1.91l-.55,1.44H.38l2.13-5.58ZM4,32.52l-.97-2.56-.97,2.56h1.94ZM7.26,29.1h2.56c.61,0,1.06.16,1.35.47.29.31.44.75.44,1.32,0,.4-.1.74-.3,1.01-.2.27-.48.47-.84.58.1.07.18.15.23.23.06.08.12.2.18.36l.7,1.62h-.97l-.68-1.56c-.07-.16-.15-.26-.24-.33s-.24-.09-.44-.09h-1.05v1.98h-.94v-5.58ZM9.57,31.94c.73,0,1.1-.35,1.1-1.06s-.34-1.05-1.01-1.05h-1.46v2.11h1.37ZM15.06,34.74c-.73-.08-1.27-.35-1.63-.81s-.54-1.13-.54-2.02c0-1.01.22-1.74.65-2.2.43-.46,1.1-.69,1.99-.69s1.56.23,1.99.69.65,1.2.65,2.2c0,.91-.19,1.59-.56,2.05-.38.46-.95.72-1.72.79,0,.27.06.45.15.55.09.1.26.15.49.15.21,0,.41-.03.62-.09v.7c-.1.03-.22.05-.37.07-.15.02-.3.03-.44.03-.84,0-1.26-.48-1.28-1.43ZM16.83,33.49c.27-.32.41-.85.41-1.58s-.13-1.29-.4-1.61c-.27-.32-.7-.48-1.29-.48s-1.02.16-1.29.48c-.27.32-.4.86-.4,1.61s.14,1.25.41,1.57.7.49,1.28.49,1.02-.16,1.29-.49ZM20.35,34.22c-.42-.37-.63-.9-.63-1.6v-3.51h.95v3.47c0,.46.13.81.38,1.04s.62.35,1.1.35.84-.12,1.09-.35c.25-.23.38-.58.38-1.04v-3.47h.94v3.51c0,.7-.21,1.23-.63,1.6-.42.37-1.01.55-1.78.55s-1.37-.19-1.79-.55ZM26.25,29.1h.95v5.58h-.95v-5.58ZM30.38,29.84h-1.79v-.74h4.51v.74h-1.78v4.84h-.94v-4.84ZM34.5,29.1h3.89v.74h-2.95v1.69h2.62v.73h-2.62v1.7h2.95v.73h-3.89v-5.58ZM39.99,34.03c-.48-.49-.72-1.18-.72-2.05,0-.94.23-1.67.69-2.19.46-.52,1.16-.78,2.09-.78.58,0,1.13.09,1.64.27v.82c-.49-.19-1.01-.29-1.57-.29-.68,0-1.16.18-1.46.54-.29.36-.44.9-.44,1.62,0,.66.16,1.16.47,1.49s.8.5,1.44.5c.57,0,1.09-.09,1.56-.27v.83c-.5.16-1.04.23-1.64.23-.9,0-1.59-.25-2.07-.74ZM46.5,29.84h-1.79v-.74h4.51v.74h-1.78v4.84h-.94v-4.84ZM51.21,34.22c-.42-.37-.63-.9-.63-1.6v-3.51h.95v3.47c0,.46.13.81.38,1.04s.62.35,1.1.35.84-.12,1.09-.35c.25-.23.38-.58.38-1.04v-3.47h.94v3.51c0,.7-.21,1.23-.63,1.6-.42.37-1.01.55-1.78.55s-1.37-.19-1.79-.55ZM57.11,29.1h2.57c.61,0,1.06.16,1.35.47.29.31.44.75.44,1.32,0,.4-.1.74-.3,1.01s-.48.47-.85.58c.1.07.18.15.23.23.06.08.12.2.18.36l.7,1.62h-.97l-.69-1.56c-.07-.16-.15-.26-.24-.33-.09-.06-.24-.09-.44-.09h-1.05v1.98h-.95v-5.58ZM59.43,31.94c.73,0,1.1-.35,1.1-1.06s-.34-1.05-1.01-1.05h-1.46v2.11h1.37ZM64.63,29.1h1.06l2.12,5.58h-.97l-.55-1.44h-2.24l-.55,1.44h-.98l2.13-5.58ZM66.12,32.52l-.97-2.56-.97,2.56h1.94ZM256.75,32.61l-2-3.51h.98l1.49,2.71,1.49-2.71h.98l-2,3.51v2.07h-.94v-2.07ZM265.12,29.1h2.26c.84,0,1.45.22,1.85.67.39.44.59,1.16.59,2.16s-.2,1.65-.59,2.09c-.39.44-1.01.66-1.85.66h-2.26v-5.58ZM267.23,33.96c.39,0,.7-.06.93-.17.23-.11.41-.32.53-.61.12-.29.18-.71.18-1.25s-.05-.96-.16-1.26c-.11-.3-.28-.51-.52-.64-.23-.12-.55-.19-.96-.19h-1.17v4.12h1.17ZM271.39,29.1h.94v5.58h-.94v-5.58ZM274.02,34.49v-.83c.54.21,1.09.31,1.65.31.47,0,.81-.05,1.02-.16.21-.11.32-.32.32-.62,0-.19-.04-.34-.13-.46s-.24-.21-.44-.29-.51-.17-.91-.28c-.6-.16-1.02-.35-1.26-.59s-.36-.57-.36-.99c0-.5.18-.88.55-1.16.36-.27.9-.41,1.59-.41.31,0,.6.02.89.06.29.04.52.1.7.16v.83c-.44-.17-.92-.25-1.46-.25-.44,0-.77.06-.99.17-.22.12-.33.31-.33.59,0,.17.04.3.12.4.08.1.21.19.4.27.19.08.47.16.84.25.65.17,1.11.38,1.36.65s.38.61.38,1.03c0,.5-.19.88-.56,1.16-.37.28-.92.42-1.64.42s-1.3-.09-1.74-.28ZM279.53,29.1h3.89v.74h-2.95v1.69h2.62v.73h-2.62v1.7h2.95v.73h-3.89v-5.58ZM284.95,29.1h.83l2.91,4.11v-4.11h.94v5.58h-.83l-2.9-4.1v4.1h-.95v-5.58ZM287.7,28.55c-.1-.03-.23-.08-.41-.14-.14-.05-.26-.09-.34-.12s-.17-.04-.26-.04c-.32,0-.57.1-.75.31v-.69c.08-.08.18-.14.32-.19s.28-.07.42-.07c.12,0,.22.01.33.04.1.03.22.07.37.13.13.05.25.09.34.12.09.03.19.04.29.04.3,0,.53-.11.69-.32v.69c-.06.08-.15.15-.27.2-.12.05-.26.07-.41.07-.11,0-.21-.01-.31-.04ZM291.86,34.07c-.44-.46-.65-1.19-.65-2.16s.22-1.74.65-2.2c.43-.46,1.1-.69,1.99-.69s1.56.23,1.99.69.65,1.2.65,2.2-.22,1.7-.65,2.16c-.44.47-1.1.7-1.99.7s-1.55-.23-1.99-.7ZM295.14,33.49c.27-.32.41-.85.41-1.58s-.13-1.29-.4-1.61c-.27-.32-.7-.48-1.29-.48s-1.02.16-1.29.48c-.27.32-.4.86-.4,1.61s.14,1.25.41,1.57.7.49,1.28.49,1.02-.16,1.29-.49ZM18.86.01c-.1,0-.2.05-.26.13l-6.74,9.24c-.5.69-1.9.69-2.41,0L2.78.28,2.62.01H.32C.15.01,0,.16,0,.34v18.87c0,.18.15.32.32.32h2.2c.18,0,.32-.15.32-.32v-10.12c0-.52.26-.84.79-.96.54-.13.94.03,1.2.47l5.13,6.56c.32.53,1.08.53,1.4,0l5.14-6.56c.26-.44.65-.6,1.18-.47.53.13.79.45.79.96v10.12c0,.18.15.32.32.32h2.2c.18,0,.32-.15.32-.32V.34c0-.18-.15-.32-.32-.32h-2.16ZM41.61.01h-2.69c-.13,0-.26.08-.33.2l-11.53,18.87c-.13.21-.02.45.22.45h2.36c.13,0,.26-.08.33-.2l1.91-3.14c.25-.41.62-.62,1.1-.62h8.76c.48,0,.78.21.87.62l.75,3.14c.03.12.13.2.26.2h2.34c.23,0,.43-.24.38-.45L41.87.21c-.03-.12-.13-.2-.26-.2ZM41.22,12.45c-.27.29-.59.44-.96.44h-4.77c-.38,0-.65-.15-.8-.44-.16-.3-.14-.61.07-.94l3.43-5.6c.25-.42.61-.64,1.09-.64s.77.22.88.64l1.35,5.6c.09.33,0,.64-.28.94ZM65.08,13.54c-.13-.16-.07-.39.11-.49,1.3-.66,2.32-1.63,3.07-2.93.15-.25.28-.52.39-.77.16-.34.29-.71.39-1.09.03-.1.05-.22.08-.33.09-.4.13-.81.13-1.24,0-3.21-2.45-5.88-5.73-6.5-.16-.03-.32-.06-.5-.07-.23-.02-.45-.05-.67-.06-.01-.01-.02-.01-.04,0-.12,0-.24,0-.36-.01h-7.33c-.18,0-.32.15-.32.32v18.86c0,.18.15.32.32.32h2.04c.18,0,.32-.15.32-.32v-4.37c0-.28.1-.52.29-.71.19-.19.43-.29.71-.29h3.51c.1,0,.19.04.25.12l4.37,5.45c.06.08.15.12.25.12h2.94c.27,0,.42-.32.25-.53l-4.49-5.49ZM62.07,2.72s.04-.01.06,0c.04-.01.08-.01.12-.01,2.29,0,4.14,1.9,4.14,4.24s-1.85,4.24-4.14,4.24c-.05,0-.11,0-.16-.01-.01.01-.02,0-.02,0-.15.01-.3.02-.46.02h-3.61c-.28,0-.52-.1-.71-.31-.19-.19-.29-.44-.29-.71V3.72c0-.28.1-.52.29-.72.19-.19.43-.3.71-.3h3.63c.15,0,.3,0,.44.01ZM77.59.34v18.81c0,.18.15.32.32.32h2.2c.18,0,.32-.15.32-.32V.34c0-.18-.15-.32-.32-.32h-2.2c-.18,0-.32.15-.32.32ZM101.8.01h-2.69c-.13,0-.26.08-.33.2l-11.53,18.87c-.13.21-.02.45.22.45h2.36c.13,0,.26-.08.33-.2l1.93-3.14c.25-.41.6-.62,1.09-.62h8.77c.47,0,.77.21.86.62l.75,3.14c.03.12.13.2.26.2h2.34c.23,0,.43-.24.38-.45L102.07.21c-.03-.12-.13-.2-.26-.2ZM101.42,12.45c-.27.29-.59.44-.97.44h-4.77c-.38,0-.64-.15-.8-.44-.15-.3-.13-.61.08-.94l3.42-5.6c.25-.42.62-.64,1.1-.64s.76.22.88.64l1.34,5.6c.09.33,0,.64-.27.94ZM128.96.01c-.18,0-.32.15-.32.32v12.04c0,.46-.23.78-.66.93-.44.16-.81.06-1.11-.29L115.85.13c-.06-.07-.15-.11-.25-.11h-1.93c-.18,0-.32.15-.32.32v18.87c0,.18.15.32.32.32h2.03c.18,0-.32-.15.32-.32V7.16c0-.46.22-.77.66-.93.43-.16.81-.06,1.1.29l11.04,12.89c.06.07.15.11.25.11h1.92c.18,0,.32-.15.32-.32V.34c0-.18-.15-.32-.32-.32h-2.03ZM151.55.01h-2.69c-.13,0-.26.08-.33.2l-11.53,18.87c-.13.21-.02.45.22.45h2.36c.13,0-.26-.08.33-.2l1.93-3.14c.25-.41.6-.62,1.09-.62h8.77c.48,0-.76.21.86.62l.75,3.14c.03.12.13.2.26.2h2.36c.23,0-.43-.24.38-.45L151.82.21c-.03-.12-.13-.2-.26-.2ZM151.18,12.45c-.27.29-.59.44-.97.44h-4.77c-.37,0-.64-.15-.8-.44-.15-.3-.13-.61.08-.94l3.43-5.6c.25-.42.61-.64,1.09-.64s.77.22.88.64l1.35,5.6c.08.33-.01.64-.28.94ZM171.6.34v2.04c0,.18.15.32.32.32h5.06c.3,0,.55.1.76.3s.31.42.31.7v15.5c0,.18.15.32.32.32h2.2c.18,0,.32-.15.32-.32V3.7c0-.28.1-.5.31-.7s.46-.3.74-.3h5.05c.18,0,.32-.15.32-.32V.34c0-.18-.15-.32-.32-.32h-15.09c-.18,0-.32.15-.32.32ZM198.26,2.98c.24-.19.51-.29.81-.29h7.88c.18,0,.35-.15.38-.32l.37-2.04c.03-.18-.09-.32-.27-.32h-11.47c-.18,0-.35.15-.38.32l-3.41,18.88c-.03.18.09.32.27.32h11.47c.18,0,.35-.15.38-.32l.37-2.04c.03-.18-.09-.32-.27-.32h-7.88c-.3,0-.53-.09-.7-.29-.17-.19-.23-.44-.18-.71l.67-3.7c.05-.28.2-.52.44-.71.24-.19.51-.29.81-.29h7.84c.18,0,.35-.15.38-.32l.37-2.04c.03-.18-.09-.32-.27-.32h-7.84c-.3,0-.53-.1-.7-.3-.17-.19-.23-.42-.18-.7l.68-3.77c.05-.28.19-.5.44-.7ZM223.2.01c-.18,0-.32.15-.32.32v12.45c0,.41-.1.85-.29,1.3-.19.44-.49.87-.87,1.3-.76.85-2.08,1.32-3.19,1.41-1.36.11-3.02-.3-3.93-1.38-.48-.57-1-1.42-1.12-2.18-.05-.23-.07-.37-.07-.45v-.5h-2.83v.5c0,.4.06.86.18,1.36.11.5.36,1.09.71,1.73.37.64.81,1.23,1.34,1.74,1.23,1.2,3.2,1.85,4.9,1.85,1.41,0,2.65-.19,3.72-.57,1.07-.39,1.9-.91,2.51-1.57.61-.65,1.05-1.36,1.35-2.12.29-.76.44-1.57.44-2.42V.34c0-.18-.15-.32-.32-.32h-2.2ZM245.24.01h-2.69c-.13,0-.26.08-.33.2l-11.53,18.87c-.13.21-.02.45.22.45h2.36c.13,0-.26-.08.33-.2l1.91-3.14c.26-.41.62-.62,1.1-.62h8.77c.47,0,.77.21.86.62l.75,3.14c.03.12.13.2.26.2h2.34c.23,0-.43-.24.38-.45L245.51.21c-.03-.12-.13-.2-.26-.2ZM244.87,12.45c-.28.29-.59.44-.97.44h-4.77c-.38,0-.64-.15-.8-.44-.15-.3-.13-.61.07-.94l3.43-5.6c.25-.42.62-.64,1.1-.64s.76.22.88.64l1.34,5.6c.09.33,0,.64-.27.94ZM271.78,2.87c-2.02-1.9-4.45-2.85-7.3-2.85h-6.27c-.18,0-.32.15-.32.32v18.84c0,.18.15.33.33.32l6.26-.02c1.88,0,3.61-.44,5.19-1.31,1.58-.87,2.83-2.05,3.76-3.54.92-1.49,1.38-3.13,1.38-4.89,0-2.68-1.01-4.97-3.03-6.88ZM271.95,10.44c-.17,1.78-1.01,3.29-2.5,4.53-1.49,1.23-3.23,1.85-5.21,1.85h-2.44c-.29,0-.54-.09-.74-.29-.21-.19-.31-.44-.31-.71V3.68c0-.28.1-.5.31-.7.21-.19.46-.29.74-.29h3.4s.04,0,.06,0c1.96.26,3.55,1.04,4.77,2.3,1.49,1.55,2.13,3.36,1.94,5.44ZM292.12.01h-2.69c-.13,0-.26.08-.33.2l-11.54,18.87c-.13.21-.02.45.22.45h2.38c.13,0-.26-.08.33-.2l1.91-3.14c.25-.41.62-.62,1.1-.62h8.76c.48,0-.76.21.87.62l.75,3.14c.03.12.13.2.26.20h2.34c.23,0-.43-.24.38-.45L292.38.21c-.03-.12-.13-.2-.26-.2ZM291.73,12.45c-.27.29-.59.44-.96.44h-4.78c-.37,0-.64-.15-.79-.44-.16-.3-.14-.61.07-.94l3.43-5.6c.25-.42.61-.64,1.09-.64s.77.22.88.64l1.35,5.6c.09.33-.01.64-.28.94Z"/>
                </g>
              </svg>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="pt-24">
        <div className="max-w-full">
          <div className="flex flex-col lg:flex-row">
            {/* Gallery Section */}
            <div className="lg:w-2/3 p-4 lg:p-8">
              {/* Main Image */}
              <div className="mb-6 relative overflow-hidden">
                <img 
                  src={projectImages[selectedImage]} 
                  alt={`Belvedere - Vista ${selectedImage + 1}`}
                  className="w-full h-[70vh] object-contain transition-all duration-700 ease-out"
                  style={{
                    transform: 'perspective(1000px) rotateY(0deg) scale(1)',
                  }}
                />
              </div>

              {/* Thumbnails */}
              <div className="grid grid-cols-4 md:grid-cols-6 gap-2">
                {projectImages.map((image, index) => (
                  <div
                    key={index}
                    onMouseEnter={() => setSelectedImage(index)}
                    className={`relative overflow-hidden aspect-square cursor-pointer group ${
                      selectedImage === index ? 'ring-2 ring-black' : ''
                    }`}
                    style={{
                      transform: selectedImage === index ? 'scale(1.05)' : 'scale(1)',
                      transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                    }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />
                    <img 
                      src={image} 
                      alt={`Miniatura ${index + 1}`}
                      className="w-full h-full object-cover transition-all duration-500 ease-out"
                      style={{
                        transform: selectedImage === index 
                          ? 'perspective(500px) rotateY(-5deg) scale(1.1)' 
                          : 'perspective(500px) rotateY(0deg) scale(1)',
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Info Section */}
            <div className="lg:w-1/3 p-4 lg:p-8 bg-gray-50">
              <div className="sticky top-32">
                <h1 className="text-3xl md:text-4xl font-dm-sans font-light tracking-wide text-black mb-4">
                  Belvedere
                </h1>
                
                <div className="mb-8">
                  <p className="text-sm font-dm-sans text-gray-600 mb-2">
                    RESTAURANTE • MEDELLÍN • 2024
                  </p>
                  <div className="w-16 h-px bg-black"></div>
                </div>

                <div className="space-y-6 text-sm md:text-base font-dm-sans text-gray-700 leading-relaxed">
                  <p>
                    Belvedere es un restaurante familiar que reinterpreta la tradición a través de una arquitectura contemporánea. El diseño del espacio celebra la herencia y la descendencia familiar, creando un ambiente acogedor que invita a reunirse y compartir momentos memorables.
                  </p>
                  
                  <p>
                    La arquitectura del restaurante se distingue por su elegante fusión entre elementos clásicos y modernos. Los espacios fluyen naturalmente, creando diferentes ambientes que van desde áreas íntimas para encuentros familiares hasta espacios más amplios para celebraciones. Cada detalle arquitectónico ha sido pensado para honrar la tradición mientras abraza la innovación.
                  </p>
                </div>

                <div className="mt-8 pt-8 border-t border-gray-300">
                  <h3 className="text-sm font-dm-sans font-medium tracking-widest uppercase mb-4">
                    Ficha Técnica
                  </h3>
                  <dl className="space-y-2 text-sm font-dm-sans">
                    <div className="flex justify-between">
                      <dt className="text-gray-600">Área:</dt>
                      <dd className="text-black">380 m²</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-gray-600">Año:</dt>
                      <dd className="text-black">2024</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-gray-600">Ubicación:</dt>
                      <dd className="text-black">Medellín, Colombia</dd>
                    </div>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default BelvedereDetail;