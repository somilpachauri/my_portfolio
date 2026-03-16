import { useState } from "react";
import { cn } from "../lib/utils";

// You can keep the array as is, or remove the 'level' property later to clean it up.
const skills = [
  // Languages
  { name: "JavaScript", level: 85, category: "language" },
  { name: "C++", level: 70, category: "language" },
  { name: "Java", level: 60, category: "language" },
  { name: "Python", level: 65, category: "language" },
  { name: "C", level: 60, category: "language" },

  // Frontend
  { name: "HTML", level: 90, category: "frontend" },
  { name: "CSS", level: 85, category: "frontend" },
  { name: "React.js", level: 80, category: "frontend" },
  { name: "Next.js", level: 75, category: "frontend" },
  { name: "Tailwind CSS", level: 70, category: "frontend" },
  { name: "Bootstrap", level: 65, category: "frontend" },
  { name: "Redux / Context API", level: 70, category: "frontend" },

  // Backend
  { name: "Node.js", level: 70, category: "backend" },
  { name: "Express.js", level: 65, category: "backend" },
  { name: "GraphQL", level: 60, category: "backend" },

  // Databases
  { name: "MySQL", level: 60, category: "database" },
  { name: "PostgreSQL", level: 55, category: "database" },
  { name: "MongoDB", level: 60, category: "database" },

  // Tools & Deployment
  { name: "Git", level: 80, category: "tools" },
  { name: "GitHub", level: 80, category: "tools" },
  { name: "VS Code", level: 90, category: "tools" },
  { name: "Docker", level: 50, category: "tools" },
  { name: "Vercel", level: 65, category: "tools" },
  { name: "AWS", level: 50, category: "tools" },
  { name: "Firebase", level: 60, category: "tools" },

  // Core Concepts
  { name: "Data Structures & Algorithms", level: 70, category: "concepts" },
  { name: "OOPS", level: 70, category: "concepts" },
  { name: "REST APIs", level: 75, category: "concepts" },
  { name: "CI/CD", level: 55, category: "concepts" },
];

const categories = [
  "all",
  "language",
  "frontend",
  "backend",
  "tools",
  "database",
  "concepts",
];

export const SkillsSection = () => {
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredSkills = skills.filter((skill) => {
    if (activeCategory === "all") {
      return true;
    }
    return skill.category === activeCategory;
  });

  return (
    <section id="skills" className="py-24 px-4 relative bg-secondary/30">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
          My <span className="text-primary">Skills</span>
        </h2>
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category, key) => {
            return (
              <button
                key={key}
                onClick={() => setActiveCategory(category)}
                className={cn(
                  "px-5 py-2 rounded-full duration-300 capitalize",
                  activeCategory === category
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary/70 text-foreground hover:bg-secondary"
                )}
              >
                {category}
              </button>
            );
          })}
        </div>

        {/* Updated Grid: Added 4 columns for large screens since cards are smaller now */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredSkills.map((skill, key) => (
            <div
              key={key}
              // Updated Card Styling: Centered text, reduced padding, added hover border effect
              className="bg-card p-4 rounded-lg shadow-sm card-hover flex items-center justify-center border border-transparent hover:border-primary/20 transition-all"
            >
              <h3 className="font-semibold text-base md:text-lg text-center">
                {skill.name}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};