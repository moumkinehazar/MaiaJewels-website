/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { CartDrawer } from './components/CartDrawer';
import { CollectionStudio } from './components/CollectionStudio';
import { CustomInquirySection } from './components/CustomInquirySection';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { MaisonFooter } from './components/MaisonFooter';
import {
  CartItem,
  CustomSpecContext,
  JEWELRY_COLLECTION,
  JewelryPiece,
  METAL_OPTIONS,
  MetalOption,
  SizeOption,
} from './data/jewelryCatalog';

export default function App() {
  const [selectedPieceId, setSelectedPieceId] = useState<string>(JEWELRY_COLLECTION[0].id);
  const [selectedMetal, setSelectedMetal] = useState<MetalOption>(METAL_OPTIONS[0]);
  const [selectedSizeIndex, setSelectedSizeIndex] = useState<number>(
    JEWELRY_COLLECTION[0].defaultSizeIndex
  );

  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);

  const activePiece =
    JEWELRY_COLLECTION.find((p) => p.id === selectedPieceId) ?? JEWELRY_COLLECTION[0];
  const activeSize =
    activePiece.sizes[selectedSizeIndex] ?? activePiece.sizes[activePiece.defaultSizeIndex];

  const [passedSpec, setPassedSpec] = useState<CustomSpecContext>({
    pieceId: activePiece.id,
    pieceName: activePiece.name,
    category: activePiece.category,
    metal: selectedMetal,
    size: activeSize,
    unitPrice: Math.max(95, activePiece.basePrice + selectedMetal.priceDelta),
    syncedAt: 0,
  });

  const scrollToCollections = () => {
    const el = document.getElementById('collections');
    el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleSelectPiece = (pieceId: string) => {
    const piece = JEWELRY_COLLECTION.find((p) => p.id === pieceId) ?? JEWELRY_COLLECTION[0];
    const nextSize = piece.sizes[piece.defaultSizeIndex] ?? piece.sizes[0];
    setSelectedPieceId(pieceId);
    setSelectedSizeIndex(piece.defaultSizeIndex);
    setPassedSpec({
      pieceId: piece.id,
      pieceName: piece.name,
      category: piece.category,
      metal: selectedMetal,
      size: nextSize,
      unitPrice: Math.max(95, piece.basePrice + selectedMetal.priceDelta),
      syncedAt: Date.now(),
    });
  };

  const handleSelectMetal = (metal: MetalOption) => {
    setSelectedMetal(metal);
    setPassedSpec({
      pieceId: activePiece.id,
      pieceName: activePiece.name,
      category: activePiece.category,
      metal,
      size: activeSize,
      unitPrice: Math.max(95, activePiece.basePrice + metal.priceDelta),
      syncedAt: Date.now(),
    });
  };

  const handleSelectSizeIndex = (index: number) => {
    const nextSize = activePiece.sizes[index] ?? activePiece.sizes[0];
    setSelectedSizeIndex(index);
    setPassedSpec({
      pieceId: activePiece.id,
      pieceName: activePiece.name,
      category: activePiece.category,
      metal: selectedMetal,
      size: nextSize,
      unitPrice: Math.max(95, activePiece.basePrice + selectedMetal.priceDelta),
      syncedAt: Date.now(),
    });
  };

  const handleAddToCart = (piece: JewelryPiece, metal: MetalOption, size: SizeOption) => {
    const key = `${piece.id}::${metal.id}::${size.label}`;
    const unitPrice = Math.max(95, piece.basePrice + metal.priceDelta);
    setCartItems((prev) => {
      const existing = prev.find((item) => item.key === key);
      if (existing) {
        return prev.map((item) =>
          item.key === key ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [
        ...prev,
        {
          key,
          pieceId: piece.id,
          name: piece.name,
          category: piece.category,
          metal,
          size,
          unitPrice,
          quantity: 1,
          imageSrc: piece.frames[0].src,
          leadTime:
            metal.id === 'solid-gold-14k'
              ? '7–12 business days'
              : piece.leadTime,
        },
      ];
    });
  };

  const handleUpdateQty = (key: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) =>
          item.key === key ? { ...item, quantity: item.quantity + delta } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const handleRemoveItem = (key: string) => {
    setCartItems((prev) => prev.filter((item) => item.key !== key));
  };

  const handlePassToCustomOrder = (ctx: CustomSpecContext) => {
    setPassedSpec(ctx);
    const customSection = document.getElementById('custom-orders');
    customSection?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const totalCartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen flex flex-col bg-[#F2F2F4] text-[#0A0A0B]">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 bg-[#0A0A0B] text-[#F2F2F4] px-4 py-2"
      >
        Skip to main content
      </a>

      <Header
        cartCount={totalCartCount}
        onOpenCart={() => setCartOpen(true)}
        onChooseJewelry={scrollToCollections}
      />

      <main id="main-content" className="flex-1">
        <HeroSection onChooseJewelry={scrollToCollections} />

        <CollectionStudio
          selectedPieceId={selectedPieceId}
          onSelectPiece={handleSelectPiece}
          selectedMetal={selectedMetal}
          onSelectMetal={handleSelectMetal}
          selectedSizeIndex={selectedSizeIndex}
          onSelectSizeIndex={handleSelectSizeIndex}
          onAddToCart={handleAddToCart}
          onPassToCustomOrder={handlePassToCustomOrder}
        />

        <CustomInquirySection passedSpec={passedSpec} />
      </main>

      <MaisonFooter />

      <CartDrawer
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        items={cartItems}
        onUpdateQty={handleUpdateQty}
        onRemoveItem={handleRemoveItem}
        onClearCart={() => setCartItems([])}
        onChooseJewelry={scrollToCollections}
      />
    </div>
  );
}
