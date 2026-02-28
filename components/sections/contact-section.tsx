"use client"

import { useState } from "react"
import { Github, Linkedin, Send } from "lucide-react"

export function ContactSection() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    setFormState({ name: "", email: "", message: "" })
    setTimeout(() => setSubmitted(false), 3000)
  }

  return (
    <div className="flex flex-col items-center">
      <p className="mb-2 text-sm font-medium tracking-widest uppercase text-muted-foreground">
        {"Let's connect"}
      </p>
      <h2 className="mb-12 text-4xl font-bold tracking-tight text-foreground md:text-5xl">
        Get In Touch
      </h2>

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg"
      >
        <div className="mb-5">
          <label htmlFor="name" className="mb-2 block text-xs font-semibold tracking-wider uppercase text-muted-foreground">
            Name
          </label>
          <input
            id="name"
            type="text"
            required
            value={formState.name}
            onChange={(e) => setFormState({ ...formState, name: e.target.value })}
            className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 transition-colors focus:border-foreground focus:outline-none"
            placeholder="Your name"
          />
        </div>
        <div className="mb-5">
          <label htmlFor="email" className="mb-2 block text-xs font-semibold tracking-wider uppercase text-muted-foreground">
            Email
          </label>
          <input
            id="email"
            type="email"
            required
            value={formState.email}
            onChange={(e) => setFormState({ ...formState, email: e.target.value })}
            className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 transition-colors focus:border-foreground focus:outline-none"
            placeholder="your@email.com"
          />
        </div>
        <div className="mb-6">
          <label htmlFor="message" className="mb-2 block text-xs font-semibold tracking-wider uppercase text-muted-foreground">
            Message
          </label>
          <textarea
            id="message"
            required
            rows={5}
            value={formState.message}
            onChange={(e) => setFormState({ ...formState, message: e.target.value })}
            className="w-full resize-none rounded-lg border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 transition-colors focus:border-foreground focus:outline-none"
            placeholder="Your message..."
          />
        </div>
        <button
          type="submit"
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-foreground px-6 py-3 text-sm font-medium text-background transition-opacity hover:opacity-85"
        >
          {submitted ? "Message Sent!" : "Send Message"}
          <Send className="h-4 w-4" />
        </button>
      </form>

      <div className="mt-10 flex items-center gap-6">
        <a
          href="https://github.com"
          target="_blank"
          rel="noopener noreferrer"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-foreground transition-colors hover:bg-foreground hover:text-background"
          aria-label="GitHub profile"
        >
          <Github className="h-4 w-4" />
        </a>
        <a
          href="https://linkedin.com"
          target="_blank"
          rel="noopener noreferrer"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-foreground transition-colors hover:bg-foreground hover:text-background"
          aria-label="LinkedIn profile"
        >
          <Linkedin className="h-4 w-4" />
        </a>
      </div>
    </div>
  )
}
