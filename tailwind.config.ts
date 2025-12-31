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
                background: {
                    DEFAULT: "#050506",
                    secondary: "#0a0a0c",
                },
                surface: {
                    DEFAULT: "#111114",
                    elevated: "#18181c",
                    light: "#1f1f24",
                },
                border: {
                    DEFAULT: "#27272d",
                    subtle: "#1e1e23",
                },
                primary: {
                    DEFAULT: "#8b5cf6",
                    light: "#a78bfa",
                    dark: "#7c3aed",
                    glow: "rgba(139, 92, 246, 0.5)",
                },
                accent: {
                    DEFAULT: "#ec4899",
                    light: "#f472b6",
                    dark: "#db2777",
                    glow: "rgba(236, 72, 153, 0.5)",
                },
                text: {
                    primary: "#fafafa",
                    secondary: "#a1a1aa",
                    tertiary: "#71717a",
                    muted: "#52525b",
                },
                success: "#10b981",
                warning: "#f59e0b",
                error: "#ef4444",
                info: "#3b82f6",
            },
            fontFamily: {
                sans: ["var(--font-inter)", "system-ui", "-apple-system", "sans-serif"],
            },
            fontSize: {
                "2xs": ["0.625rem", { lineHeight: "0.875rem" }],
            },
            backgroundImage: {
                "gradient-primary": "linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%)",
                "gradient-primary-hover": "linear-gradient(135deg, #a78bfa 0%, #f472b6 100%)",
                "gradient-surface": "linear-gradient(135deg, rgba(139, 92, 246, 0.1) 0%, rgba(236, 72, 153, 0.1) 100%)",
                "gradient-radial": "radial-gradient(ellipse at center, var(--tw-gradient-stops))",
                "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
                "shimmer": "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.05) 50%, transparent 100%)",
            },
            backdropBlur: {
                xs: "2px",
            },
            animation: {
                "slide-in": "slideIn 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
                "slide-up": "slideUp 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
                "slide-down": "slideDown 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
                "fade-in": "fadeIn 0.3s ease-out",
                "fade-in-up": "fadeInUp 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
                "scale-in": "scaleIn 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
                "shimmer": "shimmer 2.5s ease-in-out infinite",
                "pulse-soft": "pulseSoft 3s ease-in-out infinite",
                "float": "float 6s ease-in-out infinite",
                "glow": "glow 2s ease-in-out infinite alternate",
                "spin-slow": "spin 8s linear infinite",
                "gradient": "gradient 8s linear infinite",
                "bounce-subtle": "bounceSubtle 2s ease-in-out infinite",
            },
            keyframes: {
                slideIn: {
                    "0%": { transform: "translateX(100%)", opacity: "0" },
                    "100%": { transform: "translateX(0)", opacity: "1" },
                },
                slideUp: {
                    "0%": { transform: "translateY(24px)", opacity: "0" },
                    "100%": { transform: "translateY(0)", opacity: "1" },
                },
                slideDown: {
                    "0%": { transform: "translateY(-24px)", opacity: "0" },
                    "100%": { transform: "translateY(0)", opacity: "1" },
                },
                fadeIn: {
                    "0%": { opacity: "0" },
                    "100%": { opacity: "1" },
                },
                fadeInUp: {
                    "0%": { opacity: "0", transform: "translateY(16px)" },
                    "100%": { opacity: "1", transform: "translateY(0)" },
                },
                scaleIn: {
                    "0%": { transform: "scale(0.9)", opacity: "0" },
                    "100%": { transform: "scale(1)", opacity: "1" },
                },
                shimmer: {
                    "0%": { backgroundPosition: "100% 50%" },
                    "100%": { backgroundPosition: "-100% 50%" },
                },
                pulseSoft: {
                    "0%, 100%": { opacity: "1" },
                    "50%": { opacity: "0.7" },
                },
                float: {
                    "0%, 100%": { transform: "translateY(0)" },
                    "50%": { transform: "translateY(-12px)" },
                },
                glow: {
                    "0%": { boxShadow: "0 0 20px -5px rgba(139, 92, 246, 0.4)" },
                    "100%": { boxShadow: "0 0 30px -5px rgba(139, 92, 246, 0.6)" },
                },
                gradient: {
                    "0%": { backgroundPosition: "0% 50%" },
                    "50%": { backgroundPosition: "100% 50%" },
                    "100%": { backgroundPosition: "0% 50%" },
                },
                bounceSubtle: {
                    "0%, 100%": { transform: "translateY(0)" },
                    "50%": { transform: "translateY(-4px)" },
                },
            },
            boxShadow: {
                "glow": "0 0 20px -5px rgba(139, 92, 246, 0.4)",
                "glow-lg": "0 0 40px -10px rgba(139, 92, 246, 0.5)",
                "glow-pink": "0 0 20px -5px rgba(236, 72, 153, 0.4)",
                "glow-pink-lg": "0 0 40px -10px rgba(236, 72, 153, 0.5)",
                "inner-glow": "inset 0 0 20px -5px rgba(139, 92, 246, 0.2)",
                "elevated": "0 8px 30px -12px rgba(0, 0, 0, 0.5), 0 4px 10px -6px rgba(0, 0, 0, 0.3)",
                "elevated-lg": "0 20px 50px -15px rgba(0, 0, 0, 0.6), 0 10px 20px -10px rgba(0, 0, 0, 0.4)",
                "card": "0 4px 20px -4px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.05)",
                "card-hover": "0 12px 40px -8px rgba(0, 0, 0, 0.5), 0 0 30px -10px rgba(139, 92, 246, 0.3)",
            },
            transitionTimingFunction: {
                "bounce-in": "cubic-bezier(0.68, -0.55, 0.265, 1.55)",
                "smooth-out": "cubic-bezier(0.16, 1, 0.3, 1)",
            },
            transitionDuration: {
                "400": "400ms",
                "600": "600ms",
            },
            scale: {
                "102": "1.02",
                "103": "1.03",
            },
            blur: {
                "xs": "2px",
                "4xl": "72px",
            },
            borderRadius: {
                "4xl": "2rem",
            },
            spacing: {
                "18": "4.5rem",
                "88": "22rem",
                "92": "23rem",
            },
        },
    },
    plugins: [],
};

export default config;
