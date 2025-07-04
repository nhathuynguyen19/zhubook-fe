import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

export default function Home() {
  // Sample blog posts data
  const posts = [
    {
      id: 1,
      title: "Getting Started with Web Development",
      excerpt: "Learn the basics of HTML, CSS, and JavaScript to kickstart your web development journey.",
      date: "May 1, 2025",
      category: "Web Development",
      readTime: "5 min read",
    },
    {
      id: 2,
      title: "My Journey as a Software Engineer",
      excerpt: "Reflecting on my career path and the lessons I've learned along the way.",
      date: "April 25, 2025",
      category: "Career",
      readTime: "8 min read",
    },
    {
      id: 3,
      title: "The Future of Artificial Intelligence",
      excerpt: "Exploring the potential impact of AI on various industries and our daily lives.",
      date: "April 18, 2025",
      category: "Technology",
      readTime: "10 min read",
    },
  ]

  return (
    <div className="container mx-auto px-4 py-12">
      <section className="mb-16">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="flex-1">
            <h1 className="text-4xl font-bold tracking-tight mb-4">Welcome to My Personal Blog</h1>
            <p className="text-xl text-muted-foreground mb-6">
              Sharing my thoughts, experiences, and knowledge about technology, programming, and life.
            </p>
            <div className="flex gap-4">
              <Button asChild>
                <Link href="/about">About Me</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="#latest-posts">Latest Posts</Link>
              </Button>
            </div>
          </div>
          <div className="flex-1 flex justify-center">
            <Avatar className="h-64 w-64">
              <AvatarImage src="/placeholder.svg?height=256&width=256" alt="Profile" />
              <AvatarFallback>ME</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </section>

      <section id="latest-posts" className="mb-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold">Latest Posts</h2>
          <Button variant="ghost" asChild>
            <Link href="/blog" className="flex items-center gap-2">
              View All <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <Card key={post.id} className="flex flex-col h-full">
              <CardHeader>
                <div className="flex justify-between items-start mb-2">
                  <Badge variant="secondary">{post.category}</Badge>
                  <span className="text-sm text-muted-foreground">{post.date}</span>
                </div>
                <CardTitle className="text-xl">{post.title}</CardTitle>
                <CardDescription>{post.excerpt}</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <div className="aspect-video w-full bg-muted rounded-md mb-4">
                  <img
                    src={`/placeholder.svg?height=200&width=400&text=Featured+Image`}
                    alt="Featured"
                    className="w-full h-full object-cover rounded-md"
                  />
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <span className="text-sm text-muted-foreground">{post.readTime}</span>
                <Button variant="ghost" size="sm" asChild>
                  <Link href={`/blog/${post.id}`}>Read More</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>

      <section className="mb-16">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Subscribe to My Newsletter</CardTitle>
            <CardDescription>Get notified when I publish new content.</CardDescription>
          </CardHeader>
          <CardContent>
            <form className="flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 sm:flex-1"
              />
              <Button type="submit">Subscribe</Button>
            </form>
          </CardContent>
        </Card>
      </section>
    </div>
  )
}
