"use client";

import { useState } from "react";
import { AdminLayout } from "../components/admin/AdminLayout";
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Switch } from "../components/ui/switch";
import { Separator } from "../components/ui/separator";
import { Upload } from "lucide-react";
import { toast } from "sonner";

const burgerLogo =
  "https://images.unsplash.com/photo-1562296761-5d2add43d7d5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXJnZXIlMjBpY29uJTIwbG9nb3xlbnwxfHx8fDE3NjIyNjk5NDh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";

export function SettingsPage() {
  const [restaurantInfo, setRestaurantInfo] = useState({
    name: "MAHDEE'S",
    email: "info@mahdees.com",
    phone: "(555) 123-4567",
    address: "123 Burger Street, Food City, FC 12345",
    description: "Serving the best burgers since 2010",
  });

  const [hours, setHours] = useState({
    monday: "10:00 AM - 10:00 PM",
    tuesday: "10:00 AM - 10:00 PM",
    wednesday: "10:00 AM - 10:00 PM",
    thursday: "10:00 AM - 10:00 PM",
    friday: "10:00 AM - 10:00 PM",
    saturday: "9:00 AM - 11:00 PM",
    sunday: "9:00 AM - 9:00 PM",
  });

  const [password, setPassword] = useState({
    current: "",
    new: "",
    confirm: "",
  });

  const [notifications, setNotifications] = useState({
    emailOrders: true,
    emailReservations: true,
    emailReports: false,
    pushOrders: true,
    pushLowStock: true,
  });

  // ✅ Strongly typed event handlers
  const handleRestaurantInfoChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRestaurantInfo((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleHoursChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHours((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSaveRestaurantInfo = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Restaurant information updated successfully!");
  };

  const handleSaveHours = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Operating hours updated successfully!");
  };

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (password.new !== password.confirm) {
      toast.error("New passwords don't match!");
      return;
    }
    toast.success("Password changed successfully!");
    setPassword({ current: "", new: "", confirm: "" });
  };

  const handleLogoUpload = () => {
    toast.success("Logo uploaded successfully!");
  };

  return (
    <AdminLayout
      title="Settings"
      description="Manage your restaurant settings and preferences"
    >
      <Tabs defaultValue="general">
        <TabsList className="mb-6">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="hours">Operating Hours</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
        </TabsList>

        {/* ✅ General Settings */}
        <TabsContent value="general">
          <form onSubmit={handleSaveRestaurantInfo} className="space-y-6">
            <Card className="p-6">
              <h3 className="mb-6">Restaurant Information</h3>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="logo">Restaurant Logo</Label>
                  <div className="mt-2 flex items-center gap-4">
                    <div className="w-20 h-20 rounded-full flex items-center justify-center overflow-hidden">
                      <img
                        src={burgerLogo}
                        alt="Restaurant Logo"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handleLogoUpload}
                    >
                      <Upload className="h-4 w-4 mr-2" />
                      Upload Logo
                    </Button>
                  </div>
                </div>

                <Separator />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Restaurant Name</Label>
                    <Input
                      id="name"
                      name="name"
                      value={restaurantInfo.name}
                      onChange={handleRestaurantInfoChange}
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={restaurantInfo.email}
                      onChange={handleRestaurantInfoChange}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      name="phone"
                      value={restaurantInfo.phone}
                      onChange={handleRestaurantInfoChange}
                    />
                  </div>
                  <div>
                    <Label htmlFor="address">Address</Label>
                    <Input
                      id="address"
                      name="address"
                      value={restaurantInfo.address}
                      onChange={handleRestaurantInfoChange}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    name="description"
                    value={restaurantInfo.description}
                    onChange={handleRestaurantInfoChange}
                    rows={3}
                  />
                </div>
              </div>
            </Card>

            <div className="flex justify-end gap-3">
              <Button type="button" variant="outline">
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-destructive hover:bg-destructive/90"
              >
                Save Changes
              </Button>
            </div>
          </form>
        </TabsContent>

        {/* ✅ Operating Hours */}
        <TabsContent value="hours">
          <form onSubmit={handleSaveHours}>
            <Card className="p-6 mb-6">
              <h3 className="mb-6">Operating Hours</h3>

              <div className="space-y-4">
                {Object.entries(hours).map(([day, time]) => (
                  <div
                    key={day}
                    className="grid grid-cols-2 gap-4 items-center"
                  >
                    <Label htmlFor={day} className="capitalize">
                      {day}
                    </Label>
                    <Input
                      id={day}
                      name={day}
                      value={time}
                      onChange={handleHoursChange}
                    />
                  </div>
                ))}
              </div>
            </Card>

            <div className="flex justify-end gap-3">
              <Button type="button" variant="outline">
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-destructive hover:bg-destructive/90"
              >
                Save Hours
              </Button>
            </div>
          </form>
        </TabsContent>

        {/* ✅ Notifications */}
        <TabsContent value="notifications">
          <Card className="p-6">
            <h3 className="mb-6">Notification Preferences</h3>

            <div className="space-y-6">
              <div>
                <h4 className="mb-4">Email Notifications</h4>
                <div className="space-y-4">
                  {[
                    ["emailOrders", "New Orders", "Receive email notifications for new orders"],
                    ["emailReservations", "Reservations", "Get notified about new reservations"],
                    ["emailReports", "Weekly Reports", "Receive weekly sales and analytics reports"],
                  ].map(([key, label, desc]) => (
                    <div
                      key={key}
                      className="flex items-center justify-between"
                    >
                      <div>
                        <Label>{label}</Label>
                        <p className="text-sm text-muted-foreground">{desc}</p>
                      </div>
                      <Switch
                        checked={notifications[key as keyof typeof notifications]}
                        onCheckedChange={(checked: boolean) =>
                          setNotifications((prev) => ({
                            ...prev,
                            [key]: checked,
                          }))
                        }
                      />
                    </div>
                  ))}
                </div>
              </div>

              <Separator />

              <div>
                <h4 className="mb-4">Push Notifications</h4>
                <div className="space-y-4">
                  {[
                    ["pushOrders", "Order Updates", "Real-time push notifications for orders"],
                    ["pushLowStock", "Low Stock Alerts", "Get alerted when items are running low"],
                  ].map(([key, label, desc]) => (
                    <div
                      key={key}
                      className="flex items-center justify-between"
                    >
                      <div>
                        <Label>{label}</Label>
                        <p className="text-sm text-muted-foreground">{desc}</p>
                      </div>
                      <Switch
                        checked={notifications[key as keyof typeof notifications]}
                        onCheckedChange={(checked: boolean) =>
                          setNotifications((prev) => ({
                            ...prev,
                            [key]: checked,
                          }))
                        }
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-end pt-4">
                <Button
                  className="bg-destructive hover:bg-destructive/90"
                  onClick={() => toast.success("Notification preferences saved!")}
                >
                  Save Preferences
                </Button>
              </div>
            </div>
          </Card>
        </TabsContent>

        {/* ✅ Security */}
        <TabsContent value="security">
          <form onSubmit={handleChangePassword}>
            <Card className="p-6 mb-6">
              <h3 className="mb-6">Change Password</h3>

              <div className="space-y-4 max-w-md">
                <div>
                  <Label htmlFor="current">Current Password</Label>
                  <Input
                    id="current"
                    name="current"
                    type="password"
                    value={password.current}
                    onChange={handlePasswordChange}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="new">New Password</Label>
                  <Input
                    id="new"
                    name="new"
                    type="password"
                    value={password.new}
                    onChange={handlePasswordChange}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="confirm">Confirm New Password</Label>
                  <Input
                    id="confirm"
                    name="confirm"
                    type="password"
                    value={password.confirm}
                    onChange={handlePasswordChange}
                    required
                  />
                </div>
              </div>
            </Card>

            <div className="flex justify-end gap-3">
              <Button type="button" variant="outline">
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-destructive hover:bg-destructive/90"
              >
                Change Password
              </Button>
            </div>
          </form>

          <Card className="p-6 mt-6">
            <h3 className="mb-4">Two-Factor Authentication</h3>
            <p className="text-muted-foreground mb-4">
              Add an extra layer of security to your account by enabling
              two-factor authentication.
            </p>
            <Button variant="outline">Enable 2FA</Button>
          </Card>
        </TabsContent>
      </Tabs>
    </AdminLayout>
  );
}
