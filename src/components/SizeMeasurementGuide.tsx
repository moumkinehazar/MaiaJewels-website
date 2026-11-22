import { Ruler } from 'lucide-react';
import { useState } from 'react';
import { JewelryCategory, RING_MEASUREMENT_CHART, SizeOption } from '../data/jewelryCatalog';

interface SizeMeasurementGuideProps {
  category: JewelryCategory;
  selectedSize: SizeOption;
}

export function SizeMeasurementGuide({
  category,
  selectedSize,
}: SizeMeasurementGuideProps) {
  const [unit, setUnit] = useState<'mm' | 'in'>('mm');

  const gaugeProgress = (() => {
    if (selectedSize.diameterMm) {
      // Scale US 5 (15.7mm) to US 9 (19.0mm)
      return Math.round(((selectedSize.diameterMm - 15.0) / 4.5) * 100);
    }
    if (selectedSize.label.includes('15.5') || selectedSize.label.includes('Small') || selectedSize.label.includes('Petite') || selectedSize.label.includes('40')) {
      return 34;
    }
    if (selectedSize.label.includes('16.5') || selectedSize.label.includes('Medium') || selectedSize.label.includes('Standard') || selectedSize.label.includes('45')) {
      return 62;
    }
    return 88;
  })();

  const measuringSteps = (() => {
    if (category === 'Rings') {
      return 'Wrap a non-stretch paper strip snugly around the base of your finger, mark the overlap, and measure against a millimeter ruler.';
    }
    if (category === 'Bracelets') {
      return 'Measure just above the wrist bone with a flexible tape; add 1.0 cm for a close tennis drape or 1.5 cm for loose bangle movement.';
    }
    if (category === 'Necklaces') {
      return '40 cm sits high above the collarbone; 45 cm rests cleanly in the hollow of the throat; 50 cm layers gracefully below.';
    }
    return 'All ear posts use 0.8 mm (20G) hypoallergenic 925 silver pins with 6.0–6.5 mm wearable post depth for standard healed lobes and helix.';
  })();

  return (
    <aside
      id="size-guide"
      aria-label="Scale and measurement guide"
      className="border border-[#C9C9CC] bg-[#FFFFFF] p-[24px] flex flex-col gap-[17px]"
    >
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#C9C9CC] pb-3">
        <div className="flex items-center gap-2">
          <Ruler className="h-4 w-4 text-[#0A0A0B]" aria-hidden="true" />
          <h3 className="font-editorial text-[20px] text-[#0A0A0B]">
            Scale &amp; Sizing Guide
          </h3>
        </div>

        {/* Unit toggle */}
        <div
          role="group"
          aria-label="Measurement unit"
          className="inline-flex border border-[#C9C9CC] bg-[#F2F2F4]"
        >
          <button
            type="button"
            onClick={() => setUnit('mm')}
            className={`min-h-[44px] px-3 text-[13px] font-medium cursor-pointer ${
              unit === 'mm'
                ? 'bg-[#0A0A0B] text-[#F2F2F4]'
                : 'text-[#1C1C1E] hover:bg-[#E6E6EA]'
            }`}
          >
            mm
          </button>
          <button
            type="button"
            onClick={() => setUnit('in')}
            className={`min-h-[44px] px-3 text-[13px] font-medium cursor-pointer ${
              unit === 'in'
                ? 'bg-[#0A0A0B] text-[#F2F2F4]'
                : 'text-[#1C1C1E] hover:bg-[#E6E6EA]'
            }`}
          >
            in
          </button>
        </div>
      </div>

      {/* Live Selected Size Readout */}
      <div className="bg-[#F2F2F4] p-[17px] border border-[#C9C9CC]">
        <div className="flex items-baseline justify-between gap-2 mb-1">
          <span className="text-[13px] uppercase tracking-[0.06em] text-[#525257]">
            Selected Fit
          </span>
          <span className="text-[15px] font-semibold text-[#0A0A0B] tabular-nums">
            {selectedSize.label} · {unit === 'mm' ? selectedSize.metricValue : selectedSize.imperialValue}
          </span>
        </div>
        <p className="text-[14px] text-[#1C1C1E] mb-3">{selectedSize.fitNote}</p>

        {/* Visual Scale Gauge */}
        <div className="space-y-1.5">
          <div className="h-2 w-full bg-[#C9C9CC] overflow-hidden" aria-hidden="true">
            <div
              className="h-full bg-[#0A0A0B] transition-[width] duration-200"
              style={{ width: `${Math.max(18, Math.min(100, gaugeProgress))}%` }}
            />
          </div>
          <div className="flex justify-between text-[12px] text-[#525257] tabular-nums">
            <span>Petite</span>
            <span>Standard</span>
            <span>Relaxed</span>
          </div>
        </div>
      </div>

      {/* Measuring Instruction */}
      <p className="text-[14px] leading-[1.47] text-[#1C1C1E]">
        {measuringSteps}
      </p>

      {/* Ring / Standard Conversion Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-[13px] tabular-nums">
          <thead>
            <tr className="border-b border-[#C9C9CC] text-[#525257]">
              <th className="py-2 pr-3 font-medium">Ring US</th>
              <th className="py-2 pr-3 font-medium">Inner Diameter</th>
              <th className="py-2 font-medium">Circumference</th>
            </tr>
          </thead>
          <tbody>
            {RING_MEASUREMENT_CHART.map((row) => {
              const isHighlighted = selectedSize.label.includes(row.us);
              return (
                <tr
                  key={row.us}
                  className={`border-b border-[#C9C9CC]/60 ${
                    isHighlighted ? 'bg-[#0A0A0B] text-[#F2F2F4] font-semibold' : 'text-[#1C1C1E]'
                  }`}
                >
                  <td className="py-2 px-2">{row.us}</td>
                  <td className="py-2 px-2">
                    {unit === 'mm' ? `${row.diameterMm.toFixed(1)} mm` : row.diameterIn}
                  </td>
                  <td className="py-2 px-2">
                    {unit === 'mm'
                      ? `${row.circumferenceMm.toFixed(1)} mm`
                      : `${(row.circumferenceMm / 25.4).toFixed(2)}"`}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </aside>
  );
}
