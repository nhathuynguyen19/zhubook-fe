import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Github, Twitter, Linkedin, Mail } from "lucide-react"
import Link from "next/link"

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold tracking-tight mb-6">About Me</h1>

        <div className="flex flex-col md:flex-row gap-8 mb-12">
          <div className="flex-shrink-0 flex justify-center">
            <Avatar className="h-48 w-48">
              <AvatarImage src="/placeholder.svg?height=192&width=192" alt="Profile" />
              <AvatarFallback>ME</AvatarFallback>
            </Avatar>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-4">John Doe</h2>
            <p className="text-muted-foreground mb-4">Web Developer & Technical Writer</p>

            <div className="flex gap-4 mb-6">
              <Link href="https://github.com" target="_blank" rel="noopener noreferrer">
                <Github className="h-5 w-5 text-muted-foreground hover:text-foreground" />
                <span className="sr-only">GitHub</span>
              </Link>
              <Link href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                <Twitter className="h-5 w-5 text-muted-foreground hover:text-foreground" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                <Linkedin className="h-5 w-5 text-muted-foreground hover:text-foreground" />
                <span className="sr-only">LinkedIn</span>
              </Link>
              <Link href="mailto:contact@example.com">
                <Mail className="h-5 w-5 text-muted-foreground hover:text-foreground" />
                <span className="sr-only">Email</span>
              </Link>
            </div>

            <p className="mb-4">
              Hi there! I'm a passionate web developer and technical writer with over 5 years of experience in creating
              modern, responsive web applications.
            </p>
            <p>
              I specialize in React, Next.js, and TypeScript, and I love sharing my knowledge through my blog posts and
              open-source contributions.
            </p>
          </div>
        </div>

        <Separator className="my-8" />

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">My Story</h2>
          <div className="space-y-4">
            <p>
              My journey in web development began during college when I built my first website for a student
              organization. What started as a hobby quickly turned into a passion as I discovered the joy of creating
              digital experiences that people could interact with.
            </p>
            <p>
              After graduating with a degree in Computer Science, I joined a startup where I had the opportunity to work
              on a variety of projects and technologies. This experience taught me to be adaptable and to continuously
              learn new skills.
            </p>
            <p>
              In recent years, I've focused on frontend development, particularly with React and Next.js. I'm fascinated
              by the intersection of design and functionality, and I strive to create interfaces that are both beautiful
              and intuitive.
            </p>
            <p>
              When I'm not coding, you can find me hiking in the mountains, reading science fiction, or experimenting
              with new recipes in the kitchen.
            </p>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">Skills & Expertise</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardContent className="p-6">
                <h3 className="font-medium mb-2">Frontend Development</h3>
                <ul className="list-disc list-inside text-muted-foreground space-y-1">
                  <li>React & Next.js</li>
                  <li>TypeScript</li>
                  <li>Tailwind CSS</li>
                  <li>Responsive Design</li>
                  <li>Accessibility (a11y)</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="font-medium mb-2">Backend Development</h3>
                <ul className="list-disc list-inside text-muted-foreground space-y-1">
                  <li>Node.js</li>
                  <li>Express</li>
                  <li>MongoDB</li>
                  <li>PostgreSQL</li>
                  <li>RESTful APIs</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="font-medium mb-2">Tools & Practices</h3>
                <ul className="list-disc list-inside text-muted-foreground space-y-1">
                  <li>Git & GitHub</li>
                  <li>CI/CD</li>
                  <li>Testing (Jest, React Testing Library)</li>
                  <li>Agile Methodologies</li>
                  <li>Performance Optimization</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="font-medium mb-2">Soft Skills</h3>
                <ul className="list-disc list-inside text-muted-foreground space-y-1">
                  <li>Technical Writing</li>
                  <li>Problem Solving</li>
                  <li>Team Collaboration</li>
                  <li>Mentoring</li>
                  <li>Project Management</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-6">Get In Touch</h2>
          <p className="mb-4">
            I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision. Feel
            free to reach out to me through any of the social links above or via email at{" "}
            <Link href="mailto:contact@example.com" className="text-primary hover:underline">
              contact@example.com
            </Link>
            .
          </p>
        </section>
      </div>
    </div>
  )
}
