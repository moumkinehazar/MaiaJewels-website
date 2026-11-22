export function MaisonFooter() {
  return (
    <footer className="dark-surface w-full bg-[#0A0A0B] text-[#F2F2F4] py-[64px]">
      <div className="maia-grid-cap mx-auto px-4 sm:px-6 lg:px-10">
        <div className="grid grid-cols-1 min-[834px]:grid-cols-12 gap-[32px] min-[1069px]:gap-[48px] pb-[48px] border-b border-[#1C1C1E]">
          {/* Official Brand Emblem Lockup (>= 152px min width + clear space) */}
          <div className="min-[834px]:col-span-4 flex flex-col gap-4">
            <div className="inline-block w-fit p-3 border border-[#1C1C1E] bg-[#0A0A0B]">
              <img
                src="/assets/aistudio/WhatsApp_Image_2026-11-22_at_09.27.33_a2565fe3.jpeg"
                alt="Maia Jewels MJ crest"
                loading="lazy"
                referrerPolicy="no-referrer"
                className="w-[152px] h-auto block"
              />
            </div>
            <p className="text-[15px] leading-[1.47] text-[#C9C9CC] max-w-[340px]">
              MAIA is a modern jewelry brand for women aged 18–45, combining trendy designs, timeless elegance, and accessible luxury in gold and silver.
            </p>
          </div>

          {/* Brand Values & Navigation */}
          <div className="min-[834px]:col-span-4 flex flex-col gap-4">
            <h3 className="font-editorial text-[22px] text-[#F2F2F4]">
              Brand Pillars
            </h3>
            <p className="text-[15px] leading-[1.47] text-[#C9C9CC]">
              Confidence · Self-Expression · Elegance · Inclusivity · Self-Love · Innovation · Freedom · Femininity
            </p>
            <p className="text-[14px] text-[#C9C9CC]">
              All weights, millimeter proportions, and dispatch windows are verified per batch prior to hallmarking.
            </p>
          </div>

          {/* Site Anchors */}
          <div className="min-[834px]:col-span-4 flex flex-col gap-3">
            <h3 className="font-editorial text-[22px] text-[#F2F2F4]">
              Navigate Maia
            </h3>
            <nav aria-label="Footer navigation" className="flex flex-col gap-1">
              {[
                { label: 'Home', href: '#home' },
                { label: 'Collections', href: '#collections' },
                { label: 'Size guide', href: '#size-guide' },
                { label: 'Custom orders', href: '#custom-orders' },
              ].map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="inline-flex items-center min-h-[44px] text-[15px] text-[#C9C9CC] hover:text-[#F2F2F4]"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>
        </div>

        <div className="pt-[32px] flex flex-col min-[641px]:flex-row min-[641px]:items-center justify-between gap-4 text-[13px] text-[#C9C9CC]">
          <p>© 2026 Maia Jewels. All rights reserved.</p>
          <p>
            Catalog pricing, availability, and checkout/atelier inquiries operate on local demo data.
          </p>
        </div>
      </div>
    </footer>
  );
}
