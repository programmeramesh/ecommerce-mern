import { Card, CardContent, CardFooter } from "../ui/card";
import { Button } from "../ui/button";
import { brandOptionsMap, categoryOptionsMap } from "@/config";
import { Badge } from "../ui/badge";
import { motion } from "framer-motion";
import { ShoppingCart } from "lucide-react";

function ShoppingProductTile({
  product,
  handleGetProductDetails,
  handleAddtoCart,
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -8 }}
      className="group"
    >
    <Card className="w-full max-w-sm mx-auto overflow-hidden border-0 shadow-md hover:shadow-2xl transition-all duration-300">
      <div onClick={() => handleGetProductDetails(product?._id)} className="cursor-pointer">
        <div className="relative overflow-hidden">
          <motion.img
            src={product?.image}
            alt={product?.title}
            className="w-full h-[300px] object-cover"
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.4 }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          {product?.totalStock === 0 ? (
            <motion.div
              initial={{ x: -100 }}
              animate={{ x: 0 }}
              transition={{ type: "spring", stiffness: 100 }}
            >
              <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-600 shadow-lg">
                Out Of Stock
              </Badge>
            </motion.div>
          ) : product?.totalStock < 10 ? (
            <motion.div
              initial={{ x: -100 }}
              animate={{ x: 0 }}
              transition={{ type: "spring", stiffness: 100 }}
            >
              <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-600 shadow-lg animate-pulse">
                {`Only ${product?.totalStock} items left`}
              </Badge>
            </motion.div>
          ) : product?.salePrice > 0 ? (
            <motion.div
              initial={{ x: -100 }}
              animate={{ x: 0 }}
              transition={{ type: "spring", stiffness: 100 }}
            >
              <Badge className="absolute top-2 left-2 bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 shadow-lg">
                Sale
              </Badge>
            </motion.div>
          ) : null}
        </div>
        <CardContent className="p-4 bg-gradient-to-b from-white to-gray-50 group-hover:from-gray-50 group-hover:to-white transition-all duration-300">
          <h2 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors duration-300">{product?.title}</h2>
          <div className="flex justify-between items-center mb-2">
            <span className="text-[16px] text-muted-foreground">
              {categoryOptionsMap[product?.category]}
            </span>
            <span className="text-[16px] text-muted-foreground">
              {brandOptionsMap[product?.brand]}
            </span>
          </div>
          <div className="flex justify-between items-center mb-2">
            <span
              className={`${
                product?.salePrice > 0 ? "line-through text-gray-400" : "text-primary"
              } text-lg font-semibold`}
            >
              ${product?.price}
            </span>
            {product?.salePrice > 0 ? (
              <motion.span 
                className="text-lg font-bold text-green-600"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200 }}
              >
                ${product?.salePrice}
              </motion.span>
            ) : null}
          </div>
        </CardContent>
      </div>
      <CardFooter className="p-4 pt-0">
        {product?.totalStock === 0 ? (
          <Button className="w-full opacity-60 cursor-not-allowed" disabled>
            Out Of Stock
          </Button>
        ) : (
          <motion.div className="w-full" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button
              onClick={() => handleAddtoCart(product?._id, product?.totalStock)}
              className="w-full bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 shadow-md hover:shadow-lg transition-all duration-300 group/btn"
            >
              <ShoppingCart className="w-4 h-4 mr-2 group-hover/btn:animate-bounce" />
              Add to cart
            </Button>
          </motion.div>
        )}
      </CardFooter>
    </Card>
    </motion.div>
  );
}

export default ShoppingProductTile;
