import { AlertCircle, CheckCircle2, Loader2 } from 'lucide-react';
import { FormEvent, useEffect, useState } from 'react';
import {
  CustomSpecContext,
  JEWELRY_COLLECTION,
  METAL_OPTIONS,
} from '../data/jewelryCatalog';

interface CustomInquirySectionProps {
  passedSpec: CustomSpecContext;
}

export function CustomInquirySection({ passedSpec }: CustomInquirySectionProps) {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [selectedPieceName, setSelectedPieceName] = useState(passedSpec.pieceName);
  const [metalName, setMetalName] = useState(passedSpec.metal.name);
  const [sizeSummary, setSizeSummary] = useState(
    `${passedSpec.size.label} (${passedSpec.size.metricValue})`
  );
  const [customNotes, setCustomNotes] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'error' | 'submitted'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [referenceId, setReferenceId] = useState('');

  // Synchronize whenever user updates metal/size or clicks "Inquire Custom Sizing / Stone"
  useEffect(() => {
    setSelectedPieceName(passedSpec.pieceName);
    setMetalName(passedSpec.metal.name);
    setSizeSummary(`${passedSpec.size.label} (${passedSpec.size.metricValue})`);
  }, [passedSpec]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!fullName.trim()) {
      setStatus('error');
      setErrorMessage('Please enter your full name so our bench jeweler can address your inquiry.');
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      setStatus('error');
      setErrorMessage('Please enter a valid email address to receive your CAD & pricing estimate.');
      return;
    }
    if (!customNotes.trim()) {
      setStatus('error');
      setErrorMessage('Please share your custom modification request (e.g., half-size, engraving, or birthstone swap).');
      return;
    }

    setStatus('submitting');
    setErrorMessage('');

    window.setTimeout(() => {
      const code = `MJ-INQ-${String(Math.floor(1000 + Math.random() * 9000))}`;
      setReferenceId(code);
      setStatus('submitted');
    }, 650);
  };

  return (
    <section
      id="custom-orders"
      className="dark-surface maia-section w-full bg-[#1C1C1E] text-[#F2F2F4] border-b border-[#0A0A0B]"
    >
      <div className="maia-grid-cap mx-auto px-4 sm:px-6 lg:px-10">
        <div className="grid grid-cols-1 min-[834px]:grid-cols-12 gap-[32px] min-[1069px]:gap-[48px] items-start">
          {/* Editorial Intro & Synced Specification Context */}
          <div className="min-[834px]:col-span-5 flex flex-col gap-[24px]">
            <div>
              <p className="text-[13px] tracking-[0.12em] uppercase text-[#C9C9CC] mb-3">
                02. Bespoke Atelier
              </p>
              <h2 className="fluid-h2 text-[#F2F2F4] mb-4">
                Custom Orders &amp; Half-Size Fitting
              </h2>
              <p className="text-[17px] leading-[1.47] text-[#C9C9CC]">
                Need an intermediate ring size, custom bracelet drape, solid 14k gold casting, or personalized stone pairing? Your active configuration from the studio passes directly into this request.
              </p>
            </div>

            {/* Passed Spec Summary Box */}
            <div className="border border-[#6E6E73]/50 bg-[#0A0A0B] p-[24px]">
              <p className="text-[12px] uppercase tracking-[0.08em] text-[#C9C9CC] mb-3">
                Active Configuration Passed From Studio
              </p>
              <dl className="flex flex-col gap-2 text-[15px]">
                <div className="flex justify-between gap-3 border-b border-[#1C1C1E] pb-2">
                  <dt className="text-[#C9C9CC]">Piece</dt>
                  <dd className="text-[#F2F2F4] font-medium text-right">{selectedPieceName}</dd>
                </div>
                <div className="flex justify-between gap-3 border-b border-[#1C1C1E] pb-2">
                  <dt className="text-[#C9C9CC]">Metal</dt>
                  <dd className="text-[#F2F2F4] font-medium text-right">{metalName}</dd>
                </div>
                <div className="flex justify-between gap-3">
                  <dt className="text-[#C9C9CC]">Size</dt>
                  <dd className="text-[#F2F2F4] font-medium text-right tabular-nums">{sizeSummary}</dd>
                </div>
              </dl>
            </div>

            <div className="text-[14px] text-[#C9C9CC] leading-[1.47]">
              <p className="font-medium text-[#F2F2F4] mb-1">Verified Custom Atelier Lead Times</p>
              <p>Half-size adjustments &amp; engraving: 5–7 business days. Bespoke stone or 14k solid gold casts: 10–14 business days including CAD sign-off.</p>
            </div>
          </div>

          {/* Inquiry Form Card */}
          <div className="min-[834px]:col-span-7 bg-[#F2F2F4] text-[#0A0A0B] p-[24px] min-[834px]:p-[32px] border border-[#C9C9CC]">
            {status === 'submitted' ? (
              <div className="py-6 flex flex-col gap-[17px]" role="status" aria-live="polite">
                <div className="flex items-center gap-3 text-[#0A0A0B]">
                  <CheckCircle2 className="h-6 w-6 shrink-0" aria-hidden="true" />
                  <h3 className="font-editorial text-[26px]">
                    Atelier Inquiry Logged
                  </h3>
                </div>
                <p className="text-[17px] leading-[1.47] text-[#1C1C1E]">
                  Thank you, <strong>{fullName}</strong>. Reference{' '}
                  <span className="font-semibold tabular-nums">{referenceId}</span> has been prepared for{' '}
                  <strong>{selectedPieceName}</strong> in <strong>{metalName}</strong> ({sizeSummary}).
                </p>
                <div className="border border-[#C9C9CC] bg-[#FFFFFF] p-4 text-[14px] text-[#525257]">
                  Local interactive demo confirmation: no external server request or payment was processed. You may adjust specifications and test another inquiry below.
                </div>
                <div>
                  <button
                    type="button"
                    onClick={() => {
                      setStatus('idle');
                      setCustomNotes('');
                    }}
                    className="maia-btn bg-[#0A0A0B] text-[#F2F2F4] cursor-pointer"
                  >
                    Submit another inquiry
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-[17px]">
                <div className="grid grid-cols-1 min-[641px]:grid-cols-2 gap-[17px]">
                  <div>
                    <label
                      htmlFor="custom-name"
                      className="block text-[14px] font-medium text-[#0A0A0B] mb-1.5"
                    >
                      Full Name
                    </label>
                    <input
                      id="custom-name"
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Amara Vance"
                      className="w-full min-h-[44px] px-3.5 bg-[#FFFFFF] border border-[#C9C9CC] text-[15px] text-[#0A0A0B]"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="custom-email"
                      className="block text-[14px] font-medium text-[#0A0A0B] mb-1.5"
                    >
                      Email Address
                    </label>
                    <input
                      id="custom-email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="amara@example.com"
                      className="w-full min-h-[44px] px-3.5 bg-[#FFFFFF] border border-[#C9C9CC] text-[15px] text-[#0A0A0B]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 min-[641px]:grid-cols-3 gap-[17px]">
                  <div>
                    <label
                      htmlFor="custom-piece"
                      className="block text-[14px] font-medium text-[#0A0A0B] mb-1.5"
                    >
                      Base Silhouette
                    </label>
                    <select
                      id="custom-piece"
                      value={selectedPieceName}
                      onChange={(e) => setSelectedPieceName(e.target.value)}
                      className="w-full min-h-[44px] px-3 bg-[#FFFFFF] border border-[#C9C9CC] text-[15px] text-[#0A0A0B]"
                    >
                      {JEWELRY_COLLECTION.map((p) => (
                        <option key={p.id} value={p.name}>
                          {p.name}
                        </option>
                      ))}
                      <option value="Bespoke New Commission">Bespoke New Commission</option>
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="custom-metal"
                      className="block text-[14px] font-medium text-[#0A0A0B] mb-1.5"
                    >
                      Metal Finish
                    </label>
                    <select
                      id="custom-metal"
                      value={metalName}
                      onChange={(e) => setMetalName(e.target.value)}
                      className="w-full min-h-[44px] px-3 bg-[#FFFFFF] border border-[#C9C9CC] text-[15px] text-[#0A0A0B]"
                    >
                      {METAL_OPTIONS.map((m) => (
                        <option key={m.id} value={m.name}>
                          {m.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="custom-size"
                      className="block text-[14px] font-medium text-[#0A0A0B] mb-1.5"
                    >
                      Target Size / Fit
                    </label>
                    <input
                      id="custom-size"
                      type="text"
                      value={sizeSummary}
                      onChange={(e) => setSizeSummary(e.target.value)}
                      className="w-full min-h-[44px] px-3.5 bg-[#FFFFFF] border border-[#C9C9CC] text-[15px] text-[#0A0A0B] tabular-nums"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="custom-notes"
                    className="block text-[14px] font-medium text-[#0A0A0B] mb-1.5"
                  >
                    Custom Requests (Half-size, Stone Palette, or Inner Engraving)
                  </label>
                  <textarea
                    id="custom-notes"
                    rows={3}
                    required
                    value={customNotes}
                    onChange={(e) => setCustomNotes(e.target.value)}
                    placeholder="Example: Requesting US 6.5 band with pale sapphire & white topaz alternating stones..."
                    className="w-full p-3.5 bg-[#FFFFFF] border border-[#C9C9CC] text-[15px] text-[#0A0A0B]"
                  />
                </div>

                {status === 'error' && (
                  <div
                    role="alert"
                    className="flex items-start gap-2.5 border border-[#0A0A0B] bg-[#FFFFFF] p-3.5 text-[14px] text-[#0A0A0B]"
                  >
                    <AlertCircle className="h-4 w-4 mt-0.5 shrink-0" aria-hidden="true" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
                  <span className="text-[13px] text-[#525257]">
                    Demo mode · Simulated local atelier submission
                  </span>
                  <button
                    type="submit"
                    disabled={status === 'submitting'}
                    className="maia-btn bg-[#0A0A0B] text-[#F2F2F4] hover:bg-[#1C1C1E] disabled:opacity-60 cursor-pointer"
                  >
                    {status === 'submitting' ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                        <span>Preparing inquiry...</span>
                      </>
                    ) : (
                      <span>Send custom inquiry</span>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
