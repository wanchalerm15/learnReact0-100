import { useEffect, useState } from "react";
import Header from "./Header";
import "./App.css";
import CounterControl from "./CounterControl";
import UserList from "./UserList";

// กำหนด Type ให้ชัดเจน (Best Practice)
interface TodoItem {
  id: number;
  text: string;
  completed: boolean;
}

const localKey: string = "myTodos";

function App() {
  const [count, setCount] = useState(0);
  const [newTodo, setNewTodo] = useState("");
  const [todos, setTodos] = useState<TodoItem[]>(() => {
    const saved = localStorage.getItem(localKey);
    if (saved) {
      return JSON.parse(saved); // ถ้าเคยเซฟไว้ ให้ใช้ของที่เซฟ
    }
    return []; // ถ้าไม่มี ให้เริ่มด้วยอาร์เรย์ว่าง
  });

  useEffect(() => {
    localStorage.setItem(localKey, JSON.stringify(todos));
  }, [todos]);

  const handleAddTodo = () => {
    if (!newTodo) return; // กันค่าว่าง

    const newItem: TodoItem = {
      id: Date.now(), // ใช้เวลาปัจจุบันเป็น ID ชั่วคราว (เพื่อให้ไม่ซ้ำ)
      text: newTodo,
      completed: false,
    };

    // ✅ ถูกต้อง: สร้าง Array ใหม่ โดยเอาของเก่า (...) มาต่อด้วยของใหม่
    setTodos([...todos, newItem]);

    // ล้างช่อง input
    setNewTodo("");
  };
  const handleDelete = (id: number) => {
    // กรองเอาเฉพาะตัวที่ id "ไม่เท่ากับ" id ที่ส่งมา
    const newTodos = todos.filter((todo) => todo.id !== id);
    setTodos(newTodos);
  };
  const toggleTodo = (id: number) => {
    setTodos(
      todos.map(
        (todo) =>
          todo.id === id
            ? { ...todo, completed: !todo.completed } // เจอตัวที่ใช่! copy ของเดิมมา แล้วแก้ค่า completed
            : todo, // ไม่ใช่ตัวที่หา ก็คืนค่าเดิมกลับไป
      ),
    );
  };
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

      <div>
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="เพิ่มงานใหม่..."
        />
        <button onClick={handleAddTodo}>Add</button>
      </div>

      <ul>
        {todos.map((item) => (
          <li key={item.id}>
            <label>
              <input
                type="checkbox"
                checked={item.completed}
                onChange={() => toggleTodo(item.id)}
              />
              <span
                style={{
                  display: "inline-block",
                  textDecoration: item.completed ? "line-through" : "none",
                  marginLeft: "3px",
                }}
              >
                {item.text}
              </span>
            </label>
            <button onClick={() => handleDelete(item.id)}>Delete</button>
          </li>
        ))}
      </ul>

      <UserList />
    </>
  );
}

export default App;
