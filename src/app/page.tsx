"use client";
import React, { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Head from 'next/head'

export default function Home() {
  const bgRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const shopHoursVideoRef = useRef<HTMLVideoElement>(null)
  const showcaseVideoRef = useRef<HTMLVideoElement>(null)
  const [hasPlayed, setHasPlayed] = useState(false)
  const [overlayFadeOut, setOverlayFadeOut] = useState(false)
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const topCardRef = useRef<HTMLDivElement>(null)
  const bottomCardRef = useRef<HTMLDivElement>(null)
  const wedgeLeftRef = useRef<HTMLDivElement>(null)
  const wedgeRightRef = useRef<HTMLDivElement>(null)
  const fairSectionRef = useRef<HTMLDivElement>(null)
  const fairHeadingRef = useRef<HTMLHeadingElement>(null)
  const fairHeadingWrapperRef = useRef<HTMLDivElement>(null)
  const carBgRef = useRef<HTMLDivElement>(null)
  const fairLayer1Ref = useRef<HTMLDivElement>(null)
  const fairLayer2Ref = useRef<HTMLDivElement>(null)
  const heroHeadingRef = useRef<HTMLHeadingElement>(null)
  const heroAnimationDoneRef = useRef<boolean>(false)
  const separationDoneRef = useRef<boolean>(false)

  // Structured data for SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "AutoRepair",
    "name": "RZ Garage",
    "description": "Trusted Portland auto repair shop with ASE certified mechanics. Honest pricing, same-day service for oil changes, brakes, engine repair and more.",
    "url": "https://tuansautoservice.com",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "1518 NE Killingsworth St",
      "addressLocality": "Portland",
      "addressRegion": "OR",
      "postalCode": "97211"
    },
    "telephone": "(971) 990-9845",
    "openingHours": "Mo-Fr 08:30-17:00",
    "priceRange": "$$",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "reviewCount": "101"
    },
    "areaServed": {
      "@type": "City",
      "name": "Portland, OR"
    },
    "serviceArea": {
      "@type": "GeoCircle",
      "geoMidpoint": {
        "@type": "GeoCoordinates",
        "latitude": "45.5152",
        "longitude": "-122.6784"
      },
      "geoRadius": "50000"
    }
  }

  useEffect(() => {
    // Trigger initial black overlay fade-out on mount
    const raf = requestAnimationFrame(() => setOverlayFadeOut(true))

    const handleScroll = () => {
      if (bgRef.current && videoRef.current) {
        // Parallax: move video at 40% of scroll speed
        const offset = window.scrollY * 0.4
        const isSmallScreen = window.innerWidth < 1280
        if (isSmallScreen) {
          videoRef.current.style.transform = 'translateY(0px)'
        } else {
          videoRef.current.style.transform = `translateY(${-15 + offset * 0.9}px)`
        }
      }
      
      // Visibility-based play/pause for videos
      const toggleVideoPlayback = (vid?: HTMLVideoElement | null) => {
        if (!vid) return
        const rect = vid.getBoundingClientRect()
        const visible = rect.top < window.innerHeight && rect.bottom > 0
        if (visible) {
          if (vid.paused) {
            void vid.play().catch(() => {})
          }
        } else {
          if (!vid.paused) {
            vid.pause()
          }
        }
      }
      toggleVideoPlayback(videoRef.current)
      toggleVideoPlayback(shopHoursVideoRef.current)
      toggleVideoPlayback(showcaseVideoRef.current)
      
      // Fade-in animation on scroll
      const fadeElements = document.querySelectorAll('.fade-in-trigger, .fade-in-from-right, .fade-in-from-bottom')
      fadeElements.forEach((element) => {
        const rect = element.getBoundingClientRect()
        const isVisible = rect.top < window.innerHeight * 0.9
        if (isVisible) {
          element.classList.add('visible')
        }
      })

      // If car background has faded in, attempt reveal (no scroll-based separation)
      if (carBgRef.current && carBgRef.current.classList.contains('visible')) {
        tryRevealAndSeparate()
      }

      // Wedge parallax in Fair Pricing: vertical drift at 1:1 with scroll, keep horizontal gap after separation
      const y = window.scrollY || 0
      const slowY = Math.round(y * 1.0)
      const GAP_PX = 1050
      const HALF_GAP = Math.round(GAP_PX / 2)
      const baseXLeft = separationDoneRef.current ? -HALF_GAP : 0
      const baseXRight = separationDoneRef.current ? HALF_GAP : 0
      if (wedgeLeftRef.current) {
        wedgeLeftRef.current.style.transform = `translate(${baseXLeft}px, ${slowY}px)`
      }
      if (wedgeRightRef.current) {
        wedgeRightRef.current.style.transform = `translate(${baseXRight}px, ${slowY}px)`
      }

      // Layered parallax for the section background: move upward on scroll
      if (fairLayer1Ref.current) {
        const t1 = Math.min(y * 0.20, 180)
        fairLayer1Ref.current.style.transform = `translateY(${-t1}px)`
      }
      if (fairLayer2Ref.current) {
        const t2 = Math.min(y * 0.28, 240)
        fairLayer2Ref.current.style.transform = `translateY(${-t2}px)`
      }
    }
    
    // Set initial position for mobile
    if (bgRef.current && videoRef.current && window.innerWidth < 1024) {
      videoRef.current.style.transform = 'translateY(0px)'
    }
    
    // Handle resize events
    const handleResize = () => {
      if (bgRef.current && videoRef.current) {
        const isSmallScreen = window.innerWidth < 1280
        if (isSmallScreen) {
          videoRef.current.style.transform = 'translateY(0px)'
        } else {
          videoRef.current.style.transform = 'translateY(0px)'
        }
      }
      // Keep the two cards heights in sync on resize
      if (topCardRef.current && bottomCardRef.current) {
        const topHeight = topCardRef.current.getBoundingClientRect().height
        bottomCardRef.current.style.minHeight = `${Math.ceil(topHeight)}px`
      }
    }
    
    window.addEventListener('scroll', handleScroll)
    window.addEventListener('resize', handleResize)
    // Initialize positions on mount

    // Initial sync of card heights on mount and after images load
    const syncHeights = () => {
      if (topCardRef.current && bottomCardRef.current) {
        const topHeight = topCardRef.current.getBoundingClientRect().height
        bottomCardRef.current.style.minHeight = `${Math.ceil(topHeight)}px`
      }
    }
    const rafSync = requestAnimationFrame(syncHeights)
    const images = topCardRef.current?.querySelectorAll('img') || []
    const imageLoadHandlers: Array<() => void> = []
    images.forEach((img) => {
      if (!img.complete) {
        const onLoad = () => syncHeights()
        imageLoadHandlers.push(onLoad)
        img.addEventListener('load', onLoad)
      }
    })
    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleResize)
      cancelAnimationFrame(raf)
      cancelAnimationFrame(rafSync)
      images.forEach((img, idx) => {
        const handler = imageLoadHandlers[idx]
        if (handler) img.removeEventListener('load', handler)
      })
    }
  }, [hasPlayed])

  // Start wedges together on load; coordinate separation after hero + car resolve
  useEffect(() => {
    // Together on initial render
    if (wedgeLeftRef.current) wedgeLeftRef.current.style.transform = 'translate(0, 0)'
    if (wedgeRightRef.current) wedgeRightRef.current.style.transform = 'translate(0, 0)'

    const onHeroEnd = () => {
      heroAnimationDoneRef.current = true
      tryRevealAndSeparate()
    }
    const heroEl = heroHeadingRef.current
    heroEl?.addEventListener('animationend', onHeroEnd)
    return () => heroEl?.removeEventListener('animationend', onHeroEnd)
  }, [])

  // Reveal heading and separate wedges once both conditions are satisfied
  const tryRevealAndSeparate = () => {
    if (separationDoneRef.current) return
    if (!heroAnimationDoneRef.current) return
    const GAP_PX = 1050
    const HALF_GAP = Math.round(GAP_PX / 2)
    const leftEl = wedgeLeftRef.current
    const rightEl = wedgeRightRef.current
    if (leftEl) {
      leftEl.style.transition = 'transform 900ms cubic-bezier(0.85, 0, 0.15, 1)'
    }
    if (rightEl) {
      rightEl.style.transition = 'transform 900ms cubic-bezier(0.85, 0, 0.15, 1)'
    }

    // After the initial open animation completes, remove transitions so scroll updates are 1:1 (no easing)
    const onWedgeTransitionEnd = () => {
      if (leftEl) leftEl.style.transition = 'none'
      if (rightEl) rightEl.style.transition = 'none'
      leftEl?.removeEventListener('transitionend', onWedgeTransitionEnd)
      rightEl?.removeEventListener('transitionend', onWedgeTransitionEnd)
    }
    leftEl?.addEventListener('transitionend', onWedgeTransitionEnd)
    rightEl?.addEventListener('transitionend', onWedgeTransitionEnd)

    if (leftEl) leftEl.style.transform = `translate(${-HALF_GAP}px, 0)`
    if (rightEl) rightEl.style.transform = `translate(${HALF_GAP}px, 0)`
    if (fairHeadingWrapperRef.current) fairHeadingWrapperRef.current.classList.add('visible')
    separationDoneRef.current = true
  }

  return (
    <>
      <Head>
        <title>RZ Garage - Portland Auto Repair | ASE Certified Mechanics | (971) 990-9845</title>
        <meta name="description" content="Trusted Portland auto repair shop with ASE certified mechanics. Honest pricing, same-day service for oil changes, brakes, engine repair and more. Located at 1518 NE Killingsworth St, Portland, Oregon." />
        <meta name="keywords" content="Portland auto repair, Portland mechanic, ASE certified, oil change Portland, brake repair Portland, engine repair Portland, honest mechanic Portland" />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="RZ Garage - Portland Auto Repair" />
        <meta property="og:description" content="Trusted Portland auto repair shop with ASE certified mechanics. Honest pricing, same-day service." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://tuansautoservice.com" />
        <meta property="og:image" content="/logo.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="RZ Garage - Portland Auto Repair" />
        <meta name="twitter:description" content="Trusted Portland auto repair shop with ASE certified mechanics." />
        <link rel="canonical" href="https://tuansautoservice.com" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData)
          }}
        />
      </Head>
      <main className="min-h-screen overflow-x-hidden">
      {/* Fixed background video layer behind the entire page */}
      <div ref={bgRef} className="fixed inset-0 w-full h-full pointer-events-none" style={{ zIndex: -2 }}>
        <video
          ref={videoRef}
          autoPlay
          muted
          playsInline
          loop
          className="w-full h-full object-cover"
          style={{ WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 160px)', maskImage: 'linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 160px)' }}
          onError={(e) => {
            console.log('Video failed to load:', e);
          }}
        >
          <source src="/hero-video8.mp4" type="video/mp4" />
        </video>
      </div>
      {/* Global dark gradient overlay over video */}
      <div className="fixed inset-0 pointer-events-none" style={{ zIndex: -1, background: 'linear-gradient(to right, rgba(0,0,0,0.7), rgba(0,0,0,0.25))' }} />
      {/* Global top fade to soften the video's top edge on scroll */}
      <div className="fixed left-0 right-0 top-0 h-28 pointer-events-none" style={{ zIndex: -1, background: 'linear-gradient(to bottom, rgba(0,0,0,0.6), rgba(0,0,0,0))' }} />
      {/* Global black overlay fade on first load (matches hero) */}
      <div className={`fixed inset-0 pointer-events-none transition-opacity duration-1000 ${overlayFadeOut ? 'opacity-0' : 'opacity-100'}`} style={{ zIndex: -1, backgroundColor: 'black' }} />
      {/* Hero Section with Video Background */}
      <section className="relative min-h-[60vh] md:h-[50vh] flex items-center justify-center overflow-hidden">
        {/* Content */}
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between w-full max-w-5xl px-6">
          <div className="flex-1 text-center md:text-left">
            <h1 ref={heroHeadingRef} className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold mb-4 leading-tight hero-heading-slide-in-right" style={{ color: 'rgb(255, 255, 255)', textShadow: '0 2px 0 rgba(0, 0, 0, 0.75)' }}>
              Full Service Auto Repair and Maintenance
            </h1>
            <p className="text-lg md:text-xl mb-4 font-semibold drop-shadow-lg" style={{ color: 'rgb(255, 255, 255)' }}>
            1518 NE Killingsworth St Portland, Oregon <br /> Phone: (971) 990-9845
            </p>
            
            <span className="btn-wrapper btn-outline-thin mt-2">
              <a
                href="/contact"
                className="inline-block font-bold py-3 px-6 text-lg transition-colors duration-200 btn-angled"
              >
                Contact Us!
              </a>
            </span>
          </div>
          {/* ASE Badge Placeholder */}
          <div className="flex-1 flex justify-center md:justify-end mt-8 md:mt-0">
            <div className="flex items-center justify-center">
              <Image src="/ase-certified.png" alt="ASE Certified" width={150} height={150} />
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section ref={fairSectionRef} className="relative overflow-visible py-16">
        {/* Background duplicate layers behind clipped background */}
        <div
          ref={fairLayer1Ref}
          aria-hidden="true"
          className="absolute left-0 right-0 pointer-events-none"
          style={{
            top: -40,
            bottom: -300,
            background: 'linear-gradient(to top, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0) 100%)',
            zIndex: 0,
            clipPath: 'polygon(0 100%, 100% 100%, 100% 0, 60% 20%, 40% 20%, 0 0)',
            WebkitClipPath: 'polygon(0 100%, 100% 100%, 100% 0, 60% 20%, 40% 20%, 0 0)',
            willChange: 'transform',
          }}
        />
        <div
          ref={fairLayer2Ref}
          aria-hidden="true"
          className="absolute left-0 right-0 pointer-events-none"
          style={{
            top: -75,
            bottom: -300,
            background: 'linear-gradient(to top, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0) 100%)',
            zIndex: -1,
            clipPath: 'polygon(0 100%, 100% 100%, 100% 0, 60% 20%, 40% 20%, 0 0)',
            WebkitClipPath: 'polygon(0 100%, 100% 100%, 100% 0, 60% 20%, 40% 20%, 0 0)',
            willChange: 'transform',
          }}
        />
        {/* Static clipped background (matches main header clip) */}
        <div
          className="header-clip absolute inset-0"
          style={{
            background: 'linear-gradient(to top, rgb(0, 0, 0) 0%, rgb(127, 29, 29) 100%)',
            zIndex: 1,
            clipPath: 'polygon(0 100%, 100% 100%, 100% 0, 60% 50%, 40% 50%, 0 0)',
            WebkitClipPath: 'polygon(0 100%, 100% 100%, 100% 0, 60% 50%, 40% 50%, 0 0)',
          }}
        />
        <div className="relative z-10 container mx-auto px-4">
          <div ref={fairHeadingWrapperRef} className="fade-in-from-bottom pt-[130px] md:pt-[160px]">
            <h2 ref={fairHeadingRef} className="text-2xl md:text-3xl font-extrabold mb-4 leading-tight drop-shadow-lg text-center" style={{ color: 'rgb(255, 255, 255)' }}>Fair Pricing And A Comprehensive Warranty On All Repairs</h2>
          </div>
          
        </div>
      </section>

      {/* Three Column Info Section */}
      <section className="relative z-20 py-16" style={{ background: 'linear-gradient(to bottom, rgb(0, 0, 0), rgb(127, 29, 29))' }}>
        <div className="container mx-auto px-4">
          <div ref={topCardRef} className="shadow-lg p-6 md:p-10">
            <div className="grid md:grid-cols-3 gap-8">
            {/* Left Section - Repair and Maintenance */}
            <div className="text-center">
              <div className="mb-6 card-angled overflow-hidden fade-in-trigger relative h-48">
                {/* Toyota Land Cruiser image */}
                <Image 
                  src="/porsche.jpg" 
                  alt="Toyota Land Cruiser - Repair and Maintenance" 
                  fill
                  sizes="100vw"
                  className="object-cover cursor-pointer hover:opacity-50 transition-opacity glow-magenta"
                  onClick={() => setSelectedImage("/porsche.jpg")}
                />
              </div>
              <h3 className="text-xl font-bold mb-4" style={{ color: 'rgb(255, 255, 255)' }}>Repair and Maintenance</h3>
              <p className="text-sm leading-relaxed" style={{ color: 'rgb(255, 255, 255)' }}>
                We service all makes and models - import and domestic - of cars, trucks and SUVs... from oil changes to engine exchanges and everything in between.
              </p>
            </div>

            {/* Middle Section - Family Owned and Operated */}
            <div className="text-center">
              <div className="mb-6 card-angled overflow-hidden fade-in-trigger delay-500 relative h-48">
                {/* Team image */}
                <Image 
                  src="/team-placeholder copy.png" 
                  alt="RZ Garage Team" 
                  fill
                  sizes="100vw"
                  className="object-cover cursor-pointer hover:opacity-50 transition-opacity glow-magenta"
                  onClick={() => setSelectedImage("/team-placeholder copy.png")}
                />
              </div>
              <h3 className="text-xl font-bold mb-4" style={{ color: 'rgb(255, 255, 255)' }}>Family Owned and Operated</h3>
              <p className="text-sm leading-relaxed" style={{ color: 'rgb(255, 255, 255)' }}>
                Complete auto repair and maintenance facility with 40 years combined experience caring for vehicles here in Portland since 1998.
              </p>
            </div>

            {/* Right Section - Business Hours */}
            <div className="text-center">
              <div className="mb-6 card-angled overflow-hidden fade-in-trigger delay-1000 relative h-48">
                {/* Shop image */}
                <Image 
                  src="/engine_out.jpg" 
                  alt="RZ Garage Shop" 
                  fill
                  sizes="100vw"
                  className="object-cover cursor-pointer hover:opacity-50  transition-opacity glow-magenta"
                  onClick={() => setSelectedImage("/engine_out.jpg")}
                />
              </div>
              <h3 className="text-xl font-bold mb-4" style={{ color: 'rgb(255, 255, 255)' }}>Business Hours</h3>
              <div className="text-sm leading-relaxed" style={{ color: 'rgb(255, 255, 255)' }}>
                <p className="mb-2">Mon-Fri: 8:30 AM - 5:00 PM</p>
                <p className="mb-2">Sat-Sun: Closed</p>
                <p className="font-semibold">Call to schedule: (971) 990-9845</p>
              </div>
            </div>
            </div>
          </div>
        </div>
      </section>

      {/* Dark Header Section */}
      <section className="pt-4 pb-8 -mt-10" style={{ background: 'linear-gradient(to bottom, rgb(127, 29, 29),rgb(127, 29, 29), rgb(0, 0, 0))' }}>
        <div className="container mx-auto px-4">
          <div ref={bottomCardRef} className="relative shadow-lg p-6 md:p-10 overflow-hidden card-angled-br">
            {/* Background video fills card */}
            <div className="absolute inset-0">
              <div
                ref={carBgRef}
                className="absolute inset-0 fade-in-from-bottom"
              >
                <video
                  ref={showcaseVideoRef}
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="absolute inset-0 w-full h-full object-cover"
                >
                  <source src="/shop_bmws.mp4" type="video/mp4" />
                </video>
              </div>
              {/* Gradient to keep left side readable - use brand light blue */}
              <div
                className="absolute inset-0"
                style={{ background: 'linear-gradient(to right, rgba(127, 29, 29), rgba(74, 162, 192, 0))' }}
              />
            </div>
            {/* Content */}
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between">
              {/* Left Side - Text */}
              <div className="flex-1 mb-8 md:mb-0">
                <h2 className="text-3xl md:text-4xl font-bold leading-tight" style={{ color: 'rgb(255, 255, 255)' }}>
                  Classics, restoration, 4X4, offroad<br />
                  and performance upgrades and<br />
                  fabrication
                </h2>
              </div>
              {/* Right Side - Spacer to preserve layout on large screens */}
              <div className="hidden md:block flex-1" />
            </div>
          </div>
        </div>
      </section>

      {/* Customer Review Section */}
      <section className="py-16" style={{ background: 'linear-gradient(to bottom, rgb(131, 136, 132) 0%, rgb(200, 205, 202) 35%, rgb(235, 237, 236) 100%)' }}>
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            {/* Quote Icon */}
            <div className="text-6xl mb-8" style={{ color: 'rgb(30, 46, 67)' }}>"</div>
            
            {/* Review Text */}
            <blockquote className="text-lg md:text-xl leading-relaxed mb-8 text-left" style={{ color: 'rgb(30, 46, 67)' }}>
            Located in the heart of Portland, OR, RZ Garage stands out as a reliable destination for all your car repair needs. From routine maintenance to complex diagnostics, this auto repair shop offers a wide range of services to keep your vehicle running smoothly on the road. With a team of experienced technicians at the helm, you can trust that your car is in good hands when you bring it to RZ Garage. <br /> <br />
            What sets RZ Garage apart is their dedication to providing top-notch customer service alongside expert mechanical work. Whether you're dealing with a pesky check engine light or need a quick tune-up, the staff here is known for their friendly approach and willingness to go the extra mile for every customer. Next time your car needs attention, consider paying a visit to RZ Garage for a seamless and stress-free experience.
            </blockquote>
            
            {/* Review Source */}
            {/*<p className="text-sm text-gray-600 mb-8">Review posted on hellophoenix.com</p>*/}
            
            {/* More Reviews Button */}
            <span className="btn-wrapper">
              <a 
                href="/reviews" 
                className="inline-block font-bold py-3 px-8 transition-colors duration-200 btn-angled"
              >
                Our Work
              </a>
            </span>
          </div>
        </div>
      </section>

    </main>

    {/* Image Modal */}
    {selectedImage && (
      <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4">
        <div className="relative max-w-4xl max-h-full">
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute -top-12 right-0 text-white text-4xl font-bold hover:text-gray-300 transition-colors z-10"
          >
            ×
          </button>
          <img
            src={selectedImage}
            alt="Enlarged view"
            className="w-full h-auto max-h-[90vh] object-contain rounded-lg"
          />
        </div>
      </div>
    )}
    </>
  )
} 