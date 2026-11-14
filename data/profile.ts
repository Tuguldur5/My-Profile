/**
 * SINGLE SOURCE OF TRUTH for the portfolio content.
 *
 * Every visible string lives here with both `en` and `mn` values, so you only
 * edit this one file. Do not invent employers, projects, certificates or
 * numbers — replace the TODO entries with real data when you have it.
 */

export type Locale = "en" | "mn"

export interface LocalizedText {
  en: string
  mn: string
}

/** Public, city-level location only. Drives the clock and the day/night theme. */
export const location = {
  city: { en: "Ulaanbaatar", mn: "Улаанбаатар" } satisfies LocalizedText,
  country: { en: "Mongolia", mn: "Монгол" } satisfies LocalizedText,
  label: {
    en: "Ulaanbaatar, Mongolia",
    mn: "Улаанбаатар, Монгол",
  } satisfies LocalizedText,
  /** IANA timezone: local time is read with Intl, never from the device offset. */
  timeZone: "Asia/Ulaanbaatar",
  /** Coordinates of Ulaanbaatar, used to compute real sunrise/sunset. */
  latitude: 47.9184,
  longitude: 106.9177,
} as const

export const profile = {
  name: {
    en: "Tuguldur Batzolboo",
    mn: "Төгөлдөр Батзолбоо",
  } satisfies LocalizedText,
  displayName: {
    en: "Tuguldur",
    mn: "Төгөлдөр",
  } satisfies LocalizedText,
  tagline: {
    en: "Software Developer | Frontend | Information Security",
    mn: "Программист | Frontend | Мэдээллийн аюулгүй байдал",
  } satisfies LocalizedText,
  about: {
    en: "Software developer with 2+ years of experience in information technology. I have built web systems using React, Node.js, TypeScript and PostgreSQL. For my bachelor's thesis I developed an automated system supporting the implementation of the ISO 27001:2022 standard and successfully defended it. I want to keep growing in software development and information security.",
    mn: "Мэдээллийн технологийн чиглэлээр 2 гаруй жилийн туршлага хуримтлуулсан. React, Node.js, TypeScript, PostgreSQL зэрэг технологи ашиглан веб систем хөгжүүлж байсан. Мөн ISO 27001:2022 стандартыг хэрэгжүүлэхэд зориулсан автоматжуулсан системийг бакалаврын төслийн хүрээнд хөгжүүлж, төслөө амжилттай хамгаалсан. Цаашид программ хангамжийн хөгжүүлэлт болон мэдээллийн аюулгүй байдлын чиглэлээр мэдлэг, ур чадвараа нэмэгдүүлэн ажиллах сонирхолтой.",
  } satisfies LocalizedText,

  /** Shown as small tags under the hero and in the About section. */
  roles: [
    {
      en: "IT Engineer",
      mn: "Мэдээллийн технологийн инженер",
    },
    {
      en: "Information Security Engineer",
      mn: "Мэдээллийн аюулгүй байдлын инженер",
    },
    {
      en: "Frontend Developer",
      mn: "Frontend хөгжүүлэгч",
    },
    {
      en: "DevOps Engineer",
      mn: "DevOps инженер",
    },
  ] satisfies LocalizedText[],

  /** Newest first. */
  experience: [
    {
      role: {
        en: "Programmer",
        mn: "Программист",
      },
      company: {
        en: "Silla Furniture",
        mn: "Силла Фурнитюр",
      },
      period: {
        en: "Aug 2025 – Mar 2026 · 7 months",
        mn: "2025.08 – 2026.03 · 7 сар",
      },
      bullets: [
        {
          en: "Built a low-code employee time-attendance app with Microsoft Power Apps and rolled it out into daily operations.",
          mn: "Microsoft Power Apps ашиглан ажилтнуудын цаг бүртгэлийн low-code application хөгжүүлж, үйл ажиллагаанд нэвтрүүлсэн.",
        },
        {
          en: "Frontend development of web systems with React and TypeScript.",
          mn: "React болон TypeScript ашиглан веб системийн Frontend хөгжүүлэлт хийсэн.",
        },
        {
          en: "Worked with PostgreSQL for storing and processing web system data.",
          mn: "PostgreSQL өгөгдлийн сантай ажиллаж, өгөгдөл хадгалах, боловсруулах үйл ажиллагаанд оролцсон.",
        },
        {
          en: "Contributed to development and improvement of internal company software.",
          mn: "Байгууллагын дотоод программ хангамжийн хөгжүүлэлт, сайжруулалтад оролцсон.",
        },
      ] satisfies LocalizedText[],
    },
    {
      role: {
        en: "Network Installation Assistant",
        mn: "Сүлжээний суурилуулалтын ажилтан",
      },
      company: {
        en: "Univision (contract)",
        mn: "Univision (гэрээт)",
      },
      period: {
        en: "2023",
        mn: "2023",
      },
      bullets: [
        {
          en: "Cabling, network equipment setup and connectivity checks, working with the network engineers and technical team.",
          mn: "Сүлжээний кабель татах, тоног төхөөрөмж суурилуулах, холболтыг шалгах. Сүлжээний инженер болон техникийн багтай хамтран ажилласан.",
        },
      ] satisfies LocalizedText[],
    },
  ],

  education: [
    {
      school: {
        en: "Mongolian University of Science and Technology (MUST)",
        mn: "Шинжлэх Ухаан Технологийн Их Сургууль (ШУТИС)",
      },
      degree: {
        en: "BSc Information Technology",
        mn: "Бакалавр, Мэдээллийн технологи",
      },
      period: {
        en: "2022 – 2026",
        mn: "2022 – 2026",
      },
    },
  ],

  community: [
    {
      organization: {
        en: "Google Developer Groups on Campus MUST",
        mn: "Google Developer Groups on Campus MUST",
      },
      role: {
        en: "Organizer",
        mn: "Зохион байгуулагч",
      },
      period: {
        en: "2024 – 2025",
        mn: "2024 – 2025",
      },
    },
  ],

  skills: {
    /** Animated bars. `level` is a self-assessment out of 100. */
    groups: [
      {
        id: "frontend",
        icon: "code",
        skills: [
          { name: "React", level: 90 },
          { name: "HTML/CSS", level: 90 },
          { name: "JavaScript/TypeScript", level: 70 },
        ],
      },
      {
        id: "backend",
        icon: "server",
        skills: [
          { name: "Node.js", level: 80 },
          { name: "Web API", level: 80 },
          { name: "PostgreSQL", level: 70 },
          { name: "SQL", level: 70 },
        ],
      },
      {
        id: "devops",
        icon: "cloud",
        skills: [
          { name: "Docker", level: 70 },
          // No level was provided for Git, so it renders as a plain chip.
          { name: "Git (version control)", level: null },
        ],
      },
      {
        id: "languages",
        icon: "braces",
        skills: [
          { name: "C#", level: 70 },
          { name: "C/C++", level: 60 },
          { name: "Java", level: 50 },
        ],
      },
    ],
    professional: [
      { en: "Database management", mn: "Өгөгдлийн сангийн удирдлага" },
      { en: "Data structures & algorithms", mn: "Өгөгдлийн бүтэц ба алгоритм" },
      { en: "API development", mn: "API хөгжүүлэлт" },
      { en: "IT security", mn: "Мэдээллийн технологийн аюулгүй байдал" },
      {
        en: "Information security management",
        mn: "Мэдээллийн аюулгүй байдлын удирдлага",
      },
      { en: "Risk management", mn: "Эрсдэлийн удирдлага" },
      { en: "Standards & compliance", mn: "Стандарт ба нийцэл" },
      { en: "Analysis & debugging", mn: "Шинжилгээ ба алдаа засах" },
    ] satisfies LocalizedText[],
    soft: [
      { en: "Problem solving", mn: "Асуудал шийдвэрлэх" },
      { en: "Self-learning", mn: "Өөрийгөө хөгжүүлэх" },
      { en: "Teamwork", mn: "Багаар ажиллах" },
      { en: "Responsibility", mn: "Хариуцлага" },
      { en: "Time management", mn: "Цаг менежмент" },
    ] satisfies LocalizedText[],
    spokenLanguages: [
      {
        name: { en: "Mongolian", mn: "Монгол хэл" },
        level: { en: "Native", mn: "Төрөлх" },
      },
      {
        name: { en: "English", mn: "Англи хэл" },
        level: { en: "Intermediate", mn: "Дунд" },
      },
    ],
    interests: [
      { en: "Basketball", mn: "Сагсан бөмбөг" },
      { en: "Handball", mn: "Гар бөмбөг" },
      { en: "Chess", mn: "Шатар" },
    ] satisfies LocalizedText[],
  },

  /**
   * Projects are rendered in order. The first card is the featured thesis.
   * Fill the TODO placeholders with real tech tags, GitHub and live links.
   */
  projects: [
    {
      id: "iso-27001-automation",
      status: "featured" as const,
      title: {
        en: "ISO 27001:2022 Automation System",
        mn: "ISO 27001:2022 автоматжуулалтын систем",
      },
      note: {
        en: "Bachelor's thesis",
        mn: "Бакалаврын төсөл",
      },
      description: {
        en: "Automated system that supports implementing the ISO 27001:2022 information security standard. Successfully defended.",
        mn: "ISO 27001:2022 стандартыг хэрэгжүүлэхэд зориулсан автоматжуулсан систем (бакалаврын төсөл), амжилттай хамгаалсан.",
      },
      // TODO: add the technology tags you actually used.
      tech: [] as string[],
      // TODO: replace with the real repository and deployed URL.
      github: "",
      live: "",
    },
    {
      id: "project-2",
      status: "todo" as const,
      title: {
        en: "Your project title",
        mn: "Таны төслийн нэр",
      },
      description: {
        en: "TODO: add a short description of what you built and what problem it solves.",
        mn: "TODO: та юу бүтээсэн, ямар асуудлыг шийдсэн тухай товч тайлбар нэмнэ үү.",
      },
      tech: [] as string[],
      github: "",
      live: "",
    },
    {
      id: "project-3",
      status: "todo" as const,
      title: {
        en: "Your project title",
        mn: "Таны төслийн нэр",
      },
      description: {
        en: "TODO: add a short description of what you built and what problem it solves.",
        mn: "TODO: та юу бүтээсэн, ямар асуудлыг шийдсэн тухай товч тайлбар нэмнэ үү.",
      },
      tech: [] as string[],
      github: "",
      live: "",
    },
  ],

  links: {
    github: "https://github.com/Tuguldur5",
    /** Optional: add a LinkedIn URL here and the link appears automatically. */
    linkedin: "",
    /** Public CV without private data. Drop the file at public/cv.pdf. */
    cv: "/cv.pdf",
  },
} as const

export type Profile = typeof profile

/** Helper for picking the right locale from a localized value. */
export function pick(value: LocalizedText, locale: Locale): string {
  return value[locale]
}
