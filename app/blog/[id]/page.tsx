import Link from "next/link"
import { ArrowLeft, Calendar, Clock, Tag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { getPostById, getRelatedPosts } from "@/lib/posts"
import { HorizontalScroll } from "@/components/horizontal-scroll"

export default async function BlogPost({ params }: { params: { id: string } }) {
  const post = await getPostById(params.id)
  const relatedPosts = getRelatedPosts(params.id)

  if (!post) {
    return <div className="container mx-auto px-4 py-12">Post not found</div>
  }

  // Format the date
  const formattedDate = new Date(post.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  return (
    <div className="container mx-auto px-4 py-12">
      <Button variant="ghost" className="mb-8" asChild>
        <Link href="/blog" className="flex items-center gap-2">
          <ArrowLeft className="h-4 w-4" /> Back to Blog
        </Link>
      </Button>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Empty space on the left for large screens */}
        <div className="hidden lg:block lg:col-span-2">{/* This space is intentionally left empty */}</div>

        {/* Main article content - centered on large screens, full width on mobile */}
        <article className="lg:col-span-7">
          <div className="mb-8">
            <Badge variant="secondary" className="mb-4">
              {post.category}
            </Badge>
            <h1 className="text-4xl font-bold tracking-tight mb-4">{post.title}</h1>

            <div className="flex items-center gap-4 mb-6">
              <Avatar>
                <AvatarImage src={post.author.image || "/placeholder.svg"} alt={post.author.name} />
                <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <div className="font-medium">{post.author.name}</div>
                <div className="text-sm text-muted-foreground">{post.author.bio}</div>
              </div>
            </div>

            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                <span>{formattedDate}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>{post.readTime}</span>
              </div>
              <div className="flex items-center gap-1">
                <Tag className="h-4 w-4" />
                <span>{post.category}</span>
              </div>
            </div>
          </div>

          <div className="aspect-video w-full bg-muted rounded-md mb-8">
            <img
              src={`/placeholder.svg?height=400&width=800&text=Featured+Image`}
              alt="Featured"
              className="w-full h-full object-cover rounded-md"
            />
          </div>

          <div
            className="prose prose-lg dark:prose-invert max-w-none"
            dangerouslySetInnerHTML={{ __html: post.contentHtml || "" }}
          />

          <Separator className="my-8" />

          <div className="flex flex-col gap-4">
            <h3 className="text-xl font-semibold">Share this post</h3>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                Twitter
              </Button>
              <Button variant="outline" size="sm">
                Facebook
              </Button>
              <Button variant="outline" size="sm">
                LinkedIn
              </Button>
            </div>
          </div>
        </article>

        {/* Related posts - shown on the right on desktop with narrower width */}
        <div className="hidden lg:block lg:col-span-3">
          <div className="sticky top-24">
            <h3 className="text-xl font-semibold mb-6">Related Posts</h3>
            <div className="space-y-6">
              {relatedPosts.slice(0, 3).map((relatedPost) => (
                <Card key={relatedPost.id} className="overflow-hidden">
                  <div className="aspect-video w-full bg-muted">
                    <img
                      src={`/placeholder.svg?height=150&width=300&text=Related+Post`}
                      alt="Related post"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardHeader className="p-4">
                    <CardTitle className="text-base">
                      <Link href={`/blog/${relatedPost.id}`} className="hover:underline">
                        {relatedPost.title}
                      </Link>
                    </CardTitle>
                    <CardDescription className="text-xs line-clamp-2">{relatedPost.excerpt}</CardDescription>
                  </CardHeader>
                  <CardFooter className="p-4 pt-0 flex justify-between">
                    <span className="text-xs text-muted-foreground">{relatedPost.readTime}</span>
                    <Badge variant="outline" className="text-xs">
                      {relatedPost.category}
                    </Badge>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile-only horizontally scrollable related posts section */}
      <div className="block lg:hidden mt-12">
        <h3 className="text-xl font-semibold mb-6">Related Posts</h3>
        <div className="relative">
          <HorizontalScroll showScrollbar={true} className="pb-6">
            {relatedPosts.map((relatedPost) => (
              <Card key={relatedPost.id} className="overflow-hidden flex-shrink-0 w-[280px] snap-start">
                <div className="aspect-video w-full bg-muted">
                  <img
                    src={`/placeholder.svg?height=150&width=300&text=Related+Post`}
                    alt="Related post"
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardHeader className="p-4">
                  <CardTitle className="text-base">
                    <Link
                      href={`/blog/${relatedPost.id}`}
                      className="hover:underline focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                    >
                      {relatedPost.title}
                    </Link>
                  </CardTitle>
                  <CardDescription className="text-xs line-clamp-2">{relatedPost.excerpt}</CardDescription>
                </CardHeader>
                <CardFooter className="p-4 pt-0 flex justify-between">
                  <span className="text-xs text-muted-foreground">{relatedPost.readTime}</span>
                  <Badge variant="outline" className="text-xs">
                    {relatedPost.category}
                  </Badge>
                </CardFooter>
              </Card>
            ))}
          </HorizontalScroll>
        </div>
      </div>
    </div>
  )
}
