import { Link } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";

export interface User {
    id: number;
    name: string;
    email: string;
}

export default function UserList() {
    // 🌟 เรียกใช้ Custom Hook แค่บรรทัดเดียว! 🌟
    // สังเกตการเปลี่ยนชื่อตัวแปร data เป็น users (Destructuring alias)
    const {
        data: users,
        isLoading,
        error,
    } = useFetch<User[]>("https://jsonplaceholder.typicode.com/users");

    // ถ้า Error ให้ return error UI ไปเลย จบฟังก์ชันตรงนี้
    if (error) {
        return <h4 style={{ color: "red" }}>{error}</h4>;
    }

    // ถ้า Loading ให้ return loading UI ไปเลย
    if (isLoading || users == null) {
        return <h4>Is Loading...</h4>;
    }

    // ถ้าผ่านมาถึงตรงนี้ แปลว่ามีข้อมูลพร้อมโชว์แล้ว
    return (
        <div>
            <Link to="/">⬅️ Back to Home</Link>
            <ul>
                {users.map((item) => (
                    <li key={item.id}>
                        {item.name} {item.email}
                    </li>
                ))}
            </ul>
        </div>
    );
}
