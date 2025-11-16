"use client";
import { AdminLayout } from "../components/admin/AdminLayout";
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Legend, ResponsiveContainer } from "recharts";
import { Download, TrendingUp, TrendingDown } from "lucide-react";
import { toast } from "sonner";

const salesData = [
  { month: "Jan", revenue: 12500, orders: 320 },
  { month: "Feb", revenue: 13800, orders: 345 },
  { month: "Mar", revenue: 15200, orders: 380 },
  { month: "Apr", revenue: 14600, orders: 365 },
  { month: "May", revenue: 16800, orders: 420 },
  { month: "Jun", revenue: 18200, orders: 455 },
  { month: "Jul", revenue: 19500, orders: 485 },
  { month: "Aug", revenue: 21000, orders: 520 },
  { month: "Sep", revenue: 19800, orders: 495 },
  { month: "Oct", revenue: 22500, orders: 560 },
];

const categoryData = [
  { name: "Burgers", value: 45, color: "#d4183d" },
  { name: "Sides", value: 25, color: "#f97316" },
  { name: "Drinks", value: 20, color: "#3b82f6" },
  { name: "Desserts", value: 10, color: "#8b5cf6" },
];

const topItems = [
  { name: "Classic Burger", sales: 1245, revenue: "$11,195", trend: "up", change: "+12%" },
  { name: "Bacon Deluxe", sales: 987, revenue: "$12,816", trend: "up", change: "+8%" },
  { name: "French Fries", sales: 1567, revenue: "$6,252", trend: "up", change: "+15%" },
  { name: "Spicy Chicken", sales: 876, revenue: "$9,627", trend: "down", change: "-3%" },
  { name: "Veggie Supreme", sales: 654, revenue: "$6,533", trend: "up", change: "+5%" },
];

const hourlyData = [
  { hour: "9 AM", orders: 12 },
  { hour: "10 AM", orders: 25 },
  { hour: "11 AM", orders: 42 },
  { hour: "12 PM", orders: 68 },
  { hour: "1 PM", orders: 85 },
  { hour: "2 PM", orders: 52 },
  { hour: "3 PM", orders: 28 },
  { hour: "4 PM", orders: 18 },
  { hour: "5 PM", orders: 45 },
  { hour: "6 PM", orders: 72 },
  { hour: "7 PM", orders: 95 },
  { hour: "8 PM", orders: 78 },
  { hour: "9 PM", orders: 42 },
];

export function ReportsPage() {
  const handleDownload = (reportType: string) => {
    toast.success(`${reportType} report downloaded successfully!`);
  };

  return (
    <AdminLayout 
      title="Reports & Analytics" 
      description="View detailed insights and download reports"
    >
      {/* Header Actions */}
      <div className="flex justify-between items-center mb-6">
        <Select defaultValue="month">
          <SelectTrigger className="w-48">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="week">Last 7 Days</SelectItem>
            <SelectItem value="month">Last 30 Days</SelectItem>
            <SelectItem value="quarter">Last 3 Months</SelectItem>
            <SelectItem value="year">Last Year</SelectItem>
          </SelectContent>
        </Select>

        <div className="flex gap-2">
          <Button variant="outline" onClick={() => handleDownload("Sales")}>
            <Download className="h-4 w-4 mr-2" />
            Export Sales
          </Button>
          <Button variant="outline" onClick={() => handleDownload("Full")}>
            <Download className="h-4 w-4 mr-2" />
            Export All Data
          </Button>
        </div>
      </div>

      {/* Revenue & Orders Chart */}
      <Card className="p-6 mb-6">
        <h3 className="mb-6">Revenue & Orders Trend</h3>
        <ResponsiveContainer width="100%" height={350}>
          <LineChart data={salesData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="month" stroke="#6b7280" />
            <YAxis yAxisId="left" stroke="#6b7280" />
            <YAxis yAxisId="right" orientation="right" stroke="#6b7280" />
            <RechartsTooltip />
            <Legend />
            <Line 
              yAxisId="left"
              type="monotone" 
              dataKey="revenue" 
              stroke="#d4183d" 
              strokeWidth={2}
              name="Revenue ($)"
              dot={{ fill: "#d4183d" }}
            />
            <Line 
              yAxisId="right"
              type="monotone" 
              dataKey="orders" 
              stroke="#3b82f6" 
              strokeWidth={2}
              name="Orders"
              dot={{ fill: "#3b82f6" }}
            />
          </LineChart>
        </ResponsiveContainer>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Category Distribution */}
        <Card className="p-6">
          <h3 className="mb-6">Sales by Category</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={(d: any) => `${d.name} ${(Number(d.percent) * 100).toFixed(0)}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <RechartsTooltip />
            </PieChart>
          </ResponsiveContainer>
        </Card>

        {/* Hourly Orders */}
        <Card className="p-6">
          <h3 className="mb-6">Orders by Hour</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={hourlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="hour" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <RechartsTooltip />
              <Bar dataKey="orders" fill="#d4183d" />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Top Selling Items */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3>Top Selling Items</h3>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => handleDownload("Top Items")}
          >
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-4">Item Name</th>
                <th className="text-left py-3 px-4">Total Sales</th>
                <th className="text-left py-3 px-4">Revenue</th>
                <th className="text-left py-3 px-4">Trend</th>
              </tr>
            </thead>
            <tbody>
              {topItems.map((item, index) => (
                <tr key={index} className="border-b hover:bg-muted/50">
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-destructive/10 flex items-center justify-center text-sm">
                        {index + 1}
                      </div>
                      <span className="font-medium">{item.name}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4">{item.sales} orders</td>
                  <td className="py-3 px-4 text-destructive">{item.revenue}</td>
                  <td className="py-3 px-4">
                    <div className={`flex items-center gap-2 ${
                      item.trend === "up" ? "text-green-600" : "text-red-600"
                    }`}>
                      {item.trend === "up" ? (
                        <TrendingUp className="h-4 w-4" />
                      ) : (
                        <TrendingDown className="h-4 w-4" />
                      )}
                      <span>{item.change}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        <Card className="p-6 text-center">
          <h4 className="mb-2 text-muted-foreground">Average Order Value</h4>
          <p className="text-3xl text-destructive">$35.82</p>
          <p className="text-sm text-green-600 mt-2">+5.3% from last month</p>
        </Card>
        
        <Card className="p-6 text-center">
          <h4 className="mb-2 text-muted-foreground">Customer Retention</h4>
          <p className="text-3xl text-destructive">68%</p>
          <p className="text-sm text-green-600 mt-2">+2.1% from last month</p>
        </Card>
        
        <Card className="p-6 text-center">
          <h4 className="mb-2 text-muted-foreground">Peak Hours</h4>
          <p className="text-3xl text-destructive">7-8 PM</p>
          <p className="text-sm text-muted-foreground mt-2">95 avg orders/hour</p>
        </Card>
      </div>
    </AdminLayout>
  );
}
