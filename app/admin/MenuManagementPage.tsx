"use client";
import { useState } from "react";
import { AdminLayout } from "../components/admin/AdminLayout";
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "../components/ui/alert-dialog";
import { Plus, Edit, Trash2, Search } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";

const menuItems = {
  burgers: [
    {
      id: 1,
      name: "Classic Burger",
      description: "Beef patty, lettuce, tomato, onion, pickles",
      price: "$8.99",
      category: "burgers",
      image: "https://images.unsplash.com/photo-1641242307123-80488916bac0?w=400",
      available: true,
    },
    {
      id: 2,
      name: "Bacon Deluxe",
      description: "Double beef patty, bacon, cheese, BBQ sauce",
      price: "$12.99",
      category: "burgers",
      image: "https://images.unsplash.com/photo-1641242307123-80488916bac0?w=400",
      available: true,
    },
  ],
  sides: [
    {
      id: 5,
      name: "French Fries",
      description: "Crispy golden fries with sea salt",
      price: "$3.99",
      category: "sides",
      image: "https://images.unsplash.com/photo-1630431341973-02e1b662ec35?w=400",
      available: true,
    },
  ],
  drinks: [
    {
      id: 9,
      name: "Classic Milkshake",
      description: "Vanilla, chocolate, or strawberry",
      price: "$4.99",
      category: "drinks",
      image: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=400",
      available: true,
    },
  ],
};

export function MenuManagementPage() {
  const [activeCategory, setActiveCategory] = useState("burgers");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "burgers",
    image: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingItem) {
      toast.success("Menu item updated successfully!");
    } else {
      toast.success("Menu item added successfully!");
    }
    setIsAddDialogOpen(false);
    setEditingItem(null);
    setFormData({ name: "", description: "", price: "", category: "burgers", image: "" });
  };

  const handleEdit = (item: any) => {
    setEditingItem(item);
    setFormData({
      name: item.name,
      description: item.description,
      price: item.price,
      category: item.category,
      image: item.image,
    });
    setIsAddDialogOpen(true);
  };

  const handleDelete = (itemId: number) => {
    toast.success("Menu item deleted successfully!");
  };

  const handleDeleteWithConfirm = (itemId: number, itemName: string) => {
    // This will be triggered by the AlertDialog
    handleDelete(itemId);
  };

  return (
    <AdminLayout 
      title="Menu Management" 
      description="Add, edit, and manage your restaurant menu items"
    >
      {/* Header Actions */}
      <div className="flex justify-between items-center mb-6">
        <div className="relative w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search menu items..." className="pl-10" />
        </div>

        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-destructive hover:bg-destructive/90 gap-2">
              <Plus className="h-4 w-4" />
              Add Menu Item
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>
                {editingItem ? "Edit Menu Item" : "Add New Menu Item"}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Item Name</Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="e.g., Classic Burger"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="price">Price</Label>
                  <Input
                    id="price"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    placeholder="e.g., $8.99"
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="category">Category</Label>
                <Select value={formData.category} onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="burgers">Burgers</SelectItem>
                    <SelectItem value="sides">Sides</SelectItem>
                    <SelectItem value="drinks">Drinks</SelectItem>
                    <SelectItem value="desserts">Desserts</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Describe the item..."
                  rows={3}
                  required
                />
              </div>

              <div>
                <Label htmlFor="image">Image URL</Label>
                <Input
                  id="image"
                  name="image"
                  value={formData.image}
                  onChange={handleInputChange}
                  placeholder="https://example.com/image.jpg"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <Button type="submit" className="flex-1 bg-destructive hover:bg-destructive/90">
                  {editingItem ? "Update Item" : "Add Item"}
                </Button>
                <Button 
                  type="button" 
                  variant="outline" 
                  className="flex-1"
                  onClick={() => {
                    setIsAddDialogOpen(false);
                    setEditingItem(null);
                    setFormData({ name: "", description: "", price: "", category: "burgers", image: "" });
                  }}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Category Tabs */}
      <Tabs value={activeCategory} onValueChange={setActiveCategory}>
        <TabsList className="mb-6">
          <TabsTrigger value="burgers">Burgers</TabsTrigger>
          <TabsTrigger value="sides">Sides</TabsTrigger>
          <TabsTrigger value="drinks">Drinks</TabsTrigger>
          <TabsTrigger value="desserts">Desserts</TabsTrigger>
        </TabsList>

        {Object.entries(menuItems).map(([category, items]) => (
          <TabsContent key={category} value={category}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {items.map((item) => (
                <Card key={item.id} className="overflow-hidden">
                  <div className="aspect-video relative overflow-hidden bg-muted">
                    <ImageWithFallback
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3>{item.name}</h3>
                      <span className="text-destructive">{item.price}</span>
                    </div>
                    <p className="text-muted-foreground mb-4">{item.description}</p>
                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="flex-1 gap-2"
                        onClick={() => handleEdit(item)}
                      >
                        <Edit className="h-4 w-4" />
                        Edit
                      </Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="text-red-600 hover:text-red-700 hover:bg-red-50"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Delete Menu Item</AlertDialogTitle>
                            <AlertDialogDescription>
                              Are you sure you want to delete "{item.name}"? This action cannot be undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              className="bg-destructive hover:bg-destructive/90"
                              onClick={() => handleDeleteWithConfirm(item.id, item.name)}
                            >
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </AdminLayout>
  );
}