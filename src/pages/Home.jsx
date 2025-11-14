import { ThemeToggle } from "../components/ThemeToggle";
import {StarBackground} from '../components/StarBackground';
import { NavBar } from "../components/NavBar";
import { HeroSection } from "../components/HeroSection";
import { AboutSection } from "../components/AboutSection";
import { SkillsSection } from "../components/SkillsSection";
import { ProjectSection } from "../components/ProjectsSection";
import { ContactSection } from "../components/ContactSection";
import { Footer } from "../components/Footer";


export const Home=()=>{
    return( <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
        {/* Theme Toggle */}
        <ThemeToggle/>

        {/*Background Effects*/}
        <StarBackground/>

        {/*NavBar*/}
        <NavBar/>

        {/* Main Content */}
        <HeroSection/>
        
        <AboutSection/>

        <SkillsSection/>

        <ContactSection/>

        {/*Footer */}
        <Footer/>
    </div>
    );
};