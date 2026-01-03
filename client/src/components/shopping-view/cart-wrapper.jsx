import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";
import UserCartItemsContent from "./cart-items-content";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, Tag, TrendingDown, Sparkles, ArrowRight, Gift } from "lucide-react";
import { Input } from "../ui/input";
import { Badge } from "../ui/badge";
import { useState } from "react";
import { Separator } from "../ui/separator";

function UserCartWrapper({ cartItems, setOpenCartSheet }) {
  const navigate = useNavigate();
  const [promoCode, setPromoCode] = useState("");
  const [appliedPromo, setAppliedPromo] = useState(null);
  const [promoError, setPromoError] = useState("");

  // Calculate totals
  const subtotal =
    cartItems && cartItems.length > 0
      ? cartItems.reduce(
          (sum, currentItem) =>
            sum +
            (currentItem?.salePrice > 0
              ? currentItem?.salePrice
              : currentItem?.price) *
              currentItem?.quantity,
          0
        )
      : 0;

  // Calculate original price (before sale)
  const originalTotal =
    cartItems && cartItems.length > 0
      ? cartItems.reduce(
          (sum, currentItem) => sum + currentItem?.price * currentItem?.quantity,
          0
        )
      : 0;

  const savings = originalTotal - subtotal;
  
  // Promo code discount
  const promoDiscount = appliedPromo ? (subtotal * appliedPromo.discount) / 100 : 0;
  
  // Shipping (free over $50)
  const shipping = subtotal > 50 ? 0 : 5.99;
  const freeShippingProgress = subtotal > 50 ? 100 : (subtotal / 50) * 100;
  
  // Final total
  const totalCartAmount = subtotal - promoDiscount + shipping;

  // Mock promo codes (replace with API call)
  const validPromoCodes = {
    "SAVE10": { discount: 10, description: "10% off your order" },
    "SAVE20": { discount: 20, description: "20% off your order" },
    "WELCOME": { discount: 15, description: "15% off for new customers" },
  };

  const handleApplyPromo = () => {
    const code = promoCode.toUpperCase();
    if (validPromoCodes[code]) {
      setAppliedPromo({ code, ...validPromoCodes[code] });
      setPromoError("");
    } else {
      setPromoError("Invalid promo code");
      setAppliedPromo(null);
    }
  };

  const handleRemovePromo = () => {
    setAppliedPromo(null);
    setPromoCode("");
    setPromoError("");
  };

  return (
    <SheetContent className="sm:max-w-md flex flex-col h-full">
      {/* Header */}
      <SheetHeader className="space-y-2">
        <div className="flex items-center justify-between">
          <SheetTitle className="flex items-center gap-2 text-2xl">
            <ShoppingBag className="w-6 h-6 text-blue-600" />
            Your Cart
          </SheetTitle>
          {cartItems?.length > 0 && (
            <Badge variant="secondary" className="text-sm">
              {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'}
            </Badge>
          )}
        </div>
        
        {/* Free Shipping Progress */}
        {cartItems?.length > 0 && subtotal < 50 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-blue-50 p-3 rounded-lg"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-blue-900">
                Add ${(50 - subtotal).toFixed(2)} for FREE shipping!
              </span>
              <Gift className="w-4 h-4 text-blue-600" />
            </div>
            <div className="w-full bg-blue-200 rounded-full h-2">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${freeShippingProgress}%` }}
                transition={{ duration: 0.5 }}
                className="bg-blue-600 h-2 rounded-full"
              />
            </div>
          </motion.div>
        )}
      </SheetHeader>

      {/* Cart Items */}
      <div className="flex-1 overflow-y-auto mt-6 space-y-4 pr-2">
        <AnimatePresence mode="popLayout">
          {cartItems && cartItems.length > 0 ? (
            cartItems.map((item, index) => (
              <motion.div
                key={item.productId}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ delay: index * 0.05 }}
              >
                <UserCartItemsContent cartItem={item} />
              </motion.div>
            ))
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center justify-center py-12 text-center"
            >
              <ShoppingBag className="w-16 h-16 text-gray-300 mb-4" />
              <h3 className="text-lg font-semibold text-gray-700 mb-2">
                Your cart is empty
              </h3>
              <p className="text-sm text-gray-500 mb-4">
                Add some products to get started!
              </p>
              <Button
                onClick={() => {
                  navigate("/shop/listing");
                  setOpenCartSheet(false);
                }}
                variant="outline"
              >
                Start Shopping
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Cart Summary - Only show if items exist */}
      {cartItems?.length > 0 && (
        <div className="border-t pt-4 space-y-4 mt-4">
          {/* Promo Code */}
          <div className="space-y-2">
            <label className="text-sm font-medium flex items-center gap-2">
              <Tag className="w-4 h-4 text-blue-600" />
              Promo Code
            </label>
            {appliedPromo ? (
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg"
              >
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-green-600" />
                  <div>
                    <p className="text-sm font-semibold text-green-900">
                      {appliedPromo.code}
                    </p>
                    <p className="text-xs text-green-700">
                      {appliedPromo.description}
                    </p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleRemovePromo}
                  className="text-green-700 hover:text-green-900"
                >
                  Remove
                </Button>
              </motion.div>
            ) : (
              <div className="flex gap-2">
                <Input
                  placeholder="Enter code"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
                  onKeyDown={(e) => e.key === 'Enter' && handleApplyPromo()}
                  className="flex-1"
                />
                <Button
                  onClick={handleApplyPromo}
                  variant="outline"
                  disabled={!promoCode}
                >
                  Apply
                </Button>
              </div>
            )}
            {promoError && (
              <p className="text-xs text-red-600">{promoError}</p>
            )}
          </div>

          <Separator />

          {/* Price Breakdown */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Subtotal</span>
              <span className="font-medium">${subtotal.toFixed(2)}</span>
            </div>
            
            {savings > 0 && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex justify-between text-sm text-green-600"
              >
                <span className="flex items-center gap-1">
                  <TrendingDown className="w-4 h-4" />
                  Savings
                </span>
                <span className="font-medium">-${savings.toFixed(2)}</span>
              </motion.div>
            )}
            
            {appliedPromo && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex justify-between text-sm text-green-600"
              >
                <span className="flex items-center gap-1">
                  <Tag className="w-4 h-4" />
                  Promo ({appliedPromo.discount}%)
                </span>
                <span className="font-medium">-${promoDiscount.toFixed(2)}</span>
              </motion.div>
            )}
            
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Shipping</span>
              <span className="font-medium">
                {shipping === 0 ? (
                  <span className="text-green-600 font-semibold">FREE</span>
                ) : (
                  `$${shipping.toFixed(2)}`
                )}
              </span>
            </div>
          </div>

          <Separator />

          {/* Total */}
          <div className="flex justify-between items-center">
            <span className="text-lg font-bold">Total</span>
            <div className="text-right">
              <span className="text-2xl font-bold text-blue-600">
                ${totalCartAmount.toFixed(2)}
              </span>
              {(savings > 0 || promoDiscount > 0) && (
                <p className="text-xs text-gray-500">
                  You saved ${(savings + promoDiscount).toFixed(2)}!
                </p>
              )}
            </div>
          </div>

          {/* Checkout Button */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Button
              onClick={() => {
                navigate("/shop/checkout");
                setOpenCartSheet(false);
              }}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-6 text-lg shadow-lg hover:shadow-xl transition-all duration-300"
              size="lg"
            >
              Proceed to Checkout
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </motion.div>

          {/* Continue Shopping */}
          <Button
            onClick={() => {
              navigate("/shop/listing");
              setOpenCartSheet(false);
            }}
            variant="outline"
            className="w-full"
          >
            Continue Shopping
          </Button>
        </div>
      )}
    </SheetContent>
  );
}

export default UserCartWrapper;
