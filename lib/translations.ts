export type Locale = "en" | "mn"

export const translations = {
  en: {
    nav: {
      home: "Home",
      about: "About",
      skills: "Skills",
      projects: "Projects",
      contact: "Contact",
    },
    home: {
      greeting: "Welcome to my portfolio",
      title: "Hi, I'm Tuguldur",
      subtitle: "IT Specialist | Software Developer",
      bio: "I build scalable, modern software solutions with a focus on clean architecture, performance, and exceptional user experiences. From full-stack applications to cloud infrastructure, I turn complex problems into elegant code.",
      viewProjects: "View Projects",
      contactMe: "Contact Me",
    },
    about: {
      tag: "Get to know me",
      title: "About Me",
      description:
        "I'm a passionate IT specialist and software developer with experience crafting digital solutions. I thrive on solving complex problems and building software that makes a real impact. My expertise spans full-stack web development, cloud infrastructure, and DevOps practices.",
      experienceTitle: "Experience",
      experiences: [
        {
          year: "2022 — Present",
          role: "Senior Software Developer",
          company: "TechForge Inc.",
          description:
            "Leading full-stack development of enterprise SaaS applications. Architecting microservices and mentoring junior developers.",
        },
        {
          year: "2020 — 2022",
          role: "Software Developer",
          company: "CloudScale Solutions",
          description:
            "Built and maintained cloud-native applications using React, Node.js, and AWS. Improved system performance by 40%.",
        },
        {
          year: "2018 — 2020",
          role: "IT Specialist",
          company: "DataBridge Corp.",
          description:
            "Managed infrastructure, automated deployment pipelines, and developed internal tools to streamline operations.",
        },
        {
          year: "2016 — 2018",
          role: "Junior Developer",
          company: "WebCraft Studio",
          description:
            "Started career building responsive websites and web applications. Gained strong foundations in HTML, CSS, JavaScript, and Python.",
        },
      ],
    },
    skills: {
      tag: "What I work with",
      title: "Technical Skills",
      categories: [
        {
          title: "Frontend",
          skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "HTML/CSS", "Vue.js"],
        },
        {
          title: "Backend",
          skills: ["Node.js", "Python", "Go", "REST APIs", "GraphQL", "Express"],
        },
        {
          title: "Database",
          skills: ["PostgreSQL", "MongoDB", "Redis", "MySQL", "Prisma", "Drizzle"],
        },
        {
          title: "DevOps",
          skills: ["Docker", "AWS", "CI/CD", "Kubernetes", "Terraform", "Linux"],
        },
      ],
    },
    projects: {
      tag: "My work",
      title: "Featured Projects",
      items: [
        {
          title: "CloudSync Dashboard",
          description:
            "A real-time monitoring dashboard for cloud infrastructure with automated alerting and resource management.",
          tech: ["React", "TypeScript", "AWS", "WebSocket"],
        },
        {
          title: "DevFlow CI/CD",
          description:
            "An automated deployment pipeline tool that streamlines the development workflow from commit to production.",
          tech: ["Go", "Docker", "Kubernetes", "PostgreSQL"],
        },
        {
          title: "CodeVault",
          description:
            "A secure code snippet manager with syntax highlighting, team sharing, and version history tracking.",
          tech: ["Next.js", "Prisma", "Tailwind CSS", "Redis"],
        },
        {
          title: "NetPulse Analytics",
          description:
            "A network monitoring application providing real-time traffic analysis and performance metrics visualization.",
          tech: ["Python", "React", "MongoDB", "D3.js"],
        },
      ],
    },
    contact: {
      tag: "Let's connect",
      title: "Get In Touch",
      nameLabel: "Name",
      namePlaceholder: "Your name",
      emailLabel: "Email",
      emailPlaceholder: "your@email.com",
      messageLabel: "Message",
      messagePlaceholder: "Your message...",
      send: "Send Message",
      sending: "Sending...",
      sent: "Message Sent!",
      error: "Failed to send. Try again.",
    },
    footer: {
      rights: "All rights reserved.",
    },
  },
  mn: {
    nav: {
      home: "Нүүр",
      about: "Миний тухай",
      skills: "Ур чадвар",
      projects: "Төслүүд",
      contact: "Холбоо барих",
    },
    home: {
      greeting: "Миний портфолиод тавтай морил",
      title: "Сайн байна уу, Би Түгөлдүр",
      subtitle: "IT Мэргэжилтэн | Програм хангамж хөгжүүлэгч",
      bio: "Би цэвэр архитектур, гүйцэтгэл, хэрэглэгчийн гайхалтай туршлагад анхаарлаа хандуулан орчин үеийн, өргөтгөх боломжтой програм хангамжийн шийдлүүдийг бүтээдэг. Full-stack програмуудаас эхлээд клоуд дэд бүтэц хүртэл, би нарийн төвөгтэй асуудлуудыг гоёмсог код болгон хувиргадаг.",
      viewProjects: "Төслүүдийг үзэх",
      contactMe: "Холбоо барих",
    },
    about: {
      tag: "Намайг танилцуулъя",
      title: "Миний тухай",
      description:
        "Би дижитал шийдлүүдийг бүтээх туршлагатай, хүсэл эрмэлзэлтэй IT мэргэжилтэн, програм хангамж хөгжүүлэгч. Нарийн төвөгтэй асуудлыг шийдэж, бодит нөлөө бүхий програм хангамж бүтээхэд дуртай. Миний мэргэшсэн чиглэлд full-stack вэб хөгжүүлэлт, клоуд дэд бүтэц, DevOps багтана.",
      experienceTitle: "Туршлага",
      experiences: [
        {
          year: "2022 — Одоо",
          role: "Ахлах програм хөгжүүлэгч",
          company: "TechForge Inc.",
          description:
            "Аж ахуйн нэгжийн SaaS програмуудын full-stack хөгжүүлэлтийг удирдаж, microservice архитектурыг зохион бүтээж, залуу хөгжүүлэгчдэд зөвлөн туслаж байна.",
        },
        {
          year: "2020 — 2022",
          role: "Програм хөгжүүлэгч",
          company: "CloudScale Solutions",
          description:
            "React, Node.js, AWS ашиглан клоуд-натив програмуудыг бүтээж, засвар үйлчилгээ хийсэн. Системийн гүйцэтгэлийг 40%-иар сайжруулсан.",
        },
        {
          year: "2018 — 2020",
          role: "IT Мэргэжилтэн",
          company: "DataBridge Corp.",
          description:
            "Дэд бүтцийг удирдаж, deployment pipeline-уудыг автоматжуулж, үйл ажиллагааг хялбарчлах дотоод хэрэгслүүд хөгжүүлсэн.",
        },
        {
          year: "2016 — 2018",
          role: "Залуу хөгжүүлэгч",
          company: "WebCraft Studio",
          description:
            "Responsive вэбсайт болон вэб програмуудыг бүтээж ажил мэргэжлээ эхлүүлсэн. HTML, CSS, JavaScript, Python-д бат суурь тавьсан.",
        },
      ],
    },
    skills: {
      tag: "Ашигладаг технологиуд",
      title: "Техникийн ур чадвар",
      categories: [
        {
          title: "Frontend",
          skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "HTML/CSS", "Vue.js"],
        },
        {
          title: "Backend",
          skills: ["Node.js", "Python", "Go", "REST APIs", "GraphQL", "Express"],
        },
        {
          title: "Өгөгдлийн сан",
          skills: ["PostgreSQL", "MongoDB", "Redis", "MySQL", "Prisma", "Drizzle"],
        },
        {
          title: "DevOps",
          skills: ["Docker", "AWS", "CI/CD", "Kubernetes", "Terraform", "Linux"],
        },
      ],
    },
    projects: {
      tag: "Миний бүтээлүүд",
      title: "Онцлох төслүүд",
      items: [
        {
          title: "CloudSync Dashboard",
          description:
            "Автоматжуулсан дохиолол болон нөөцийн удирдлагатай клоуд дэд бүтцийн бодит цагийн хяналтын самбар.",
          tech: ["React", "TypeScript", "AWS", "WebSocket"],
        },
        {
          title: "DevFlow CI/CD",
          description:
            "Commit-ээс production хүртэлх хөгжүүлэлтийн ажлын урсгалыг хялбарчилдаг автоматжуулсан deployment pipeline хэрэгсэл.",
          tech: ["Go", "Docker", "Kubernetes", "PostgreSQL"],
        },
        {
          title: "CodeVault",
          description:
            "Синтакс тодотголтой, баг хуваалцах, хувилбарын түүхтэй аюулгүй код хадгалах менежер.",
          tech: ["Next.js", "Prisma", "Tailwind CSS", "Redis"],
        },
        {
          title: "NetPulse Analytics",
          description:
            "Бодит цагийн трафик шинжилгээ болон гүйцэтгэлийн хэмжигдэхүүний дүрслэлийг хангадаг сүлжээний хяналтын програм.",
          tech: ["Python", "React", "MongoDB", "D3.js"],
        },
      ],
    },
    contact: {
      tag: "Холбогдъё",
      title: "Холбоо барих",
      nameLabel: "Нэр",
      namePlaceholder: "Таны нэр",
      emailLabel: "Имэйл",
      emailPlaceholder: "таны@имэйл.com",
      messageLabel: "Мессеж",
      messagePlaceholder: "Таны мессеж...",
      send: "Мессеж илгээх",
      sending: "Илгээж байна...",
      sent: "Мессеж илгээгдлээ!",
      error: "Илгээхэд алдаа гарлаа. Дахин оролдоно уу.",
    },
    footer: {
      rights: "Бүх эрх хуулиар хамгаалагдсан.",
    },
  },
} as const

export type Translations = (typeof translations)["en"]
