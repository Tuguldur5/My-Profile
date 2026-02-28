"use client"

import { useState } from "react"
import { Github, Linkedin, Send } from "lucide-react"
import { useLanguage } from "@/lib/language-context"

export function ContactSection() {
  const { t } = useLanguage()
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus("sending")

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formState),
      })

      const data = await res.json()

      if (res.ok && data.success) {
        setStatus("sent")
        // Open mailto as fallback to actually send the email
        if (data.mailto) {
          window.open(data.mailto, "_blank")
        }
        setFormState({ name: "", email: "", message: "" })
        setTimeout(() => setStatus("idle"), 3000)
      } else {
        setStatus("error")
        setTimeout(() => setStatus("idle"), 3000)
      }
    } catch {
      setStatus("error")
      setTimeout(() => setStatus("idle"), 3000)
    }
  }

  const buttonLabel = {
    idle: t.contact.send,
    sending: t.contact.sending,
    sent: t.contact.sent,
    error: t.contact.error,
  }

  return (
    <div className="flex flex-col items-center">
      <p className="mb-2 text-sm font-medium tracking-widest uppercase text-muted-foreground">
        {t.contact.tag}
      </p>
      <h2 className="mb-12 text-4xl font-bold tracking-tight text-foreground md:text-5xl">
        {t.contact.title}
      </h2>

      <form onSubmit={handleSubmit} className="w-full max-w-lg">
        <div className="mb-5">
          <label
            htmlFor="name"
            className="mb-2 block text-xs font-semibold tracking-wider uppercase text-muted-foreground"
          >
            {t.contact.nameLabel}
          </label>
          <input
            id="name"
            type="text"
            required
            value={formState.name}
            onChange={(e) =>
              setFormState({ ...formState, name: e.target.value })
            }
            className="w-full rounded-lg border border-border bg-background/60 backdrop-blur-sm px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 transition-colors focus:border-foreground focus:outline-none"
            placeholder={t.contact.namePlaceholder}
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="email"
            className="mb-2 block text-xs font-semibold tracking-wider uppercase text-muted-foreground"
          >
            {t.contact.emailLabel}
          </label>
          <input
            id="email"
            type="email"
            required
            value={formState.email}
            onChange={(e) =>
              setFormState({ ...formState, email: e.target.value })
            }
            className="w-full rounded-lg border border-border bg-background/60 backdrop-blur-sm px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 transition-colors focus:border-foreground focus:outline-none"
            placeholder={t.contact.emailPlaceholder}
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="message"
            className="mb-2 block text-xs font-semibold tracking-wider uppercase text-muted-foreground"
          >
            {t.contact.messageLabel}
          </label>
          <textarea
            id="message"
            required
            rows={5}
            value={formState.message}
            onChange={(e) =>
              setFormState({ ...formState, message: e.target.value })
            }
            className="w-full resize-none rounded-lg border border-border bg-background/60 backdrop-blur-sm px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 transition-colors focus:border-foreground focus:outline-none"
            placeholder={t.contact.messagePlaceholder}
          />
        </div>
        <button
          type="submit"
          disabled={status === "sending"}
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-foreground px-6 py-3 text-sm font-medium text-background transition-opacity hover:opacity-85 disabled:opacity-60"
        >
          {buttonLabel[status]}
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
