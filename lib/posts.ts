import fs from "fs"
import path from "path"
import matter from "gray-matter"
import { remark } from "remark"
import html from "remark-html"

const postsDirectory = path.join(process.cwd(), "posts")

export type Post = {
  id: string
  slug: string
  title: string
  excerpt: string
  date: string
  category: string
  readTime: string
  content: string
  contentHtml?: string
  author: {
    name: string
    image: string
    bio: string
  }
}

// Get all categories
export function getCategories(): string[] {
  try {
    return fs.readdirSync(postsDirectory).filter((file) => fs.statSync(path.join(postsDirectory, file)).isDirectory())
  } catch (error) {
    console.error("Error getting categories:", error)
    return []
  }
}

// Get all posts
export function getAllPosts(): Post[] {
  const categories = getCategories()
  const allPosts: Post[] = []

  categories.forEach((category) => {
    const categoryPath = path.join(postsDirectory, category)
    const files = fs.readdirSync(categoryPath).filter((file) => file.endsWith(".md"))

    files.forEach((file) => {
      const slug = file.replace(/\.md$/, "")
      const fullPath = path.join(categoryPath, file)
      const fileContents = fs.readFileSync(fullPath, "utf8")

      // Parse the frontmatter
      const { data, content } = matter(fileContents)

      allPosts.push({
        id: data.id,
        slug,
        title: data.title,
        excerpt: data.excerpt,
        date: data.date,
        category,
        readTime: data.readTime,
        content,
        author: data.author,
      })
    })
  })

  // Sort posts by date (newest first)
  return allPosts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

// Get a post by ID
export async function getPostById(id: string): Promise<Post | null> {
  const posts = getAllPosts()
  const post = posts.find((post) => post.id === id)

  if (!post) return null

  // Convert markdown to HTML
  const processedContent = await remark().use(html).process(post.content)

  const contentHtml = processedContent.toString()

  return {
    ...post,
    contentHtml,
  }
}

// Get posts by category
export function getPostsByCategory(category: string): Post[] {
  const allPosts = getAllPosts()
  return allPosts.filter((post) => post.category === category)
}

// Get related posts
export function getRelatedPosts(currentId: string, limit = 3): Post[] {
  const allPosts = getAllPosts()
  return allPosts.filter((post) => post.id !== currentId).slice(0, limit)
}
