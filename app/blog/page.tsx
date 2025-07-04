import Link from "next/link"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import { getAllPosts, getCategories } from "@/lib/posts"

export default function BlogPage() {
  const posts = getAllPosts()
  const categoriesData = getCategories()
  const categories = ["All", ...categoriesData]

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold tracking-tight mb-6">Blog</h1>
        <p className="text-xl text-muted-foreground mb-12">
          Thoughts, stories, and ideas about web development, technology, and more.
        </p>

        <div className="flex flex-col md:flex-row gap-6 mb-12">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input placeholder="Search articles..." className="pl-10" />
          </div>
          <div className="flex gap-2 flex-wrap">
            {categories.map((category, index) => (
              <Button key={index} variant={index === 0 ? "default" : "outline"} size="sm">
                {category}
              </Button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <Card key={post.id} className="flex flex-col h-full">
              <CardHeader>
                <div className="flex justify-between items-start mb-2">
                  <Badge variant="secondary">{post.category}</Badge>
                  <span className="text-sm text-muted-foreground">
                    {new Date(post.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
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

        <div className="flex justify-center mt-12">
          <Button variant="outline">Load More</Button>
        </div>
      </div>
    </div>
  )
}
