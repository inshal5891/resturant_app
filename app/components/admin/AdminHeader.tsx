"use client";

import { Bell, Search, X } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Badge } from "../ui/badge";
import { useState } from "react";

interface AdminHeaderProps {
  title: string;
  description?: string;
}

const notifications = [
  { id: 1, title: "New Order #3452", message: "John Doe placed a new order", time: "5 min ago", unread: true },
  { id: 2, title: "New Reservation", message: "Lisa Anderson booked a table for 2", time: "15 min ago", unread: true },
  { id: 3, title: "Low Stock Alert", message: "French Fries running low", time: "1 hour ago", unread: false },
  { id: 4, title: "Order Completed", message: "Order #3451 has been completed", time: "2 hours ago", unread: false },
];

export function AdminHeader({ title, description }: AdminHeaderProps) {
  const [notificationList, setNotificationList] = useState(notifications);
  const unreadCount = notificationList.filter(n => n.unread).length;

  const markAllAsRead = () => {
    setNotificationList(prev => prev.map(n => ({ ...n, unread: false })));
  };

  const removeNotification = (id: number) => {
    setNotificationList(prev => prev.filter(n => n.id !== id));
  };

  return (
    <header className="bg-white border-b border-border px-8 py-4">
      <div className="flex items-center justify-between">
        <div>
          <h1>{title}</h1>
          {description && (
            <p className="text-muted-foreground mt-1">{description}</p>
          )}
        </div>

        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search..."
              className="pl-10 w-64"
            />
          </div>
          
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-destructive rounded-full flex items-center justify-center text-xs text-white">
                    {unreadCount}
                  </span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 p-0" align="end">
              <div className="p-4 border-b flex items-center justify-between">
                <h4>Notifications</h4>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="h-auto p-1 text-xs"
                  onClick={markAllAsRead}
                >
                  Mark all as read
                </Button>
              </div>
              <div className="max-h-[400px] overflow-y-auto">
                {notificationList.length === 0 ? (
                  <div className="p-8 text-center text-muted-foreground">
                    No notifications
                  </div>
                ) : (
                  notificationList.map((notification) => (
                    <div 
                      key={notification.id} 
                      className={`p-4 border-b hover:bg-muted/50 relative group ${
                        notification.unread ? 'bg-blue-50/50' : ''
                      }`}
                    >
                      <div className="flex justify-between items-start gap-2">
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <p className="font-medium">{notification.title}</p>
                            {notification.unread && (
                              <span className="w-2 h-2 bg-destructive rounded-full" />
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">
                            {notification.message}
                          </p>
                          <p className="text-xs text-muted-foreground mt-2">
                            {notification.time}
                          </p>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6 opacity-0 group-hover:opacity-100"
                          onClick={() => removeNotification(notification.id)}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </PopoverContent>
          </Popover>

          <Avatar>
            <AvatarFallback className="bg-destructive text-white">AD</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  );
}