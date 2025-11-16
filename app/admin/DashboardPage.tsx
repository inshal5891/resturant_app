"use client";
import { AdminLayout } from "../components/admin/AdminLayout";
import { Card } from "../components/ui/card";
import { DollarSign, ShoppingBag, Users, TrendingUp } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer } from "recharts";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { useRouter } from "next/navigation";

const statsCards = [
  {
    title: "Total Revenue",
    value: "$12,458",
    change: "+12.5%",
    icon: DollarSign,
    trend: "up",
    link: "/admin/reports",
  },
  {
    title: "Total Orders",
    value: "348",
    change: "+8.2%",
    icon: ShoppingBag,
    trend: "up",
    link: "/admin/orders",
  },
  {
    title: "New Customers",
    value: "127",
    change: "+23.1%",
    icon: Users,
    trend: "up",
    link: "/admin/customers",
  },
  {
    title: "Avg Order Value",
    value: "$35.82",
    change: "-2.4%",
    icon: TrendingUp,
    trend: "down",
    link: "/admin/reports",
  },
];

const salesData = [
  { name: "Mon", sales: 4200 },
  { name: "Tue", sales: 3800 },
  { name: "Wed", sales: 5100 },
  { name: "Thu", sales: 4600 },
  { name: "Fri", sales: 6400 },
  { name: "Sat", sales: 7200 },
  { name: "Sun", sales: 5800 },
];

const topItems = [
  { name: "Classic Burger", orders: 124, revenue: "$1,115" },
  { name: "Bacon Deluxe", orders: 98, revenue: "$1,273" },
  { name: "French Fries", orders: 156, revenue: "$622" },
  { name: "Spicy Chicken", orders: 87, revenue: "$956" },
  { name: "Veggie Supreme", orders: 76, revenue: "$759" },
];

const recentOrders = [
  { id: "#3452", customer: "John Doe", items: "2 items", total: "$24.99", status: "completed", time: "5 min ago" },
  { id: "#3451", customer: "Sarah Smith", items: "4 items", total: "$45.50", status: "preparing", time: "12 min ago" },
  { id: "#3450", customer: "Mike Johnson", items: "1 item", total: "$12.99", status: "pending", time: "18 min ago" },
  { id: "#3449", customer: "Emma Wilson", items: "3 items", total: "$38.75", status: "completed", time: "25 min ago" },
  { id: "#3448", customer: "James Brown", items: "5 items", total: "$52.20", status: "cancelled", time: "32 min ago" },
];

const statusColors: Record<string, string> = {
  completed: "bg-green-100 text-green-800",
  preparing: "bg-blue-100 text-blue-800",
  pending: "bg-yellow-100 text-yellow-800",
  cancelled: "bg-red-100 text-red-800",
};

export function DashboardPage() {
  const router = useRouter();

  return (
    <AdminLayout 
      title="Dashboard" 
      description="Welcome back! Here's what's happening with your restaurant today."
    >
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statsCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card 
              key={index} 
              className="p-6 cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => router.push(stat.link)}
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                  stat.trend === "up" ? "bg-green-100" : "bg-red-100"
                }`}>
                  <Icon className={`h-6 w-6 ${
                    stat.trend === "up" ? "text-green-600" : "text-red-600"
                  }`} />
                </div>
                <span className={`text-sm ${
                  stat.trend === "up" ? "text-green-600" : "text-red-600"
                }`}>
                  {stat.change}
                </span>
              </div>
              <h3 className="mb-1">{stat.value}</h3>
              <p className="text-muted-foreground">{stat.title}</p>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Sales Chart */}
        <Card className="p-6 lg:col-span-2">
          <h3 className="mb-6">Weekly Sales</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="name" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <RechartsTooltip />
              <Line 
                type="monotone" 
                dataKey="sales" 
                stroke="#d4183d" 
                strokeWidth={2}
                dot={{ fill: "#d4183d" }}
              />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        {/* Top Items */}
        <Card className="p-6">
          <h3 className="mb-6">Top Selling Items</h3>
          <div className="space-y-4">
            {topItems.map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <div>
                  <p className="font-medium">{item.name}</p>
                  <p className="text-sm text-muted-foreground">{item.orders} orders</p>
                </div>
                <span className="text-destructive">{item.revenue}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Recent Orders */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3>Recent Orders</h3>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => router.push("/admin/orders")}
          >
            View All
          </Button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-4">Order ID</th>
                <th className="text-left py-3 px-4">Customer</th>
                <th className="text-left py-3 px-4">Items</th>
                <th className="text-left py-3 px-4">Total</th>
                <th className="text-left py-3 px-4">Status</th>
                <th className="text-left py-3 px-4">Time</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((order) => (
                <tr key={order.id} className="border-b hover:bg-muted/50">
                  <td className="py-3 px-4 font-medium">{order.id}</td>
                  <td className="py-3 px-4">{order.customer}</td>
                  <td className="py-3 px-4 text-muted-foreground">{order.items}</td>
                  <td className="py-3 px-4">{order.total}</td>
                  <td className="py-3 px-4">
                    <Badge className={statusColors[order.status]}>
                      {order.status}
                    </Badge>
                  </td>
                  <td className="py-3 px-4 text-muted-foreground">{order.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </AdminLayout>
  );
}