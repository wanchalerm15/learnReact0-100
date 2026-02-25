import { useState, useEffect } from "react";

// ใช้ Generics <T> เพื่อให้มันรับ Type อะไรก็ได้ (เหมือนใน Angular)
export function useFetch<T>(url: string) {
    const [data, setData] = useState<T | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            setError(""); // เคลียร์ error เก่าก่อนดึงใหม่
            try {
                const response = await fetch(url);
                if (!response.ok) throw new Error("เกิดข้อผิดพลาดในการดึงข้อมูล");
                const result = await response.json();
                setData(result);
            } catch (err: any) {
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [url]); // ถ้า url เปลี่ยน ให้ดึงข้อมูลใหม่ทันที

    // คืนค่าออกไปเป็น Object ให้คนอื่นเอาไปใช้ต่อ
    return { data, isLoading, error };
}