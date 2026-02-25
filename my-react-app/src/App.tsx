import "./App.css";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import UserList from "./pages/UserList";
import { useContext } from "react";
import { ThemeContext } from "./ThemeContext";
import RegisterForm from "./pages/RegisterForm";

function App() {
    // เปิดก๊อกน้ำ! (ต้องเช็คด้วยว่ามีน้ำไหม)
    const themeContext = useContext(ThemeContext);
    if (!themeContext) return null; // กัน Error กรณีลืมหุ้ม Provider

    const { theme, toggleTheme } = themeContext;
    return (
        // เปลี่ยนสีพื้นหลัง และ สีตัวอักษร ตาม theme ปัจจุบัน
        <div
            style={{
                backgroundColor: theme === "dark" ? "#333" : "#fff",
                color: theme === "dark" ? "#fff" : "#000",
                minHeight: "100vh",
            }}
        >
            <BrowserRouter>
                {/* ส่วน Navbar (แสดงทุกหน้า) */}
                <nav
                    style={{
                        padding: 20,
                        borderBottom: "1px solid #ccc",
                        marginBottom: 20,
                    }}
                >
                    <Header />
                    <div
                        style={{
                            marginTop: 10,
                            display: "flex",
                            alignItems: "center",
                            gap: "10px",
                        }}
                    >
                        {/* ⚠️ สำคัญ: ใช้ Link แทน <a> เพื่อไม่ให้หน้าเว็บ Refresh */}
                        <Link to="/">🏠 Home</Link>
                        <Link to="/users">👥 User List</Link>
                        <Link to="/register">📝 Register</Link>
                        <button onClick={toggleTheme}>
                            Switch to {theme === "light" ? "Dark" : "Light"}{" "}
                            Mode
                        </button>
                    </div>
                </nav>

                {/* ส่วนเนื้อหาที่จะเปลี่ยนไปตาม URL */}
                <div style={{ padding: "0 20px" }}>
                    <Routes>
                        {/* path="/" คือหน้าแรก */}
                        <Route path="/" element={<Home />} />

                        {/* path="/users" คือหน้า UserList */}
                        <Route path="/users" element={<UserList />} />

                        {/* path="/users" คือหน้า UserList */}
                        <Route path="/register" element={<RegisterForm />} />

                        {/* แถม: ดัก 404 Not Found (เผื่อพิมพ์มั่ว) */}
                        <Route
                            path="*"
                            element={<h1>404 - Page Not Found</h1>}
                        />
                    </Routes>
                </div>
            </BrowserRouter>
        </div>
    );
}

export default App;
