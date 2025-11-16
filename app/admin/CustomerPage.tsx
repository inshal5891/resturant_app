"use client";
import { useState } from "react";
import { AdminLayout } from "../components/admin/AdminLayout";
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Badge } from "../components/ui/badge";
import { Search, Mail, Phone, Calendar, Plus } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "../components/ui/alert-dialog";
import { toast } from "sonner";

const customers = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    phone: "(555) 123-4567",
    orders: 24,
    totalSpent: "$1,245.60",
    lastOrder: "Oct 26, 2025",
    status: "active",
  },
  {
    id: 2,
    name: "Sarah Smith",
    email: "sarah@example.com",
    phone: "(555) 234-5678",
    orders: 18,
    totalSpent: "$892.40",
    lastOrder: "Oct 25, 2025",
    status: "active",
  },
  {
    id: 3,
    name: "Mike Johnson",
    email: "mike@example.com",
    phone: "(555) 345-6789",
    orders: 12,
    totalSpent: "$567.80",
    lastOrder: "Oct 20, 2025",
    status: "active",
  },
  {
    id: 4,
    name: "Emma Wilson",
    email: "emma@example.com",
    phone: "(555) 456-7890",
    orders: 8,
    totalSpent: "$345.20",
    lastOrder: "Oct 15, 2025",
    status: "inactive",
  },
];

const reservations = [
  {
    id: 1,
    name: "David Chen",
    email: "david@example.com",
    phone: "(555) 111-2222",
    date: "Oct 27, 2025",
    time: "6:00 PM",
    guests: 4,
    status: "confirmed",
  },
  {
    id: 2,
    name: "Lisa Anderson",
    email: "lisa@example.com",
    phone: "(555) 222-3333",
    date: "Oct 27, 2025",
    time: "7:30 PM",
    guests: 2,
    status: "confirmed",
  },
  {
    id: 3,
    name: "Robert Taylor",
    email: "robert@example.com",
    phone: "(555) 333-4444",
    date: "Oct 28, 2025",
    time: "12:00 PM",
    guests: 6,
    status: "pending",
  },
  {
    id: 4,
    name: "Jennifer Lee",
    email: "jennifer@example.com",
    phone: "(555) 444-5555",
    date: "Oct 28, 2025",
    time: "8:00 PM",
    guests: 3,
    status: "cancelled",
  },
];

const statusColors: Record<string, string> = {
  active: "bg-green-100 text-green-800 hover:bg-green-100",
  inactive: "bg-gray-100 text-gray-800 hover:bg-gray-100",
  confirmed: "bg-green-100 text-green-800 hover:bg-green-100",
  pending: "bg-yellow-100 text-yellow-800 hover:bg-yellow-100",
  cancelled: "bg-red-100 text-red-800 hover:bg-red-100",
};

export function CustomersPage() {
  const [selectedCustomer, setSelectedCustomer] = useState<typeof customers[0] | null>(null);
  const [isNewReservationOpen, setIsNewReservationOpen] = useState(false);
  const [reservationForm, setReservationForm] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    guests: "2",
  });

  const handleReservationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Reservation created successfully!");
    setIsNewReservationOpen(false);
    setReservationForm({ name: "", email: "", phone: "", date: "", time: "", guests: "2" });
  };

  const handleCancelReservation = (id: number, name: string) => {
    toast.success(`Reservation for ${name} has been cancelled.`);
  };

  const handleEditReservation = (id: number) => {
    toast.info("Edit reservation functionality");
  };

  return (
    <AdminLayout 
      title="Customers & Reservations" 
      description="Manage customer information and table reservations"
    >
      <Tabs defaultValue="customers">
        <TabsList className="mb-6">
          <TabsTrigger value="customers">Customers</TabsTrigger>
          <TabsTrigger value="reservations">Reservations</TabsTrigger>
        </TabsList>

        {/* Customers Tab */}
        <TabsContent value="customers">
          <Card className="p-6 mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search customers..." className="pl-10" />
            </div>
          </Card>

          <Card className="p-6">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4">Customer</th>
                    <th className="text-left py-3 px-4">Contact</th>
                    <th className="text-left py-3 px-4">Orders</th>
                    <th className="text-left py-3 px-4">Total Spent</th>
                    <th className="text-left py-3 px-4">Last Order</th>
                    <th className="text-left py-3 px-4">Status</th>
                    <th className="text-left py-3 px-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {customers.map((customer) => (
                    <tr key={customer.id} className="border-b hover:bg-muted/50">
                      <td className="py-3 px-4 font-medium">{customer.name}</td>
                      <td className="py-3 px-4">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Mail className="h-3 w-3" />
                            {customer.email}
                          </div>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Phone className="h-3 w-3" />
                            {customer.phone}
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-4">{customer.orders}</td>
                      <td className="py-3 px-4 text-destructive">{customer.totalSpent}</td>
                      <td className="py-3 px-4 text-muted-foreground">{customer.lastOrder}</td>
                      <td className="py-3 px-4">
                        <Badge className={statusColors[customer.status]}>
                          {customer.status}
                        </Badge>
                      </td>
                      <td className="py-3 px-4">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => setSelectedCustomer(customer)}
                            >
                              View Details
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Customer Details</DialogTitle>
                            </DialogHeader>
                            {selectedCustomer && (
                              <div className="space-y-4">
                                <div>
                                  <h4 className="mb-2">Personal Information</h4>
                                  <div className="space-y-2 text-sm">
                                    <p><span className="text-muted-foreground">Name:</span> {selectedCustomer.name}</p>
                                    <p><span className="text-muted-foreground">Email:</span> {selectedCustomer.email}</p>
                                    <p><span className="text-muted-foreground">Phone:</span> {selectedCustomer.phone}</p>
                                  </div>
                                </div>
                                <div>
                                  <h4 className="mb-2">Order History</h4>
                                  <div className="space-y-2 text-sm">
                                    <p><span className="text-muted-foreground">Total Orders:</span> {selectedCustomer.orders}</p>
                                    <p><span className="text-muted-foreground">Total Spent:</span> {selectedCustomer.totalSpent}</p>
                                    <p><span className="text-muted-foreground">Last Order:</span> {selectedCustomer.lastOrder}</p>
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
        </TabsContent>

        {/* Reservations Tab */}
        <TabsContent value="reservations">
          <Card className="p-6 mb-6">
            <div className="flex justify-between items-center">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search reservations..." className="pl-10" />
              </div>
              <Dialog open={isNewReservationOpen} onOpenChange={setIsNewReservationOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-destructive hover:bg-destructive/90 gap-2">
                    <Plus className="h-4 w-4" />
                    New Reservation
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Create New Reservation</DialogTitle>
                  </DialogHeader>
                  <form onSubmit={handleReservationSubmit} className="space-y-4">
                    <div>
                      <Label htmlFor="res-name">Customer Name</Label>
                      <Input
                        id="res-name"
                        value={reservationForm.name}
                        onChange={(e) => setReservationForm(prev => ({ ...prev, name: e.target.value }))}
                        required
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="res-email">Email</Label>
                        <Input
                          id="res-email"
                          type="email"
                          value={reservationForm.email}
                          onChange={(e) => setReservationForm(prev => ({ ...prev, email: e.target.value }))}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="res-phone">Phone</Label>
                        <Input
                          id="res-phone"
                          value={reservationForm.phone}
                          onChange={(e) => setReservationForm(prev => ({ ...prev, phone: e.target.value }))}
                          required
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="res-date">Date</Label>
                        <Input
                          id="res-date"
                          type="date"
                          value={reservationForm.date}
                          onChange={(e) => setReservationForm(prev => ({ ...prev, date: e.target.value }))}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="res-time">Time</Label>
                        <Input
                          id="res-time"
                          type="time"
                          value={reservationForm.time}
                          onChange={(e) => setReservationForm(prev => ({ ...prev, time: e.target.value }))}
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="res-guests">Number of Guests</Label>
                      <Select 
                        value={reservationForm.guests} 
                        onValueChange={(value) => setReservationForm(prev => ({ ...prev, guests: value }))}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {[1, 2, 3, 4, 5, 6, 7, 8].map(num => (
                            <SelectItem key={num} value={String(num)}>{num} {num === 1 ? 'Guest' : 'Guests'}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex gap-3 pt-4">
                      <Button type="submit" className="flex-1 bg-destructive hover:bg-destructive/90">
                        Create Reservation
                      </Button>
                      <Button 
                        type="button" 
                        variant="outline" 
                        className="flex-1"
                        onClick={() => setIsNewReservationOpen(false)}
                      >
                        Cancel
                      </Button>
                    </div>
                  </form>
                </DialogContent>
              </Dialog>
            </div>
          </Card>

          <Card className="p-6">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4">Customer</th>
                    <th className="text-left py-3 px-4">Contact</th>
                    <th className="text-left py-3 px-4">Date & Time</th>
                    <th className="text-left py-3 px-4">Guests</th>
                    <th className="text-left py-3 px-4">Status</th>
                    <th className="text-left py-3 px-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {reservations.map((reservation) => (
                    <tr key={reservation.id} className="border-b hover:bg-muted/50">
                      <td className="py-3 px-4 font-medium">{reservation.name}</td>
                      <td className="py-3 px-4">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Mail className="h-3 w-3" />
                            {reservation.email}
                          </div>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Phone className="h-3 w-3" />
                            {reservation.phone}
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <div>
                            <p>{reservation.date}</p>
                            <p className="text-sm text-muted-foreground">{reservation.time}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-4">{reservation.guests} guests</td>
                      <td className="py-3 px-4">
                        <Badge className={statusColors[reservation.status]}>
                          {reservation.status}
                        </Badge>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex gap-2">
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleEditReservation(reservation.id)}
                          >
                            Edit
                          </Button>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button 
                                variant="outline" 
                                size="sm" 
                                className="text-red-600 hover:text-red-700 hover:bg-red-50"
                              >
                                Cancel
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Cancel Reservation</AlertDialogTitle>
                                <AlertDialogDescription>
                                  Are you sure you want to cancel the reservation for {reservation.name}? This action cannot be undone.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Keep Reservation</AlertDialogCancel>
                                <AlertDialogAction
                                  className="bg-destructive hover:bg-destructive/90"
                                  onClick={() => handleCancelReservation(reservation.id, reservation.name)}
                                >
                                  Cancel Reservation
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </AdminLayout>
  );
}