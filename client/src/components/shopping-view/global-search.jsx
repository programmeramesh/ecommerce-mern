import { motion, AnimatePresence } from "framer-motion";
import { Search, X, TrendingUp, Clock, Tag, Loader2 } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { getSearchResults, resetSearchResults } from "@/store/shop/search-slice";
import { fetchProductDetails } from "@/store/shop/products-slice";
import { categoryOptionsMap, brandOptionsMap } from "@/config";

function GlobalSearch({ isOpen, onClose }) {
  const [keyword, setKeyword] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [recentSearches, setRecentSearches] = useState([]);
  const inputRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { searchResults } = useSelector((state) => state.shopSearch);

  // Popular searches (can be dynamic from backend)
  const popularSearches = [
    "Electronics",
    "Smartphones",
    "Laptops",
    "Fashion",
    "Shoes",
    "Watches",
    "Headphones",
    "Cameras",
  ];

  // Load recent searches from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("recentSearches");
    if (saved) {
      setRecentSearches(JSON.parse(saved));
    }
  }, []);

  // Focus input when modal opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current.focus(), 100);
    }
  }, [isOpen]);

  // Search with debounce
  useEffect(() => {
    if (keyword && keyword.trim().length > 2) {
      setIsSearching(true);
      const timer = setTimeout(() => {
        dispatch(getSearchResults(keyword));
        setIsSearching(false);
      }, 500);
      return () => clearTimeout(timer);
    } else {
      dispatch(resetSearchResults());
      setIsSearching(false);
    }
  }, [keyword, dispatch]);

  // Handle search submission
  const handleSearch = (searchTerm) => {
    if (searchTerm.trim()) {
      // Save to recent searches
      const updated = [
        searchTerm,
        ...recentSearches.filter((s) => s !== searchTerm),
      ].slice(0, 5);
      setRecentSearches(updated);
      localStorage.setItem("recentSearches", JSON.stringify(updated));

      // Navigate to search page
      navigate(`/shop/search?keyword=${encodeURIComponent(searchTerm)}`);
      onClose();
    }
  };

  // Handle product click
  const handleProductClick = (productId) => {
    dispatch(fetchProductDetails(productId));
    navigate(`/shop/listing`);
    onClose();
  };

  // Clear recent searches
  const clearRecentSearches = () => {
    setRecentSearches([]);
    localStorage.removeItem("recentSearches");
  };

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />

          {/* Search Modal */}
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed top-0 left-0 right-0 z-50 mx-auto max-w-3xl mt-4 md:mt-20"
          >
            <div className="bg-white rounded-2xl shadow-2xl mx-4 overflow-hidden">
              {/* Search Input */}
              <div className="flex items-center gap-3 p-4 border-b">
                <Search className="w-5 h-5 text-gray-400" />
                <Input
                  ref={inputRef}
                  type="text"
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleSearch(keyword);
                  }}
                  placeholder="Search for products, brands, categories..."
                  className="flex-1 border-0 focus-visible:ring-0 text-lg"
                />
                {isSearching && (
                  <Loader2 className="w-5 h-5 text-blue-600 animate-spin" />
                )}
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onClose}
                  className="hover:bg-gray-100"
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>

              {/* Search Results / Suggestions */}
              <div className="max-h-[60vh] overflow-y-auto">
                {keyword.trim().length > 2 ? (
                  // Search Results
                  <div className="p-4">
                    {searchResults.length > 0 ? (
                      <>
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="text-sm font-semibold text-gray-500 uppercase">
                            Search Results ({searchResults.length})
                          </h3>
                          <Button
                            variant="link"
                            size="sm"
                            onClick={() => handleSearch(keyword)}
                            className="text-blue-600"
                          >
                            View All
                          </Button>
                        </div>
                        <div className="space-y-2">
                          {searchResults.slice(0, 6).map((product) => (
                            <motion.div
                              key={product._id}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              whileHover={{ backgroundColor: "#f9fafb" }}
                              onClick={() => handleProductClick(product._id)}
                              className="flex items-center gap-4 p-3 rounded-lg cursor-pointer transition-colors"
                            >
                              <img
                                src={product.image}
                                alt={product.title}
                                className="w-16 h-16 object-cover rounded-lg"
                              />
                              <div className="flex-1 min-w-0">
                                <h4 className="font-medium text-gray-900 truncate">
                                  {product.title}
                                </h4>
                                <div className="flex items-center gap-2 mt-1">
                                  <Badge variant="secondary" className="text-xs">
                                    {categoryOptionsMap[product.category]}
                                  </Badge>
                                  <span className="text-sm text-gray-500">
                                    {brandOptionsMap[product.brand]}
                                  </span>
                                </div>
                              </div>
                              <div className="text-right">
                                <div className="font-bold text-blue-600">
                                  ${product.salePrice || product.price}
                                </div>
                                {product.salePrice > 0 && (
                                  <div className="text-xs text-gray-400 line-through">
                                    ${product.price}
                                  </div>
                                )}
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </>
                    ) : (
                      <div className="text-center py-12">
                        <Search className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                        <p className="text-gray-500">
                          No products found for "{keyword}"
                        </p>
                        <p className="text-sm text-gray-400 mt-1">
                          Try different keywords or browse categories
                        </p>
                      </div>
                    )}
                  </div>
                ) : (
                  // Suggestions
                  <div className="p-4 space-y-6">
                    {/* Recent Searches */}
                    {recentSearches.length > 0 && (
                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4 text-gray-400" />
                            <h3 className="text-sm font-semibold text-gray-700">
                              Recent Searches
                            </h3>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={clearRecentSearches}
                            className="text-xs text-gray-500 hover:text-gray-700"
                          >
                            Clear
                          </Button>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {recentSearches.map((search, index) => (
                            <motion.button
                              key={index}
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: index * 0.05 }}
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => {
                                setKeyword(search);
                                handleSearch(search);
                              }}
                              className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-full text-sm text-gray-700 transition-colors"
                            >
                              {search}
                            </motion.button>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Popular Searches */}
                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <TrendingUp className="w-4 h-4 text-gray-400" />
                        <h3 className="text-sm font-semibold text-gray-700">
                          Popular Searches
                        </h3>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {popularSearches.map((search, index) => (
                          <motion.button
                            key={index}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.05 }}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => {
                              setKeyword(search);
                              handleSearch(search);
                            }}
                            className="px-4 py-2 bg-blue-50 hover:bg-blue-100 rounded-full text-sm text-blue-700 transition-colors flex items-center gap-1"
                          >
                            <Tag className="w-3 h-3" />
                            {search}
                          </motion.button>
                        ))}
                      </div>
                    </div>

                    {/* Quick Tips */}
                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4">
                      <h4 className="font-semibold text-gray-700 mb-2">
                        💡 Search Tips
                      </h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• Use specific product names for better results</li>
                        <li>• Try searching by brand or category</li>
                        <li>• Use at least 3 characters for search</li>
                      </ul>
                    </div>
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="border-t p-3 bg-gray-50">
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>Press ESC to close</span>
                  <span>Press ENTER to search</span>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export default GlobalSearch;
