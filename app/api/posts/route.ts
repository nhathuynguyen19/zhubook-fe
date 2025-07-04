import fs from "fs"
import path from "path"
import { NextResponse } from "next/server"

// Define the post type
export type Post = {
  id: string
  slug: string
  title: string
  excerpt: string
  date: string
  category: string
  readTime: string
  content: string
  author: {
    name: string
    image: string
    bio: string
  }
}

// Get all posts
export async function GET() {
  try {
    const postsDirectory = path.join(process.cwd(), "posts")
    const categories = fs.readdirSync(postsDirectory)

    const posts: Post[] = []

    // Loop through each category directory
    for (const category of categories) {
      const categoryPath = path.join(postsDirectory, category)

      // Skip if not a directory
      if (!fs.statSync(categoryPath).isDirectory()) continue

      // Read post files in this category
      const postFiles = fs.readdirSync(categoryPath)

      for (const file of postFiles) {
        if (!file.endsWith(".json")) continue

        const filePath = path.join(categoryPath, file)
        const fileContent = fs.readFileSync(filePath, "utf8")
        const post = JSON.parse(fileContent) as Post

        posts.push({
          ...post,
          category,
        })
      }
    }

    // Sort posts by date (newest first)
    posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

    return NextResponse.json(posts)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch posts" }, { status: 500 })
  }
}
