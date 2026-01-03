import { Button } from "../ui/button";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Edit, Trash2, Eye, Package, Tag, DollarSign } from "lucide-react";

function AdminProductTile({
  product,
  setFormData,
  setOpenCreateProductsDialog,
  setCurrentEditedId,
  handleDelete,
  viewMode = "grid"
}) {
  if (viewMode === "list") {
    return (
      <Card className="w-full bg-white shadow-sm hover:shadow-md transition-shadow duration-200 border border-gray-200">
        <div className="flex items-center p-4">
          <div className="relative w-20 h-20 flex-shrink-0">
            <img
              src={product?.image}
              alt={product?.title}
              className="w-full h-full object-cover rounded-lg border border-gray-200"
            />
          </div>
          
          <div className="flex-1 ml-4">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-1">{product?.title}</h3>
                <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
                  <span className="flex items-center gap-1">
                    <Tag size={14} />
                    {product?.category}
                  </span>
                  <span className="flex items-center gap-1">
                    <Package size={14} />
                    Stock: {product?.totalStock}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`text-lg font-semibold ${product?.salePrice > 0 ? "line-through text-gray-500" : "text-green-600"}`}>
                    ${product?.price}
                  </span>
                  {product?.salePrice > 0 && (
                    <span className="text-lg font-bold text-green-600">${product?.salePrice}</span>
                  )}
                </div>
              </div>
              
              <div className="flex items-center gap-2 ml-4">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    setOpenCreateProductsDialog(true);
                    setCurrentEditedId(product?._id);
                    setFormData(product);
                  }}
                  className="flex items-center gap-1 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-300"
                >
                  <Edit size={14} />
                  Edit
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleDelete(product?._id)}
                  className="flex items-center gap-1 hover:bg-red-50 hover:text-red-600 hover:border-red-300"
                >
                  <Trash2 size={14} />
                  Delete
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card className="w-full bg-white shadow-sm hover:shadow-lg transition-all duration-200 border border-gray-200 group overflow-hidden">
      <div className="relative">
        <img
          src={product?.image}
          alt={product?.title}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-200"
        />
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-200 flex items-center justify-center">
          <Eye className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
        </div>
        {product?.salePrice > 0 && (
          <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-medium">
            Sale
          </div>
        )}
        <div className="absolute top-2 right-2 bg-white bg-opacity-90 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-medium text-gray-700">
          Stock: {product?.totalStock}
        </div>
      </div>
      
      <CardContent className="p-4">
        <div className="mb-2">
          <span className="inline-block bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs font-medium mb-2">
            {product?.category}
          </span>
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors duration-200">
          {product?.title}
        </h3>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className={`text-lg font-semibold ${product?.salePrice > 0 ? "line-through text-gray-500" : "text-green-600"}`}>
              ${product?.price}
            </span>
            {product?.salePrice > 0 && (
              <span className="text-lg font-bold text-green-600">${product?.salePrice}</span>
            )}
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="p-4 pt-0 flex gap-2">
        <Button
          size="sm"
          onClick={() => {
            setOpenCreateProductsDialog(true);
            setCurrentEditedId(product?._id);
            setFormData(product);
          }}
          className="flex-1 bg-blue-500 hover:bg-blue-600 text-white flex items-center justify-center gap-1"
        >
          <Edit size={14} />
          Edit
        </Button>
        <Button
          size="sm"
          variant="outline"
          onClick={() => handleDelete(product?._id)}
          className="flex-1 hover:bg-red-50 hover:text-red-600 hover:border-red-300 flex items-center justify-center gap-1"
        >
          <Trash2 size={14} />
          Delete
        </Button>
      </CardFooter>
    </Card>
  );
}

export default AdminProductTile;
