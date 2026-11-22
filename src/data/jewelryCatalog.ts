export type JewelryCategory = 'Rings' | 'Bracelets' | 'Necklaces' | 'Ear Stacks';

export type MetalId = 'gold-vermeil' | 'sterling-silver' | 'solid-gold-14k';

export interface MetalOption {
  id: MetalId;
  name: string;
  shortName: string;
  composition: string;
  swatchHex: string;
  priceDelta: number;
  leadTimeNote: string;
}

export interface SizeOption {
  label: string;
  metricValue: string;
  imperialValue: string;
  fitNote: string;
  diameterMm?: number;
}

export interface GalleryFrame {
  id: string;
  type: 'Macro Detail' | 'Worn Scale' | 'Layered View';
  src: string;
  alt: string;
  caption: string;
  scaleNote: string;
}

export interface JewelryPiece {
  id: string;
  skuPrefix: string;
  name: string;
  category: JewelryCategory;
  subtitle: string;
  description: string;
  basePrice: number;
  leadTime: string;
  availability: 'Ready to Ship' | 'Made to Order';
  materials: string;
  dimensions: string;
  weightGrams: number;
  care: string;
  wornScaleRef: string;
  frames: GalleryFrame[];
  sizes: SizeOption[];
  defaultSizeIndex: number;
}

export interface CartItem {
  key: string;
  pieceId: string;
  name: string;
  category: JewelryCategory;
  metal: MetalOption;
  size: SizeOption;
  unitPrice: number;
  quantity: number;
  imageSrc: string;
  leadTime: string;
}

export interface CustomSpecContext {
  pieceId: string;
  pieceName: string;
  category: JewelryCategory;
  metal: MetalOption;
  size: SizeOption;
  unitPrice: number;
  syncedAt: number;
}

export const METAL_OPTIONS: MetalOption[] = [
  {
    id: 'gold-vermeil',
    name: '18k Gold Vermeil',
    shortName: '18k Vermeil',
    composition: '2.5 micron 18k yellow gold over recycled 925 sterling silver',
    swatchHex: '#D4B06A',
    priceDelta: 0,
    leadTimeNote: 'Standard dispatch',
  },
  {
    id: 'sterling-silver',
    name: '925 Sterling Silver',
    shortName: '925 Silver',
    composition: 'Rhodium-plated recycled 925 sterling silver, tarnish-resistant',
    swatchHex: '#C9C9CC',
    priceDelta: -25,
    leadTimeNote: 'Standard dispatch',
  },
  {
    id: 'solid-gold-14k',
    name: '14k Solid Gold',
    shortName: '14k Solid',
    composition: 'Hallmarked 585 solid 14k recycled yellow gold',
    swatchHex: '#C59B43',
    priceDelta: 240,
    leadTimeNote: 'Atelier cast · +5 business days',
  },
];

export const JEWELRY_COLLECTION: JewelryPiece[] = [
  {
    id: 'soraia-prism-stack',
    skuPrefix: 'MJ-RNG-01',
    name: 'Soraia Prism Eternity Stack',
    category: 'Rings',
    subtitle: 'Four-band tourmaline, pastel quartz & white topaz pavé set',
    description:
      'Designed for bold stacking or singular sparkle, the Soraia Eternity Stack pairs hand-set 3.2 mm faceted stones in four interlocking low-profile gallery bands.',
    basePrice: 245,
    leadTime: '2–3 business days',
    availability: 'Ready to Ship',
    materials: 'Recycled 925 sterling silver core with 2.5 µm 18k gold vermeil; lab-grown rubellite tourmaline, rose quartz, and white topaz.',
    dimensions: '3.2 mm individual band height · 12.8 mm stacked profile · 2.1 mm gallery depth',
    weightGrams: 7.4,
    care: 'Wipe with the included untreated microfiber cloth after wear. Avoid chlorinated pools and ultrasonic cleaners on colored quartz.',
    wornScaleRef: 'Shown stacked across four bands on index finger (US Size 7 · 17.3 mm inner diameter).',
    frames: [
      {
        id: 'soraia-macro',
        type: 'Macro Detail',
        src: '/assets/brandbook/macro_gemstone_pave.png',
        alt: 'Macro close-up of Soraia Prism Eternity Stack showing four rows of pink tourmaline, pastel quartz, and clear topaz prongs',
        caption: 'Macro 2.5× Inspection — Four-prong shared basket settings',
        scaleNote: '3.2 mm stone diameter · 12.8 mm full stack width',
      },
      {
        id: 'soraia-worn',
        type: 'Worn Scale',
        src: '/assets/brandbook/obj_45_1200x1200.png',
        alt: 'Worn view of Soraia Prism Eternity Stack on hand showing knuckle clearance and light refraction',
        caption: 'Worn Scale View — Natural daylight on hand',
        scaleNote: 'Fits true to size · Comfort-fit inner curvature',
      },
      {
        id: 'soraia-layered',
        type: 'Layered View',
        src: '/assets/brandbook/obj_229_1600x1600.png',
        alt: 'Editorial styling view pairing Maia stacked rings with fine hand-chain and wrist bangles',
        caption: 'Editorial Styling — Paired with Solstice hand-chain & bangles',
        scaleNote: 'Balanced finger-to-wrist proportion',
      },
    ],
    sizes: [
      { label: 'US 5', metricValue: '15.7 mm', imperialValue: '0.62 in', fitNote: 'Petite · 49.3 mm inner circumference', diameterMm: 15.7 },
      { label: 'US 6', metricValue: '16.5 mm', imperialValue: '0.65 in', fitNote: 'Standard slender · 51.9 mm circumference', diameterMm: 16.5 },
      { label: 'US 7', metricValue: '17.3 mm', imperialValue: '0.68 in', fitNote: 'Most common · 54.4 mm circumference', diameterMm: 17.3 },
      { label: 'US 8', metricValue: '18.1 mm', imperialValue: '0.71 in', fitNote: 'Relaxed or middle finger · 57.0 mm circumference', diameterMm: 18.1 },
      { label: 'US 9', metricValue: '19.0 mm', imperialValue: '0.75 in', fitNote: 'Index or statement fit · 59.5 mm circumference', diameterMm: 19.0 },
    ],
    defaultSizeIndex: 2,
  },
  {
    id: 'celeste-solitaire-tennis',
    skuPrefix: 'MJ-BRC-02',
    name: 'Celeste Solitaire Tennis Line',
    category: 'Bracelets',
    subtitle: 'Graduated cubic zirconia & center solitaire cut tennis bracelets',
    description:
      'Articulated four-prong links fluidly drape around the wrist with zero flipping. Choose your signature focal cut—Baguette, Cushion, Brilliant Round, or Heart—anchored by an adjustable sliding extender.',
    basePrice: 280,
    leadTime: '2–3 business days',
    availability: 'Ready to Ship',
    materials: 'Recycled 925 sterling silver or 18k gold vermeil; AAAAA optical-grade white zirconia with precision pavilion facets.',
    dimensions: '2.6 mm link width · 6.5 mm focal solitaire · 25 mm adjustable extension chain',
    weightGrams: 9.2,
    care: 'Store flat in individual suede pouch. Clean gently with lukewarm water and a soft camel-hair brush.',
    wornScaleRef: 'Photographed layered on a 16.0 cm wrist with extender tags visible.',
    frames: [
      {
        id: 'celeste-macro',
        type: 'Macro Detail',
        src: '/assets/brandbook/macro_tennis_solitaire.png',
        alt: 'Macro view of Celeste Solitaire Tennis bracelets showing baguette, cushion, round, and heart center stones',
        caption: 'Macro 2.5× Inspection — Box-articulated links & center solitaire cuts',
        scaleNote: '2.6 mm tennis strand · 6.5 mm center solitaire',
      },
      {
        id: 'celeste-worn',
        type: 'Worn Scale',
        src: '/assets/brandbook/obj_49_1024x1024.png',
        alt: 'Worn wrist view showing five Celeste Solitaire Tennis bracelets stacked with adjustable drop chains',
        caption: 'Worn Scale View — Layered across 16.0 cm wrist',
        scaleNote: 'Includes 2.5 cm micro-extender for custom drape',
      },
    ],
    sizes: [
      { label: '15.5 cm', metricValue: '155 mm', imperialValue: '6.1 in', fitNote: 'Snug wrist (13.5–14.5 cm) + 2.5 cm extender' },
      { label: '16.5 cm', metricValue: '165 mm', imperialValue: '6.5 in', fitNote: 'Standard wrist (14.5–15.8 cm) + 2.5 cm extender' },
      { label: '17.5 cm', metricValue: '175 mm', imperialValue: '6.9 in', fitNote: 'Medium-relaxed (15.8–17.0 cm) + 2.5 cm extender' },
      { label: '19.0 cm', metricValue: '190 mm', imperialValue: '7.5 in', fitNote: 'Loose drape (17.0–18.5 cm) + 2.5 cm extender' },
    ],
    defaultSizeIndex: 1,
  },
  {
    id: 'vespera-trio-pendant',
    skuPrefix: 'MJ-NCK-03',
    name: 'Vespera Trio Pendant',
    category: 'Necklaces',
    subtitle: 'Asymmetric sapphire trilliant, champagne marquise & sky emerald-cut',
    description:
      'An architectural cluster of three distinct gemstone cuts—deep sapphire trilliant, warm champagne marquise, and pale aquamarine-tone emerald bezel—suspended along a 1.1 mm diamond-cut cable chain.',
    basePrice: 195,
    leadTime: '3–4 business days',
    availability: 'Ready to Ship',
    materials: '18k gold vermeil or 925 sterling silver; synthetic corundum sapphire, champagne topaz, and bezel-set sky topaz.',
    dimensions: '11.4 mm × 8.8 mm pendant cluster · 1.1 mm cable chain · 4.2 mm spring clasp',
    weightGrams: 3.6,
    care: 'Apply perfume and skincare before fastening. Lay flat when travelling to preserve the fine cable links.',
    wornScaleRef: 'Photographed at 45 cm (17.7 in) resting just below the collarbone.',
    frames: [
      {
        id: 'vespera-macro',
        type: 'Macro Detail',
        src: '/assets/brandbook/macro_trio_pendant.png',
        alt: 'Macro view of Vespera Trio Pendant highlighting midnight blue trilliant, champagne marquise, and bezel-set emerald cut stone',
        caption: 'Macro 2.5× Inspection — Mixed bezel & claw stone cluster',
        scaleNote: '11.4 mm cluster span · 1.1 mm faceted chain',
      },
      {
        id: 'vespera-worn',
        type: 'Worn Scale',
        src: '/assets/brandbook/obj_46_1232x1232.png',
        alt: 'Worn collarbone view of Vespera Trio Pendant necklace showing delicate scale against skin',
        caption: 'Worn Scale View — 45 cm standard collarbone drop',
        scaleNote: 'Includes 40 / 43 / 45 cm jump-ring checkpoints',
      },
    ],
    sizes: [
      { label: '40 cm', metricValue: '400 mm', imperialValue: '15.7 in', fitNote: 'Choker-collarbone sit, ideal for V-necks' },
      { label: '45 cm', metricValue: '450 mm', imperialValue: '17.7 in', fitNote: 'Classic collarbone drop (shown on model)' },
      { label: '50 cm', metricValue: '500 mm', imperialValue: '19.7 in', fitNote: 'Lower chest layering length' },
    ],
    defaultSizeIndex: 1,
  },
  {
    id: 'aurelia-wire-cuff',
    skuPrefix: 'MJ-BRC-04',
    name: 'Aurelia Architectural Wire Cuff',
    category: 'Bracelets',
    subtitle: 'Hand-wound open filigree cuff with matching sculptural cage ring',
    description:
      'Lightweight yet commanding, the Aurelia Cuff bridges airy parallel gold filaments between beaded structural rims. Engineered with gentle spring tension for effortless slip-on comfort.',
    basePrice: 230,
    leadTime: '5–7 business days',
    availability: 'Made to Order',
    materials: 'Hand-drawn 18k gold vermeil or 925 sterling silver wire over forged tension frame.',
    dimensions: '38 mm cuff height · 0.8 mm filament gauge · 26 mm rear opening',
    weightGrams: 16.8,
    care: 'Slip over the narrow side of the wrist without squeezing or bending the hand-tensioned filaments.',
    wornScaleRef: 'Photographed on 16.0 cm wrist paired with paperclip and beaded stack chains.',
    frames: [
      {
        id: 'aurelia-macro',
        type: 'Macro Detail',
        src: '/assets/brandbook/macro_wire_cuff.png',
        alt: 'Macro view of Aurelia Wire Cuff showing beaded border and parallel tensioned gold filaments beside beaded bracelet',
        caption: 'Macro 2.5× Inspection — Hand-soldered filament lattice & beaded rim',
        scaleNote: '38 mm architectural span · 0.8 mm fine wires',
      },
      {
        id: 'aurelia-worn',
        type: 'Worn Scale',
        src: '/assets/brandbook/obj_48_884x884.png',
        alt: 'Worn view of Aurelia Wire Cuff and matching cage ring on forearm and hand',
        caption: 'Worn Scale View — Cuff and matching cage ring proportion',
        scaleNote: 'Open-back cuff adjusts gently within ±4 mm',
      },
    ],
    sizes: [
      { label: 'Small (15 cm)', metricValue: '54 mm inner width', imperialValue: '2.13 in', fitNote: 'For 14.0–15.5 cm wrist circumference' },
      { label: 'Medium (16.5 cm)', metricValue: '58 mm inner width', imperialValue: '2.28 in', fitNote: 'For 15.6–17.2 cm wrist circumference' },
      { label: 'Large (18 cm)', metricValue: '62 mm inner width', imperialValue: '2.44 in', fitNote: 'For 17.3–19.0 cm wrist circumference' },
    ],
    defaultSizeIndex: 1,
  },
  {
    id: 'lyra-ear-constellation',
    skuPrefix: 'MJ-EAR-05',
    name: 'Lyra Marquise Ear Constellation',
    category: 'Ear Stacks',
    subtitle: 'Blush marquise helix crawler, quatrefoil stud & butterfly drop quartet',
    description:
      'A curated four-piece ear story combining a sweeping five-leaf helix climber, a petite quatrefoil mid-stud, an articulated butterfly drop, and a twin-leaf lobe stud.',
    basePrice: 175,
    leadTime: '2–3 business days',
    availability: 'Ready to Ship',
    materials: 'Hypoallergenic recycled 925 sterling silver posts (0.8 mm / 20G), 18k gold or rhodium finish; blush morganite-tone zirconia.',
    dimensions: '14.5 mm helix climber · 5.2 mm quatrefoil · 13.0 mm drop · 0.8 mm (20G) post',
    weightGrams: 4.1,
    care: 'Remove before sleeping. Wipe flat-back and butterfly clutches weekly with alcohol-free jewelry cleanser.',
    wornScaleRef: 'Photographed across helix, upper lobe, and dual primary lobe piercings.',
    frames: [
      {
        id: 'lyra-worn',
        type: 'Worn Scale',
        src: '/assets/brandbook/obj_47_491x758.png',
        alt: 'Close-up worn ear view showing Lyra Marquise Ear Constellation across helix, mid-lobe, and lower lobe',
        caption: 'Worn Scale & Macro View — Four-piercing placement map',
        scaleNote: '20G (0.8 mm) comfort posts · Nickel-free',
      },
    ],
    sizes: [
      { label: 'Full 4-Piece Set', metricValue: '6 mm post length', imperialValue: '0.24 in', fitNote: 'Includes all 4 curated ear pieces' },
      { label: 'Lobe Pair Only', metricValue: '6 mm post length', imperialValue: '0.24 in', fitNote: 'Butterfly drop + twin-leaf stud pair' },
      { label: 'Helix + Quatrefoil', metricValue: '6.5 mm post length', imperialValue: '0.26 in', fitNote: 'Upper-ear climber & petite stud' },
    ],
    defaultSizeIndex: 0,
  },
  {
    id: 'solstice-handchain-bangle',
    skuPrefix: 'MJ-CHN-06',
    name: 'Solstice Hand-Chain & Bangle Set',
    category: 'Bracelets',
    subtitle: 'Bezel heart drapped hand-chain paired with engraved clover & pavé bangles',
    description:
      'Our signature campaign silhouette: a fluid bezel-set heart hand-chain linking ring to wrist, styled alongside an engraved clover bangle and alternating pavé eternity hinge bracelets.',
    basePrice: 310,
    leadTime: '5–7 business days',
    availability: 'Made to Order',
    materials: '18k gold vermeil or 925 sterling silver; diamond-cut white topaz cabochons and hand-engraved floral relief.',
    dimensions: '115 mm bridge chain · 5.5 mm engraved bangle · 3.0 mm pavé hinge bangles',
    weightGrams: 21.4,
    care: 'Unfasten hand-chain clasp before washing hands. Store hinge bangles clasped inside lined drawer.',
    wornScaleRef: 'Photographed on 16.0 cm wrist with US 7 middle-finger anchor loop.',
    frames: [
      {
        id: 'solstice-worn',
        type: 'Worn Scale',
        src: '/assets/brandbook/obj_229_1600x1600.png',
        alt: 'Full editorial worn view of Solstice Hand-Chain, stacked star rings, and engraved gold bangles',
        caption: 'Worn Scale View — Complete campaign hand & wrist proportion',
        scaleNote: 'Custom bridge length matched to wrist size',
      },
      {
        id: 'solstice-macro-chain',
        type: 'Macro Detail',
        src: '/assets/brandbook/macro_hand_chain.png',
        alt: 'Macro view of Solstice Hand-Chain showing bezel-set heart stations and beaded curb link spacing',
        caption: 'Macro 2.5× Inspection — Bezel heart stations & 1.2 mm curb chain',
        scaleNote: '115 mm hand bridge · 2.2 mm gold bead accents',
      },
      {
        id: 'solstice-macro-bangles',
        type: 'Layered View',
        src: '/assets/brandbook/macro_bangles.png',
        alt: 'Macro view of engraved clover bangle and two pavé crystal hinge bracelets on wrist',
        caption: 'Macro Stack View — Engraved clover & alternating pavé bangles',
        scaleNote: '5.5 mm engraved cuff · 3.0 mm pavé bands',
      },
    ],
    sizes: [
      { label: 'Petite (15 cm / US 5–6)', metricValue: '150 mm wrist', imperialValue: '5.9 in', fitNote: '108 mm hand bridge · 54 mm oval bangle' },
      { label: 'Standard (16.5 cm / US 7)', metricValue: '165 mm wrist', imperialValue: '6.5 in', fitNote: '115 mm hand bridge · 58 mm oval bangle' },
      { label: 'Relaxed (18 cm / US 8–9)', metricValue: '180 mm wrist', imperialValue: '7.1 in', fitNote: '122 mm hand bridge · 62 mm oval bangle' },
    ],
    defaultSizeIndex: 1,
  },
];

export const RING_MEASUREMENT_CHART = [
  { us: 'US 5', diameterMm: 15.7, diameterIn: '0.62"', circumferenceMm: 49.3 },
  { us: 'US 6', diameterMm: 16.5, diameterIn: '0.65"', circumferenceMm: 51.9 },
  { us: 'US 7', diameterMm: 17.3, diameterIn: '0.68"', circumferenceMm: 54.4 },
  { us: 'US 8', diameterMm: 18.1, diameterIn: '0.71"', circumferenceMm: 57.0 },
  { us: 'US 9', diameterMm: 19.0, diameterIn: '0.75"', circumferenceMm: 59.5 },
];
