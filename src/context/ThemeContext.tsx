import { createContext, useContext, ReactNode } from "react";

interface ThemeContextType {
    theme: string;
    toggleTheme: () => void;
    crtEnabled: boolean;
    toggleCrt: () => void;
    colors: {
        primary: string;
        accent: string;
        secondary: string;
        background: string;
    };
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
    // High-fidelity Minimalist Dark Mode Theme Colors
    const colors = {
        primary: "#0B563D",   // Forest Green
        accent: "#059669",    // Mint/Emerald Green
        secondary: "#F9F6EE", // Almond/Cream Card
        background: "#F3EFE0" // Warm Cream
    };

    const theme = "dark";
    const toggleTheme = () => {};
    const crtEnabled = false;
    const toggleCrt = () => {};

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme, crtEnabled, toggleCrt, colors }}>
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
