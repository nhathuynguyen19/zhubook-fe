import fs from "fs"
import path from "path"
import { NextResponse } from "next/server"
import type { Post } from "../route"

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const id = params.id
    const postsDirectory = path.join(process.cwd(), "posts")
    const categories = fs.readdirSync(postsDirectory)

    // Search for the post in all categories
    for (const category of categories) {
      const categoryPath = path.join(postsDirectory, category)

      // Skip if not a directory
      if (!fs.statSync(categoryPath).isDirectory()) continue

      const postPath = path.join(categoryPath, `${id}.json`)

      // Check if file exists
      if (fs.existsSync(postPath)) {
        const fileContent = fs.readFileSync(postPath, "utf8")
        const post = JSON.parse(fileContent) as Post

        return NextResponse.json({
          ...post,
          category,
        })
      }
    }

    // If post not found
    return NextResponse.json({ error: "Post not found" }, { status: 404 })
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch post" }, { status: 500 })
  }
}
