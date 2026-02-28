"use client"

const experiences = [
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
]

export function AboutSection() {
  return (
    <div className="flex flex-col items-center">
      <p className="mb-2 text-sm font-medium tracking-widest uppercase text-muted-foreground">
        Get to know me
      </p>
      <h2 className="mb-8 text-4xl font-bold tracking-tight text-foreground md:text-5xl">
        About Me
      </h2>
      <p className="mx-auto mb-14 max-w-2xl text-center text-base leading-relaxed text-muted-foreground">
        {
          "I'm a passionate IT specialist and software developer with over 8 years of experience crafting digital solutions. I thrive on solving complex problems and building software that makes a real impact. My expertise spans full-stack web development, cloud infrastructure, and DevOps practices."
        }
      </p>

      <div className="w-full max-w-2xl">
        <h3 className="mb-8 text-center text-xs font-semibold tracking-widest uppercase text-muted-foreground">
          Experience
        </h3>
        <div className="relative border-l border-border pl-8">
          {experiences.map((exp, index) => (
            <div
              key={index}
              className="group relative mb-10 last:mb-0"
            >
              <div className="absolute -left-[calc(2rem+4.5px)] top-1.5 h-2.5 w-2.5 rounded-full border-2 border-foreground bg-background transition-colors group-hover:bg-foreground" />
              <span className="mb-1 block text-xs font-medium tracking-wider uppercase text-muted-foreground">
                {exp.year}
              </span>
              <h4 className="text-lg font-semibold text-foreground">
                {exp.role}
              </h4>
              <p className="mb-1 text-sm font-medium text-muted-foreground">
                {exp.company}
              </p>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {exp.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
