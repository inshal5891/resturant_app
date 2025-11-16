"use client";
import { useState } from "react";
import { AdminLayout } from "../components/admin/AdminLayout";
import { Card } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { Search, Filter, Eye } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../components/ui/dialog";
import { toast } from "sonner";

const orders = [
  { 
    id: "#3452", 
    customer: "John Doe", 
    email: "john@example.com",
    phone: "(555) 123-4567",
    items: ["Classic Burger", "French Fries"], 
    total: "$24.99", 
    status: "completed",
    type: "delivery",
    address: "123 Main St, Apt 4B",
    time: "2:45 PM",
    date: "Oct 26, 2025"
  },
  { 
    id: "#3451", 
    customer: "Sarah Smith", 
    email: "sarah@example.com",
    phone: "(555) 234-5678",
    items: ["Bacon Deluxe", "Spicy Chicken", "Milkshake", "Nuggets"], 
    total: "$45.50", 
    status: "preparing",
    type: "pickup",
    address: null,
    time: "2:32 PM",
    date: "Oct 26, 2025"
  },
  { 
    id: "#3450", 
    customer: "Mike Johnson", 
    email: "mike@example.com",
    phone: "(555) 345-6789",
    items: ["Veggie Supreme"], 
    total: "$12.99", 
    status: "pending",
    type: "delivery",
    address: "456 Oak Ave",
    time: "2:18 PM",
    date: "Oct 26, 2025"
  },
  { 
    id: "#3449", 
    customer: "Emma Wilson", 
    email: "emma@example.com",
    phone: "(555) 456-7890",
    items: ["Classic Burger", "Bacon Deluxe", "French Fries"], 
    total: "$38.75", 
    status: "completed",
    type: "delivery",
    address: "789 Pine Rd",
    time: "1:52 PM",
    date: "Oct 26, 2025"
  },
  { 
    id: "#3448", 
    customer: "James Brown", 
    email: "james@example.com",
    phone: "(555) 567-8901",
    items: ["Spicy Chicken", "Nuggets", "Fries", "Drink", "Ice Cream"], 
    total: "$52.20", 
    status: "cancelled",
    type: "pickup",
    address: null,
    time: "1:35 PM",
    date: "Oct 26, 2025"
  },
];

const statusColors: Record<string, string> = {
  completed: "bg-green-100 text-green-800 hover:bg-green-100",
  preparing: "bg-blue-100 text-blue-800 hover:bg-blue-100",
  pending: "bg-yellow-100 text-yellow-800 hover:bg-yellow-100",
  cancelled: "bg-red-100 text-red-800 hover:bg-red-100",
};

export function OrdersPage() {
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedOrder, setSelectedOrder] = useState<typeof orders[0] | null>(null);

  const handleStatusChange = (orderId: string, newStatus: string) => {
    toast.success(`Order ${orderId} status updated to ${newStatus}`);
  };

  const filteredOrders = orders.filter(order => 
    statusFilter === "all" || order.status === statusFilter
  );

  return (
    <AdminLayout 
      title="Orders" 
      description="Manage and track all customer orders"
    >
      {/* Filters */}
      <Card className="p-6 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search orders..." className="pl-10" />
          </div>
          
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full md:w-48">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Orders</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="preparing">Preparing</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>

          <Button variant="outline" className="gap-2">
            <Filter className="h-4 w-4" />
            More Filters
          </Button>
        </div>
      </Card>

      {/* Orders Table */}
      <Card className="p-6">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-4">Order ID</th>
                <th className="text-left py-3 px-4">Customer</th>
                <th className="text-left py-3 px-4">Type</th>
                <th className="text-left py-3 px-4">Items</th>
                <th className="text-left py-3 px-4">Total</th>
                <th className="text-left py-3 px-4">Status</th>
                <th className="text-left py-3 px-4">Time</th>
                <th className="text-left py-3 px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order) => (
                <tr key={order.id} className="border-b hover:bg-muted/50">
                  <td className="py-3 px-4 font-medium">{order.id}</td>
                  <td className="py-3 px-4">
                    <div>
                      <p className="font-medium">{order.customer}</p>
                      <p className="text-sm text-muted-foreground">{order.email}</p>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <Badge variant="outline" className="capitalize">
                      {order.type}
                    </Badge>
                  </td>
                  <td className="py-3 px-4 text-muted-foreground">
                    {order.items.length} items
                  </td>
                  <td className="py-3 px-4">{order.total}</td>
                  <td className="py-3 px-4">
                    <Select 
                      value={order.status} 
                      onValueChange={(value) => handleStatusChange(order.id, value)}
                    >
                      <SelectTrigger className={`w-32 ${statusColors[order.status]}`}>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="preparing">Preparing</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                        <SelectItem value="cancelled">Cancelled</SelectItem>
                      </SelectContent>
                    </Select>
                  </td>
                  <td className="py-3 px-4 text-muted-foreground">
                    <div>
                      <p>{order.time}</p>
                      <p className="text-xs">{order.date}</p>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => setSelectedOrder(order)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl">
                        <DialogHeader>
                          <DialogTitle>Order Details - {order.id}</DialogTitle>
                        </DialogHeader>
                        {selectedOrder && (
                          <div className="space-y-6">
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <h4 className="mb-2">Customer Information</h4>
                                <div className="space-y-1 text-sm">
                                  <p><span className="text-muted-foreground">Name:</span> {selectedOrder.customer}</p>
                                  <p><span className="text-muted-foreground">Email:</span> {selectedOrder.email}</p>
                                  <p><span className="text-muted-foreground">Phone:</span> {selectedOrder.phone}</p>
                                </div>
                              </div>
                              <div>
                                <h4 className="mb-2">Order Information</h4>
                                <div className="space-y-1 text-sm">
                                  <p><span className="text-muted-foreground">Type:</span> <Badge variant="outline" className="capitalize">{selectedOrder.type}</Badge></p>
                                  <p><span className="text-muted-foreground">Time:</span> {selectedOrder.time}</p>
                                  <p><span className="text-muted-foreground">Date:</span> {selectedOrder.date}</p>
                                </div>
                              </div>
                            </div>

                            {selectedOrder.address && (
                              <div>
                                <h4 className="mb-2">Delivery Address</h4>
                                <p className="text-sm text-muted-foreground">{selectedOrder.address}</p>
                              </div>
                            )}

                            <div>
                              <h4 className="mb-2">Order Items</h4>
                              <div className="border rounded-lg p-4 space-y-2">
                                {selectedOrder.items.map((item, idx) => (
                                  <div key={idx} className="flex justify-between">
                                    <span>{item}</span>
                                  </div>
                                ))}
                                <div className="border-t pt-2 mt-2 flex justify-between">
                                  <span>Total</span>
                                  <span className="text-destructive">{selectedOrder.total}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </DialogContent>
                    </Dialog>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </AdminLayout>
  );
}
