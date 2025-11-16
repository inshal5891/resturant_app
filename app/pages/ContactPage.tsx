"use client";

import dynamic from "next/dynamic";
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Label } from "../components/ui/label";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

// Dynamically import map to avoid SSR errors with react-leaflet
const ContactMap = dynamic(() => import("../components/ContactMap").then(mod => ({ default: mod.ContactMap })), {
  ssr: false,
  loading: () => <div className="h-96 bg-muted flex items-center justify-center">Loading map...</div>,
});

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Message sent! We'll get back to you soon.");
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="min-h-screen">
      {/* Header Section */}
      <div className="bg-destructive text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-white mb-4">Contact Us</h1>
          <p className="text-xl opacity-90">
            We'd love to hear from you. Get in touch with us today!
          </p>
        </div>
      </div>

      {/* Contact Form & Info */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Contact Form */}
            <div>
              <h2 className="mb-6">Send Us a Message</h2>
              <Card className="p-6">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your name"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="your.email@example.com"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="subject">Subject</Label>
                    <Input
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="What's this about?"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell us more..."
                      rows={5}
                      required
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-destructive hover:bg-destructive/90"
                  >
                    Send Message
                  </Button>
                </form>
              </Card>
            </div>

            {/* Contact Information */}
            <div>
              <h2 className="mb-6">Get In Touch</h2>
              <div className="space-y-6">
                <Card className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-destructive/10 flex items-center justify-center flex-shrink-0">
                      <MapPin className="h-6 w-6 text-destructive" />
                    </div>
                    <div>
                      <h3 className="mb-2">Visit Us</h3>
                      <p className="text-muted-foreground">
                        233J+7C5, Sector 5-F<br />
                        New Karachi Town, Karachi
                      </p>
                    </div>
                  </div>
                </Card>

                <Card className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-destructive/10 flex items-center justify-center flex-shrink-0">
                      <Phone className="h-6 w-6 text-destructive" />
                    </div>
                    <div>
                      <h3 className="mb-2">Call Us</h3>
                      <p className="text-muted-foreground">
                        Phone: 03196996990<br />
                        Fax: 03002727260
                      </p>
                    </div>
                  </div>
                </Card>

                <Card className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-destructive/10 flex items-center justify-center flex-shrink-0">
                      <Mail className="h-6 w-6 text-destructive" />
                    </div>
                    <div>
                      <h3 className="mb-2">Email Us</h3>
                      <p className="text-muted-foreground">
                        General: info@burgerblast.com<br />
                        Support: support@burgerblast.com
                      </p>
                    </div>
                  </div>
                </Card>

                <Card className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-destructive/10 flex items-center justify-center flex-shrink-0">
                      <Clock className="h-6 w-6 text-destructive" />
                    </div>
                    <div>
                      <h3 className="mb-2">Opening Hours</h3>
                      <p className="text-muted-foreground">
                        Monday -
                        Sunday,4 PM - 4 AM
                      </p>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-center mb-8">Find Us</h2>
            <div className="bg-muted rounded-lg h-96 overflow-hidden">
              <ContactMap />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}



// "use client";
// import { Card } from "../components/ui/card";
// import { Button } from "../components/ui/button";
// import { Input } from "../components/ui/input";
// import { Textarea } from "../components/ui/textarea";
// import { Label } from "../components/ui/label";
// import { MapPin, Phone, Mail, Clock } from "lucide-react";
// import { useState } from "react";
// import { toast } from "sonner";

// export function ContactPage() {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     subject: "",
//     message: "",
//   });

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     toast.success("Message sent! We'll get back to you soon.");
//     setFormData({ name: "", email: "", subject: "", message: "" });
//   };

//   const handleChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
//   ) => {
//     setFormData((prev) => ({
//       ...prev,
//       [e.target.name]: e.target.value,
//     }));
//   };

//   return (
//     <div className="min-h-screen">
//       <div className="bg-destructive text-white py-16">
//         <div className="container mx-auto px-4 text-center">
//           <h1 className="text-white mb-4">Contact Us</h1>
//           <p className="text-xl opacity-90">
//             We'd love to hear from you. Get in touch with us today!
//           </p>
//         </div>
//       </div>

//       <section className="py-16">
//         <div className="container mx-auto px-4">
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
//             {/* Contact Form */}
//             <div>
//               <h2 className="mb-6">Send Us a Message</h2>
//               <Card className="p-6">
//                 <form onSubmit={handleSubmit} className="space-y-4">
//                   <div>
//                     <Label htmlFor="name">Name</Label>
//                     <Input
//                       id="name"
//                       name="name"
//                       value={formData.name}
//                       onChange={handleChange}
//                       placeholder="Your name"
//                       required
//                     />
//                   </div>
                  
//                   <div>
//                     <Label htmlFor="email">Email</Label>
//                     <Input
//                       id="email"
//                       name="email"
//                       type="email"
//                       value={formData.email}
//                       onChange={handleChange}
//                       placeholder="your.email@example.com"
//                       required
//                     />
//                   </div>
                  
//                   <div>
//                     <Label htmlFor="subject">Subject</Label>
//                     <Input
//                       id="subject"
//                       name="subject"
//                       value={formData.subject}
//                       onChange={handleChange}
//                       placeholder="What's this about?"
//                       required
//                     />
//                   </div>
                  
//                   <div>
//                     <Label htmlFor="message">Message</Label>
//                     <Textarea
//                       id="message"
//                       name="message"
//                       value={formData.message}
//                       onChange={handleChange}
//                       placeholder="Tell us more..."
//                       rows={5}
//                       required
//                     />
//                   </div>
                  
//                   <Button
//                     type="submit"
//                     className="w-full bg-destructive hover:bg-destructive/90"
//                   >
//                     Send Message
//                   </Button>
//                 </form>
//               </Card>
//             </div>

//             {/* Contact Information */}
//             <div>
//               <h2 className="mb-6">Get In Touch</h2>
              
//               <div className="space-y-6">
//                 <Card className="p-6">
//                   <div className="flex items-start gap-4">
//                     <div className="w-12 h-12 rounded-full bg-destructive/10 flex items-center justify-center flex-shrink-0">
//                       <MapPin className="h-6 w-6 text-destructive" />
//                     </div>
//                     <div>
//                       <h3 className="mb-2">Visit Us</h3>
//                       <p className="text-muted-foreground">
//                         123 Burger Street<br />
//                         Food City, FC 12345<br />
//                         United States
//                       </p>
//                     </div>
//                   </div>
//                 </Card>
                
//                 <Card className="p-6">
//                   <div className="flex items-start gap-4">
//                     <div className="w-12 h-12 rounded-full bg-destructive/10 flex items-center justify-center flex-shrink-0">
//                       <Phone className="h-6 w-6 text-destructive" />
//                     </div>
//                     <div>
//                       <h3 className="mb-2">Call Us</h3>
//                       <p className="text-muted-foreground">
//                         Phone: (555) 123-4567<br />
//                         Fax: (555) 123-4568
//                       </p>
//                     </div>
//                   </div>
//                 </Card>
                
//                 <Card className="p-6">
//                   <div className="flex items-start gap-4">
//                     <div className="w-12 h-12 rounded-full bg-destructive/10 flex items-center justify-center flex-shrink-0">
//                       <Mail className="h-6 w-6 text-destructive" />
//                     </div>
//                     <div>
//                       <h3 className="mb-2">Email Us</h3>
//                       <p className="text-muted-foreground">
//                         General: info@burgerblast.com<br />
//                         Support: support@burgerblast.com
//                       </p>
//                     </div>
//                   </div>
//                 </Card>
                
//                 <Card className="p-6">
//                   <div className="flex items-start gap-4">
//                     <div className="w-12 h-12 rounded-full bg-destructive/10 flex items-center justify-center flex-shrink-0">
//                       <Clock className="h-6 w-6 text-destructive" />
//                     </div>
//                     <div>
//                       <h3 className="mb-2">Opening Hours</h3>
//                       <p className="text-muted-foreground">
//                         Monday - Friday: 10am - 10pm<br />
//                         Saturday: 9am - 11pm<br />
//                         Sunday: 9am - 9pm
//                       </p>
//                     </div>
//                   </div>
//                 </Card>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Map Section */}
//       <section className="py-16 bg-muted/50">
//         <div className="container mx-auto px-4">
//           <div className="max-w-6xl mx-auto">
//             <h2 className="text-center mb-8">Find Us</h2>
//             <div className="bg-muted rounded-lg h-96 flex items-center justify-center">
//               <p className="text-muted-foreground">233J+7C5, Sector 5-F Sector 5 F New Karachi Town, Karachi</p>
//             </div>
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// }
