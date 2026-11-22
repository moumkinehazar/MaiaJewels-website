import { ChevronLeft, ChevronRight, Maximize2, RotateCcw, ZoomIn, ZoomOut } from 'lucide-react';
import { KeyboardEvent, PointerEvent, useEffect, useState } from 'react';
import { GalleryFrame } from '../data/jewelryCatalog';

interface ZoomGalleryProps {
  pieceName: string;
  frames: GalleryFrame[];
  wornScaleRef: string;
}

const ZOOM_LEVELS = [1, 1.75, 2.5];

export function ZoomGallery({ pieceName, frames, wornScaleRef }: ZoomGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [zoomIndex, setZoomIndex] = useState(0);
  const [pan, setPan] = useState({ x: 50, y: 50 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragOrigin, setDragOrigin] = useState<{ clientX: number; clientY: number; panX: number; panY: number } | null>(null);
  const [failedSrcs, setFailedSrcs] = useState<Record<string, boolean>>({});
  const [userInitiatedMotion, setUserInitiatedMotion] = useState(false);

  // Reset frame & zoom cleanly when switching product pieces
  useEffect(() => {
    setActiveIndex(0);
    setZoomIndex(0);
    setPan({ x: 50, y: 50 });
    setUserInitiatedMotion(false);
  }, [pieceName]);

  const currentFrame = frames[activeIndex] ?? frames[0];
  const scale = ZOOM_LEVELS[zoomIndex];

  const selectFrame = (idx: number) => {
    setUserInitiatedMotion(true);
    setActiveIndex(idx);
    setZoomIndex(0);
    setPan({ x: 50, y: 50 });
  };

  const handleZoomIn = () => {
    setUserInitiatedMotion(true);
    setZoomIndex((prev) => Math.min(ZOOM_LEVELS.length - 1, prev + 1));
  };

  const handleZoomOut = () => {
    setUserInitiatedMotion(true);
    setZoomIndex((prev) => {
      const next = Math.max(0, prev - 1);
      if (next === 0) setPan({ x: 50, y: 50 });
      return next;
    });
  };

  const handleReset = () => {
    setUserInitiatedMotion(true);
    setZoomIndex(0);
    setPan({ x: 50, y: 50 });
  };

  const handleStageKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === '+' || e.key === '=') {
      e.preventDefault();
      handleZoomIn();
    } else if (e.key === '-' || e.key === '_') {
      e.preventDefault();
      handleZoomOut();
    } else if (e.key === '0') {
      e.preventDefault();
      handleReset();
    } else if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setUserInitiatedMotion(true);
      setZoomIndex((prev) => {
        const next = (prev + 1) % ZOOM_LEVELS.length;
        if (next === 0) setPan({ x: 50, y: 50 });
        return next;
      });
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      if (scale > 1) {
        setPan((p) => ({ ...p, x: Math.min(90, p.x + 10) }));
      } else if (frames.length > 1) {
        selectFrame((activeIndex + 1) % frames.length);
      }
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      if (scale > 1) {
        setPan((p) => ({ ...p, x: Math.max(10, p.x - 10) }));
      } else if (frames.length > 1) {
        selectFrame((activeIndex - 1 + frames.length) % frames.length);
      }
    } else if (e.key === 'ArrowUp' && scale > 1) {
      e.preventDefault();
      setPan((p) => ({ ...p, y: Math.max(10, p.y - 10) }));
    } else if (e.key === 'ArrowDown' && scale > 1) {
      e.preventDefault();
      setPan((p) => ({ ...p, y: Math.min(90, p.y + 10) }));
    }
  };

  const handlePointerDown = (e: PointerEvent<HTMLDivElement>) => {
    if (scale === 1) return;
    e.currentTarget.setPointerCapture(e.pointerId);
    setIsDragging(true);
    setDragOrigin({ clientX: e.clientX, clientY: e.clientY, panX: pan.x, panY: pan.y });
  };

  const handlePointerMove = (e: PointerEvent<HTMLDivElement>) => {
    if (!isDragging || !dragOrigin || scale === 1) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const dx = ((e.clientX - dragOrigin.clientX) / rect.width) * -100;
    const dy = ((e.clientY - dragOrigin.clientY) / rect.height) * -100;
    setPan({
      x: Math.max(10, Math.min(90, dragOrigin.panX + dx)),
      y: Math.max(10, Math.min(90, dragOrigin.panY + dy)),
    });
  };

  const handlePointerUp = (e: PointerEvent<HTMLDivElement>) => {
    if (isDragging) {
      e.currentTarget.releasePointerCapture(e.pointerId);
      setIsDragging(false);
      setDragOrigin(null);
    }
  };

  const hasFailed = failedSrcs[currentFrame.src];

  return (
    <div className="flex flex-col gap-[17px]">
      {/* Frame Switcher Tabs: Macro Detail vs Worn Scale */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div
          role="tablist"
          aria-label="Macro and worn view selector"
          className="inline-flex flex-wrap items-center gap-1 p-1 border border-[#C9C9CC] bg-[#FFFFFF]"
        >
          {frames.map((frame, index) => {
            const selected = index === activeIndex;
            return (
              <button
                key={frame.id}
                type="button"
                role="tab"
                aria-selected={selected}
                onClick={() => selectFrame(index)}
                className={`min-h-[44px] px-4 py-2 text-[14px] font-medium whitespace-nowrap shrink-0 cursor-pointer transition-colors ${
                  selected
                    ? 'bg-[#0A0A0B] text-[#F2F2F4]'
                    : 'bg-transparent text-[#1C1C1E] hover:bg-[#F2F2F4]'
                }`}
              >
                {frame.type}
              </button>
            );
          })}
        </div>

        {/* Keyboard-accessible zoom toolbar */}
        <div className="flex items-center gap-1" role="group" aria-label="Gallery zoom controls">
          <button
            type="button"
            onClick={handleZoomOut}
            disabled={zoomIndex === 0}
            aria-label="Zoom out"
            className="inline-flex items-center justify-center min-h-[44px] min-w-[44px] border border-[#C9C9CC] bg-[#FFFFFF] text-[#0A0A0B] hover:bg-[#E8E8EC] disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
          >
            <ZoomOut className="h-4 w-4" aria-hidden="true" />
          </button>
          <span
            className="inline-flex items-center justify-center min-h-[44px] px-3 border border-[#C9C9CC] bg-[#FFFFFF] text-[14px] font-medium text-[#0A0A0B] tabular-nums"
            aria-live="polite"
          >
            {scale.toFixed(scale === 1 ? 0 : 2).replace(/\.00$/, '')}×
          </span>
          <button
            type="button"
            onClick={handleZoomIn}
            disabled={zoomIndex === ZOOM_LEVELS.length - 1}
            aria-label="Zoom in"
            className="inline-flex items-center justify-center min-h-[44px] min-w-[44px] border border-[#C9C9CC] bg-[#FFFFFF] text-[#0A0A0B] hover:bg-[#E8E8EC] disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
          >
            <ZoomIn className="h-4 w-4" aria-hidden="true" />
          </button>
          {scale > 1 && (
            <button
              type="button"
              onClick={handleReset}
              aria-label="Reset zoom"
              className="inline-flex items-center justify-center min-h-[44px] min-w-[44px] border border-[#C9C9CC] bg-[#FFFFFF] text-[#0A0A0B] hover:bg-[#E8E8EC] cursor-pointer"
            >
              <RotateCcw className="h-4 w-4" aria-hidden="true" />
            </button>
          )}
        </div>
      </div>

      {/* Main Interactive Zoom Stage */}
      <div
        tabIndex={0}
        role="region"
        aria-label={`${pieceName} ${currentFrame.type} interactive gallery. Press Enter or Space to cycle zoom, plus and minus to zoom, arrow keys to pan or switch views.`}
        onKeyDown={handleStageKeyDown}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        className={`relative aspect-square w-full overflow-hidden border border-[#C9C9CC] bg-[#1C1C1E] select-none ${
          scale > 1 ? (isDragging ? 'cursor-grabbing' : 'cursor-grab') : 'cursor-zoom-in'
        }`}
        onClick={() => {
          if (!isDragging && scale === 1) {
            handleZoomIn();
          }
        }}
      >
        {!hasFailed ? (
          <img
            src={currentFrame.src}
            alt={currentFrame.alt}
            referrerPolicy="no-referrer"
            onError={() => setFailedSrcs((prev) => ({ ...prev, [currentFrame.src]: true }))}
            style={{
              transform: `scale(${scale})`,
              transformOrigin: `${pan.x}% ${pan.y}%`,
              transition: userInitiatedMotion
                ? 'transform 200ms cubic-bezier(0.16, 1, 0.3, 1)'
                : 'none',
            }}
            className="h-full w-full object-cover will-change-transform"
          />
        ) : (
          <div className="h-full w-full flex flex-col items-center justify-center p-8 text-center text-[#F2F2F4]">
            <Maximize2 className="h-8 w-8 text-[#C9C9CC] mb-3" aria-hidden="true" />
            <p className="font-editorial text-xl mb-1">{pieceName}</p>
            <p className="text-[14px] text-[#C9C9CC]">{currentFrame.caption}</p>
          </div>
        )}

        {/* Frame prev/next quick buttons for multi-frame pieces */}
        {frames.length > 1 && scale === 1 && (
          <>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                selectFrame((activeIndex - 1 + frames.length) % frames.length);
              }}
              aria-label="Previous gallery frame"
              className="absolute left-3 top-1/2 -translate-y-1/2 inline-flex items-center justify-center min-h-[44px] min-w-[44px] bg-[#0A0A0B]/75 text-[#F2F2F4] border border-[#6E6E73]/50 hover:bg-[#0A0A0B] cursor-pointer"
            >
              <ChevronLeft className="h-5 w-5" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                selectFrame((activeIndex + 1) % frames.length);
              }}
              aria-label="Next gallery frame"
              className="absolute right-3 top-1/2 -translate-y-1/2 inline-flex items-center justify-center min-h-[44px] min-w-[44px] bg-[#0A0A0B]/75 text-[#F2F2F4] border border-[#6E6E73]/50 hover:bg-[#0A0A0B] cursor-pointer"
            >
              <ChevronRight className="h-5 w-5" aria-hidden="true" />
            </button>
          </>
        )}
      </div>

      {/* Caption & Scale Context */}
      <div className="border border-[#C9C9CC] bg-[#FFFFFF] p-[17px] flex flex-col gap-1">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <p className="text-[15px] font-semibold text-[#0A0A0B]">
            {currentFrame.caption}
          </p>
          <span className="text-[13px] text-[#525257] tabular-nums">
            {currentFrame.scaleNote}
          </span>
        </div>
        <p className="text-[14px] text-[#525257]">{wornScaleRef}</p>
        <p className="text-[12px] text-[#525257] pt-1">
          Keyboard: Enter/Space cycles zoom · + / - adjusts zoom · Arrow keys pan or switch frame · 0 resets
        </p>
      </div>

      {/* Thumbnail Strip */}
      {frames.length > 1 && (
        <div className="grid grid-cols-3 gap-[12px]">
          {frames.map((frame, idx) => {
            const active = idx === activeIndex;
            return (
              <button
                key={frame.id}
                type="button"
                onClick={() => selectFrame(idx)}
                aria-label={`View ${frame.type} of ${pieceName}`}
                className={`group text-left border p-1.5 bg-[#FFFFFF] cursor-pointer transition-colors ${
                  active
                    ? 'border-[#0A0A0B] ring-1 ring-[#0A0A0B]'
                    : 'border-[#C9C9CC] hover:border-[#6E6E73]'
                }`}
              >
                <div className="aspect-square w-full overflow-hidden bg-[#1C1C1E] mb-1.5">
                  <img
                    src={frame.src}
                    alt={`${pieceName} — ${frame.type}`}
                    loading="lazy"
                    referrerPolicy="no-referrer"
                    className="h-full w-full object-cover"
                  />
                </div>
                <span className="block text-[12px] font-medium text-[#0A0A0B] truncate">
                  {frame.type}
                </span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
