import { useEffect, useState } from "react";

export interface User {
  id: number;
  name: string;
  email: string;
}

export default function UserList() {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    // 1. สร้างฟังก์ชัน async ข้างใน (เพราะ useEffect ห้ามเป็น async โดยตรง)
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/users",
        );
        if (response.status != 200) throw new Error("Error cannot get data");
        const data = await response.json();
        setUsers(data); // เก็บลง State
      } catch (error: any) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    // 2. เรียกใช้ฟังก์ชัน
    fetchData();
  }, []);

  // ถ้า Error ให้ return error UI ไปเลย จบฟังก์ชันตรงนี้
  if (error) {
    return <h4 style={{ color: "red" }}>{error}</h4>;
  }

  // ถ้า Loading ให้ return loading UI ไปเลย
  if (isLoading) {
    return <h4>Is Loading...</h4>;
  }

  // ถ้าผ่านมาถึงตรงนี้ แปลว่ามีข้อมูลพร้อมโชว์แล้ว
  return (
    <ul>
      {users.map((item) => (
        <li key={item.id}>
          {item.name} {item.email}
        </li>
      ))}
    </ul>
  );
}
