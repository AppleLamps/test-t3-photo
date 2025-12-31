import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    darkMode: "class",
    theme: {
        extend: {
            colors: {
                background: "#0a0a0b",
                surface: "#141416",
                "surface-light": "#1a1a1d",
                border: "#2a2a2e",
                primary: {
                    DEFAULT: "#8b5cf6",
                    light: "#a78bfa",
                    dark: "#7c3aed",
                },
                accent: {
                    DEFAULT: "#ec4899",
                    light: "#f472b6",
                    dark: "#db2777",
                },
                text: {
                    primary: "#f8f8f8",
                    secondary: "#a0a0a0",
                    tertiary: "#6b6b6b",
                },
            },
            fontFamily: {
                sans: ["var(--font-inter)", "system-ui", "sans-serif"],
            },
            backgroundImage: {
                "gradient-primary": "linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%)",
                "gradient-surface":
                    "linear-gradient(135deg, rgba(139, 92, 246, 0.1) 0%, rgba(236, 72, 153, 0.1) 100%)",
            },
            backdropBlur: {
                xs: "2px",
            },
            animation: {
                "slide-in": "slideIn 0.3s ease-out",
                "slide-up": "slideUp 0.4s ease-out",
                "fade-in": "fadeIn 0.2s ease-out",
                "scale-in": "scaleIn 0.2s ease-out",
                shimmer: "shimmer 2s infinite",
                celebrate: "celebrate 0.6s ease-out",
            },
            keyframes: {
                slideIn: {
                    "0%": { transform: "translateX(100%)", opacity: "0" },
                    "100%": { transform: "translateX(0)", opacity: "1" },
                },
                slideUp: {
                    "0%": { transform: "translateY(20px)", opacity: "0" },
                    "100%": { transform: "translateY(0)", opacity: "1" },
                },
                fadeIn: {
                    "0%": { opacity: "0" },
                    "100%": { opacity: "1" },
                },
                scaleIn: {
                    "0%": { transform: "scale(0.95)", opacity: "0" },
                    "100%": { transform: "scale(1)", opacity: "1" },
                },
                shimmer: {
                    "0%": { backgroundPosition: "-1000px 0" },
                    "100%": { backgroundPosition: "1000px 0" },
                },
                celebrate: {
                    "0%, 100%": { transform: "scale(1)" },
                    "50%": { transform: "scale(1.05)" },
                },
            },
            boxShadow: {
                glow: "0 0 20px rgba(139, 92, 246, 0.3)",
                "glow-pink": "0 0 20px rgba(236, 72, 153, 0.3)",
            },
        },
    },
    plugins: [],
};

export default config;
