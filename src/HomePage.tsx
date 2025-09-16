import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const autoPlayRef = useRef(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVideoInView, setIsVideoInView] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  // Smooth scroll to section
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Projects data
  const projects = [
    {
      id: 'belvedere',
      title: 'Belvedere',
      subtitle: 'Restaurante • Medellín',
      image: 'https://ehhvwmzxcjyupjdonkvl.supabase.co/storage/v1/object/public/projects/BELVEDERE/0015-MSPH3815.JPG',
      link: '/proyecto/belvedere'
    },
    {
      id: 'healing-forest',
      title: 'Healing Forest',
      subtitle: 'Wellness • Envigado',
      image: 'https://ehhvwmzxcjyupjdonkvl.supabase.co/storage/v1/object/public/projects/HEALING%20FOREST/037-MSPH8826.jpg',
      link: '/proyecto/healing-forest'
    },
    {
      id: 'oficina-bio26',
      title: 'Oficina BIO26 (en construcción)',
      subtitle: 'Comercial • Medellín',
      image: 'https://ehhvwmzxcjyupjdonkvl.supabase.co/storage/v1/object/public/projects/049-MSPH8638.jpg',
      link: '/proyecto/oficina-bio26'
    },
    {
      id: 'hotel-dos7',
      title: 'Hotel DOS7 (en construcción)',
      subtitle: 'Hotel • Envigado',
      image: 'https://ehhvwmzxcjyupjdonkvl.supabase.co/storage/v1/object/public/projects/HOTEL%20DOS7/Fachada%201%20Noche.png',
      link: '/proyecto/hotel-dos7'
    },
    {
      id: 'casa-alterra',
      title: 'Casa Alterra (en construcción)',
      subtitle: 'Residencial • Alto de las Palmas',
      image: 'https://ehhvwmzxcjyupjdonkvl.supabase.co/storage/v1/object/public/projects/CASA%20ALTERRA/WhatsApp%20Image%202025-09-15%20at%2017.56.05.jpeg',
      link: '/proyecto/casa-alterra'
    }
  ];

  const totalProjects = projects.length;

  // Auto-play functionality - moves slowly through all projects in a circle
  useEffect(() => {
    if (isAutoPlaying) {
      autoPlayRef.current = setInterval(() => {
        setCurrentSlide(prev => {
          // Always move forward
          return prev + 1;
        });
      }, 4000); // Change slide every 4 seconds for slow, smooth movement
    } else {
      clearInterval(autoPlayRef.current);
    }

    return () => clearInterval(autoPlayRef.current);
  }, [isAutoPlaying]);

  // Reset slide position when reaching the end of the duplicate set
  useEffect(() => {
    if (currentSlide >= totalProjects) {
      // Use a timeout to reset after the transition completes
      const resetTimeout = setTimeout(() => {
        // Temporarily disable transition
        const carousel = document.getElementById('project-carousel');
        if (carousel) {
          carousel.style.transition = 'none';
          setCurrentSlide(0);
          // Re-enable transition after a brief delay
          setTimeout(() => {
            carousel.style.transition = 'transform 1000ms ease-out';
          }, 50);
        }
      }, 1000); // Wait for transition to complete

      return () => clearTimeout(resetTimeout);
    }
  }, [currentSlide, totalProjects]);

  // Pause auto-play on manual interaction
  const handleManualNavigation = (newSlide) => {
    setIsAutoPlaying(false);
    setCurrentSlide(newSlide % totalProjects);
    
    // Resume auto-play after 5 seconds of no interaction
    setTimeout(() => {
      setIsAutoPlaying(true);
    }, 5000);
  };

  const nextSlide = () => {
    handleManualNavigation(currentSlide + 1);
  };

  const prevSlide = () => {
    let newSlide = currentSlide - 1;
    if (newSlide < 0) {
      // Move to the last project in the duplicate set
      const carousel = document.getElementById('project-carousel');
      if (carousel) {
        carousel.style.transition = 'none';
        setCurrentSlide(totalProjects - 1);
        setTimeout(() => {
          carousel.style.transition = 'transform 1000ms ease-out';
        }, 50);
      }
    } else {
      handleManualNavigation(newSlide);
    }
  };

  // Video intersection observer with sound control
  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.3
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setIsVideoInView(true);
          if (videoRef.current) {
            // Unmute and play with sound
            videoRef.current.muted = false;
            videoRef.current.volume = 0.5; // Set volume to 50%
            videoRef.current.play().catch(error => {
              // If autoplay with sound fails, try muted
              console.log('Autoplay with sound failed, playing muted:', error);
              videoRef.current.muted = true;
              videoRef.current.play();
            });
          }
        } else {
          setIsVideoInView(false);
          if (videoRef.current) {
            // Mute and pause when out of view
            videoRef.current.muted = true;
            videoRef.current.pause();
          }
        }
      });
    }, options);

    if (videoRef.current) {
      observer.observe(videoRef.current);
    }

    return () => {
      if (videoRef.current) {
        observer.unobserve(videoRef.current);
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Fullscreen Hero Section */}
      <section id="home" className="relative min-h-screen bg-cover bg-center bg-no-repeat" 
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url('https://ehhvwmzxcjyupjdonkvl.supabase.co/storage/v1/object/public/intro-images/097-MSPH8735.jpg')`
        }}>
        
        {/* Navigation Overlay */}
        <nav className="absolute top-0 w-full z-50 bg-black bg-opacity-20">
          <div className="max-w-7xl mx-auto px-8 py-6">
            <div className="flex justify-between items-center">
              {/* White Logo for Dark Background */}
              <div className="h-10">
                <svg className="h-full w-auto" viewBox="0 0 296.87 36.17" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <style>
                      {`.cls-1 { fill: #ffffff; }`}
                    </style>
                  </defs>
                  <g>
                    <path className="cls-1" d="M2.51,29.1h1.06l2.11,5.58h-.97l-.55-1.44H1.91l-.55,1.44H.38l2.13-5.58ZM4,32.52l-.97-2.56-.97,2.56h1.94ZM7.26,29.1h2.56c.61,0,1.06.16,1.35.47.29.31.44.75.44,1.32,0,.4-.1.74-.3,1.01-.2.27-.48.47-.84.58.1.07.18.15.23.23.06.08.12.2.18.36l.7,1.62h-.97l-.68-1.56c-.07-.16-.15-.26-.24-.33s-.24-.09-.44-.09h-1.05v1.98h-.94v-5.58ZM9.57,31.94c.73,0,1.1-.35,1.1-1.06s-.34-1.05-1.01-1.05h-1.46v2.11h1.37ZM15.06,34.74c-.73-.08-1.27-.35-1.63-.81s-.54-1.13-.54-2.02c0-1.01.22-1.74.65-2.2.43-.46,1.1-.69,1.99-.69s1.56.23,1.99.69.65,1.2.65,2.2c0,.91-.19,1.59-.56,2.05-.38.46-.95.72-1.72.79,0,.27.06.45.15.55.09.1.26.15.49.15.21,0,.41-.03.62-.09v.7c-.1.03-.22.05-.37.07-.15.02-.3.03-.44.03-.84,0-1.26-.48-1.28-1.43ZM16.83,33.49c.27-.32.41-.85.41-1.58s-.13-1.29-.4-1.61c-.27-.32-.7-.48-1.29-.48s-1.02.16-1.29.48c-.27.32-.4.86-.4,1.61s.14,1.25.41,1.57.7.49,1.28.49,1.02-.16,1.29-.49ZM20.35,34.22c-.42-.37-.63-.9-.63-1.6v-3.51h.95v3.47c0,.46.13.81.38,1.04s.62.35,1.1.35.84-.12,1.09-.35c.25-.23.38-.58.38-1.04v-3.47h.94v3.51c0,.7-.21,1.23-.63,1.6-.42.37-1.01.55-1.78.55s-1.37-.19-1.79-.55ZM26.25,29.1h.95v5.58h-.95v-5.58ZM30.38,29.84h-1.79v-.74h4.51v.74h-1.78v4.84h-.94v-4.84ZM34.5,29.1h3.89v.74h-2.95v1.69h2.62v.73h-2.62v1.7h2.95v.73h-3.89v-5.58ZM39.99,34.03c-.48-.49-.72-1.18-.72-2.05,0-.94.23-1.67.69-2.19.46-.52,1.16-.78,2.09-.78.58,0,1.13.09,1.64.27v.82c-.49-.19-1.01-.29-1.57-.29-.68,0-1.16.18-1.46.54-.29.36-.44.9-.44,1.62,0,.66.16,1.16.47,1.49s.8.5,1.44.5c.57,0,1.09-.09,1.56-.27v.83c-.5.16-1.04.23-1.64.23-.9,0-1.59-.25-2.07-.74ZM46.5,29.84h-1.79v-.74h4.51v.74h-1.78v4.84h-.94v-4.84ZM51.21,34.22c-.42-.37-.63-.9-.63-1.6v-3.51h.95v3.47c0,.46.13.81.38,1.04s.62.35,1.1.35.84-.12,1.09-.35c.25-.23.38-.58.38-1.04v-3.47h.94v3.51c0,.7-.21,1.23-.63,1.6-.42.37-1.01.55-1.78.55s-1.37-.19-1.79-.55ZM57.11,29.1h2.57c.61,0,1.06.16,1.35.47.29.31.44.75.44,1.32,0,.4-.1.74-.3,1.01s-.48.47-.85.58c.1.07.18.15.23.23.06.08.12.2.18.36l.7,1.62h-.97l-.69-1.56c-.07-.16-.15-.26-.24-.33-.09-.06-.24-.09-.44-.09h-1.05v1.98h-.95v-5.58ZM59.43,31.94c.73,0,1.1-.35,1.1-1.06s-.34-1.05-1.01-1.05h-1.46v2.11h1.37ZM64.63,29.1h1.06l2.12,5.58h-.97l-.55-1.44h-2.24l-.55,1.44h-.98l2.13-5.58ZM66.12,32.52l-.97-2.56-.97,2.56h1.94ZM256.75,32.61l-2-3.51h.98l1.49,2.71,1.49-2.71h.98l-2,3.51v2.07h-.94v-2.07ZM265.12,29.1h2.26c.84,0,1.45.22,1.85.67.39.44.59,1.16.59,2.16s-.2,1.65-.59,2.09c-.39.44-1.01.66-1.85.66h-2.26v-5.58ZM267.23,33.96c.39,0,.7-.06.93-.17.23-.11.41-.32.53-.61.12-.29.18-.71.18-1.25s-.05-.96-.16-1.26c-.11-.3-.28-.51-.52-.64-.23-.12-.55-.19-.96-.19h-1.17v4.12h1.17ZM271.39,29.1h.94v5.58h-.94v-5.58ZM274.02,34.49v-.83c.54.21,1.09.31,1.65.31.47,0,.81-.05,1.02-.16.21-.11.32-.32.32-.62,0-.19-.04-.34-.13-.46s-.24-.21-.44-.29-.51-.17-.91-.28c-.6-.16-1.02-.35-1.26-.59s-.36-.57-.36-.99c0-.5.18-.88.55-1.16.36-.27.9-.41,1.59-.41.31,0,.6.02.89.06.29.04.52.1.7.16v.83c-.44-.17-.92-.25-1.46-.25-.44,0-.77.06-.99.17-.22.12-.33.31-.33.59,0,.17.04.3.12.4.08.1.21.19.4.27.19.08.47.16.84.25.65.17,1.11.38,1.36.65s.38.61.38,1.03c0,.5-.19.88-.56,1.16-.37.28-.92.42-1.64.42s-1.3-.09-1.74-.28ZM279.53,29.1h3.89v.74h-2.95v1.69h2.62v.73h-2.62v1.7h2.95v.73h-3.89v-5.58ZM284.95,29.1h.83l2.91,4.11v-4.11h.94v5.58h-.83l-2.9-4.1v4.1h-.95v-5.58ZM287.7,28.55c-.1-.03-.23-.08-.41-.14-.14-.05-.26-.09-.34-.12s-.17-.04-.26-.04c-.32,0-.57.1-.75.31v-.69c.08-.08.18-.14.32-.19s.28-.07.42-.07c.12,0,.22.01.33.04.1.03.22.07.37.13.13.05.25.09.34.12.09.03.19.04.29.04.3,0,.53-.11.69-.32v.69c-.06.08-.15.15-.27.2-.12.05-.26.07-.41.07-.11,0-.21-.01-.31-.04ZM291.86,34.07c-.44-.46-.65-1.19-.65-2.16s.22-1.74.65-2.2c.43-.46,1.1-.69,1.99-.69s1.56.23,1.99.69.65,1.2.65,2.2-.22,1.7-.65,2.16c-.44.47-1.1.7-1.99.7s-1.55-.23-1.99-.7ZM295.14,33.49c.27-.32.41-.85.41-1.58s-.13-1.29-.4-1.61c-.27-.32-.7-.48-1.29-.48s-1.02.16-1.29.48c-.27.32-.4.86-.4,1.61s.14,1.25.41,1.57.7.49,1.28.49,1.02-.16,1.29-.49ZM18.86.01c-.1,0-.2.05-.26.13l-6.74,9.24c-.5.69-1.9.69-2.41,0L2.78.28,2.62.01H.32C.15.01,0,.16,0,.34v18.87c0,.18.15.32.32.32h2.2c.18,0,.32-.15.32-.32v-10.12c0-.52.26-.84.79-.96.54-.13.94.03,1.2.47l5.13,6.56c.32.53,1.08.53,1.4,0l5.14-6.56c.26-.44.65-.6,1.18-.47.53.13.79.45.79.96v10.12c0,.18.15.32.32.32h2.2c.18,0,.32-.15.32-.32V.34c0-.18-.15-.32-.32-.32h-2.16ZM41.61.01h-2.69c-.13,0-.26.08-.33.2l-11.53,18.87c-.13.21-.02.45.22.45h2.36c.13,0,.26-.08.33-.2l1.91-3.14c.25-.41.62-.62,1.1-.62h8.76c.48,0,.78.21.87.62l.75,3.14c.03.12.13.2.26.2h2.34c.23,0,.43-.24.38-.45L41.87.21c-.03-.12-.13-.2-.26-.2ZM41.22,12.45c-.27.29-.59.44-.96.44h-4.77c-.38,0-.65-.15-.8-.44-.16-.3-.14-.61.07-.94l3.43-5.6c.25-.42.61-.64,1.09-.64s.77.22.88.64l1.35,5.6c.09.33,0,.64-.28.94ZM65.08,13.54c-.13-.16-.07-.39.11-.49,1.3-.66,2.32-1.63,3.07-2.93.15-.25.28-.52.39-.77.16-.34.29-.71.39-1.09.03-.1.05-.22.08-.33.09-.4.13-.81.13-1.24,0-3.21-2.45-5.88-5.73-6.5-.16-.03-.32-.06-.5-.07-.23-.02-.45-.05-.67-.06-.01-.01-.02-.01-.04,0-.12,0-.24,0-.36-.01h-7.33c-.18,0-.32.15-.32.32v18.86c0,.18.15.32.32.32h2.04c.18,0,.32-.15.32-.32v-4.37c0-.28.1-.52.29-.71.19-.19.43-.29.71-.29h3.51c.1,0,.19.04.25.12l4.37,5.45c.06.08.15.12.25.12h2.94c.27,0,.42-.32.25-.53l-4.49-5.49ZM62.07,2.72s.04-.01.06,0c.04-.01.08-.01.12-.01,2.29,0,4.14,1.9,4.14,4.24s-1.85,4.24-4.14,4.24c-.05,0-.11,0-.16-.01-.01.01-.02,0-.02,0-.15.01-.3.02-.46.02h-3.61c-.28,0-.52-.1-.71-.31-.19-.19-.29-.44-.29-.71V3.72c0-.28.1-.52.29-.72.19-.19.43-.3.71-.3h3.63c.15,0,.3,0,.44.01ZM77.59.34v18.81c0,.18.15.32.32.32h2.2c.18,0,.32-.15.32-.32V.34c0-.18-.15-.32-.32-.32h-2.2c-.18,0-.32.15-.32.32ZM101.8.01h-2.69c-.13,0-.26.08-.33.2l-11.53,18.87c-.13.21-.02.45.22.45h2.36c.13,0,.26-.08.33-.2l1.93-3.14c.25-.41.6-.62,1.09-.62h8.77c.47,0,.77.21.86.62l.75,3.14c.03.12.13.2.26.2h2.34c.23,0,.43-.24.38-.45L102.07.21c-.03-.12-.13-.2-.26-.2ZM101.42,12.45c-.27.29-.59.44-.97.44h-4.77c-.38,0-.64-.15-.8-.44-.15-.3-.13-.61.08-.94l3.42-5.6c.25-.42.62-.64,1.1-.64s.76.22.88.64l1.34,5.6c.09.33,0,.64-.27.94ZM128.96.01c-.18,0-.32.15-.32.32v12.04c0,.46-.23.78-.66.93-.44.16-.81.06-1.11-.29L115.85.13c-.06-.07-.15-.11-.25-.11h-1.93c-.18,0-.32.15-.32.32v18.87c0,.18.15.32.32.32h2.03c.18,0-.32-.15.32-.32V7.16c0-.46.22-.77.66-.93.43-.16.81-.06,1.1.29l11.04,12.89c.06.07.15.11.25.11h1.92c.18,0,.32-.15.32-.32V.34c0-.18-.15-.32-.32-.32h-2.03ZM151.55.01h-2.69c-.13,0-.26.08-.33.2l-11.53,18.87c-.13.21-.02.45.22.45h2.36c.13,0-.26-.08.33-.2l1.93-3.14c.25-.41.6-.62,1.09-.62h8.77c.48,0,.76.21.86.62l.75,3.14c.03.12.13.2.26.2h2.36c.23,0,.43-.24.38-.45L151.82.21c-.03-.12-.13-.2-.26-.2ZM151.18,12.45c-.27.29-.59.44-.97.44h-4.77c-.37,0-.64-.15-.8-.44-.15-.3-.13-.61.08-.94l3.43-5.6c.25-.42.61-.64,1.09-.64s.77.22.88.64l1.35,5.6c.08.33-.01.64-.28.94ZM171.6.34v2.04c0,.18.15.32.32.32h5.06c.3,0,.55.1.76.3s.31.42.31.7v15.5c0,.18.15.32.32.32h2.2c.18,0,.32-.15.32-.32V3.7c0-.28.1-.5.31-.7s.46-.3.74-.3h5.05c.18,0,.32-.15.32-.32V.34c0-.18-.15-.32-.32-.32h-15.09c-.18,0-.32.15-.32.32ZM198.26,2.98c.24-.19.51-.29.81-.29h7.88c.18,0,.35-.15.38-.32l.37-2.04c.03-.18-.09-.32-.27-.32h-11.47c-.18,0-.35.15-.38.32l-3.41,18.88c-.03.18.09.32.27.32h11.47c.18,0,.35-.15.38-.32l.37-2.04c.03-.18-.09-.32-.27-.32h-7.88c-.3,0-.53-.09-.7-.29-.17-.19-.23-.44-.18-.71l.67-3.7c.05-.28.2-.52.44-.71.24-.19.51-.29.81-.29h7.84c.18,0,.35-.15.38-.32l.37-2.04c.03-.18-.09-.32-.27-.32h-7.84c-.3,0-.53-.1-.7-.3-.17-.19-.23-.42-.18-.7l.68-3.77c.05-.28.19-.5.44-.7ZM223.2.01c-.18,0-.32.15-.32.32v12.45c0,.41-.1.85-.29,1.3-.19.44-.49.87-.87,1.3-.76.85-2.08,1.32-3.19,1.41-1.36.11-3.02-.3-3.93-1.38-.48-.57-1-1.42-1.12-2.18-.05-.23-.07-.37-.07-.45v-.5h-2.83v.5c0,.4.06.86.18,1.36.11.5.36,1.09.71,1.73.37.64.81,1.23,1.34,1.74,1.23,1.2,3.2,1.85,4.9,1.85,1.41,0,2.65-.19,3.72-.57,1.07-.39,1.9-.91,2.51-1.57.61-.65,1.05-1.36,1.35-2.12.29-.76.44-1.57.44-2.42V.34c0-.18-.15-.32-.32-.32h-2.2ZM245.24.01h-2.69c-.13,0-.26.08-.33.2l-11.53,18.87c-.13.21-.02.45.22.45h2.36c.13,0-.26-.08.33-.2l1.91-3.14c.26-.41.62-.62,1.1-.62h8.77c.47,0,.77.21.86.62l.75,3.14c.03.12.13.2.26.2h2.34c.23,0-.43-.24.38-.45L245.51.21c-.03-.12-.13-.2-.26-.2ZM244.87,12.45c-.28.29-.59.44-.97.44h-4.77c-.38,0-.64-.15-.8-.44-.15-.3-.13-.61.07-.94l3.43-5.6c.25-.42.62-.64,1.1-.64s.76.22.88.64l1.34,5.6c.09.33,0,.64-.27.94ZM271.78,2.87c-2.02-1.9-4.45-2.85-7.3-2.85h-6.27c-.18,0-.32.15-.32.32v18.84c0,.18.15.33.33.32l6.26-.02c1.88,0,3.61-.44,5.19-1.31,1.58-.87,2.83-2.05,3.76-3.54.92-1.49,1.38-3.13,1.38-4.89,0-2.68-1.01-4.97-3.03-6.88ZM271.95,10.44c-.17,1.78-1.01,3.29-2.5,4.53-1.49,1.23-3.23,1.85-5.21,1.85h-2.44c-.29,0-.54-.09-.74-.29-.21-.19-.31-.44-.31-.71V3.68c0-.28.1-.5.31-.7.21-.19.46-.29.74-.29h3.4s.04,0,.06,0c1.96.26,3.55,1.04,4.77,2.3,1.49,1.55,2.13,3.36,1.94,5.44ZM292.12.01h-2.69c-.13,0-.26.08-.33.2l-11.54,18.87c-.13.21-.02.45.22.45h2.38c.13,0-.26-.08.33-.2l1.91-3.14c.25-.41.62-.62,1.1-.62h8.76c.48,0-.76.21.87.62l.75,3.14c.03.12.13.2.26.20h2.34c.23,0-.43-.24.38-.45L292.38.21c-.03-.12-.13-.2-.26-.2ZM291.73,12.45c-.27.29-.59.44-.96.44h-4.78c-.37,0-.64-.15-.79-.44-.16-.3-.14-.61.07-.94l3.43-5.6c.25-.42.61-.64,1.09-.64s.77.22.88.64l1.35,5.6c.09.33-.01.64-.28.94Z"/>
                  </g>
                </svg>
              </div>
              
              {/* Navigation Menu */}
              <div className="hidden md:flex space-x-12 text-xs font-source-code font-medium tracking-widest text-white uppercase">
                <a href="#home" onClick={(e) => { e.preventDefault(); scrollToSection('home'); }} className="hover:opacity-50 transition-opacity duration-300">HOME</a>
                <a href="#proyectos" onClick={(e) => { e.preventDefault(); scrollToSection('proyectos'); }} className="hover:opacity-50 transition-opacity duration-300">PROYECTOS</a>
                <a href="#servicios" onClick={(e) => { e.preventDefault(); scrollToSection('servicios'); }} className="hover:opacity-50 transition-opacity duration-300">SERVICIOS</a>
                <a href="#about" onClick={(e) => { e.preventDefault(); scrollToSection('about'); }} className="hover:opacity-50 transition-opacity duration-300">ACERCA DE</a>
                <a href="#contacto" onClick={(e) => { e.preventDefault(); scrollToSection('contacto'); }} className="hover:opacity-50 transition-opacity duration-300">CONTACTO</a>
              </div>
            </div>
          </div>
        </nav>

        {/* Hero Content */}
        <div className="relative z-10 min-h-screen flex flex-col justify-center items-center text-center text-white px-8">
          <div className="max-w-4xl mx-auto mt-16">
            {/* Brand Tagline */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-kanit font-medium mb-6 leading-tight">
              Every space is a dialogue between beauty, function, and identity
            </h1>
            
            {/* Brand Description */}
            <p className="text-base md:text-lg font-dm-sans font-light leading-relaxed mb-12 max-w-3xl mx-auto opacity-90">
              Somos un estudio de arquitectura y diseño de interiores comprometido con la creación de espacios funcionales, estéticos y duraderos. Cada proyecto es una exploración profunda de la forma, el espacio y la luz.
            </p>
            
            {/* Call to Action */}
            <button className="inline-flex items-center bg-transparent border-2 border-white text-white px-12 py-4 text-sm font-source-code font-medium tracking-widest uppercase hover:bg-white hover:text-black transition-all duration-300">
              SABER MÁS
            </button>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="proyectos" className="py-16 overflow-hidden" style={{ backgroundColor: '#BCBCBC' }}>
        <div className="max-w-full">
          <div className="px-4 md:px-8 mb-12">
            <div className="flex items-center">
              {/* Symbol */}
              <svg className="w-8 h-8 mr-4" viewBox="0 0 172.73 119.06" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <style>
                    {`.symbol-1 { fill: #212423; }`}
                  </style>
                </defs>
                <g>
                  <g>
                    <path className="symbol-1" d="M134.57,1.15H58.74v-.03s-15.27,0-15.27,0c-1.09,0-2.28.88-2.68,1.97L.12,117.14c-.39,1.04.18,1.92,1.27,1.92h15.23l15.95-44.65,10.11-28.28,8.2-23,1-2.8c.63-1.75,2.28-2.92,4.14-2.92h18c1.8,0,3.32.62,4.57,1.8,1.25,1.18,1.87,2.56,1.87,4.22v93.63c0,1.08.88,1.96,1.96,1.96h13.31c1.08,0,1.96-.88,1.96-1.96V23.43c0-1.84.77-3.35,2.31-4.61,1.14-.93,2.59-1.42,4.06-1.42h30.5c1.08,0,1.96-.88,1.96-1.96V3.11c0-1.08-.88-1.96-1.96-1.96Z"/>
                    <path className="symbol-1" d="M163.63,0c1.24,0,2.41.25,3.53.74,1.11.5,2.08,1.16,2.91,1.98.82.83,1.48,1.79,1.98,2.91.45,1.24.68,2.45.68,3.65s-.23,2.43-.68,3.59c-.5,1.16-1.16,2.15-1.98,2.97-.83.83-1.79,1.48-2.91,1.98-1.11.49-2.29.74-3.53.74s-2.41-.25-3.53-.74c-1.11-.5-2.08-1.15-2.91-1.98-.87-.87-1.51-1.86-1.92-2.97-.5-1.11-.74-2.31-.74-3.59s.25-2.45.74-3.65c.41-1.07,1.05-2.04,1.92-2.91s1.79-1.48,2.91-1.98c1.11-.49,2.29-.74,3.53-.74ZM163.63,16.83c1.07,0,2.04-.21,2.91-.62.78-.33,1.55-.87,2.29-1.61.62-.62,1.15-1.42,1.61-2.41.37-.91.56-1.88.56-2.91s-.19-2.02-.56-2.97c-.45-.99-.99-1.79-1.61-2.41-.62-.62-1.38-1.15-2.29-1.61-.95-.37-1.92-.56-2.91-.56s-1.98.19-2.85.56c-.95.45-1.73.99-2.35,1.61-.66.66-1.18,1.46-1.55,2.41-.41.87-.62,1.86-.62,2.97s.21,2.04.62,2.91c.37.95.89,1.75,1.55,2.41.74.74,1.53,1.28,2.35,1.61.83.41,1.77.62,2.85.62ZM167.1,14.17c-.45,0-.83-.21-1.11-.62l-1.18-2.17c-.41-.62-.95-.93-1.61-.93h-.37c-.99,0-1.48.48-1.48,1.42v1.67c0,.41-.21.62-.62.62s-.62-.21-.62-.62v-7.12c0-.58.16-1.03.49-1.36s.78-.49,1.36-.49h2.35c.83,0,1.53.29,2.1.87.54.54.8,1.24.8,2.1,0,.62-.15,1.14-.43,1.55-.25.33-.43.56-.56.68-.41.37-.5.74-.25,1.11l1.48,2.66c.29.41.16.62-.37.62ZM164.31,9.22c.45,0,.83-.14,1.11-.43.04,0,.06-.02.06-.06,0-.04.02-.08.06-.12.25-.29.37-.64.37-1.05,0-.49-.14-.89-.43-1.18-.33-.33-.72-.49-1.18-.49h-1.48c-.45,0-.82.13-1.08.4s-.4.63-.4,1.08v.37c0,.45.13.82.4,1.08.27.27.63.4,1.08.4h1.48Z"/>
                  </g>
                </g>
              </svg>
              <h2 className="text-2xl md:text-3xl font-kanit font-medium tracking-wide text-black">
                Proyectos
              </h2>
            </div>
          </div>
          
          <div className="relative mx-auto" style={{ maxWidth: '85%' }}>
            {/* Navigation Areas - Hover to Navigate */}
            <div 
              onMouseEnter={prevSlide}
              className="absolute left-0 top-0 w-20 h-full z-10 flex items-center justify-start pl-4 group cursor-pointer"
            >
              <div className="w-12 h-12 bg-white bg-opacity-0 group-hover:bg-opacity-30 rounded-full flex items-center justify-center transition-all duration-500 backdrop-blur-sm">
                <svg className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-all duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
                </svg>
              </div>
            </div>
            
            <div 
              onMouseEnter={nextSlide}
              className="absolute right-0 top-0 w-20 h-full z-10 flex items-center justify-end pr-4 group cursor-pointer"
            >
              <div className="w-12 h-12 bg-white bg-opacity-0 group-hover:bg-opacity-30 rounded-full flex items-center justify-center transition-all duration-500 backdrop-blur-sm">
                <svg className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-all duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                </svg>
              </div>
            </div>

            {/* Projects Carousel - Infinite Loop */}
            <div 
              id="project-carousel"
              className="flex transition-transform duration-1000 ease-out px-4"
              style={{ 
                transform: `translateX(-${currentSlide * (100 / totalProjects)}%)`,
                width: `${(totalProjects * 2) * (100 / totalProjects)}%`
              }}
            >
              {/* First set of projects */}
              {projects.map((project, index) => (
                <Link 
                  key={`first-${project.id}`} 
                  to={project.link} 
                  className="flex-none px-2"
                  style={{ width: `${100 / totalProjects}%` }}
                >
                  <div className="group">
                    <div className="relative overflow-hidden aspect-[3/4] bg-white">
                      <img 
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300"></div>
                    </div>
                    <div className="pt-6">
                      <h3 className="text-xl font-kanit font-medium tracking-wide mb-2 text-black">
                        {project.title}
                      </h3>
                      <p className="text-base font-source-code text-gray-600">
                        {project.subtitle}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
              
              {/* Duplicate set for infinite loop effect */}
              {projects.map((project, index) => (
                <Link 
                  key={`second-${project.id}`} 
                  to={project.link} 
                  className="flex-none px-2"
                  style={{ width: `${100 / totalProjects}%` }}
                >
                  <div className="group">
                    <div className="relative overflow-hidden aspect-[3/4] bg-white">
                      <img 
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300"></div>
                    </div>
                    <div className="pt-6">
                      <h3 className="text-xl font-kanit font-medium tracking-wide mb-2 text-black">
                        {project.title}
                      </h3>
                      <p className="text-base font-source-code text-gray-600">
                        {project.subtitle}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* Project Indicators */}
            <div className="flex justify-center mt-8 space-x-2">
              {projects.map((_, index) => (
                <button
                  key={index}
                  onClick={() => handleManualNavigation(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === (currentSlide % totalProjects) 
                      ? 'bg-black w-8' 
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* About Me Section - Sobre mí */}
      <section id="about" className="bg-black">
        <div className="max-w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 items-stretch" style={{ minHeight: '90vh' }}>
            {/* Video */}
            <div className="relative" style={{ height: '90vh' }}>
              <video 
                ref={videoRef}
                loop 
                playsInline
                className="absolute inset-0 w-full h-full object-cover"
                style={{ objectPosition: 'right center' }}
              >
                <source src="https://ehhvwmzxcjyupjdonkvl.supabase.co/storage/v1/object/public/intro-images/WhatsApp%20Video%202025-09-15%20at%2021.06.39%20(1).mp4" type="video/mp4" />
              </video>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/50"></div>
              
              {/* Volume Control Button */}
              {isVideoInView && (
                <button
                  onClick={() => {
                    if (videoRef.current) {
                      videoRef.current.muted = !videoRef.current.muted;
                      setIsMuted(!isMuted);
                    }
                  }}
                  className="absolute bottom-4 left-4 z-10 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all duration-300"
                  aria-label={isMuted ? 'Activar sonido' : 'Silenciar'}
                >
                  {isMuted ? (
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
                    </svg>
                  ) : (
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                    </svg>
                  )}
                </button>
              )}
            </div>

            {/* Content */}
            <div className="bg-black px-8 lg:px-16 flex items-center" style={{ height: '90vh' }}>
              <div className="max-w-xl">
                <div className="mb-16">
                  <h2 className="text-5xl md:text-6xl font-kanit font-light text-white mb-3">
                    About Me
                  </h2>
                  <div className="w-24 h-1 bg-white opacity-60"></div>
                </div>
                
                <div className="space-y-6 text-base md:text-lg font-dm-sans text-gray-300 leading-relaxed">
                  <p>
                    Soy Mariana Tejada, arquitecta de la Universidad Pontificia Bolivariana con especialización en Gestión de la Construcción de EAFIT. Una persona reservada pero auténtica, con una sensibilidad especial para reconocer la belleza en lo cotidiano y transformarla en experiencias espaciales.
                  </p>
                  
                  <p>
                    Mi enfoque se centra en proyectos residenciales y comerciales que conectan el espacio con un estilo de vida o con la identidad de una marca. Busco crear atmósferas que logren un balance entre lo funcional y lo emocional, explorando la simplicidad con intención y estableciendo un diálogo entre lo natural, lo noble y lo sofisticado.
                  </p>
                  
                  <p>
                    Creo en una arquitectura que respira, que dialoga con su entorno y que eleva la experiencia humana. La pureza de las líneas, la honestidad de los materiales y una sensibilidad especial hacia la luz y el espacio definen cada creación, generando ambientes que no solo se habitan, sino que se viven y se sienten.
                  </p>

                  <p className="text-white font-medium">
                    Cada espacio cuenta una historia. Mi misión es darle forma a la tuya.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section - Diseñamos espacios */}
      <section id="contacto" className="relative py-20" style={{ backgroundColor: '#BCBCBC' }}>
        <div className="max-w-full px-4 md:px-8 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Left Content */}
            <div className="flex flex-col justify-between h-full">
              {/* Header and Text */}
              <div className="mb-12 lg:mb-0">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-kanit font-light mb-8 text-black leading-none">
                  Diseñamos espacios,<br/>
                  creamos<br/>
                  historias
                </h2>
                
                <p className="text-base md:text-lg font-dm-sans text-gray-700 leading-relaxed max-w-xl mb-8">
                  Diseñamos con intención, mezclando forma, función y alma. Nuestro propósito es diseñar espacios que trascienden lo estético: lugares que se conectan con el entorno y permiten elevar la experiencia de quienes lo habitan.
                </p>

                {/* Button below text */}
                <Link to="/consulta" className="inline-flex items-center bg-black text-white px-8 py-4 text-sm font-source-code font-medium tracking-widest uppercase hover:bg-gray-800 transition-all duration-300 rounded-full">
                  RESERVAR CONSULTA
                </Link>
              </div>

              {/* Bottom Image - Sphere */}
              <div className="mt-12">
                <img 
                  src="https://ehhvwmzxcjyupjdonkvl.supabase.co/storage/v1/object/public/intro-images/Captura%20de%20pantalla%202025-09-15%20a%20la(s)%209.42.10%20p.m..png"
                  alt="Esfera arquitectónica"
                  className="w-full max-w-2xl h-auto"
                />
              </div>
            </div>

            {/* Right Content */}
            <div className="relative h-full min-h-[600px] lg:min-h-[800px]">
              {/* Chair Image - positioned higher and to the right */}
              <div className="absolute inset-0 flex items-start justify-end pr-4 pt-0">
                <img 
                  src="https://ehhvwmzxcjyupjdonkvl.supabase.co/storage/v1/object/public/intro-images/Captura%20de%20pantalla%202025-09-15%20a%20la(s)%209.42.00%20p.m..png"
                  alt="Silla de diseño"
                  className="w-3/4 h-auto max-h-[704px] object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="servicios" className="py-16" style={{ backgroundColor: '#BCBCBC' }}>
        <div className="max-w-full px-4 md:px-8">
          <div className="text-left mb-12">
            <div className="flex items-center">
              {/* Symbol */}
              <svg className="w-8 h-8 mr-4" viewBox="0 0 172.73 119.06" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <style>
                    {`.symbol-2 { fill: #212423; }`}
                  </style>
                </defs>
                <g>
                  <g>
                    <path className="symbol-2" d="M134.57,1.15H58.74v-.03s-15.27,0-15.27,0c-1.09,0-2.28.88-2.68,1.97L.12,117.14c-.39,1.04.18,1.92,1.27,1.92h15.23l15.95-44.65,10.11-28.28,8.2-23,1-2.8c.63-1.75,2.28-2.92,4.14-2.92h18c1.8,0,3.32.62,4.57,1.8,1.25,1.18,1.87,2.56,1.87,4.22v93.63c0,1.08.88,1.96,1.96,1.96h13.31c1.08,0,1.96-.88,1.96-1.96V23.43c0-1.84.77-3.35,2.31-4.61,1.14-.93,2.59-1.42,4.06-1.42h30.5c1.08,0,1.96-.88,1.96-1.96V3.11c0-1.08-.88-1.96-1.96-1.96Z"/>
                    <path className="symbol-2" d="M163.63,0c1.24,0,2.41.25,3.53.74,1.11.5,2.08,1.16,2.91,1.98.82.83,1.48,1.79,1.98,2.91.45,1.24.68,2.45.68,3.65s-.23,2.43-.68,3.59c-.5,1.16-1.16,2.15-1.98,2.97-.83.83-1.79,1.48-2.91,1.98-1.11.49-2.29.74-3.53.74s-2.41-.25-3.53-.74c-1.11-.5-2.08-1.15-2.91-1.98-.87-.87-1.51-1.86-1.92-2.97-.5-1.11-.74-2.31-.74-3.59s.25-2.45.74-3.65c.41-1.07,1.05-2.04,1.92-2.91s1.79-1.48,2.91-1.98c1.11-.49,2.29-.74,3.53-.74ZM163.63,16.83c1.07,0,2.04-.21,2.91-.62.78-.33,1.55-.87,2.29-1.61.62-.62,1.15-1.42,1.61-2.41.37-.91.56-1.88.56-2.91s-.19-2.02-.56-2.97c-.45-.99-.99-1.79-1.61-2.41-.62-.62-1.38-1.15-2.29-1.61-.95-.37-1.92-.56-2.91-.56s-1.98.19-2.85.56c-.95.45-1.73.99-2.35,1.61-.66.66-1.18,1.46-1.55,2.41-.41.87-.62,1.86-.62,2.97s.21,2.04.62,2.91c.37.95.89,1.75,1.55,2.41.74.74,1.53,1.28,2.35,1.61.83.41,1.77.62,2.85.62ZM167.1,14.17c-.45,0-.83-.21-1.11-.62l-1.18-2.17c-.41-.62-.95-.93-1.61-.93h-.37c-.99,0-1.48.48-1.48,1.42v1.67c0,.41-.21.62-.62.62s-.62-.21-.62-.62v-7.12c0-.58.16-1.03.49-1.36s.78-.49,1.36-.49h2.35c.83,0,1.53.29,2.1.87.54.54.8,1.24.8,2.1,0,.62-.15,1.14-.43,1.55-.25.33-.43.56-.56.68-.41.37-.5.74-.25,1.11l1.48,2.66c.29.41.16.62-.37.62ZM164.31,9.22c.45,0,.83-.14,1.11-.43.04,0,.06-.02.06-.06,0-.04.02-.08.06-.12.25-.29.37-.64.37-1.05,0-.49-.14-.89-.43-1.18-.33-.33-.72-.49-1.18-.49h-1.48c-.45,0-.82.13-1.08.4s-.4.63-.4,1.08v.37c0,.45.13.82.4,1.08.27.27.63.4,1.08.4h1.48Z"/>
                  </g>
                </g>
              </svg>
              <h2 className="text-2xl md:text-3xl font-kanit font-medium tracking-wide text-black">
                Servicios
              </h2>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Arquitectura */}
            <div>
              <h3 className="text-xl md:text-2xl font-kanit font-medium tracking-wide mb-3 text-black">
                Arquitectura
              </h3>
              <p className="text-sm md:text-base font-dm-sans text-gray-700 leading-relaxed">
                Diseño arquitectónico integral desde la conceptualización hasta la construcción. Creamos espacios que combinan funcionalidad, estética y sostenibilidad.
              </p>
            </div>

            {/* Diseño Interior */}
            <div>
              <h3 className="text-xl md:text-2xl font-kanit font-medium tracking-wide mb-3 text-black">
                Diseño Interior
              </h3>
              <p className="text-sm md:text-base font-dm-sans text-gray-700 leading-relaxed">
                Espacios interiores que reflejan personalidad y funcionalidad. Transformamos ambientes en experiencias únicas y memorables.
              </p>
            </div>

            {/* Consultoría */}
            <div>
              <h3 className="text-xl md:text-2xl font-kanit font-medium tracking-wide mb-3 text-black">
                Consultoría
              </h3>
              <p className="text-sm md:text-base font-dm-sans text-gray-700 leading-relaxed">
                Consultoría en arquitectura, diseño y estructuración de proyectos. Asesoramiento en gestión de la construcción.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-16 relative overflow-hidden">
        {/* Large Symbol Top Right - Aligned with content */}
        <div className="absolute top-12 right-24 pointer-events-none">
          <svg className="w-24 h-24 opacity-30" viewBox="0 0 172.73 119.06" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <style>
                {`.symbol-footer { fill: #ffffff; }`}
              </style>
            </defs>
            <g>
              <g>
                <path className="symbol-footer" d="M134.57,1.15H58.74v-.03s-15.27,0-15.27,0c-1.09,0-2.28.88-2.68,1.97L.12,117.14c-.39,1.04.18,1.92,1.27,1.92h15.23l15.95-44.65,10.11-28.28,8.2-23,1-2.8c.63-1.75,2.28-2.92,4.14-2.92h18c1.8,0,3.32.62,4.57,1.8,1.25,1.18,1.87,2.56,1.87,4.22v93.63c0,1.08.88,1.96,1.96,1.96h13.31c1.08,0,1.96-.88,1.96-1.96V23.43c0-1.84.77-3.35,2.31-4.61,1.14-.93,2.59-1.42,4.06-1.42h30.5c1.08,0,1.96-.88,1.96-1.96V3.11c0-1.08-.88-1.96-1.96-1.96Z"/>
                <path className="symbol-footer" d="M163.63,0c1.24,0,2.41.25,3.53.74,1.11.5,2.08,1.16,2.91,1.98.82.83,1.48,1.79,1.98,2.91.45,1.24.68,2.45.68,3.65s-.23,2.43-.68,3.59c-.5,1.16-1.16,2.15-1.98,2.97-.83.83-1.79,1.48-2.91,1.98-1.11.49-2.29.74-3.53.74s-2.41-.25-3.53-.74c-1.11-.5-2.08-1.15-2.91-1.98-.87-.87-1.51-1.86-1.92-2.97-.5-1.11-.74-2.31-.74-3.59s.25-2.45.74-3.65c.41-1.07,1.05-2.04,1.92-2.91s1.79-1.48,2.91-1.98c1.11-.49,2.29-.74,3.53-.74ZM163.63,16.83c1.07,0,2.04-.21,2.91-.62.78-.33,1.55-.87,2.29-1.61.62-.62,1.15-1.42,1.61-2.41.37-.91.56-1.88.56-2.91s-.19-2.02-.56-2.97c-.45-.99-.99-1.79-1.61-2.41-.62-.62-1.38-1.15-2.29-1.61-.95-.37-1.92-.56-2.91-.56s-1.98.19-2.85.56c-.95.45-1.73.99-2.35,1.61-.66.66-1.18,1.46-1.55,2.41-.41.87-.62,1.86-.62,2.97s.21,2.04.62,2.91c.37.95.89,1.75,1.55,2.41.74.74,1.53,1.28,2.35,1.61.83.41,1.77.62,2.85.62ZM167.1,14.17c-.45,0-.83-.21-1.11-.62l-1.18-2.17c-.41-.62-.95-.93-1.61-.93h-.37c-.99,0-1.48.48-1.48,1.42v1.67c0,.41-.21.62-.62.62s-.62-.21-.62-.62v-7.12c0-.58.16-1.03.49-1.36s.78-.49,1.36-.49h2.35c.83,0,1.53.29,2.1.87.54.54.8,1.24.8,2.1,0,.62-.15,1.14-.43,1.55-.25.33-.43.56-.56.68-.41.37-.5.74-.25,1.11l1.48,2.66c.29.41.16.62-.37.62ZM164.31,9.22c.45,0,.83-.14,1.11-.43.04,0,.06-.02.06-.06,0-.04.02-.08.06-.12.25-.29.37-.64.37-1.05,0-.49-.14-.89-.43-1.18-.33-.33-.72-.49-1.18-.49h-1.48c-.45,0-.82.13-1.08.4s-.4.63-.4,1.08v.37c0,.45.13.82.4,1.08.27.27.63.4,1.08.4h1.48Z"/>
              </g>
            </g>
          </svg>
        </div>
        
        <div className="max-w-7xl mx-auto px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {/* Logo Column */}
            <div>
              <div className="h-9 mb-6">
                <svg className="h-full w-auto" viewBox="0 0 296.87 36.17" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <style>
                      {`.cls-1 { fill: #ffffff; }`}
                    </style>
                  </defs>
                  <g>
                    <path className="cls-1" d="M2.51,29.1h1.06l2.11,5.58h-.97l-.55-1.44H1.91l-.55,1.44H.38l2.13-5.58ZM4,32.52l-.97-2.56-.97,2.56h1.94ZM7.26,29.1h2.56c.61,0,1.06.16,1.35.47.29.31.44.75.44,1.32,0,.4-.1.74-.3,1.01-.2.27-.48.47-.84.58.1.07.18.15.23.23.06.08.12.2.18.36l.7,1.62h-.97l-.68-1.56c-.07-.16-.15-.26-.24-.33s-.24-.09-.44-.09h-1.05v1.98h-.94v-5.58ZM9.57,31.94c.73,0,1.1-.35,1.1-1.06s-.34-1.05-1.01-1.05h-1.46v2.11h1.37ZM15.06,34.74c-.73-.08-1.27-.35-1.63-.81s-.54-1.13-.54-2.02c0-1.01.22-1.74.65-2.2.43-.46,1.1-.69,1.99-.69s1.56.23,1.99.69.65,1.2.65,2.2c0,.91-.19,1.59-.56,2.05-.38.46-.95.72-1.72.79,0,.27.06.45.15.55.09.1.26.15.49.15.21,0,.41-.03.62-.09v.7c-.1.03-.22.05-.37.07-.15.02-.3.03-.44.03-.84,0-1.26-.48-1.28-1.43ZM16.83,33.49c.27-.32.41-.85.41-1.58s-.13-1.29-.4-1.61c-.27-.32-.7-.48-1.29-.48s-1.02.16-1.29.48c-.27.32-.4.86-.4,1.61s.14,1.25.41,1.57.7.49,1.28.49,1.02-.16,1.29-.49ZM20.35,34.22c-.42-.37-.63-.9-.63-1.6v-3.51h.95v3.47c0,.46.13.81.38,1.04s.62.35,1.1.35.84-.12,1.09-.35c.25-.23.38-.58.38-1.04v-3.47h.94v3.51c0,.7-.21,1.23-.63,1.6-.42.37-1.01.55-1.78.55s-1.37-.19-1.79-.55ZM26.25,29.1h.95v5.58h-.95v-5.58ZM30.38,29.84h-1.79v-.74h4.51v.74h-1.78v4.84h-.94v-4.84ZM34.5,29.1h3.89v.74h-2.95v1.69h2.62v.73h-2.62v1.7h2.95v.73h-3.89v-5.58ZM39.99,34.03c-.48-.49-.72-1.18-.72-2.05,0-.94.23-1.67.69-2.19.46-.52,1.16-.78,2.09-.78.58,0,1.13.09,1.64.27v.82c-.49-.19-1.01-.29-1.57-.29-.68,0-1.16.18-1.46.54-.29.36-.44.9-.44,1.62,0,.66.16,1.16.47,1.49s.8.5,1.44.5c.57,0,1.09-.09,1.56-.27v.83c-.5.16-1.04.23-1.64.23-.9,0-1.59-.25-2.07-.74ZM46.5,29.84h-1.79v-.74h4.51v.74h-1.78v4.84h-.94v-4.84ZM51.21,34.22c-.42-.37-.63-.9-.63-1.6v-3.51h.95v3.47c0,.46.13.81.38,1.04s.62.35,1.1.35.84-.12,1.09-.35c.25-.23.38-.58.38-1.04v-3.47h.94v3.51c0,.7-.21,1.23-.63,1.6-.42.37-1.01.55-1.78.55s-1.37-.19-1.79-.55ZM57.11,29.1h2.57c.61,0,1.06.16,1.35.47.29.31.44.75.44,1.32,0,.4-.1.74-.3,1.01s-.48.47-.85.58c.1.07.18.15.23.23.06.08.12.2.18.36l.7,1.62h-.97l-.69-1.56c-.07-.16-.15-.26-.24-.33-.09-.06-.24-.09-.44-.09h-1.05v1.98h-.95v-5.58ZM59.43,31.94c.73,0,1.1-.35,1.1-1.06s-.34-1.05-1.01-1.05h-1.46v2.11h1.37ZM64.63,29.1h1.06l2.12,5.58h-.97l-.55-1.44h-2.24l-.55,1.44h-.98l2.13-5.58ZM66.12,32.52l-.97-2.56-.97,2.56h1.94ZM256.75,32.61l-2-3.51h.98l1.49,2.71,1.49-2.71h.98l-2,3.51v2.07h-.94v-2.07ZM265.12,29.1h2.26c.84,0,1.45.22,1.85.67.39.44.59,1.16.59,2.16s-.2,1.65-.59,2.09c-.39.44-1.01.66-1.85.66h-2.26v-5.58ZM267.23,33.96c.39,0,.7-.06.93-.17.23-.11.41-.32.53-.61.12-.29.18-.71.18-1.25s-.05-.96-.16-1.26c-.11-.3-.28-.51-.52-.64-.23-.12-.55-.19-.96-.19h-1.17v4.12h1.17ZM271.39,29.1h.94v5.58h-.94v-5.58ZM274.02,34.49v-.83c.54.21,1.09.31,1.65.31.47,0,.81-.05,1.02-.16.21-.11.32-.32.32-.62,0-.19-.04-.34-.13-.46s-.24-.21-.44-.29-.51-.17-.91-.28c-.6-.16-1.02-.35-1.26-.59s-.36-.57-.36-.99c0-.5.18-.88.55-1.16.36-.27.9-.41,1.59-.41.31,0,.6.02.89.06.29.04.52.1.7.16v.83c-.44-.17-.92-.25-1.46-.25-.44,0-.77.06-.99.17-.22.12-.33.31-.33.59,0,.17.04.3.12.4.08.1.21.19.4.27.19.08.47.16.84.25.65.17,1.11.38,1.36.65s.38.61.38,1.03c0,.5-.19.88-.56,1.16-.37.28-.92.42-1.64.42s-1.3-.09-1.74-.28ZM279.53,29.1h3.89v.74h-2.95v1.69h2.62v.73h-2.62v1.7h2.95v.73h-3.89v-5.58ZM284.95,29.1h.83l2.91,4.11v-4.11h.94v5.58h-.83l-2.9-4.1v4.1h-.95v-5.58ZM287.7,28.55c-.1-.03-.23-.08-.41-.14-.14-.05-.26-.09-.34-.12s-.17-.04-.26-.04c-.32,0-.57.1-.75.31v-.69c.08-.08.18-.14.32-.19s.28-.07.42-.07c.12,0,.22.01.33.04.1.03.22.07.37.13.13.05.25.09.34.12.09.03.19.04.29.04.3,0,.53-.11.69-.32v.69c-.06.08-.15.15-.27.2-.12.05-.26.07-.41.07-.11,0-.21-.01-.31-.04ZM291.86,34.07c-.44-.46-.65-1.19-.65-2.16s.22-1.74.65-2.2c.43-.46,1.1-.69,1.99-.69s1.56.23,1.99.69.65,1.2.65,2.2-.22,1.7-.65,2.16c-.44.47-1.1.7-1.99.7s-1.55-.23-1.99-.7ZM295.14,33.49c.27-.32.41-.85.41-1.58s-.13-1.29-.4-1.61c-.27-.32-.7-.48-1.29-.48s-1.02.16-1.29.48c-.27.32-.4.86-.4,1.61s.14,1.25.41,1.57.7.49,1.28.49,1.02-.16,1.29-.49ZM18.86.01c-.1,0-.2.05-.26.13l-6.74,9.24c-.5.69-1.9.69-2.41,0L2.78.28,2.62.01H.32C.15.01,0,.16,0,.34v18.87c0,.18.15.32.32.32h2.2c.18,0,.32-.15.32-.32v-10.12c0-.52.26-.84.79-.96.54-.13.94.03,1.2.47l5.13,6.56c.32.53,1.08.53,1.4,0l5.14-6.56c.26-.44.65-.6,1.18-.47.53.13.79.45.79.96v10.12c0,.18.15.32.32.32h2.2c.18,0,.32-.15.32-.32V.34c0-.18-.15-.32-.32-.32h-2.16ZM41.61.01h-2.69c-.13,0-.26.08-.33.2l-11.53,18.87c-.13.21-.02.45.22.45h2.36c.13,0,.26-.08.33-.2l1.91-3.14c.25-.41.62-.62,1.1-.62h8.76c.48,0,.78.21.87.62l.75,3.14c.03.12.13.2.26.2h2.34c.23,0,.43-.24.38-.45L41.87.21c-.03-.12-.13-.2-.26-.2ZM41.22,12.45c-.27.29-.59.44-.96.44h-4.77c-.38,0-.65-.15-.8-.44-.16-.3-.14-.61.07-.94l3.43-5.6c.25-.42.61-.64,1.09-.64s.77.22.88.64l1.35,5.6c.09.33,0,.64-.28.94ZM65.08,13.54c-.13-.16-.07-.39.11-.49,1.3-.66,2.32-1.63,3.07-2.93.15-.25.28-.52.39-.77.16-.34.29-.71.39-1.09.03-.1.05-.22.08-.33.09-.4.13-.81.13-1.24,0-3.21-2.45-5.88-5.73-6.5-.16-.03-.32-.06-.5-.07-.23-.02-.45-.05-.67-.06-.01-.01-.02-.01-.04,0-.12,0-.24,0-.36-.01h-7.33c-.18,0-.32.15-.32.32v18.86c0,.18.15.32.32.32h2.04c.18,0,.32-.15.32-.32v-4.37c0-.28.1-.52.29-.71.19-.19.43-.29.71-.29h3.51c.1,0,.19.04.25.12l4.37,5.45c.06.08.15.12.25.12h2.94c.27,0,.42-.32.25-.53l-4.49-5.49ZM62.07,2.72s.04-.01.06,0c.04-.01.08-.01.12-.01,2.29,0,4.14,1.9,4.14,4.24s-1.85,4.24-4.14,4.24c-.05,0-.11,0-.16-.01-.01.01-.02,0-.02,0-.15.01-.3.02-.46.02h-3.61c-.28,0-.52-.1-.71-.31-.19-.19-.29-.44-.29-.71V3.72c0-.28.1-.52.29-.72.19-.19.43-.3.71-.3h3.63c.15,0,.3,0,.44.01ZM77.59.34v18.81c0,.18.15.32.32.32h2.2c.18,0,.32-.15.32-.32V.34c0-.18-.15-.32-.32-.32h-2.2c-.18,0-.32.15-.32.32ZM101.8.01h-2.69c-.13,0-.26.08-.33.2l-11.53,18.87c-.13.21-.02.45.22.45h2.36c.13,0,.26-.08.33-.2l1.93-3.14c.25-.41.6-.62,1.09-.62h8.77c.47,0,.77.21.86.62l.75,3.14c.03.12.13.2.26.2h2.34c.23,0,.43-.24.38-.45L102.07.21c-.03-.12-.13-.2-.26-.2ZM101.42,12.45c-.27.29-.59.44-.97.44h-4.77c-.38,0-.64-.15-.8-.44-.15-.3-.13-.61.08-.94l3.42-5.6c.25-.42.62-.64,1.1-.64s.76.22.88.64l1.34,5.6c.09.33,0,.64-.27.94ZM128.96.01c-.18,0-.32.15-.32.32v12.04c0,.46-.23.78-.66.93-.44.16-.81.06-1.11-.29L115.85.13c-.06-.07-.15-.11-.25-.11h-1.93c-.18,0-.32.15-.32.32v18.87c0,.18.15.32.32.32h2.03c.18,0-.32-.15.32-.32V7.16c0-.46.22-.77.66-.93.43-.16.81-.06,1.1.29l11.04,12.89c.06.07.15.11.25.11h1.92c.18,0,.32-.15.32-.32V.34c0-.18-.15-.32-.32-.32h-2.03ZM151.55.01h-2.69c-.13,0-.26.08-.33.2l-11.53,18.87c-.13.21-.02.45.22.45h2.36c.13,0-.26-.08.33-.2l1.93-3.14c.25-.41.6-.62,1.09-.62h8.77c.48,0-.76.21.86.62l.75,3.14c.03.12.13.2.26.2h2.36c.23,0-.43-.24.38-.45L151.82.21c-.03-.12-.13-.2-.26-.2ZM151.18,12.45c-.27.29-.59.44-.97.44h-4.77c-.37,0-.64-.15-.8-.44-.15-.3-.13-.61.08-.94l3.43-5.6c.25-.42.61-.64,1.09-.64s.77.22.88.64l1.35,5.6c.08.33-.01.64-.28.94ZM171.6.34v2.04c0,.18.15.32.32.32h5.06c.3,0,.55.1.76.3s.31.42.31.7v15.5c0,.18.15.32.32.32h2.2c.18,0,.32-.15.32-.32V3.7c0-.28.1-.5.31-.7s.46-.3.74-.3h5.05c.18,0,.32-.15.32-.32V.34c0-.18-.15-.32-.32-.32h-15.09c-.18,0-.32.15-.32.32ZM198.26,2.98c.24-.19.51-.29.81-.29h7.88c.18,0,.35-.15.38-.32l.37-2.04c.03-.18-.09-.32-.27-.32h-11.47c-.18,0-.35.15-.38.32l-3.41,18.88c-.03.18.09.32.27.32h11.47c.18,0,.35-.15.38-.32l.37-2.04c.03-.18-.09-.32-.27-.32h-7.88c-.3,0-.53-.09-.7-.29-.17-.19-.23-.44-.18-.71l.67-3.7c.05-.28.2-.52.44-.71.24-.19.51-.29.81-.29h7.84c.18,0,.35-.15.38-.32l.37-2.04c.03-.18-.09-.32-.27-.32h-7.84c-.3,0-.53-.1-.7-.3-.17-.19-.23-.42-.18-.7l.68-3.77c.05-.28.19-.5.44-.7ZM223.2.01c-.18,0-.32.15-.32.32v12.45c0,.41-.1.85-.29,1.3-.19.44-.49.87-.87,1.3-.76.85-2.08,1.32-3.19,1.41-1.36.11-3.02-.3-3.93-1.38-.48-.57-1-1.42-1.12-2.18-.05-.23-.07-.37-.07-.45v-.5h-2.83v.5c0,.4.06.86.18,1.36.11.5.36,1.09.71,1.73.37.64.81,1.23,1.34,1.74,1.23,1.2,3.2,1.85,4.9,1.85,1.41,0,2.65-.19,3.72-.57,1.07-.39,1.9-.91,2.51-1.57.61-.65,1.05-1.36,1.35-2.12.29-.76.44-1.57.44-2.42V.34c0-.18-.15-.32-.32-.32h-2.2ZM245.24.01h-2.69c-.13,0-.26.08-.33.2l-11.53,18.87c-.13.21-.02.45.22.45h2.36c.13,0-.26-.08.33-.2l1.91-3.14c.26-.41.62-.62,1.1-.62h8.77c.47,0,.77.21.86.62l.75,3.14c.03.12.13.2.26.2h2.34c.23,0-.43-.24.38-.45L245.51.21c-.03-.12-.13-.2-.26-.2ZM244.87,12.45c-.28.29-.59.44-.97.44h-4.77c-.38,0-.64-.15-.8-.44-.15-.3-.13-.61.07-.94l3.43-5.6c.25-.42.62-.64,1.1-.64s.76.22.88.64l1.34,5.6c.09.33,0,.64-.27.94ZM271.78,2.87c-2.02-1.9-4.45-2.85-7.3-2.85h-6.27c-.18,0-.32.15-.32.32v18.84c0,.18.15.33.33.32l6.26-.02c1.88,0,3.61-.44,5.19-1.31,1.58-.87,2.83-2.05,3.76-3.54.92-1.49,1.38-3.13,1.38-4.89,0-2.68-1.01-4.97-3.03-6.88ZM271.95,10.44c-.17,1.78-1.01,3.29-2.5,4.53-1.49,1.23-3.23,1.85-5.21,1.85h-2.44c-.29,0-.54-.09-.74-.29-.21-.19-.31-.44-.31-.71V3.68c0-.28.1-.5.31-.7.21-.19.46-.29.74-.29h3.4s.04,0,.06,0c1.96.26,3.55,1.04,4.77,2.3,1.49,1.55,2.13,3.36,1.94,5.44ZM292.12.01h-2.69c-.13,0-.26.08-.33.2l-11.54,18.87c-.13.21-.02.45.22.45h2.38c.13,0-.26-.08.33-.2l1.91-3.14c.25-.41.62-.62,1.1-.62h8.76c.48,0-.76.21.87.62l.75,3.14c.03.12.13.2.26.20h2.34c.23,0-.43-.24.38-.45L292.38.21c-.03-.12-.13-.2-.26-.2ZM291.73,12.45c-.27.29-.59.44-.96.44h-4.78c-.37,0-.64-.15-.79-.44-.16-.3-.14-.61.07-.94l3.43-5.6c.25-.42.61-.64,1.09-.64s.77.22.88.64l1.35,5.6c.09.33-.01.64-.28.94Z"/>
                  </g>
                </svg>
              </div>
            </div>
            
            {/* Contact Column */}
            <div>
              <h3 className="text-sm font-dm-sans font-medium tracking-widest uppercase mb-4">
                Contacto
              </h3>
              <div className="space-y-2 text-sm font-dm-sans font-light text-gray-400">
                <p>+57 320 699 9403</p>
                <p>marianatejada@outlook.com</p>
                <p>Medellín, Colombia</p>
              </div>
            </div>
            
            {/* Social Column */}
            <div>
              <h3 className="text-sm font-dm-sans font-medium tracking-widest uppercase mb-4">
                Síguenos
              </h3>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
                  <span className="sr-only">Instagram</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
                  <span className="sr-only">LinkedIn</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
          
          <div className="mt-12 pt-8 border-t border-gray-800">
            <p className="text-xs font-dm-sans font-light text-gray-400 text-center">
              © 2024 Mariana Tejada Arquitectura y Diseño. Todos los derechos reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default HomePage;