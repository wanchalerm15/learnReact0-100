import { createContext, useEffect, useState, type ReactNode } from "react";

// 1. กำหนดรูปร่างหน้าตาของข้อมูลในท่อ
type ThemeType = "light" | "dark";
interface ThemeContextType {
    theme: ThemeType;
    toggleTheme: () => void;
}

const THEME_STORE = "rex-theme";

// 2. สร้างท่อน้ำ (ให้ค่าเริ่มต้นเป็น undefined ไปก่อน)
export const ThemeContext = createContext<ThemeContextType | undefined>(
    undefined,
);

// 3. สร้าง Component ที่ทำหน้าที่เป็น "ปั๊มน้ำ" (Provider)
export function ThemeProvider({ children }: { children: ReactNode }) {
    const [theme, setTheme] = useState<ThemeType>(
        (localStorage.getItem(THEME_STORE) as any) || "light",
    );

    const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
    };

    useEffect(() => {
        localStorage.setItem(THEME_STORE, theme);
    }, [theme]);

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {/* children คือ Component ย่อยๆ ที่อยู่ข้างใน จะได้รับน้ำจากท่อนี้ทั้งหมด */}
            {children}
        </ThemeContext.Provider>
    );
}
