export function Footer() {
  return (
    <footer className="mt-auto bg-foreground text-background">
      <div className="mx-auto max-w-6xl px-6">
        <div className="border-t border-background/20" />
        <p className="py-6 text-center text-xs tracking-wider text-background/60">
          {`\u00A9 ${new Date().getFullYear()} Alex Chen. All rights reserved.`}
        </p>
      </div>
    </footer>
  )
}
