import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  ShoppingCart,
  Users,
  Package,
  ArrowUpRight,
  ArrowDownRight,
  Calendar,
  Download,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

function AdminAnalytics() {
  const [timeRange, setTimeRange] = useState("7days");

  // Mock data - replace with real data from your store
  const analyticsData = {
    revenue: {
      current: 45231.89,
      previous: 37689.45,
      change: 20.1,
      trend: "up",
    },
    orders: {
      current: 2350,
      previous: 2041,
      change: 15.3,
      trend: "up",
    },
    customers: {
      current: 1234,
      previous: 1140,
      change: 8.2,
      trend: "up",
    },
    products: {
      current: 567,
      previous: 581,
      change: -2.4,
      trend: "down",
    },
  };

  const salesData = [
    { month: "Jan", revenue: 12000, orders: 245 },
    { month: "Feb", revenue: 15000, orders: 312 },
    { month: "Mar", revenue: 18000, orders: 389 },
    { month: "Apr", revenue: 22000, orders: 456 },
    { month: "May", revenue: 25000, orders: 523 },
    { month: "Jun", revenue: 28000, orders: 601 },
  ];

  const topProducts = [
    {
      name: "Wireless Headphones",
      sales: 234,
      revenue: 23400,
      growth: 12.5,
    },
    { name: "Smart Watch", sales: 189, revenue: 18900, growth: 8.3 },
    { name: "Laptop Stand", sales: 156, revenue: 15600, growth: -3.2 },
    { name: "USB Cable", sales: 143, revenue: 14300, growth: 5.7 },
    { name: "Phone Case", sales: 128, revenue: 12800, growth: 15.2 },
  ];

  const categoryPerformance = [
    { category: "Electronics", revenue: 45000, percentage: 35 },
    { category: "Clothing", revenue: 32000, percentage: 25 },
    { category: "Accessories", revenue: 25000, percentage: 20 },
    { category: "Home & Garden", revenue: 18000, percentage: 14 },
    { category: "Sports", revenue: 8000, percentage: 6 },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Analytics</h1>
          <p className="text-gray-600 mt-1">
            Track your business performance and insights
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[180px]">
              <Calendar className="w-4 h-4 mr-2" />
              <SelectValue placeholder="Select range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7days">Last 7 days</SelectItem>
              <SelectItem value="30days">Last 30 days</SelectItem>
              <SelectItem value="90days">Last 90 days</SelectItem>
              <SelectItem value="1year">Last year</SelectItem>
            </SelectContent>
          </Select>
          <Button className="gap-2">
            <Download className="w-4 h-4" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-l-4 border-l-green-500">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-gray-600">
                Total Revenue
              </CardTitle>
              <DollarSign className="w-5 h-5 text-green-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">
              ${analyticsData.revenue.current.toLocaleString()}
            </div>
            <div className="flex items-center gap-1 mt-2">
              <ArrowUpRight className="w-4 h-4 text-green-600" />
              <span className="text-sm font-medium text-green-600">
                +{analyticsData.revenue.change}%
              </span>
              <span className="text-sm text-gray-500">from last period</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-blue-500">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-gray-600">
                Total Orders
              </CardTitle>
              <ShoppingCart className="w-5 h-5 text-blue-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">
              {analyticsData.orders.current.toLocaleString()}
            </div>
            <div className="flex items-center gap-1 mt-2">
              <ArrowUpRight className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-medium text-blue-600">
                +{analyticsData.orders.change}%
              </span>
              <span className="text-sm text-gray-500">from last period</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-purple-500">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-gray-600">
                Total Customers
              </CardTitle>
              <Users className="w-5 h-5 text-purple-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">
              {analyticsData.customers.current.toLocaleString()}
            </div>
            <div className="flex items-center gap-1 mt-2">
              <ArrowUpRight className="w-4 h-4 text-purple-600" />
              <span className="text-sm font-medium text-purple-600">
                +{analyticsData.customers.change}%
              </span>
              <span className="text-sm text-gray-500">from last period</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-orange-500">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-gray-600">
                Total Products
              </CardTitle>
              <Package className="w-5 h-5 text-orange-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">
              {analyticsData.products.current}
            </div>
            <div className="flex items-center gap-1 mt-2">
              <ArrowDownRight className="w-4 h-4 text-red-600" />
              <span className="text-sm font-medium text-red-600">
                {analyticsData.products.change}%
              </span>
              <span className="text-sm text-gray-500">from last period</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sales Trend */}
        <Card>
          <CardHeader>
            <CardTitle>Sales Trend</CardTitle>
            <CardDescription>Monthly revenue and orders</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {salesData.map((data, index) => (
                <div key={index} className="flex items-center gap-4">
                  <div className="w-12 text-sm font-medium text-gray-600">
                    {data.month}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm text-gray-600">Revenue</span>
                      <span className="text-sm font-medium">
                        ${data.revenue.toLocaleString()}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-blue-500 to-indigo-600 h-2 rounded-full"
                        style={{ width: `${(data.revenue / 30000) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                  <div className="text-sm text-gray-500">{data.orders}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Category Performance */}
        <Card>
          <CardHeader>
            <CardTitle>Category Performance</CardTitle>
            <CardDescription>Revenue by category</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {categoryPerformance.map((cat, index) => (
                <div key={index}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">
                      {cat.category}
                    </span>
                    <span className="text-sm font-semibold text-gray-900">
                      ${cat.revenue.toLocaleString()}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-green-500 to-emerald-600 h-2 rounded-full"
                      style={{ width: `${cat.percentage}%` }}
                    ></div>
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    {cat.percentage}% of total
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Top Products */}
      <Card>
        <CardHeader>
          <CardTitle>Top Performing Products</CardTitle>
          <CardDescription>Best selling products this period</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                    Product
                  </th>
                  <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700">
                    Sales
                  </th>
                  <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700">
                    Revenue
                  </th>
                  <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700">
                    Growth
                  </th>
                </tr>
              </thead>
              <tbody>
                {topProducts.map((product, index) => (
                  <tr key={index} className="border-b border-gray-100">
                    <td className="py-3 px-4 text-sm text-gray-900">
                      {product.name}
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-600 text-right">
                      {product.sales}
                    </td>
                    <td className="py-3 px-4 text-sm font-medium text-gray-900 text-right">
                      ${product.revenue.toLocaleString()}
                    </td>
                    <td className="py-3 px-4 text-right">
                      <span
                        className={`inline-flex items-center gap-1 text-sm font-medium ${
                          product.growth > 0
                            ? "text-green-600"
                            : "text-red-600"
                        }`}
                      >
                        {product.growth > 0 ? (
                          <TrendingUp className="w-4 h-4" />
                        ) : (
                          <TrendingDown className="w-4 h-4" />
                        )}
                        {Math.abs(product.growth)}%
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default AdminAnalytics;
