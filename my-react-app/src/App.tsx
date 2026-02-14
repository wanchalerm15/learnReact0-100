import { useState } from "react";
import Header from "./Header";
import "./App.css";
import CounterControl from "./CounterControl";

function App() {
  const [count, setCount] = useState(0);
  const todos = [
    { id: 1, text: "เรียน React พื้นฐาน" },
    { id: 2, text: "ฝึกใช้ useState" },
    { id: 3, text: "สร้าง Component เอง" },
  ];

  return (
    <>
      <Header />
      <h1>Vite + React</h1>
      <p>count is {count}</p>
      <div className="card">
        <CounterControl
          onIncrease={() => setCount((c) => c + 1)}
          onDecrease={() => setCount((c) => c - 1)}
        />
      </div>
      <ul>
        {todos.map((item) => (
          <li key={item.id}>{item.text}</li>
        ))}
      </ul>
    </>
  );
}

export default App;
