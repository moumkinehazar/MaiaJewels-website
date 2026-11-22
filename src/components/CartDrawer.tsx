import { AlertCircle, CheckCircle2, Loader2, Minus, Plus, ShoppingBag, Trash2, X } from 'lucide-react';
import { FormEvent, useEffect, useState } from 'react';
import { CartItem } from '../data/jewelryCatalog';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQty: (key: string, delta: number) => void;
  onRemoveItem: (key: string) => void;
  onClearCart: () => void;
  onChooseJewelry: () => void;
}

const FREE_SHIPPING_THRESHOLD = 250;

export function CartDrawer({
  isOpen,
  onClose,
  items,
  onUpdateQty,
  onRemoveItem,
  onClearCart,
  onChooseJewelry,
}: CartDrawerProps) {
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [shippingCity, setShippingCity] = useState('');
  const [checkoutState, setCheckoutState] = useState<'browsing' | 'submitting' | 'error' | 'confirmed'>('browsing');
  const [errorText, setErrorText] = useState('');
  const [orderId, setOrderId] = useState('');
  const [confirmedTotal, setConfirmedTotal] = useState(0);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const subtotal = items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
  const shippingFee = subtotal === 0 || subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : 18;
  const total = subtotal + shippingFee;

  const handleCheckout = (e: FormEvent) => {
    e.preventDefault();
    if (!customerName.trim() || !customerEmail.includes('@') || !shippingCity.trim()) {
      setCheckoutState('error');
      setErrorText('Please complete your name, valid email, and delivery city/address to simulate checkout.');
      return;
    }

    setCheckoutState('submitting');
    setErrorText('');
    const snapshotTotal = total;

    window.setTimeout(() => {
      setConfirmedTotal(snapshotTotal);
      setOrderId(`MJ-${String(Math.floor(10000 + Math.random() * 89999))}`);
      setCheckoutState('confirmed');
      onClearCart();
    }, 650);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end bg-[#0A0A0B]/60"
      role="dialog"
      aria-modal="true"
      aria-label="Maia Jewels shopping bag"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="flex h-full w-full max-w-[460px] flex-col bg-[#F2F2F4] text-[#0A0A0B] border-l border-[#C9C9CC]">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#C9C9CC] px-[24px] py-4 bg-[#FFFFFF]">
          <div className="flex items-center gap-2.5">
            <ShoppingBag className="h-5 w-5" aria-hidden="true" />
            <h2 className="font-editorial text-[22px] text-[#0A0A0B]">
              Your Jewelry Bag
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close shopping bag"
            className="inline-flex items-center justify-center min-h-[44px] min-w-[44px] border border-[#C9C9CC] bg-[#FFFFFF] text-[#0A0A0B] hover:bg-[#F2F2F4] cursor-pointer"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-[24px]">
          {checkoutState === 'confirmed' ? (
            <div className="border border-[#0A0A0B] bg-[#FFFFFF] p-[24px] flex flex-col gap-4" role="status">
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="h-6 w-6 text-[#0A0A0B]" aria-hidden="true" />
                <h3 className="font-editorial text-[24px]">Order Confirmed</h3>
              </div>
              <p className="text-[16px] leading-[1.47] text-[#1C1C1E]">
                Order <strong className="tabular-nums">{orderId}</strong> for{' '}
                <strong className="tabular-nums">${confirmedTotal}</strong> has been logged for{' '}
                <strong>{customerName}</strong> ({shippingCity}).
              </p>
              <p className="text-[13px] text-[#525257] border-t border-[#C9C9CC] pt-3">
                Simulated local demo checkout: no payment was charged and no live shipment was booked.
              </p>
              <button
                type="button"
                onClick={() => {
                  setCheckoutState('browsing');
                  onClose();
                }}
                className="maia-btn bg-[#0A0A0B] text-[#F2F2F4] cursor-pointer"
              >
                Return to storefront
              </button>
            </div>
          ) : items.length === 0 ? (
            <div className="border border-[#C9C9CC] bg-[#FFFFFF] p-[32px] text-center flex flex-col items-center gap-4">
              <ShoppingBag className="h-8 w-8 text-[#525257]" aria-hidden="true" />
              <h3 className="font-editorial text-[24px] text-[#0A0A0B]">
                Your bag is currently empty
              </h3>
              <p className="text-[16px] text-[#525257]">
                Select a metal finish and verified fit in the piece studio to add items here.
              </p>
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onChooseJewelry();
                }}
                className="maia-btn bg-[#0A0A0B] text-[#F2F2F4] cursor-pointer"
              >
                Choose my jewelry
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-[24px]">
              {/* Insured Shipping Bar */}
              <div className="border border-[#C9C9CC] bg-[#FFFFFF] p-4 text-[14px] text-[#1C1C1E]">
                {subtotal >= FREE_SHIPPING_THRESHOLD ? (
                  <span>Complimentary insured courier shipping unlocked.</span>
                ) : (
                  <span className="tabular-nums">
                    Add <strong>${FREE_SHIPPING_THRESHOLD - subtotal}</strong> more for complimentary insured shipping.
                  </span>
                )}
              </div>

              {/* Cart Items */}
              <ul className="flex flex-col gap-[17px]">
                {items.map((item) => (
                  <li
                    key={item.key}
                    className="border border-[#C9C9CC] bg-[#FFFFFF] p-4 flex gap-4"
                  >
                    <img
                      src={item.imageSrc}
                      alt={item.name}
                      referrerPolicy="no-referrer"
                      className="h-20 w-20 shrink-0 object-cover bg-[#1C1C1E] border border-[#C9C9CC]"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="font-editorial text-[18px] leading-snug text-[#0A0A0B]">
                          {item.name}
                        </h3>
                        <button
                          type="button"
                          onClick={() => onRemoveItem(item.key)}
                          aria-label={`Remove ${item.name}`}
                          className="inline-flex items-center justify-center min-h-[44px] min-w-[44px] -mt-2 -mr-2 text-[#525257] hover:text-[#0A0A0B] cursor-pointer"
                        >
                          <Trash2 className="h-4 w-4" aria-hidden="true" />
                        </button>
                      </div>

                      <p className="text-[13px] text-[#525257] mb-1">
                        {item.metal.name} · {item.size.label}
                      </p>
                      <p className="text-[12px] text-[#525257] mb-3 tabular-nums">
                        Lead time: {item.leadTime}
                      </p>

                      <div className="flex items-center justify-between gap-2">
                        <div className="inline-flex items-center border border-[#C9C9CC]">
                          <button
                            type="button"
                            onClick={() => onUpdateQty(item.key, -1)}
                            aria-label={`Decrease quantity of ${item.name}`}
                            className="inline-flex items-center justify-center min-h-[44px] min-w-[44px] text-[#0A0A0B] hover:bg-[#F2F2F4] cursor-pointer"
                          >
                            <Minus className="h-3.5 w-3.5" aria-hidden="true" />
                          </button>
                          <span className="px-3 text-[14px] font-medium tabular-nums">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => onUpdateQty(item.key, 1)}
                            aria-label={`Increase quantity of ${item.name}`}
                            className="inline-flex items-center justify-center min-h-[44px] min-w-[44px] text-[#0A0A0B] hover:bg-[#F2F2F4] cursor-pointer"
                          >
                            <Plus className="h-3.5 w-3.5" aria-hidden="true" />
                          </button>
                        </div>
                        <span className="text-[16px] font-semibold text-[#0A0A0B] tabular-nums">
                          ${item.unitPrice * item.quantity}
                        </span>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>

              {/* Simulated Demo Checkout Form */}
              <form
                onSubmit={handleCheckout}
                noValidate
                className="border border-[#C9C9CC] bg-[#FFFFFF] p-4 flex flex-col gap-3"
              >
                <p className="text-[13px] uppercase tracking-[0.06em] font-semibold text-[#0A0A0B]">
                  Express Checkout (Local Demo)
                </p>

                <input
                  type="text"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="Recipient full name"
                  aria-label="Recipient full name"
                  className="min-h-[44px] px-3 bg-[#F2F2F4] border border-[#C9C9CC] text-[14px] text-[#0A0A0B]"
                />
                <input
                  type="email"
                  value={customerEmail}
                  onChange={(e) => setCustomerEmail(e.target.value)}
                  placeholder="Email for receipt"
                  aria-label="Email for receipt"
                  className="min-h-[44px] px-3 bg-[#F2F2F4] border border-[#C9C9CC] text-[14px] text-[#0A0A0B]"
                />
                <input
                  type="text"
                  value={shippingCity}
                  onChange={(e) => setShippingCity(e.target.value)}
                  placeholder="Delivery street, city & postal code"
                  aria-label="Delivery street, city and postal code"
                  className="min-h-[44px] px-3 bg-[#F2F2F4] border border-[#C9C9CC] text-[14px] text-[#0A0A0B]"
                />

                {checkoutState === 'error' && (
                  <div
                    role="alert"
                    className="flex items-start gap-2 border border-[#0A0A0B] bg-[#F2F2F4] p-3 text-[13px] text-[#0A0A0B]"
                  >
                    <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" aria-hidden="true" />
                    <span>{errorText}</span>
                  </div>
                )}

                <div className="border-t border-[#C9C9CC] pt-3 flex flex-col gap-1.5 text-[14px] tabular-nums">
                  <div className="flex justify-between text-[#525257]">
                    <span>Subtotal</span>
                    <span>${subtotal}</span>
                  </div>
                  <div className="flex justify-between text-[#525257]">
                    <span>Insured Courier</span>
                    <span>{shippingFee === 0 ? 'Complimentary' : `$${shippingFee}`}</span>
                  </div>
                  <div className="flex justify-between text-[16px] font-semibold text-[#0A0A0B] pt-1">
                    <span>Estimated Total</span>
                    <span>${total}</span>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={checkoutState === 'submitting'}
                  className="maia-btn w-full bg-[#0A0A0B] text-[#F2F2F4] hover:bg-[#1C1C1E] disabled:opacity-60 cursor-pointer"
                >
                  {checkoutState === 'submitting' ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                      <span>Confirming demo order...</span>
                    </>
                  ) : (
                    <span>Place demo order — ${total}</span>
                  )}
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
