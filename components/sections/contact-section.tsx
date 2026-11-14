"use client"

import { useEffect, useState } from "react"
import {
  Download,
  Github,
  Linkedin,
  Loader2,
  Mail,
  Send,
  type LucideIcon,
} from "lucide-react"
import { useLanguage } from "@/lib/language-context"
import { profile } from "@/data/profile"

/** Kept in env so the address can change without touching the code. */
const EMAIL_FROM_ENV = (process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "").trim()

interface Fields {
  name: string
  email: string
  message: string
}

type FieldErrors = Partial<Record<keyof Fields, string>>
type Status = "idle" | "sending" | "sent" | "error" | "notConfigured"

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const EMPTY: Fields = { name: "", email: "", message: "" }

const inputClass =
  "w-full rounded-lg border border-input bg-background/60 px-4 py-3 text-sm text-foreground backdrop-blur-sm transition-colors placeholder:text-muted-foreground/60 focus:border-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground aria-[invalid=true]:border-destructive"

export function ContactSection() {
  const { t } = useLanguage()
  const [values, setValues] = useState<Fields>(EMPTY)
  const [errors, setErrors] = useState<FieldErrors>({})
  const [status, setStatus] = useState<Status>("idle")

  // Assembled after mount only, so the address never appears in the
  // server-rendered HTML that simple scrapers read.
  const [revealedEmail, setRevealedEmail] = useState<string | null>(null)

  useEffect(() => {
    if (!EMAIL_FROM_ENV) return
    const at = EMAIL_FROM_ENV.indexOf("@")
    if (at <= 0) return
    setRevealedEmail([EMAIL_FROM_ENV.slice(0, at), EMAIL_FROM_ENV.slice(at + 1)].join("@"))
  }, [])

  // Clear transient feedback so it does not stick around forever.
  useEffect(() => {
    if (status === "idle" || status === "sending") return
    const timer = window.setTimeout(() => setStatus("idle"), 6000)
    return () => window.clearTimeout(timer)
  }, [status])

  const validate = (): FieldErrors => {
    const next: FieldErrors = {}
    if (values.name.trim().length < 2) next.name = t.contact.errors.name
    if (!EMAIL_PATTERN.test(values.email.trim())) next.email = t.contact.errors.email
    if (values.message.trim().length < 10) next.message = t.contact.errors.message
    return next
  }

  const update = (field: keyof Fields, value: string) => {
    setValues((current) => ({ ...current, [field]: value }))
    setErrors((current) => ({ ...current, [field]: undefined }))
    if (status !== "sending") setStatus("idle")
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (status === "sending") return

    const nextErrors = validate()
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors)
      const firstInvalid = Object.keys(nextErrors)[0]
      document.getElementById(firstInvalid)?.focus()
      return
    }

    setStatus("sending")
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: values.name.trim(),
          email: values.email.trim(),
          message: values.message.trim(),
        }),
      })

      if (response.status === 503) {
        setStatus("notConfigured")
        return
      }

      const data = (await response.json().catch(() => null)) as
        | { success?: boolean }
        | null

      if (response.ok && data?.success) {
        setStatus("sent")
        setValues(EMPTY)
        setErrors({})
      } else {
        setStatus("error")
      }
    } catch {
      setStatus("error")
    }
  }

  const statusMessage: Record<Exclude<Status, "idle" | "sending">, string> = {
    sent: t.contact.sent,
    error: t.contact.error,
    notConfigured: t.contact.notConfigured,
  }

  const buttonLabel =
    status === "sending" ? t.contact.sending : status === "sent" ? t.contact.sent : t.contact.send

  return (
    <div className="flex flex-col items-center">
      <p className="mb-2 text-xs font-medium uppercase tracking-widest text-muted-foreground sm:text-sm">
        {t.contact.tag}
      </p>
      <h2 className="mb-10 text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl">
        {t.contact.title}
      </h2>

      <form onSubmit={handleSubmit} noValidate className="w-full max-w-lg">
        <div className="mb-5">
          <label
            htmlFor="name"
            className="mb-2 block text-xs font-semibold uppercase tracking-wider text-muted-foreground"
          >
            {t.contact.nameLabel}
          </label>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            value={values.name}
            onChange={(event) => update("name", event.target.value)}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "name-error" : undefined}
            className={inputClass}
            placeholder={t.contact.namePlaceholder}
          />
          {errors.name ? (
            <p id="name-error" className="mt-1.5 text-xs text-destructive">
              {errors.name}
            </p>
          ) : null}
        </div>

        <div className="mb-5">
          <label
            htmlFor="email"
            className="mb-2 block text-xs font-semibold uppercase tracking-wider text-muted-foreground"
          >
            {t.contact.emailLabel}
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            value={values.email}
            onChange={(event) => update("email", event.target.value)}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "email-error" : undefined}
            className={inputClass}
            placeholder={t.contact.emailPlaceholder}
          />
          {errors.email ? (
            <p id="email-error" className="mt-1.5 text-xs text-destructive">
              {errors.email}
            </p>
          ) : null}
        </div>

        <div className="mb-6">
          <label
            htmlFor="message"
            className="mb-2 block text-xs font-semibold uppercase tracking-wider text-muted-foreground"
          >
            {t.contact.messageLabel}
          </label>
          <textarea
            id="message"
            name="message"
            rows={5}
            value={values.message}
            onChange={(event) => update("message", event.target.value)}
            aria-invalid={Boolean(errors.message)}
            aria-describedby={errors.message ? "message-error" : undefined}
            className={`${inputClass} resize-none`}
            placeholder={t.contact.messagePlaceholder}
          />
          {errors.message ? (
            <p id="message-error" className="mt-1.5 text-xs text-destructive">
              {errors.message}
            </p>
          ) : null}
        </div>

        <button
          type="submit"
          disabled={status === "sending"}
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-foreground px-6 py-3 text-sm font-medium text-background transition-opacity hover:opacity-85 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground disabled:opacity-60"
        >
          {buttonLabel}
          {status === "sending" ? (
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
          ) : (
            <Send className="h-4 w-4" aria-hidden="true" />
          )}
        </button>

        <p
          role="status"
          aria-live="polite"
          className={`mt-4 min-h-5 text-center text-xs ${
            status === "sent"
              ? "text-emerald-600 dark:text-emerald-400"
              : status === "idle" || status === "sending"
                ? "text-muted-foreground"
                : "text-destructive"
          }`}
        >
          {status === "idle" || status === "sending" ? "" : statusMessage[status]}
        </p>
      </form>

      <div className="mt-8 flex flex-col items-center gap-4">
        <a
          href={profile.links.cv}
          download
          className="flex items-center gap-2 rounded-lg border border-foreground px-5 py-2.5 text-xs font-medium text-foreground transition-colors hover:bg-foreground hover:text-background focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground"
        >
          <Download className="h-4 w-4" aria-hidden="true" />
          {t.contact.downloadCv}
        </a>

        <ul className="flex flex-wrap items-center justify-center gap-3">
          <SocialLink href={profile.links.github} icon={Github} label="GitHub" />
          {profile.links.linkedin ? (
            <SocialLink href={profile.links.linkedin} icon={Linkedin} label="LinkedIn" />
          ) : null}
          {revealedEmail ? (
            <SocialLink
              href={`mailto:${revealedEmail}`}
              icon={Mail}
              label={revealedEmail}
            />
          ) : null}
        </ul>
      </div>
    </div>
  )
}

function SocialLink({
  href,
  icon: Icon,
  label,
}: {
  href: string
  icon: LucideIcon
  label: string
}) {
  const isExternal = href.startsWith("http")
  return (
    <li>
      <a
        href={href}
        {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        className="flex items-center gap-2 rounded-full border border-border px-4 py-2 text-xs font-medium text-foreground transition-colors hover:bg-foreground hover:text-background focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground"
      >
        <Icon className="h-4 w-4" aria-hidden="true" />
        {label}
      </a>
    </li>
  )
}
