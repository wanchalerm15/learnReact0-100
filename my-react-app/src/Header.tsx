// src/Header.tsx
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";

// 1. สร้าง Function Component
function Header() {
  return (
    <div>
      <a href="https://vite.dev" target="_blank">
        <img src={viteLogo} className="logo" alt="Vite logo" />
      </a>
      <a href="https://react.dev" target="_blank">
        <img src={reactLogo} className="logo react" alt="React logo" />
      </a>
    </div>
  );
}

// 2. Export ออกไปให้คนอื่นใช้
export default Header;
