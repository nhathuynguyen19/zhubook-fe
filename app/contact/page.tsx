import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Mail, MapPin, Phone } from "lucide-react"

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold tracking-tight mb-6">Contact Me</h1>
        <p className="text-xl text-muted-foreground mb-12">
          Have a question or want to work together? Feel free to get in touch.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <Card>
            <CardContent className="p-6 flex flex-col items-center text-center">
              <div className="bg-primary/10 p-3 rounded-full mb-4">
                <Mail className="h-6 w-6 text-primary" />
              </div>
              <CardTitle className="text-xl mb-2">Email</CardTitle>
              <CardDescription>
                <a href="mailto:contact@example.com" className="text-primary hover:underline">
                  contact@example.com
                </a>
              </CardDescription>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 flex flex-col items-center text-center">
              <div className="bg-primary/10 p-3 rounded-full mb-4">
                <Phone className="h-6 w-6 text-primary" />
              </div>
              <CardTitle className="text-xl mb-2">Phone</CardTitle>
              <CardDescription>
                <a href="tel:+1234567890" className="text-primary hover:underline">
                  (123) 456-7890
                </a>
              </CardDescription>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 flex flex-col items-center text-center">
              <div className="bg-primary/10 p-3 rounded-full mb-4">
                <MapPin className="h-6 w-6 text-primary" />
              </div>
              <CardTitle className="text-xl mb-2">Location</CardTitle>
              <CardDescription>San Francisco, California</CardDescription>
            </CardContent>
          </Card>
        </div>

        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="text-2xl">Send Me a Message</CardTitle>
            <CardDescription>Fill out the form below and I'll get back to you as soon as possible.</CardDescription>
          </CardHeader>
          <CardContent>
            <form className="grid gap-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" placeholder="Your name" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="Your email" />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="subject">Subject</Label>
                <Input id="subject" placeholder="What is this regarding?" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="message">Message</Label>
                <Textarea id="message" placeholder="Your message" className="min-h-32" />
              </div>
              <Button type="submit" className="w-full md:w-auto">
                Send Message
              </Button>
            </form>
          </CardContent>
        </Card>

        <div className="aspect-video w-full bg-muted rounded-lg overflow-hidden">
          {/* This would be a Google Map in a real implementation */}
          <div className="w-full h-full flex items-center justify-center text-muted-foreground">
            Map would be displayed here
          </div>
        </div>
      </div>
    </div>
  )
}
