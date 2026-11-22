import { Check, Search, SlidersHorizontal, Sparkles } from 'lucide-react';
import { useMemo, useRef, useState } from 'react';
import {
  CustomSpecContext,
  JEWELRY_COLLECTION,
  JewelryCategory,
  JewelryPiece,
  METAL_OPTIONS,
  MetalOption,
  SizeOption,
} from '../data/jewelryCatalog';
import { SizeMeasurementGuide } from './SizeMeasurementGuide';
import { ZoomGallery } from './ZoomGallery';

interface CollectionStudioProps {
  selectedPieceId: string;
  onSelectPiece: (pieceId: string) => void;
  selectedMetal: MetalOption;
  onSelectMetal: (metal: MetalOption) => void;
  selectedSizeIndex: number;
  onSelectSizeIndex: (index: number) => void;
  onAddToCart: (piece: JewelryPiece, metal: MetalOption, size: SizeOption) => void;
  onPassToCustomOrder: (ctx: CustomSpecContext) => void;
}

const CATEGORIES: ('All' | JewelryCategory)[] = [
  'All',
  'Rings',
  'Bracelets',
  'Necklaces',
  'Ear Stacks',
];

export function CollectionStudio({
  selectedPieceId,
  onSelectPiece,
  selectedMetal,
  onSelectMetal,
  selectedSizeIndex,
  onSelectSizeIndex,
  onAddToCart,
  onPassToCustomOrder,
}: CollectionStudioProps) {
  const [activeCategory, setActiveCategory] = useState<'All' | JewelryCategory>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [addedFeedback, setAddedFeedback] = useState(false);
  const workbenchRef = useRef<HTMLDivElement | null>(null);

  const filteredPieces = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return JEWELRY_COLLECTION.filter((piece) => {
      const matchesCat = activeCategory === 'All' || piece.category === activeCategory;
      const matchesQuery =
        q === '' ||
        piece.name.toLowerCase().includes(q) ||
        piece.subtitle.toLowerCase().includes(q) ||
        piece.materials.toLowerCase().includes(q);
      return matchesCat && matchesQuery;
    });
  }, [activeCategory, searchQuery]);

  const activePiece =
    JEWELRY_COLLECTION.find((p) => p.id === selectedPieceId) ?? JEWELRY_COLLECTION[0];
  const safeSizeIndex =
    selectedSizeIndex < activePiece.sizes.length ? selectedSizeIndex : activePiece.defaultSizeIndex;
  const activeSize = activePiece.sizes[safeSizeIndex] ?? activePiece.sizes[0];

  const finalPrice = Math.max(95, activePiece.basePrice + selectedMetal.priceDelta);
  const computedLeadTime =
    selectedMetal.id === 'solid-gold-14k'
      ? '7–12 business days (14k atelier cast)'
      : activePiece.leadTime;

  const handleChooseCard = (piece: JewelryPiece) => {
    onSelectPiece(piece.id);
    onSelectSizeIndex(piece.defaultSizeIndex);
    setAddedFeedback(false);
    workbenchRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleAdd = () => {
    onAddToCart(activePiece, selectedMetal, activeSize);
    setAddedFeedback(true);
    window.setTimeout(() => setAddedFeedback(false), 2400);
  };

  const handleCustomOrderClick = () => {
    onPassToCustomOrder({
      pieceId: activePiece.id,
      pieceName: activePiece.name,
      category: activePiece.category,
      metal: selectedMetal,
      size: activeSize,
      unitPrice: finalPrice,
      syncedAt: Date.now(),
    });
  };

  return (
    <section
      id="collections"
      className="maia-section w-full bg-[#F2F2F4] text-[#0A0A0B] border-b border-[#C9C9CC]"
    >
      <div className="maia-grid-cap mx-auto px-4 sm:px-6 lg:px-10">
        {/* Section Headline Block (64px above / 48-64px below on desktop) */}
        <div className="maia-section-heading maia-text-cap">
          <p className="text-[13px] tracking-[0.12em] uppercase text-[#525257] mb-3">
            01. Signature Collection
          </p>
          <h2 className="fluid-h2 text-[#0A0A0B] mb-4">
            Macro Precision, Worn Proportion
          </h2>
          <p className="text-[17px] leading-[1.47] text-[#1C1C1E]">
            Every Maia piece pairs high-magnification stone clarity with true-to-life scale on skin. Select any silhouette below to inspect macro detail, verify your size, or pass your exact metal and fit into a custom atelier inquiry.
          </p>
        </div>

        {/* Category Tabs + Search Filter */}
        <div className="flex flex-col min-[834px]:flex-row min-[834px]:items-center justify-between gap-[17px] mb-[32px]">
          <div
            role="tablist"
            aria-label="Filter jewelry by category"
            className="flex flex-wrap items-center gap-2"
          >
            {CATEGORIES.map((category) => {
              const active = activeCategory === category;
              return (
                <button
                  key={category}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => setActiveCategory(category)}
                  className={`maia-btn border cursor-pointer ${
                    active
                      ? 'bg-[#0A0A0B] text-[#F2F2F4] border-[#0A0A0B]'
                      : 'bg-[#FFFFFF] text-[#1C1C1E] border-[#C9C9CC] hover:border-[#0A0A0B]'
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>

          <div className="relative w-full min-[834px]:w-[300px]">
            <label htmlFor="collection-search" className="sr-only">
              Search jewelry pieces
            </label>
            <Search
              className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#525257]"
              aria-hidden="true"
            />
            <input
              id="collection-search"
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search stone, cuff, or metal..."
              className="w-full min-h-[44px] pl-10 pr-4 bg-[#FFFFFF] border border-[#C9C9CC] text-[15px] text-[#0A0A0B] placeholder:text-[#525257]"
            />
          </div>
        </div>

        {/* Product Grid: 1 col <= 640px, 2 cols 641px-1068px, 3 cols >= 1069px */}
        {filteredPieces.length === 0 ? (
          <div className="border border-[#C9C9CC] bg-[#FFFFFF] p-[32px] text-center mb-[48px]">
            <p className="font-editorial text-[24px] text-[#0A0A0B] mb-2">
              No pieces match &ldquo;{searchQuery}&rdquo;
            </p>
            <p className="text-[17px] text-[#525257] mb-[24px]">
              Clear the search filter or view all Maia Jewels silhouettes.
            </p>
            <button
              type="button"
              onClick={() => {
                setActiveCategory('All');
                setSearchQuery('');
              }}
              className="maia-btn bg-[#0A0A0B] text-[#F2F2F4] cursor-pointer"
            >
              Reset collection filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 min-[641px]:grid-cols-2 min-[1069px]:grid-cols-3 gap-[24px] mb-[48px] min-[834px]:mb-[64px]">
            {filteredPieces.map((piece) => {
              const isSelected = piece.id === activePiece.id;
              const primaryFrame = piece.frames[0];
              const cardPrice = Math.max(95, piece.basePrice + selectedMetal.priceDelta);
              return (
                <article
                  key={piece.id}
                  className={`flex flex-col justify-between border bg-[#FFFFFF] p-[24px] transition-[border-color,transform] duration-200 ${
                    isSelected
                      ? 'border-[#0A0A0B] ring-1 ring-[#0A0A0B]'
                      : 'border-[#C9C9CC] hover:border-[#6E6E73]'
                  }`}
                >
                  <div>
                    <div className="aspect-[4/3] w-full overflow-hidden bg-[#1C1C1E] mb-[24px] border border-[#C9C9CC]/40">
                      <img
                        src={primaryFrame.src}
                        alt={primaryFrame.alt}
                        loading="lazy"
                        referrerPolicy="no-referrer"
                        className="h-full w-full object-cover transition-transform duration-300 hover:scale-[1.03]"
                      />
                    </div>

                    {/* Clean unboxed metadata (Zero-Pill Discipline) */}
                    <div className="flex items-center gap-2 text-[12px] uppercase tracking-[0.06em] text-[#525257] mb-2">
                      <span>{piece.category}</span>
                      <span aria-hidden="true">·</span>
                      <span>{piece.availability}</span>
                    </div>

                    <h3 className="font-editorial text-[22px] leading-[1.2] text-[#0A0A0B] mb-2">
                      {piece.name}
                    </h3>

                    <p className="text-[15px] leading-[1.47] text-[#525257] mb-[17px]">
                      {piece.subtitle}
                    </p>
                  </div>

                  <div className="pt-[17px] border-t border-[#C9C9CC] flex items-center justify-between gap-3">
                    <span className="text-[17px] font-semibold text-[#0A0A0B] tabular-nums">
                      ${cardPrice}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleChooseCard(piece)}
                      className={`maia-btn cursor-pointer ${
                        isSelected
                          ? 'bg-[#0A0A0B] text-[#F2F2F4]'
                          : 'border border-[#0A0A0B] text-[#0A0A0B] hover:bg-[#0A0A0B] hover:text-[#F2F2F4]'
                      }`}
                    >
                      {isSelected ? 'Inspecting now' : 'Inspect & select'}
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        )}

        {/* Contiguous Inspection, Purchase & Size Studio (40px gap between imagery and text on desktop) */}
        <div
          id="studio-workbench"
          ref={workbenchRef}
          className="scroll-mt-[88px] border border-[#C9C9CC] bg-[#FFFFFF] p-[24px] min-[834px]:p-[32px]"
        >
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#C9C9CC] pb-[24px] mb-[32px]">
            <div className="flex items-center gap-2 text-[13px] uppercase tracking-[0.08em] text-[#525257]">
              <SlidersHorizontal className="h-4 w-4 text-[#0A0A0B]" aria-hidden="true" />
              <span>Piece Studio &amp; Scale Configurator</span>
              <span aria-hidden="true">·</span>
              <span className="tabular-nums">{activePiece.skuPrefix}</span>
            </div>
            <span className="text-[14px] text-[#525257] tabular-nums">
              Verified Lead Time: <strong className="text-[#0A0A0B] font-medium">{computedLeadTime}</strong>
            </span>
          </div>

          <div className="grid grid-cols-1 min-[1069px]:grid-cols-12 gap-[32px] min-[1069px]:gap-[40px] items-start">
            {/* Left Column: Macro & Worn Zoom Gallery */}
            <div className="min-[1069px]:col-span-5">
              <ZoomGallery
                pieceName={activePiece.name}
                frames={activePiece.frames}
                wornScaleRef={activePiece.wornScaleRef}
              />
            </div>

            {/* Right Column: Metal Variant + Side-by-Side Size Selector & Measurement Guide + Specs */}
            <div className="min-[1069px]:col-span-7 flex flex-col gap-[24px]">
              {/* Title & Price Header */}
              <div className="border-b border-[#C9C9CC] pb-[24px]">
                <div className="flex flex-wrap items-baseline justify-between gap-4 mb-2">
                  <h3 className="font-editorial text-[28px] min-[834px]:text-[34px] leading-[1.15] text-[#0A0A0B]">
                    {activePiece.name}
                  </h3>
                  <span className="text-[24px] font-semibold text-[#0A0A0B] tabular-nums">
                    ${finalPrice}
                  </span>
                </div>
                <p className="text-[17px] leading-[1.47] text-[#1C1C1E]">
                  {activePiece.description}
                </p>
              </div>

              {/* Metal Variant Selector */}
              <div>
                <div className="flex items-baseline justify-between gap-2 mb-3">
                  <span className="text-[14px] font-semibold uppercase tracking-[0.06em] text-[#0A0A0B]">
                    1. Metal Finish
                  </span>
                  <span className="text-[14px] text-[#525257]">{selectedMetal.name}</span>
                </div>

                <div className="grid grid-cols-1 min-[641px]:grid-cols-3 gap-[12px]">
                  {METAL_OPTIONS.map((metal) => {
                    const active = metal.id === selectedMetal.id;
                    return (
                      <button
                        key={metal.id}
                        type="button"
                        onClick={() => onSelectMetal(metal)}
                        aria-pressed={active}
                        className={`min-h-[44px] p-3 text-left border flex items-start gap-3 cursor-pointer transition-colors ${
                          active
                            ? 'border-[#0A0A0B] bg-[#F2F2F4] ring-1 ring-[#0A0A0B]'
                            : 'border-[#C9C9CC] bg-[#FFFFFF] hover:border-[#6E6E73]'
                        }`}
                      >
                        <span
                          className="mt-1 h-4 w-4 shrink-0 border border-[#0A0A0B]/30"
                          style={{ backgroundColor: metal.swatchHex }}
                          aria-hidden="true"
                        />
                        <span className="min-w-0">
                          <span className="block text-[14px] font-semibold text-[#0A0A0B]">
                            {metal.shortName}
                          </span>
                          <span className="block text-[12px] text-[#525257] tabular-nums">
                            {metal.priceDelta === 0
                              ? 'Included'
                              : metal.priceDelta > 0
                                ? `+$${metal.priceDelta}`
                                : `-$${Math.abs(metal.priceDelta)}`}
                          </span>
                        </span>
                      </button>
                    );
                  })}
                </div>
                <p className="text-[13px] text-[#525257] mt-2">
                  {selectedMetal.composition} ({selectedMetal.leadTimeNote})
                </p>
              </div>

              {/* Size Selector Placed Directly BESIDE the Measurement Guide */}
              <div className="grid grid-cols-1 min-[834px]:grid-cols-12 gap-[24px] items-start">
                <div className="min-[834px]:col-span-5 flex flex-col gap-3">
                  <div className="flex items-baseline justify-between gap-2">
                    <span className="text-[14px] font-semibold uppercase tracking-[0.06em] text-[#0A0A0B]">
                      2. Select Size
                    </span>
                    <span className="text-[13px] text-[#525257] tabular-nums">
                      {activeSize.label}
                    </span>
                  </div>

                  <div className="flex flex-col gap-2" role="radiogroup" aria-label="Jewelry size options">
                    {activePiece.sizes.map((size, idx) => {
                      const active = idx === safeSizeIndex;
                      return (
                        <button
                          key={size.label}
                          type="button"
                          role="radio"
                          aria-checked={active}
                          onClick={() => onSelectSizeIndex(idx)}
                          className={`min-h-[44px] px-4 py-2.5 text-left border flex items-center justify-between gap-2 cursor-pointer transition-colors ${
                            active
                              ? 'border-[#0A0A0B] bg-[#0A0A0B] text-[#F2F2F4]'
                              : 'border-[#C9C9CC] bg-[#FFFFFF] text-[#0A0A0B] hover:border-[#0A0A0B]'
                          }`}
                        >
                          <span className="text-[15px] font-medium">{size.label}</span>
                          <span
                            className={`text-[13px] tabular-nums ${
                              active ? 'text-[#C9C9CC]' : 'text-[#525257]'
                            }`}
                          >
                            {size.metricValue}
                          </span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Primary & Custom Order Action Stack */}
                  <div className="pt-2 flex flex-col gap-3">
                    <button
                      type="button"
                      onClick={handleAdd}
                      className="maia-btn w-full bg-[#0A0A0B] text-[#F2F2F4] hover:bg-[#1C1C1E] cursor-pointer"
                    >
                      {addedFeedback ? (
                        <>
                          <Check className="h-4 w-4" aria-hidden="true" />
                          <span>Added to Cart — ${finalPrice}</span>
                        </>
                      ) : (
                        <span>Add to Bag — ${finalPrice}</span>
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={handleCustomOrderClick}
                      className="maia-btn w-full border border-[#0A0A0B] bg-[#FFFFFF] text-[#0A0A0B] hover:bg-[#F2F2F4] cursor-pointer"
                    >
                      <Sparkles className="h-4 w-4" aria-hidden="true" />
                      <span>Inquire Custom Sizing / Stone</span>
                    </button>
                  </div>
                </div>

                {/* Adjacent Measurement Guide */}
                <div className="min-[834px]:col-span-7">
                  <SizeMeasurementGuide
                    category={activePiece.category}
                    selectedSize={activeSize}
                  />
                </div>
              </div>

              {/* Project Data Specifications Grid */}
              <div className="border-t border-[#C9C9CC] pt-[24px]">
                <h4 className="text-[14px] font-semibold uppercase tracking-[0.06em] text-[#0A0A0B] mb-4">
                  Specifications, Care &amp; Verified Lead Times
                </h4>
                <dl className="grid grid-cols-1 min-[641px]:grid-cols-2 gap-x-[24px] gap-y-[17px] text-[15px]">
                  <div>
                    <dt className="text-[13px] uppercase tracking-[0.05em] text-[#525257] mb-0.5">
                      Materials
                    </dt>
                    <dd className="text-[#0A0A0B]">{activePiece.materials}</dd>
                  </div>
                  <div>
                    <dt className="text-[13px] uppercase tracking-[0.05em] text-[#525257] mb-0.5">
                      Dimensions &amp; Gauge
                    </dt>
                    <dd className="text-[#0A0A0B] tabular-nums">{activePiece.dimensions}</dd>
                  </div>
                  <div>
                    <dt className="text-[13px] uppercase tracking-[0.05em] text-[#525257] mb-0.5">
                      Available Sizes &amp; Weight
                    </dt>
                    <dd className="text-[#0A0A0B] tabular-nums">
                      {activePiece.sizes.map((s) => s.label).join(' · ')} · Approx.{' '}
                      {activePiece.weightGrams.toFixed(1)} g
                    </dd>
                  </div>
                  <div>
                    <dt className="text-[13px] uppercase tracking-[0.05em] text-[#525257] mb-0.5">
                      Verified Lead Time
                    </dt>
                    <dd className="text-[#0A0A0B] tabular-nums">
                      {computedLeadTime} ({activePiece.availability})
                    </dd>
                  </div>
                  <div className="min-[641px]:col-span-2">
                    <dt className="text-[13px] uppercase tracking-[0.05em] text-[#525257] mb-0.5">
                      Jewelry Care
                    </dt>
                    <dd className="text-[#0A0A0B]">{activePiece.care}</dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
