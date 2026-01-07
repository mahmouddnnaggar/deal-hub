'use client';

/**
 * Brands Marquee - Infinite horizontal scrolling brand logos
 */

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { brandsApi } from '@/features/brands/api/brands.api';
import type { Brand } from '@/entities';

export function BrandsMarquee() {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const response = await brandsApi.getBrands({ limit: 20 });
        setBrands(response.data);
      } catch {
        // Silent fail - brands will remain empty
      } finally {
        setLoading(false);
      }
    };

    fetchBrands();
  }, []);

  if (loading || brands.length === 0) return null;

  // Duplicate brands array for seamless infinite scroll
  const duplicatedBrands = [...brands, ...brands, ...brands];

  return (
    <section className="relative py-2 overflow-hidden bg-background/50 backdrop-blur-sm">
      {/* Edge Fades for Smooth Entrance/Exit */}
      <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

      {/* Scrolling Container */}
      <div className="relative flex items-center">
        <motion.div
          className="flex gap-16 py-2 items-center"
          animate={{
            x: [0, -1 * (brands.length * 192)], // Adjusted for gap + width
          }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: brands.length * 4, // Slightly slower for better readability
              ease: "linear",
            },
          }}
        >
          {duplicatedBrands.map((brand, index) => (
            <div
              key={`${brand._id}-${index}`}
              className="flex-shrink-0 w-32 h-12 relative grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-500"
            >
              <Image
                src={brand.image}
                alt={brand.name}
                fill
                sizes="128px"
                className="object-contain"
              />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
