import fs from "fs"
import path from "path"
import { NextResponse } from "next/server"
import type { Post } from "../../route"

export async function GET(request: Request, { params }: { params: { category: string } }) {
  try {
    const { category } = params
    const categoryPath = path.join(process.cwd(), "posts", category)

    // Check if category exists
    if (!fs.existsSync(categoryPath) || !fs.statSync(categoryPath).isDirectory()) {
      return NextResponse.json({ error: "Category not found" }, { status: 404 })
    }

    const postFiles = fs.readdirSync(categoryPath)
    const posts: Post[] = []

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

    // Sort posts by date (newest first)
    posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

    return NextResponse.json(posts)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch posts" }, { status: 500 })
  }
}
