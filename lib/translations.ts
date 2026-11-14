export type Locale = "en" | "mn"

const en = {
  nav: {
    home: "Home",
    about: "About",
    skills: "Skills",
    projects: "Projects",
    contact: "Contact",
  },
  home: {
    greeting: "Welcome to my profile",
    openTo: "Open to",
    localTime: "Local time",
    viewProjects: "View Projects",
    contactMe: "Contact Me",
    downloadCv: "Download CV",
    sceneAria: "Interactive 3D scene of the character in a day and night landscape",
  },
  about: {
    tag: "Get to know me",
    title: "About Me",
    openToTitle: "Open to roles",
    experienceTitle: "Experience",
    educationTitle: "Education",
    communityTitle: "Community",
  },
  skills: {
    tag: "What I work with",
    title: "Technical Skills",
    groups: {
      frontend: "Frontend",
      backend: "Backend & Data",
      devops: "DevOps & Tools",
      languages: "Other languages",
    },
    levelLabel: "Proficiency",
    professionalTitle: "Professional skills",
    softTitle: "Soft skills",
    languagesTitle: "Languages",
    interestsTitle: "Interests",
  },
  projects: {
    tag: "My work",
    title: "Featured Projects",
    subtitle: "A selection of things I have designed, built and shipped.",
    viewCode: "View source code",
    viewLive: "Open live site",
    featured: "Featured",
    todo: "TODO",
    techPlaceholder: "Tech tags — TODO",
    linkPlaceholder: "GitHub / live link — TODO",
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
    sent: "Message sent. I will get back to you soon.",
    error: "Message could not be sent. Please try again.",
    notConfigured:
      "The contact service is not configured yet. Please email me directly instead.",
    emailMe: "Email me directly",
    showEmail: "Show my email",
    downloadCv: "Download CV",
    errors: {
      name: "Please enter at least 2 characters.",
      email: "Please enter a valid email address.",
      message: "Please write at least 10 characters.",
    },
  },
  dayNight: {
    title: "Local time in Ulaanbaatar",
    auto: "Auto",
    autoLabel: "Follow the sun automatically",
    day: "Day",
    night: "Night",
    sunUp: "Sun up",
    sunDown: "Sun down",
    sunrise: "Sunrise",
    sunset: "Sunset",
    toggleLabel: "Switch between light and dark mode",
    loading: "Loading 3D scene",
    sceneError: "3D model could not be loaded. Showing a stylized placeholder.",
    webglFallback: "WebGL is not available in this browser. Showing a static image.",
    liveSuffix: "Ulaanbaatar time",
  },
  a11y: {
    skipToContent: "Skip to content",
    toggleLanguage: "Switch language",
    mainNav: "Main navigation",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    currentPage: "Current section",
  },
  footer: {
    rights: "All rights reserved.",
  },
}

/**
 * Converts literal types into their widened counterparts so both locales share
 * one shape without forcing identical strings.
 */
type Widen<T> = T extends string
  ? string
  : T extends number
    ? number
    : T extends readonly (infer U)[]
      ? Widen<U>[]
      : { [K in keyof T]: Widen<T[K]> }

export type Translations = Widen<typeof en>

export const translations: Record<Locale, Translations> = {
  en,
  mn: {
    nav: {
      home: "Нүүр",
      about: "Миний тухай",
      skills: "Ур чадвар",
      projects: "Төслүүд",
      contact: "Холбогдох",
    },
    home: {
      greeting: "Миний профайлд тавтай морил",
      openTo: "Дараах ажлын байранд нээлттэй",
      localTime: "Орон нутгийн цаг",
      viewProjects: "Төслүүдийг үзэх",
      contactMe: "Холбоо барих",
      downloadCv: "CV татах",
      sceneAria: "Өдөр, шөнийн ландшафтад буй дүрийн интерактив 3D дүрс",
    },
    about: {
      tag: "Намайг таньж мэдээрэй",
      title: "Миний тухай",
      openToTitle: "Нээлттэй ажлын байр",
      experienceTitle: "Туршлага",
      educationTitle: "Боловсрол",
      communityTitle: "Нийгэмлэг",
    },
    skills: {
      tag: "Ашигладаг технологиуд",
      title: "Техникийн ур чадвар",
      groups: {
        frontend: "Frontend",
        backend: "Backend ба өгөгдөл",
        devops: "DevOps ба хэрэгслүүд",
        languages: "Бусад хэл",
      },
      levelLabel: "Эзэмшлийн түвшин",
      professionalTitle: "Мэргэжлийн ур чадвар",
      softTitle: "Зөөлөн ур чадвар",
      languagesTitle: "Хэл",
      interestsTitle: "Сонирхол",
    },
    projects: {
      tag: "Миний бүтээлүүд",
      title: "Онцлох төслүүд",
      subtitle: "Миний зохион бүтээж, хөгжүүлж, ашиглалтад оруулсан бүтээлүүдээс.",
      viewCode: "Эх кодыг үзэх",
      viewLive: "Ажиллаж буй хуудсыг үзэх",
      featured: "Онцлох",
      todo: "TODO",
      techPlaceholder: "Технологийн шошго — TODO",
      linkPlaceholder: "GitHub / холбоос — TODO",
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
      sent: "Мессеж илгээгдлээ. Удахгүй хариу өгөх болно.",
      error: "Мессеж илгээгдсэнгүй. Дахин оролдоно уу.",
      notConfigured:
        "Холбоо барих үйлчилгээ хараахан тохируулагдаагүй байна. Имэйлээр шууд бичээрэй.",
      emailMe: "Имэйлээр шууд бичих",
      showEmail: "Имэйл хаягаа харах",
      downloadCv: "CV татах",
      errors: {
        name: "Хамгийн багадаа 2 тэмдэгт оруулна уу.",
        email: "Хүчинтэй имэйл хаяг оруулна уу.",
        message: "Хамгийн багадаа 10 тэмдэгт бичнэ үү.",
      },
    },
    dayNight: {
      title: "Улаанбаатарын орон нутгийн цаг",
      auto: "Авто",
      autoLabel: "Нарны дагуу автоматаар солих",
      day: "Өдөр",
      night: "Шөнө",
      sunUp: "Нар мандсан",
      sunDown: "Нар жаргасан",
      sunrise: "Нар мандах",
      sunset: "Нар жаргах",
      toggleLabel: "Гэрэл, харанхуй горим солих",
      loading: "3D дүрс ачаалж байна",
      sceneError: "3D загварыг ачаалж чадсангүй. Одоогоор загварчилсан дүрс харагдаж байна.",
      webglFallback:
        "Таны хөтөч WebGL дэмжихгүй байна. Хөдөлгөөнгүй зураг харуулж байна.",
      liveSuffix: "Улаанбаатарын цаг",
    },
    a11y: {
      skipToContent: "Үндсэн агуулга руу шилжих",
      toggleLanguage: "Хэл солих",
      mainNav: "Үндсэн цэс",
      openMenu: "Цэс нээх",
      closeMenu: "Цэс хаах",
      currentPage: "Одоогийн хэсэг",
    },
    footer: {
      rights: "Бүх эрх хуулиар хамгаалагдсан.",
    },
  },
}
