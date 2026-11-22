import { Menu, ShoppingBag, X } from 'lucide-react';
import { useState } from 'react';

interface HeaderProps {
  cartCount: number;
  onOpenCart: () => void;
  onChooseJewelry: () => void;
}

export function Header({ cartCount, onOpenCart, onChooseJewelry }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'Collections', href: '#collections' },
    { label: 'Size guide', href: '#size-guide' },
    { label: 'Custom orders', href: '#custom-orders' },
  ];

  const handleNavClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-[#C9C9CC] bg-[#F2F2F4]/95 backdrop-blur-sm">
      <div className="maia-grid-cap mx-auto flex h-[68px] items-center justify-between gap-8 px-4 sm:px-6 lg:px-10">
        {/* Zone 1: Single-line Brand Wordmark linked to Home */}
        <a
          href="#home"
          onClick={handleNavClick}
          className="font-editorial text-[21px] tracking-[0.04em] text-[#0A0A0B] whitespace-nowrap shrink-0 hover:opacity-80 transition-opacity"
        >
          MAÏA JEWELS
        </a>

        {/* Zone 2: Desktop Navigation (>= 834px) */}
        <nav
          aria-label="Primary navigation"
          className="hidden min-[834px]:flex items-center gap-6 lg:gap-8 text-[15px] font-medium text-[#1C1C1E]"
        >
          {navLinks.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="relative py-2 whitespace-nowrap shrink-0 text-[#1C1C1E] hover:text-[#0A0A0B] after:absolute after:bottom-1 after:left-0 after:h-[1px] after:w-0 after:bg-[#0A0A0B] hover:after:w-full after:transition-[width] after:duration-200"
            >
              {item.label}
            </a>
          ))}
          <button
            type="button"
            onClick={onOpenCart}
            className="inline-flex items-center gap-2 py-2 min-h-[44px] whitespace-nowrap shrink-0 text-[#1C1C1E] hover:text-[#0A0A0B] cursor-pointer"
            aria-label={`Open shopping bag with ${cartCount} items`}
          >
            <ShoppingBag className="h-4 w-4" aria-hidden="true" />
            <span className="tabular-nums">Cart ({cartCount})</span>
          </button>
        </nav>

        {/* Zone 3: Primary Action on Desktop + Compact Controls <= 833px */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={() => {
              setMobileMenuOpen(false);
              onChooseJewelry();
            }}
            className="hidden min-[834px]:inline-flex maia-btn bg-[#0A0A0B] text-[#F2F2F4] hover:bg-[#1C1C1E] cursor-pointer"
          >
            Choose my jewelry
          </button>

          {/* Compact mobile/tablet controls (<= 833px) */}
          <button
            type="button"
            onClick={onOpenCart}
            className="min-[834px]:hidden inline-flex items-center justify-center gap-1.5 min-h-[44px] min-w-[44px] px-3 text-[14px] font-medium text-[#0A0A0B] hover:bg-[#E4E4E8] cursor-pointer"
            aria-label={`Cart, ${cartCount} items`}
          >
            <ShoppingBag className="h-4 w-4" aria-hidden="true" />
            <span className="tabular-nums">{cartCount}</span>
          </button>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="min-[834px]:hidden inline-flex items-center justify-center min-h-[44px] min-w-[44px] text-[#0A0A0B] border border-[#C9C9CC] bg-[#FFFFFF] hover:bg-[#EAEAEE] cursor-pointer"
            aria-expanded={mobileMenuOpen}
            aria-controls="compact-nav-drawer"
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          >
            {mobileMenuOpen ? (
              <X className="h-5 w-5" aria-hidden="true" />
            ) : (
              <Menu className="h-5 w-5" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {/* Compact Slide-Down Menu (<= 833px) */}
      {mobileMenuOpen && (
        <div
          id="compact-nav-drawer"
          className="min-[834px]:hidden border-t border-[#C9C9CC] bg-[#F2F2F4] px-4 py-4"
        >
          <nav aria-label="Mobile navigation" className="flex flex-col gap-1">
            {navLinks.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={handleNavClick}
                className="flex items-center min-h-[44px] px-2 text-[16px] font-medium text-[#0A0A0B] border-b border-[#C9C9CC]/50 hover:bg-[#E8E8EC]"
              >
                {item.label}
              </a>
            ))}
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenCart();
              }}
              className="flex items-center justify-between min-h-[44px] px-2 text-[16px] font-medium text-[#0A0A0B] border-b border-[#C9C9CC]/50 hover:bg-[#E8E8EC] text-left cursor-pointer"
            >
              <span>Cart</span>
              <span className="tabular-nums text-[#525257]">{cartCount} items</span>
            </button>
            <div className="pt-3">
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onChooseJewelry();
                }}
                className="maia-btn w-full bg-[#0A0A0B] text-[#F2F2F4] hover:bg-[#1C1C1E] cursor-pointer"
              >
                Choose my jewelry
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
