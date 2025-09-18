"use client";
import React, { useEffect, useRef } from 'react'
import Image from 'next/image'
import Head from 'next/head';

export default function About() {
  const injectorVideoRef = useRef<HTMLVideoElement>(null)
  const hasPlayedRef = useRef(false)
  useEffect(() => {
    const handleScroll = () => {
      // Check if the shop exterior trigger is visible
      const triggerElement = document.getElementById('image-trigger')
      if (triggerElement) {
        const rect = triggerElement.getBoundingClientRect()
        const isVisible = rect.top < window.innerHeight * 0.5
        
                  if (isVisible) {
            // Trigger images with slight stagger
            const teamImageDesktop = document.getElementById('team-image-desktop')
            const teamImageMobile = document.getElementById('team-image-mobile')
            const shopImage = document.getElementById('image-trigger')
            const garageImage = document.getElementById('garage-image')
            
            // Shop image first (0ms delay)
            if (shopImage) shopImage.classList.add('visible')

            // Play the injector video once when visible
            if (injectorVideoRef.current && !hasPlayedRef.current) {
              try {
                injectorVideoRef.current.currentTime = 0
                injectorVideoRef.current.play()
                hasPlayedRef.current = true
              } catch (e) {
                // ignore autoplay errors
              }
            }
            
            // Team image second (200ms delay) - handle both desktop and mobile
            setTimeout(() => {
              if (teamImageDesktop) teamImageDesktop.classList.add('visible')
              if (teamImageMobile) teamImageMobile.classList.add('visible')
            }, 200)
            
            // Garage image third (400ms delay)
            setTimeout(() => {
              if (garageImage) garageImage.classList.add('visible')
            }, 400)
          }
      }
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  // Structured data for about page
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "AutoRepair",
    "name": "RZ Garage",
    "description": "Learn about RZ Garage - Portland's trusted auto repair shop with ASE certified mechanics. Family-owned business serving Portland since 1995 with honest pricing and quality service.",
    "url": "https://rzgarage.com/about",
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
    "foundingDate": "1995",
    "founder": {
      "@type": "Person",
      "name": "Tuan"
    },
    "employee": [
      {
        "@type": "Person",
        "name": "Tuan",
        "jobTitle": "Owner/Mechanic",
        "description": "ASE Certified Master Technician"
      }
    ]
  };

  return (
    <>
      <Head>
        <title>About RZ Garage Portland | ASE Certified Mechanics Since 1995 | (971) 990-9845</title>
        <meta name="description" content="Learn about RZ Garage - Portland's trusted auto repair shop with ASE certified mechanics. Family-owned business serving Portland since 1995 with honest pricing and quality service." />
        <meta name="keywords" content="about RZ Garage Portland, ASE certified mechanic Portland, auto repair shop Portland, family owned mechanic Portland, honest mechanic Portland" />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="About RZ Garage Portland" />
        <meta property="og:description" content="Learn about RZ Garage - Portland's trusted auto repair shop with ASE certified mechanics since 1995." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://rzgarage.com/about" />
        <meta property="og:image" content="/logo.png" />
        <link rel="canonical" href="https://rzgarage.com/about" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData)
          }}
        />
      </Head>
      <main className="bg-gray-100 overflow-x-hidden">
        {/* Hero Section */}
        <section className="relative min-h-[40vh] flex items-center justify-center overflow-hidden bg-black">
          {/* Background Image */}
          <div
            className="absolute inset-0 w-full h-full bg-cover bg-no-repeat about-hero-zoom-in"
            style={{
              backgroundImage: "url('/engine-hero.jpg')",
              backgroundPosition: 'center center',
            }}
          />
          {/* Dark Overlay */}
          <div className="absolute inset-0 z-10 bg-black bg-opacity-70" />
          {/* Content */}
          <div className="relative z-20 text-center text-white hero-text-scale-up">
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4 leading-tight drop-shadow-lg">
              ABOUT RZ GARAGE
            </h1>
            <p className="text-xl md:text-2xl font-semibold drop-shadow-lg">
              Caring for vehicles since 1998
            </p>
          </div>
        </section>

        {/* Main Content Section */}
        <section className="pt-16 pb-[50px] bg-white">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 lg:grid-rows-[auto_auto_auto] gap-x-12 gap-y-8 lg:gap-y-[50px] max-w-6xl mx-auto">
              {/* Left Column - About Us (Top Row) */}
              <div className="space-y-6 lg:col-start-1 lg:row-start-1 h-full lg:min-h-[520px] flex flex-col">
                <h2 className="text-3xl font-bold text-gray-800 mb-6">
                  RZ Garage Is Family Owned And Operated
                </h2>
                
                <div className="space-y-4 text-gray-700 leading-relaxed">
                  <p>
                    Complete auto repair and maintenance facility with 40 years combined experience caring for vehicles here in Portland since 1998.
                  </p>
                  
                  <p>
                    We service all makes and models - Import and domestic - of cars, trucks and SUVs... from oil changes to engine exchanges and everything in between.
                  </p>
                  
                  <p>
                    We also do classics, restoration, 4X4, offroad and performance upgrades and fabrication.
                  </p>
                  
                  <p>
                    We have the latest in automotive diagnostic equipment and expertise in air-conditioning, auto-electronics and vehicle emission requirements and repairs.
                  </p>
                </div>
                
                {/* Call to Action */}
                <div className="mt-auto p-4 bg-gray-100 card-angled overflow-hidden">
                  <p className="text-lg font-bold text-gray-800 text-center">
                    FULL SERVICE AUTO REPAIR AND MAINTENANCE
                  </p>
                  <p className="text-lg font-bold text-gray-800 text-center">
                    Call to schedule: (971) 990-9845
                  </p>
                </div>
                
              </div>

              {/* Right Column - Fair Pricing and Warranty (Top Row) */}
              <div className="space-y-6 lg:col-start-2 lg:row-start-1 h-full lg:min-h-[520px] flex flex-col">
                <div className="flex-1 flex flex-col">
                  <h3 className="text-2xl font-bold text-gray-800 mb-6">
                    Fair Pricing and a Comprehensive Warranty On All Repairs
                  </h3>
                  <div className="text-gray-700 leading-relaxed">
                    <p>
                      We understand that your car is not only one of your biggest investments, but that its dependable operation is a critical part of your family's life. With that in mind, we have straightforward, fair pricing, a comprehensive warranty on all repairs and strive to interact with our customers as if they were members of our own family.
                    </p>
                  </div>
                </div>
                
              {/* Shop Exterior Video - trigger */}
              <div className="w-full h-[306px] card-angled overflow-hidden mb-0 fade-in-from-right mt-auto relative" id="image-trigger">
                <video
                  ref={injectorVideoRef}
                  muted
                  playsInline
                  preload="metadata"
                  className="absolute inset-0 w-full h-full object-cover"
                >
                  <source src="/injector-clean.mp4" type="video/mp4" />
                </video>
              </div>
                
                {/* Team Image - Shown on mobile, hidden on desktop */}
                <div className="block lg:hidden w-full h-64 card-angled overflow-hidden fade-in-from-left relative" id="team-image-mobile">
                  <Image src="/dodge.jpg" alt="Dodge Grand Caravan 2018 Cluster replacement" fill sizes="100vw" className="object-cover" />
                </div>
              </div>

              {/* Bottom Row - Aligned Grey Boxes */}
              <div className="hidden lg:block w-full h-64 card-angled overflow-hidden fade-in-from-left lg:col-start-1 lg:row-start-2 mb-0 relative" id="team-image-desktop">
                <Image src="/dodge.jpg" alt="Dodge Grand Caravan 2018 Cluster replacement" fill sizes="50vw" className="object-cover" />
              </div>
              <div className="w-full h-64 card-angled overflow-hidden fade-in-from-right lg:col-start-2 lg:row-start-2 mb-0 relative" id="garage-image">
                <Image src="/alpha.jpg" alt="Alfa Romeo" fill sizes="50vw" className="object-cover" />
              </div>
              {/* Spacer Row to force 50px gap before footer on large screens */}
              <div className="hidden lg:block lg:col-span-2 lg:row-start-3 h-[25px]" aria-hidden />
            </div>
          </div>
        </section>
      </main>
    </>
  )
} 