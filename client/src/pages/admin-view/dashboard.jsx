import ProductImageUpload from "@/components/admin-view/image-upload";
import { Button } from "@/components/ui/button";
import { addFeatureImage, getFeatureImages, deleteFeatureImage } from "@/store/common-slice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useToast } from "@/components/ui/use-toast";
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  ShoppingCart, 
  Users, 
  Package,
  Eye,
  Star,
  ArrowUpRight,
  ArrowDownRight,
  Trash2
} from "lucide-react";
import { LoadingDashboard, ModernLoader } from "@/components/admin-view/loading-spinner";

function AdminDashboard() {
  const [imageFile, setImageFile] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [imageLoadingState, setImageLoadingState] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  const { featureImageList } = useSelector((state) => state.commonFeature);
  const { toast } = useToast();

  function handleUploadFeatureImage() {
    // Validate that image URL exists and is not empty
    if (!uploadedImageUrl || uploadedImageUrl.trim() === "") {
      toast.destructive({
        title: "Please upload an image first",
      });
      return;
    }

    dispatch(addFeatureImage(uploadedImageUrl)).then((data) => {
      if (data?.payload?.success) {
        dispatch(getFeatureImages());
        setImageFile(null);
        setUploadedImageUrl("");
        toast.success({
          title: "Image uploaded successfully",
        });
      } else {
        toast.destructive({
          title: "Failed to upload image. Please try again.",
        });
      }
    });
  }

  function handleDeleteFeatureImage(imageId) {
    dispatch(deleteFeatureImage(imageId)).then((data) => {
      if (data?.payload?.success) {
        dispatch(getFeatureImages());
        toast.success({
          title: "Image deleted successfully",
        });
      } else {
        toast.destructive({
          title: "Failed to delete image. Please try again.",
        });
      }
    });
  }

  useEffect(() => {
    setIsLoading(true);
    dispatch(getFeatureImages()).finally(() => {
      setTimeout(() => setIsLoading(false), 1000); // Simulate loading for demo
    });
  }, [dispatch]);

  // Mock data for analytics - replace with real data from your store
  const analyticsData = [
    {
      title: "Total Revenue",
      value: "$45,231.89",
      change: "+20.1%",
      trend: "up",
      icon: DollarSign,
      color: "text-green-600",
      bgColor: "bg-green-50",
      borderColor: "border-green-200"
    },
    {
      title: "Total Orders",
      value: "2,350",
      change: "+15.3%",
      trend: "up",
      icon: ShoppingCart,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200"
    },
    {
      title: "Total Customers",
      value: "1,234",
      change: "+8.2%",
      trend: "up",
      icon: Users,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      borderColor: "border-purple-200"
    },
    {
      title: "Total Products",
      value: "567",
      change: "-2.4%",
      trend: "down",
      icon: Package,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
      borderColor: "border-orange-200"
    }
  ];

  const recentOrders = [
    { id: "#3210", customer: "John Doe", amount: "$299.00", status: "Completed", date: "2 min ago" },
    { id: "#3209", customer: "Jane Smith", amount: "$199.00", status: "Processing", date: "5 min ago" },
    { id: "#3208", customer: "Bob Johnson", amount: "$399.00", status: "Shipped", date: "10 min ago" },
    { id: "#3207", customer: "Alice Brown", amount: "$149.00", status: "Pending", date: "15 min ago" },
  ];

  const topProducts = [
    { name: "Wireless Headphones", sales: 234, revenue: "$23,400", trend: "up" },
    { name: "Smart Watch", sales: 189, revenue: "$18,900", trend: "up" },
    { name: "Laptop Stand", sales: 156, revenue: "$15,600", trend: "down" },
    { name: "USB Cable", sales: 143, revenue: "$14,300", trend: "up" },
  ];

  if (isLoading) {
    return <LoadingDashboard />;
  }

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">Welcome back, Admin!</h1>
        <p className="text-blue-100">Here's what's happening with your store today.</p>
      </div>

      {/* Analytics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {analyticsData.map((item, index) => {
          const IconComponent = item.icon;
          return (
            <div key={index} className={`bg-white rounded-xl p-6 border ${item.borderColor} shadow-sm hover:shadow-md transition-shadow duration-200`}>
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-xl ${item.bgColor}`}>
                  <IconComponent className={`w-6 h-6 ${item.color}`} />
                </div>
                <div className={`flex items-center gap-1 text-sm font-medium ${
                  item.trend === 'up' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {item.trend === 'up' ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
                  {item.change}
                </div>
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900 mb-1">{item.value}</p>
                <p className="text-sm text-gray-600">{item.title}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Orders */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900">Recent Orders</h2>
            <Button className="text-sm bg-blue-50 text-blue-600 hover:bg-blue-100 border-none shadow-none">
              View All
            </Button>
          </div>
          <div className="space-y-4">
            {recentOrders.map((order, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <span className="font-medium text-gray-900">{order.id}</span>
                    <span className="text-sm text-gray-600">{order.customer}</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">{order.date}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-900">{order.amount}</p>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    order.status === 'Completed' ? 'bg-green-100 text-green-700' :
                    order.status === 'Processing' ? 'bg-yellow-100 text-yellow-700' :
                    order.status === 'Shipped' ? 'bg-blue-100 text-blue-700' :
                    'bg-gray-100 text-gray-700'
                  }`}>
                    {order.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Products */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900">Top Products</h2>
            <Button className="text-sm bg-green-50 text-green-600 hover:bg-green-100 border-none shadow-none">
              View All
            </Button>
          </div>
          <div className="space-y-4">
            {topProducts.map((product, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex-1">
                  <p className="font-medium text-gray-900">{product.name}</p>
                  <p className="text-sm text-gray-600">{product.sales} sales</p>
                </div>
                <div className="text-right flex items-center gap-2">
                  <span className="font-semibold text-gray-900">{product.revenue}</span>
                  {product.trend === 'up' ? 
                    <TrendingUp className="w-4 h-4 text-green-500" /> : 
                    <TrendingDown className="w-4 h-4 text-red-500" />
                  }
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Feature Images Section */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900 mb-6">Feature Images Management</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <ProductImageUpload
              imageFile={imageFile}
              setImageFile={setImageFile}
              uploadedImageUrl={uploadedImageUrl}
              setUploadedImageUrl={setUploadedImageUrl}
              setImageLoadingState={setImageLoadingState}
              imageLoadingState={imageLoadingState}
              isEditMode={false}
              isCustomStyling={true}
            />
            <Button 
              onClick={handleUploadFeatureImage} 
              className="mt-4 w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl transition-all duration-200"
              disabled={!uploadedImageUrl || uploadedImageUrl.trim() === ""}
            >
              Upload Feature Image
            </Button>
          </div>
          
          <div className="space-y-4">
            <h3 className="font-medium text-gray-900">Current Feature Images</h3>
            {featureImageList && featureImageList.length > 0 ? (
              <div className="grid grid-cols-2 gap-3">
                {featureImageList.map((featureImgItem, index) => (
                  <div key={index} className="relative group">
                    {featureImgItem.image && (
                      <img
                        src={featureImgItem.image}
                        className="w-full h-24 object-cover rounded-lg border border-gray-200"
                        alt={`Feature ${index + 1}`}
                      />
                    )}
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-200 rounded-lg flex items-center justify-center gap-2">
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDeleteFeatureImage(featureImgItem._id)}
                        className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 gap-1"
                      >
                        <Trash2 className="w-4 h-4" />
                        Delete
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <Package className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                <p>No feature images uploaded yet</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
