import React, { useState } from 'react';
import {
  ShoppingBag,
  Search,
  Filter,
  MapPin,
  ShieldCheck,
  Star,
  Plus,
  MessageSquare,
  Bookmark,
  BookmarkCheck,
  Wrench,
  Check,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Product, SecondhandEquipment } from '../../types';
import { ProductDetailModal } from './ProductDetailModal';
import { EquipmentChatModal } from './EquipmentChatModal';
import { CartModal } from './CartModal';

export const MarketView: React.FC = () => {
  const {
    products,
    equipment,
    addToCart,
    setSelectedProductId,
    setSelectedEquipmentId,
    setIsEquipmentChatOpen,
    toggleSaveEquipment,
  } = useApp();

  const [activeSection, setActiveSection] = useState<'supplies' | 'equipment'>('supplies');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Crop Protection', 'Fertilizer', 'Seeds', 'Irrigation', 'Tools'];

  // Filter supplies
  const filteredProducts = products.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.supplier.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.brand.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Filter equipment
  const filteredEquipment = equipment.filter((eq) => {
    return (
      eq.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      eq.seller.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  const handleOpenEquipmentChat = (eqId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedEquipmentId(eqId);
    setIsEquipmentChatOpen(true);
  };

  return (
    <div className="px-4 py-4 space-y-4">
      {/* Top Header */}
      <div>
        <h2 className="text-base font-bold text-stone-900 tracking-tight">Agricultural Marketplace</h2>
        <p className="text-xs text-stone-500 font-medium">
          Verified local farm input suppliers & secondhand equipment around Kedah
        </p>
      </div>

      {/* Primary Section Switcher: Farm Supplies vs Secondhand Equipment */}
      <div className="grid grid-cols-2 p-1 bg-stone-200/80 rounded-2xl">
        <button
          onClick={() => setActiveSection('supplies')}
          className={`py-2 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1.5 ${
            activeSection === 'supplies'
              ? 'bg-white text-emerald-950 shadow-sm'
              : 'text-stone-600 hover:text-stone-900'
          }`}
        >
          <ShoppingBag className="w-3.5 h-3.5 text-emerald-700" />
          <span>Farm Supplies ({products.length})</span>
        </button>

        <button
          onClick={() => setActiveSection('equipment')}
          className={`py-2 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1.5 ${
            activeSection === 'equipment'
              ? 'bg-white text-emerald-950 shadow-sm'
              : 'text-stone-600 hover:text-stone-900'
          }`}
        >
          <Wrench className="w-3.5 h-3.5 text-emerald-700" />
          <span>Used Equipment ({equipment.length})</span>
        </button>
      </div>

      {/* Search Input */}
      <div className="relative">
        <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
        <input
          type="text"
          placeholder={
            activeSection === 'supplies'
              ? 'Search fungicides, fertilizers, seeds...'
              : 'Search water pumps, sprayers, tillers...'
          }
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-9 pr-4 py-2 bg-white border border-stone-200 rounded-xl text-xs text-stone-900 focus:outline-none focus:ring-2 focus:ring-emerald-600/30"
        />
      </div>

      {/* Category Pills for Supplies */}
      {activeSection === 'supplies' && (
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg whitespace-nowrap text-xs font-medium transition-colors ${
                selectedCategory === cat
                  ? 'bg-stone-900 text-white shadow-xs'
                  : 'bg-white border border-stone-200 text-stone-600 hover:text-stone-900'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      )}

      {/* SUPPLIES LISTING */}
      {activeSection === 'supplies' && (
        <div className="space-y-3">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              onClick={() => setSelectedProductId(product.id)}
              className="bg-white border border-stone-200 hover:border-emerald-600/50 rounded-2xl p-3 shadow-xs cursor-pointer transition-all hover:shadow-md group flex gap-3"
            >
              {/* Product Thumbnail */}
              <div className="w-24 h-24 rounded-xl bg-stone-100 overflow-hidden shrink-0 border border-stone-100">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Product Info */}
              <div className="flex-1 min-w-0 flex flex-col justify-between">
                <div>
                  <div className="flex items-start justify-between gap-1">
                    <h3 className="text-xs font-bold text-stone-900 leading-snug line-clamp-2">
                      {product.name}
                    </h3>
                  </div>

                  <div className="flex items-center gap-1 text-[10px] text-stone-500 mt-1">
                    <span className="font-semibold text-stone-700">{product.brand}</span>
                    <span>·</span>
                    <span className="flex items-center gap-0.5">
                      <Star className="w-2.5 h-2.5 fill-amber-400 text-amber-400" />
                      <span>{product.rating}</span>
                      <span>({product.reviewsCount})</span>
                    </span>
                  </div>

                  <div className="flex items-center gap-1 text-[10px] text-stone-500 mt-0.5">
                    <MapPin className="w-2.5 h-2.5 text-stone-400" />
                    <span className="truncate">{product.supplier}</span>
                    <span className="text-emerald-700 font-semibold">({product.distanceKm} km)</span>
                  </div>
                </div>

                <div className="mt-2 pt-1.5 border-t border-stone-100 flex items-center justify-between">
                  <div>
                    <span className="text-sm font-extrabold text-stone-900 tabular-nums">
                      RM {product.priceRM.toFixed(2)}
                    </span>
                    <span className="text-[10px] text-stone-400 block -mt-0.5">{product.unit}</span>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      addToCart(product, 1);
                    }}
                    className="px-2.5 py-1.5 bg-emerald-700 hover:bg-emerald-800 active:scale-95 text-white rounded-lg text-[11px] font-bold flex items-center gap-1 transition-all shadow-xs"
                  >
                    <Plus className="w-3 h-3" />
                    <span>Add</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* SECONDHAND EQUIPMENT LISTING */}
      {activeSection === 'equipment' && (
        <div className="space-y-3.5">
          {filteredEquipment.map((item) => (
            <div
              key={item.id}
              onClick={() => {
                setSelectedEquipmentId(item.id);
                setIsEquipmentChatOpen(true);
              }}
              className="bg-white border border-stone-200 hover:border-emerald-600/50 rounded-2xl overflow-hidden shadow-xs cursor-pointer transition-all hover:shadow-md"
            >
              {/* Equipment Photo */}
              <div className="relative h-44 bg-stone-100 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
                <span className="absolute top-2.5 left-2.5 bg-stone-900/90 text-white text-[10px] font-bold px-2 py-0.5 rounded-md shadow-xs">
                  {item.condition}
                </span>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleSaveEquipment(item.id);
                  }}
                  className="absolute top-2.5 right-2.5 w-8 h-8 rounded-full bg-white/90 hover:bg-white text-stone-700 flex items-center justify-center shadow-xs transition-colors"
                >
                  {item.isSaved ? (
                    <BookmarkCheck className="w-4 h-4 text-emerald-700 fill-emerald-700" />
                  ) : (
                    <Bookmark className="w-4 h-4" />
                  )}
                </button>
              </div>

              {/* Details */}
              <div className="p-3.5 space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="text-sm font-bold text-stone-900 leading-snug">{item.title}</h3>
                    <div className="flex items-center gap-1 text-[11px] text-stone-500 mt-0.5">
                      <span className="font-semibold text-stone-800">{item.seller}</span>
                      {item.isVerifiedSeller && (
                        <span className="text-[9px] font-bold text-emerald-800 bg-emerald-50 px-1 py-0.2 rounded">
                          ✓ Verified
                        </span>
                      )}
                      <span>·</span>
                      <span>{item.distanceKm} km away</span>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <span className="text-base font-extrabold text-stone-900 tabular-nums">
                      RM {item.priceRM}
                    </span>
                  </div>
                </div>

                <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed">
                  {item.description}
                </p>

                {/* Action Buttons */}
                <div className="pt-2 border-t border-stone-100 flex items-center justify-between gap-2">
                  <span className="text-[10px] text-stone-400">Listed {item.postedDate}</span>

                  <button
                    onClick={(e) => handleOpenEquipmentChat(item.id, e)}
                    className="px-3 py-1.5 bg-emerald-700 hover:bg-emerald-800 active:scale-95 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all shadow-xs"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>Message Seller</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modals */}
      <ProductDetailModal />
      <EquipmentChatModal />
      <CartModal />
    </div>
  );
};
