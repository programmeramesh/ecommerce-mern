import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Heart, ShoppingCart, Trash2, Share2, Eye } from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import { useToast } from "../ui/use-toast";

function Wishlist() {
  const { toast } = useToast();
  
  // Mock wishlist data - replace with actual data from backend
  const [wishlistItems, setWishlistItems] = useState([
    {
      id: 1,
      title: "Wireless Headphones",
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400",
      price: 99.99,
      salePrice: 79.99,
      inStock: true,
      category: "Electronics",
    },
    {
      id: 2,
      title: "Smart Watch",
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400",
      price: 299.99,
      salePrice: 0,
      inStock: true,
      category: "Electronics",
    },
    {
      id: 3,
      title: "Running Shoes",
      image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400",
      price: 129.99,
      salePrice: 99.99,
      inStock: false,
      category: "Footwear",
    },
  ]);

  const handleRemove = (id) => {
    setWishlistItems(wishlistItems.filter((item) => item.id !== id));
    toast({
      title: "Removed from wishlist",
      description: "Item has been removed from your wishlist",
    });
  };

  const handleAddToCart = (item) => {
    toast({
      title: "Added to cart",
      description: `${item.title} has been added to your cart`,
    });
  };

  const handleShare = (item) => {
    toast({
      title: "Share link copied",
      description: "Product link copied to clipboard",
    });
  };

  if (wishlistItems.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center justify-center py-16 text-center"
      >
        <Heart className="w-20 h-20 text-gray-300 mb-4" />
        <h3 className="text-2xl font-bold text-gray-700 mb-2">
          Your wishlist is empty
        </h3>
        <p className="text-gray-500 mb-6">
          Save items you love for later!
        </p>
        <Button>Start Shopping</Button>
      </motion.div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">My Wishlist</h2>
          <p className="text-gray-600 mt-1">
            {wishlistItems.length} {wishlistItems.length === 1 ? "item" : "items"} saved
          </p>
        </div>
        <Button variant="outline" className="gap-2">
          <Share2 className="w-4 h-4" />
          Share Wishlist
        </Button>
      </div>

      {/* Wishlist Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence mode="popLayout">
          {wishlistItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9, x: -100 }}
              transition={{ delay: index * 0.1 }}
              layout
            >
              <Card className="group overflow-hidden hover:shadow-xl transition-all duration-300">
                <div className="relative">
                  {/* Image */}
                  <div className="relative h-64 overflow-hidden bg-gray-100">
                    <motion.img
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.3 }}
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                    
                    {/* Badges */}
                    <div className="absolute top-3 left-3 flex flex-col gap-2">
                      {item.salePrice > 0 && (
                        <Badge className="bg-red-500 text-white">
                          {Math.round(((item.price - item.salePrice) / item.price) * 100)}% OFF
                        </Badge>
                      )}
                      {!item.inStock && (
                        <Badge variant="secondary">Out of Stock</Badge>
                      )}
                    </div>

                    {/* Quick Actions */}
                    <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleShare(item)}
                        className="p-2 bg-white rounded-full shadow-lg hover:bg-gray-100 transition-colors"
                      >
                        <Share2 className="w-4 h-4 text-gray-700" />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="p-2 bg-white rounded-full shadow-lg hover:bg-gray-100 transition-colors"
                      >
                        <Eye className="w-4 h-4 text-gray-700" />
                      </motion.button>
                    </div>
                  </div>
                </div>

                <CardContent className="p-4">
                  {/* Category */}
                  <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">
                    {item.category}
                  </p>

                  {/* Title */}
                  <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                    {item.title}
                  </h3>

                  {/* Price */}
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-xl font-bold text-blue-600">
                      ${item.salePrice > 0 ? item.salePrice : item.price}
                    </span>
                    {item.salePrice > 0 && (
                      <span className="text-sm text-gray-400 line-through">
                        ${item.price}
                      </span>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex-1"
                    >
                      <Button
                        onClick={() => handleAddToCart(item)}
                        disabled={!item.inStock}
                        className="w-full gap-2"
                        size="sm"
                      >
                        <ShoppingCart className="w-4 h-4" />
                        {item.inStock ? "Add to Cart" : "Out of Stock"}
                      </Button>
                    </motion.div>
                    <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                      <Button
                        onClick={() => handleRemove(item.id)}
                        variant="outline"
                        size="sm"
                        className="px-3 hover:bg-red-50 hover:text-red-600 hover:border-red-300"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </motion.div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default Wishlist;
