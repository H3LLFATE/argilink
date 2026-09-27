import React, { useState } from 'react';
import { X, Trash2, ShoppingBag, Truck, Check, ArrowRight } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const CartModal: React.FC = () => {
  const { cart, removeFromCart, clearCart, isCartOpen, setIsCartOpen, connectivity } = useApp();
  const [isOrdered, setIsOrdered] = useState(false);

  if (!isCartOpen) return null;

  const totalRM = cart.reduce((sum, item) => sum + item.product.priceRM * item.quantity, 0);

  const handleCheckout = () => {
    setIsOrdered(true);
    setTimeout(() => {
      clearCart();
      setIsOrdered(false);
      setIsCartOpen(false);
    }, 2400);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div className="bg-white w-full max-w-md rounded-t-3xl sm:rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="p-4 border-b border-stone-200 flex items-center justify-between bg-stone-50 shrink-0">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-emerald-700" />
            <h2 className="text-sm font-bold text-stone-900">Farm Supplies Cart</h2>
            <span className="text-xs text-stone-500">({cart.length} items)</span>
          </div>

          <button
            onClick={() => setIsCartOpen(false)}
            className="w-8 h-8 rounded-full bg-stone-200 hover:bg-stone-300 text-stone-700 flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 overflow-y-auto space-y-3 flex-1">
          {cart.length === 0 ? (
            <div className="p-8 text-center space-y-2">
              <ShoppingBag className="w-10 h-10 text-stone-300 mx-auto" />
              <p className="text-xs font-semibold text-stone-600">Your cart is empty.</p>
              <p className="text-[11px] text-stone-400">
                Browse fertilizers, certified seeds, and bio-fungicides from verified suppliers.
              </p>
            </div>
          ) : (
            <div className="space-y-2.5">
              {cart.map((item) => (
                <div
                  key={item.product.id}
                  className="p-2.5 rounded-xl border border-stone-200 flex items-center gap-3 bg-stone-50/50"
                >
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-12 h-12 rounded-lg object-cover border border-stone-200 shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-bold text-stone-900 truncate">
                      {item.product.name}
                    </h4>
                    <p className="text-[10px] text-stone-500 truncate">
                      {item.product.supplier} · Qty: {item.quantity}
                    </p>
                    <div className="text-xs font-bold text-emerald-800 tabular-nums mt-0.5">
                      RM {(item.product.priceRM * item.quantity).toFixed(2)}
                    </div>
                  </div>

                  <button
                    onClick={() => removeFromCart(item.product.id)}
                    className="p-1.5 text-stone-400 hover:text-rose-600 transition-colors"
                    title="Remove item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Order Summary & Simulated Checkout */}
        {cart.length > 0 && (
          <div className="p-4 border-t border-stone-200 bg-stone-50 shrink-0 space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="text-stone-600">Subtotal:</span>
              <span className="font-extrabold text-stone-900 tabular-nums text-sm">
                RM {totalRM.toFixed(2)}
              </span>
            </div>

            <div className="text-[11px] text-stone-500 bg-stone-100 p-2 rounded-xl flex items-center gap-2">
              <Truck className="w-4 h-4 text-emerald-700 shrink-0" />
              <span>Free local pickup at Pendang PPK Depot or supplier farm delivery.</span>
            </div>

            {isOrdered ? (
              <div className="w-full py-3 bg-emerald-700 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 animate-pulse">
                <Check className="w-4 h-4" />
                <span>Order Submitted! Supplier notified via AgriLink network.</span>
              </div>
            ) : (
              <button
                onClick={handleCheckout}
                className="w-full py-3 bg-emerald-700 hover:bg-emerald-800 active:scale-95 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-md transition-all"
              >
                <span>Confirm Farm Order (RM {totalRM.toFixed(2)})</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
