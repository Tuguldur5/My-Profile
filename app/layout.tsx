import type { Metadata, Viewport } from "next"
import { Inter } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { location, profile } from "@/data/profile"
import "./globals.css"

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-inter",
  display: "swap",
})

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://tuguldur.vercel.app"
const title = `${profile.displayName.en} — ${profile.tagline.en}`
const description = `${profile.name.en} — ${profile.tagline.en}. Based in ${location.label.en}.`

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: title,
    template: `%s | ${profile.displayName.en}`,
  },
  description,
  applicationName: `${profile.displayName.en} Portfolio`,
  authors: [{ name: profile.name.en }],
  keywords: [
    profile.name.en,
    "IT engineer",
    "information security",
    "software developer",
    "frontend developer",
    location.city.en,
    location.country.en,
    "React",
    "TypeScript",
    "PostgreSQL",
    "Next.js",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: profile.displayName.en,
    title,
    description,
    locale: "en_US",
    alternateLocale: ["mn_MN"],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
  icons: {
    icon: [{ url: "/icon.svg?v=2", type: "image/svg+xml" }],
    apple: [{ url: "/apple-icon.png" }],
  },
  robots: { index: true, follow: true },
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#080b12" },
    { media: "(prefers-color-scheme: light)", color: "#f6f3ec" },
  ],
}

/**
 * Sets the initial theme before React hydrates, using the real sunrise and
 * sunset for the profile location so there is no flash of the wrong theme.
 * Kept tiny and failure-safe; the client provider takes over after hydration.
 */
const themeInitScript = `(function(){try{
var R=Math.PI/180,lat=${location.latitude},lon=${location.longitude};
var now=new Date();
var J=now.getTime()/864e5-0.5+2440588,d=J-2451545;
var lw=R*-lon,phi=R*lat,n=Math.round(d-lw/(2*Math.PI));
var ds=lw/(2*Math.PI)+n,M=R*(357.5291+0.98560028*ds);
var L=M+R*(1.9148*Math.sin(M)+0.02*Math.sin(2*M)+0.0003*Math.sin(3*M))+R*102.9372+Math.PI;
var dec=Math.asin(Math.sin(R*23.4397)*Math.sin(L));
var noon=2451545+ds+0.0053*Math.sin(M)-0.0069*Math.sin(2*L);
var ha=Math.acos((Math.sin(-0.833*R)-Math.sin(phi)*Math.sin(dec))/(Math.cos(phi)*Math.cos(dec)));
var ds2=(ha+lw)/(2*Math.PI)+n;
var setJ=2451545+ds2+0.0053*Math.sin(M)-0.0069*Math.sin(2*L);
var riseJ=noon-(setJ-noon);
var when=function(j){return new Date((j+0.5-2440588)*864e5)};
var day=now>=when(riseJ)&&now<when(setJ);
document.documentElement.dataset.theme=day?'light':'dark';
document.documentElement.style.colorScheme=day?'light':'dark';
}catch(e){document.documentElement.dataset.theme='dark';}})()`

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" data-theme="dark" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`}>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        {children}
        <Analytics />
      </body>
    </html>
  )
}
