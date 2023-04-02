import React from "react";
import { useEffect, useState } from "react";
import Controller from "../../components/Controller";
import Navbar from "../../components/Navbar";
import Todolist from "../../components/Todolist";

export default function Lab07() {
  const themes = {
    light: { name: "light", background: "#f8f8ff", foreground: "#353839" },
    dark: { name: "dark", background: "#353839", foreground: "#f8f8ff" },
  };

  const [selTheme, setSelTheme] = useState(themes.light);

  const toggleTheme = () => {
    if (selTheme.name === "dark") setSelTheme(themes.light);
    else setSelTheme(themes.dark);
  };

  const contentBar = {
    backgroundColor: selTheme.background,
    borderBottomLeftRadius: "16px",
    borderBottomRightRadius: "16px",
  };

  const [todos, setTodos] = useState([]);
  const [todoInput, setTodoInput] = useState(""); //input bar

  const deleteTodo = (idx) => {
    todos.splice(idx, 1);
    setTodos([...todos]);
  };

  const markTodo = (idx) => {
    todos[idx].mark = !todos[idx].mark;
    setTodos([...todos]);
  };

  const moveUp = (idx) => {
    if (idx === 0) return;
    [todos[idx], todos[idx - 1]] = [todos[idx - 1], todos[idx]];
    setTodos([...todos]);
  };

  const moveDown = (idx) => {
    if (idx === todos.length - 1) return;
    [todos[idx], todos[idx + 1]] = [todos[idx + 1], todos[idx]];
    setTodos([...todos]);
  };

  //to save
  const [init, setInit] = useState(true);
  useEffect(() => {
    //saving function
    const saveTodos = () => {
      const todoStr = JSON.stringify(todos);
      localStorage.setItem("todoListlab9", todoStr);
    };
    if (init) setInit(false);
    else saveTodos();
  }, [todos]);

  //to load
  useEffect(() => {
    const todoStr = localStorage.getItem("todoListlab9");
    if (!todoStr) setTodos([]);
    else setTodos(JSON.parse(todoStr));
  }, []);

  return (
    <div>
      <Navbar link="lab-07" />
      <div className="m-5 mt-0 py-4" style={contentBar}>
        {/* Entire App container (required for centering) */}
        <div style={{ maxWidth: "700px" }} className="mx-auto">
          {/* App header */}
          <p
            className="display-4 text-center fst-italic m-4"
            style={{ color: "#03bafc" }}
          >
            Minimal Todo List <span className="fst-normal">☑️</span>
          </p>

          <div className="d-flex justify-content-evenly gap-2">
            {/* Input */}
            <input
              onChange={(event) => setTodoInput(event.target.value)}
              value={todoInput}
              onKeyDown={(k) => {
                if (k.key !== "Enter") return;
                if (todoInput === "") alert("Todo cannot be empty");
                else {
                  setTodos([{ desc: todoInput, mark: false }, ...todos]);
                  setTodoInput("");
                }
              }}
              className="form-control fs-4"
              placeholder="insert todo here..."
            />
            <Controller
              key={selTheme.name}
              theme={selTheme}
              toggleTheme={toggleTheme}
            />
          </div>
          {/* Todos */}
          {todos.map((todo, i) => (
            <Todolist
              key={i + todo.color}
              desc={todo.desc}
              mark={todo.mark}
              onDelete={() => deleteTodo(i)}
              toMark={() => markTodo(i)}
              toMoveUp={() => moveUp(i)}
              toMoveDown={() => moveDown(i)}
              color={selTheme.foreground}
            />
          ))}
          {/* summary section */}
          <p className="text-center fs-4">
            <span className="text-primary">All ({todos.length}) </span>
            <span className="text-warning">
              Pending ({todos.filter((t) => !t.mark).length}){" "}
            </span>
            <span className="text-success">
              Completed ({todos.filter((t) => t.mark).length}){" "}
            </span>
          </p>
          {/* Made by section */}
          <p className="text-center mt-3 text-muted fst-italic">
            made by Nutthachai Singkaewvong 640610633
          </p>
        </div>
      </div>
    </div>
  );
}
