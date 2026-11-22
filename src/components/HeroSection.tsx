import { ArrowRight } from 'lucide-react';
import { useState } from 'react';

interface HeroSectionProps {
  onChooseJewelry: () => void;
}

export function HeroSection({ onChooseJewelry }: HeroSectionProps) {
  const [heroImgError, setHeroImgError] = useState(false);
  const [logoImgError, setLogoImgError] = useState(false);

  return (
    <section
      id="home"
      className="dark-surface w-full bg-[#0A0A0B] text-[#F2F2F4] border-b border-[#1C1C1E]"
    >
      <div className="maia-grid-cap mx-auto px-4 sm:px-6 lg:px-10 py-[48px] min-[736px]:py-[80px]">
        <div className="grid grid-cols-1 min-[834px]:grid-cols-12 gap-[32px] min-[1069px]:gap-[48px] items-stretch">
          {/* Editorial Copy Column */}
          <div className="min-[834px]:col-span-6 flex flex-col justify-between gap-[32px]">
            <div>
              {/* Official Maia Jewels Emblem — >= 152px min width with clear space per Brand Book */}
              <div className="mb-[32px] inline-block p-4 border border-[#1C1C1E] bg-[#0A0A0B]">
                {!logoImgError ? (
                  <img
                    src="/assets/aistudio/WhatsApp_Image_2026-11-22_at_09.27.33_a2565fe3.jpeg"
                    alt="Maia Jewels official silver MJ diamond emblem"
                    width={160}
                    height={160}
                    referrerPolicy="no-referrer"
                    onError={() => setLogoImgError(true)}
                    className="w-[152px] min-[834px]:w-[168px] h-auto block select-none"
                  />
                ) : (
                  <div className="w-[152px] h-[152px] flex items-center justify-center border border-[#6E6E73] text-[#F2F2F4] font-editorial text-2xl">
                    MJ
                  </div>
                )}
              </div>

              <p className="text-[13px] tracking-[0.14em] uppercase text-[#C9C9CC] mb-3">
                Maia Jewels · Fine Gold &amp; 925 Silver
              </p>

              <h1 className="fluid-h1 text-[#F2F2F4] mb-[24px]">
                Less Ordinary, More Maia
              </h1>

              <p className="max-w-[540px] text-[17px] leading-[1.47] text-[#C9C9CC] mb-[32px]">
                Modern gold and sterling silver jewelry crafted for women who move between quiet minimalism and unmistakable brilliance. Inspect macro stone geometry beside real worn proportions before choosing your exact fit.
              </p>

              <div className="flex flex-wrap items-center gap-[17px]">
                <button
                  type="button"
                  onClick={onChooseJewelry}
                  className="maia-btn bg-[#F2F2F4] text-[#0A0A0B] hover:bg-[#C9C9CC] cursor-pointer"
                >
                  <span>Choose my jewelry</span>
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </button>
                <a
                  href="#custom-orders"
                  className="maia-btn border border-[#6E6E73] text-[#F2F2F4] hover:border-[#F2F2F4] hover:bg-[#1C1C1E]"
                >
                  Custom orders
                </a>
              </div>
            </div>

            {/* Unboxed Metadata Line (Zero-Pill Discipline) */}
            <div className="pt-[24px] border-t border-[#1C1C1E] flex flex-wrap items-center gap-x-4 gap-y-2 text-[14px] text-[#C9C9CC] tabular-nums">
              <span>18k Vermeil · 925 Silver · 14k Solid</span>
              <span aria-hidden="true">·</span>
              <span>US 5–9 &amp; 15–19 cm Sizing</span>
              <span aria-hidden="true">·</span>
              <span>Verified 2–7 Day Dispatch</span>
            </div>
          </div>

          {/* Editorial Worn Photography Column */}
          <div className="min-[834px]:col-span-6 flex">
            <figure className="relative w-full overflow-hidden bg-[#1C1C1E] border border-[#1C1C1E] aspect-[4/3] min-[834px]:aspect-auto min-[834px]:min-h-[520px]">
              {!heroImgError ? (
                <img
                  src="/assets/brandbook/obj_229_1600x1600.png"
                  alt="Worn editorial study of Maia Jewels hand-chain, star eternity rings, and engraved gold bangles"
                  referrerPolicy="no-referrer"
                  onError={() => setHeroImgError(true)}
                  className="h-full w-full object-cover object-center"
                />
              ) : (
                <div className="h-full w-full flex flex-col items-center justify-center p-8 text-center bg-[#1C1C1E] text-[#C9C9CC]">
                  <span className="font-editorial text-2xl text-[#F2F2F4] mb-2">
                    Solstice Campaign Edition
                  </span>
                  <span className="text-[15px]">
                    18k Gold Vermeil Hand-Chain &amp; Engraved Bangles
                  </span>
                </div>
              )}
              <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#0A0A0B]/90 via-[#0A0A0B]/55 to-transparent p-[24px] pt-[48px]">
                <p className="text-[14px] text-[#F2F2F4] font-medium">
                  Solstice Campaign Look — Worn on 16.0 cm wrist &amp; US 7 ring band
                </p>
                <p className="text-[13px] text-[#C9C9CC] mt-1 tabular-nums">
                  Bridge chain 115 mm · Star eternity band 2.8 mm · Engraved bangle 5.5 mm
                </p>
              </figcaption>
            </figure>
          </div>
        </div>
      </div>
    </section>
  );
}
