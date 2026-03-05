import { createContext, useContext, useState, useEffect, ReactNode } from "react";

type Theme = "neon" | "cyberpunk";

interface ThemeContextType {
    theme: Theme;
    toggleTheme: () => void;
    colors: {
        primary: string;
        accent: string;
        secondary: string;
        background: string;
    };
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
    const [theme, setTheme] = useState<Theme>("neon");

    useEffect(() => {
        if (theme === "cyberpunk") {
            document.documentElement.classList.add("theme-cyberpunk");
        } else {
            document.documentElement.classList.remove("theme-cyberpunk");
        }
    }, [theme]);

    const toggleTheme = () => {
        setTheme(prev => prev === "neon" ? "cyberpunk" : "neon");
    };

    const colors = theme === "neon" 
        ? { primary: "#00E5FF", accent: "#7B61FF", secondary: "#1A1A2E", background: "#0b0b13" }
        : { primary: "#FF00E6", accent: "#FEE715", secondary: "#1b1433", background: "#0f0c1b" };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme, colors }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error("useTheme must be used within a ThemeProvider");
    }
    return context;
};
