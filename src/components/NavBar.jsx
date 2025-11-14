import { useEffect, useState } from "react";
import { cn } from "../lib/utils";
// 1. Fixed imports: Added Menu and X, removed unused Key
import { Menu, X } from "lucide-react"; 

const navItems = [
  { name: "Home", href: "#hero" },
  { name: "About", href: "#about" },
  // Typo in original 'skils', corrected to 'skills'
  { name: "Skills", href: "#skills" }, 
  { name: "Projects", href: "#projects" },
  { name: "Contact", href: "#contact" },
];

export const NavBar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // 2. Fixed scroll check: Used window.scrollY
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);

    // 2. Fixed effect cleanup: Returned a function
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []); // Empty dependency array is correct!

  return (
    // 3. Fixed Tailwind class: 'fixes' -> 'fixed'
    <nav
      className={cn(
        "fixed w-full z-40 transition-all duration-300",
        isScrolled ? "py-3 bg-background/80 backdrop-blur-md shadow-sm" : "py-5"
      )}
    >
      <div className="container flex items-center justify-between">
        <a
          className="text-xl font-bold text-primary flex items-center"
          href="#hero"
        >
          <span className="relative z-10">
            <span className="text-glow text-foreground">Somil</span> Portfolio
          </span>
        </a>
        <div className="hidden md:flex space-x-8">
          {/* 4. Best Practice: Used item.name as the key */}
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="text-foreground/80 hover:text-primary transition-colors duration-300"
            >
              {item.name}
            </a>
          ))}
        </div>

        {/*Mobile Menu*/}
        <button
          onClick={() => setIsMenuOpen((prev) => !prev)}
          className="md:hidden p-2 text-foreground z-50"
          aria-label={isMenuOpen ? "Close Menu" : "Open Menu"}
        >
          {/* 1. Icons will now render correctly */}
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        <div
          className={cn(
            "fixed inset-0 bg-background/95 backdrop-blur-md z-40 flex flex-col items-center justify-center",
            "transition-all duration-300 md:hidden",
            isMenuOpen
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none"
          )}
        >
          <div className="flex flex-col space-y-8 text-xl">
            {/* 4. Best Practice: Used item.name as the key */}
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-foreground/80 hover:text-primary transition-colors duration-300"
                onClick={() => setIsMenuOpen(false)} // This closes the menu on click, which is good UX!
              >
                {item.name}
              </a>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};