import { Minus, Plus, Trash, AlertCircle } from "lucide-react";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import { deleteCartItem, updateCartQuantity } from "@/store/shop/cart-slice";
import { useToast } from "../ui/use-toast";
import { motion } from "framer-motion";
import { Badge } from "../ui/badge";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import { useState } from "react";

function UserCartItemsContent({ cartItem }) {
  const { user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.shopCart);
  const { productList } = useSelector((state) => state.shopProducts);
  const dispatch = useDispatch();
  const { toast } = useToast();
  const [isDeleting, setIsDeleting] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  function handleUpdateQuantity(getCartItem, typeOfAction) {
    setIsUpdating(true);
    if (typeOfAction == "plus") {
      let getCartItems = cartItems.items || [];

      if (getCartItems.length) {
        const indexOfCurrentCartItem = getCartItems.findIndex(
          (item) => item.productId === getCartItem?.productId
        );

        const getCurrentProductIndex = productList.findIndex(
          (product) => product._id === getCartItem?.productId
        );
        const getTotalStock = productList[getCurrentProductIndex].totalStock;

        if (indexOfCurrentCartItem > -1) {
          const getQuantity = getCartItems[indexOfCurrentCartItem].quantity;
          if (getQuantity + 1 > getTotalStock) {
            toast({
              title: `Only ${getQuantity} quantity can be added for this item`,
              variant: "destructive",
            });

            return;
          }
        }
      }
    }

    dispatch(
      updateCartQuantity({
        userId: user?.id,
        productId: getCartItem?.productId,
        quantity:
          typeOfAction === "plus"
            ? getCartItem?.quantity + 1
            : getCartItem?.quantity - 1,
      })
    ).then((data) => {
      setIsUpdating(false);
      if (data?.payload?.success) {
        toast({
          title: "Cart updated",
          description: `Quantity ${typeOfAction === "plus" ? "increased" : "decreased"}`,
        });
      }
    });
  }

  function handleCartItemDelete(getCartItem) {
    setIsDeleting(true);
    dispatch(
      deleteCartItem({ userId: user?.id, productId: getCartItem?.productId })
    ).then((data) => {
      if (data?.payload?.success) {
        toast({
          title: "Item removed",
          description: `${getCartItem?.title} removed from cart`,
        });
      }
      setIsDeleting(false);
    });
  }

  const itemTotal = (
    (cartItem?.salePrice > 0 ? cartItem?.salePrice : cartItem?.price) *
    cartItem?.quantity
  ).toFixed(2);

  const hasDiscount = cartItem?.salePrice > 0;
  const discountPercent = hasDiscount
    ? Math.round(((cartItem?.price - cartItem?.salePrice) / cartItem?.price) * 100)
    : 0;

  return (
    <motion.div
      layout
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, x: -100 }}
      className="relative group"
    >
      <div className="flex gap-4 p-3 rounded-lg border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all duration-300 bg-white">
        {/* Product Image */}
        <div className="relative flex-shrink-0">
          <motion.img
            whileHover={{ scale: 1.05 }}
            src={cartItem?.image}
            alt={cartItem?.title}
            className="w-20 h-20 rounded-lg object-cover"
          />
          {hasDiscount && (
            <Badge className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1.5 py-0.5">
              -{discountPercent}%
            </Badge>
          )}
        </div>

        {/* Product Details */}
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-sm text-gray-900 truncate mb-1">
            {cartItem?.title}
          </h3>
          
          {/* Price */}
          <div className="flex items-center gap-2 mb-2">
            <span className="font-bold text-blue-600">
              ${(cartItem?.salePrice > 0 ? cartItem?.salePrice : cartItem?.price).toFixed(2)}
            </span>
            {hasDiscount && (
              <span className="text-xs text-gray-400 line-through">
                ${cartItem?.price.toFixed(2)}
              </span>
            )}
          </div>

          {/* Quantity Controls */}
          <div className="flex items-center gap-2">
            <motion.div whileTap={{ scale: 0.95 }}>
              <Button
                variant="outline"
                className="h-7 w-7 rounded-full p-0 hover:bg-blue-50 hover:border-blue-500"
                size="icon"
                disabled={cartItem?.quantity === 1 || isUpdating}
                onClick={() => handleUpdateQuantity(cartItem, "minus")}
              >
                <Minus className="w-3 h-3" />
                <span className="sr-only">Decrease</span>
              </Button>
            </motion.div>
            
            <span className="font-semibold text-sm min-w-[20px] text-center">
              {cartItem?.quantity}
            </span>
            
            <motion.div whileTap={{ scale: 0.95 }}>
              <Button
                variant="outline"
                className="h-7 w-7 rounded-full p-0 hover:bg-blue-50 hover:border-blue-500"
                size="icon"
                disabled={isUpdating}
                onClick={() => handleUpdateQuantity(cartItem, "plus")}
              >
                <Plus className="w-3 h-3" />
                <span className="sr-only">Increase</span>
              </Button>
            </motion.div>
          </div>
        </div>

        {/* Price & Delete */}
        <div className="flex flex-col items-end justify-between">
          <div className="text-right">
            <p className="font-bold text-gray-900">${itemTotal}</p>
            {cartItem?.quantity > 1 && (
              <p className="text-xs text-gray-500">
                ${(cartItem?.salePrice > 0 ? cartItem?.salePrice : cartItem?.price).toFixed(2)} each
              </p>
            )}
          </div>

          {/* Delete Button with Confirmation */}
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-1.5 rounded-full hover:bg-red-50 transition-colors group/delete"
                disabled={isDeleting}
              >
                <Trash className="w-4 h-4 text-gray-400 group-hover/delete:text-red-600 transition-colors" />
              </motion.button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle className="flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-red-600" />
                  Remove from cart?
                </AlertDialogTitle>
                <AlertDialogDescription>
                  Are you sure you want to remove <strong>{cartItem?.title}</strong> from your cart?
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={() => handleCartItemDelete(cartItem)}
                  className="bg-red-600 hover:bg-red-700"
                >
                  Remove
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
    </motion.div>
  );
}

export default UserCartItemsContent;
