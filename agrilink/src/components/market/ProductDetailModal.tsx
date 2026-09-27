import React, { useState } from 'react';
import {
  X,
  Plus,
  Minus,
  ShoppingBag,
  ShieldCheck,
  Star,
  MapPin,
  Clock,
  Check,
  Truck,
  Phone,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const ProductDetailModal: React.FC = () => {
  const {
    products,
    selectedProductId,
    setSelectedProductId,
    addToCart,
    setIsCartOpen,
  } = useApp();

  const [quantity, setQuantity] = useState(1);
  const [isInstantOrderSuccess, setIsInstantOrderSuccess] = useState(false);

  if (!selectedProductId) return null;

  const product = products.find((p) => p.id === selectedProductId);
  if (!product) return null;

  const handleInstantBuy = () => {
    setIsInstantOrderSuccess(true);
    setTimeout(() => {
      setIsInstantOrderSuccess(false);
      setSelectedProductId(null);
    }, 2000);
  };

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setSelectedProductId(null);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div className="bg-white w-full max-w-md rounded-t-3xl sm:rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[92vh]">
        {/* Product Image Banner */}
        <div className="relative h-52 bg-stone-100 overflow-hidden shrink-0">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
          />
          <button
            onClick={() => setSelectedProductId(null)}
            className="absolute top-3.5 right-3.5 w-8 h-8 rounded-full bg-black/50 hover:bg-black/70 text-white flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <span className="absolute bottom-3 left-3 bg-stone-900/90 text-white text-[10px] font-bold px-2 py-0.5 rounded">
            {product.category}
          </span>
        </div>

        {/* Content */}
        <div className="p-4 overflow-y-auto space-y-4 text-stone-900 flex-1">
          {/* Header & Price */}
          <div>
            <div className="flex items-start justify-between gap-2">
              <div>
                <span className="text-[11px] font-bold text-emerald-800 tracking-wide">
                  {product.brand}
                </span>
                <h2 className="text-base font-bold text-stone-900 leading-snug mt-0.5">
                  {product.name}
                </h2>
              </div>
              <div className="text-right shrink-0">
                <span className="text-lg font-extrabold text-stone-900 tabular-nums">
                  RM {product.priceRM.toFixed(2)}
                </span>
                <span className="text-[10px] text-stone-500 block">{product.unit}</span>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs text-stone-500 mt-2">
              <span className="flex items-center gap-1 font-semibold text-stone-700">
                <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                <span>{product.rating}</span>
                <span>({product.reviewsCount} reviews)</span>
              </span>
              <span>·</span>
              <span className="text-emerald-700 font-semibold">In Stock (Local Depot)</span>
            </div>
          </div>

          {/* Supplier Trust Card */}
          <div className="bg-stone-50 border border-stone-200 p-3 rounded-2xl space-y-1.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-bold text-stone-900">{product.supplier}</span>
                {product.isVerifiedSupplier && (
                  <span className="text-[9px] font-bold text-emerald-800 bg-emerald-100 px-1.5 py-0.2 rounded flex items-center gap-0.5">
                    <ShieldCheck className="w-3 h-3 text-emerald-700" />
                    <span>Verified Supplier</span>
                  </span>
                )}
              </div>
            </div>

            <div className="flex items-center gap-2 text-[11px] text-stone-500">
              <MapPin className="w-3 h-3 text-stone-400" />
              <span>{product.location}</span>
              <span>·</span>
              <span className="text-emerald-800 font-semibold">{product.distanceKm} km away</span>
            </div>
          </div>

          {/* Description */}
          <div>
            <h3 className="text-xs font-bold text-stone-900 uppercase tracking-wider mb-1">
              Agronomic Description
            </h3>
            <p className="text-xs text-stone-700 leading-relaxed bg-stone-50 p-2.5 rounded-xl border border-stone-100">
              {product.description}
            </p>
          </div>

          {/* Usage & Application Rate */}
          {product.applicationRate && (
            <div className="bg-emerald-50/70 border border-emerald-200 p-3 rounded-xl text-xs space-y-1">
              <div className="font-bold text-emerald-950">Recommended Dosage & Safety</div>
              <div className="text-emerald-900 text-[11px]">
                <strong>Dosage:</strong> {product.applicationRate}
              </div>
              {product.safetyInterval && (
                <div className="text-emerald-900 text-[11px]">
                  <strong>Safety:</strong> {product.safetyInterval}
                </div>
              )}
            </div>
          )}

          {/* Quantity Selector */}
          <div className="flex items-center justify-between pt-2">
            <span className="text-xs font-bold text-stone-800">Order Quantity</span>
            <div className="flex items-center gap-2 bg-stone-100 p-1 rounded-xl border border-stone-200">
              <button
                type="button"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="w-7 h-7 bg-white rounded-lg flex items-center justify-center text-stone-700 hover:bg-stone-200 shadow-2xs font-bold"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <span className="w-6 text-center text-xs font-bold tabular-nums">{quantity}</span>
              <button
                type="button"
                onClick={() => setQuantity((q) => q + 1)}
                className="w-7 h-7 bg-white rounded-lg flex items-center justify-center text-stone-700 hover:bg-stone-200 shadow-2xs font-bold"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-stone-200 bg-stone-50 shrink-0">
          {isInstantOrderSuccess ? (
            <div className="w-full py-2.5 bg-emerald-700 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-xs">
              <Check className="w-4 h-4" />
              <span>Order Reserved! Supplier Notified for Pickup/Delivery.</span>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={handleAddToCart}
                className="py-2.5 px-3 bg-white border border-stone-300 hover:bg-stone-100 text-stone-800 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
              >
                <ShoppingBag className="w-4 h-4 text-emerald-700" />
                <span>Add to Cart</span>
              </button>

              <button
                onClick={handleInstantBuy}
                className="py-2.5 px-3 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 shadow-xs transition-colors"
              >
                <Truck className="w-4 h-4" />
                <span>Order Now (RM {(product.priceRM * quantity).toFixed(2)})</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
