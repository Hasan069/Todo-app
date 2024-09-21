"use client";

import Image from "next/image";
import Navbar from "@/components/Navbar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

export default function Home() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [showFinished, setshowFinished] = useState(true);

  useEffect(() => {
    let todoString = localStorage.getItem("todos");
    if (todoString) {
      let todos = JSON.parse(localStorage.getItem("todos"));
      setTodos(todos);
    }
  }, []);



  useEffect(() => {
    console.log("Updating localStorage with todos:", todos); // Debug log
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const saveToLocalServer = (params) => {
    localStorage.setItem("todos", JSON.stringify(todos));
  };

  // const deleteFromLocalServer = () => {
  //   localStorage.removeItem("todos", JSON.stringify(todos));
  // };

  const handleAdd = () => {
    if (!todo) {
      alert("Cannot add an empty note");
      return;
    }
    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }]);
    setTodo("");
    saveToLocalServer();
    console.log("adding");
  };

  const handleEdit = (e, id) => {
    let note = todos.filter((i) => i.id === id);
    setTodo(note[0].todo);
    let newTodos = todos.filter((item) => {
      return item.id !== id;
    });
    setTodos(newTodos);
    saveToLocalServer();
  };

  const handleDelete = (e, id) => {
    confirm("Do you want to delete this item?");
    let newTodos = todos.filter((item) => {
      return item.id !== id;
    });
    setTodos(newTodos);
    console.log("deleting");
    saveToLocalServer();
  };

  const handleChange = (e) => {
    setTodo(e.target.value);
  };

  const handleCheckbox = (e) => {
    let id = e.target.name;
    let index = todos.findIndex((item) => {
      return item.id === id;
    });
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos);
    saveToLocalServer();
  };

  const togglefinished = () => {};

  return (
    <div className="m-5">
      <Navbar />
      <h1 className="mt-9 mb-9">Add your To-Do's here:</h1>
      <div className="h-12 mt-9 mb-9 inline">
        <Input
          onChange={handleChange}
          value={todo}
          type="Text"
          placeholder="Writ it down!"
          className="mt-4 mb-2"
        />
        <Button onClick={handleAdd}>Add</Button>
      </div>
      <div className="flex my-6 ">
        <h2>Your To-Do's</h2>
      </div>
      {todos.length === 0 && (
        <div className="mt-5 text-3xl"> You haven't made any note!</div>
      )}
      {todos.map((item) => {
        return (
          <div className="flex" key={item.id}>
            <div className="flex m-2 p-3 my-2 w-4/5 gap-6 text-justify ">
              <input
                name={item.id}
                onChange={handleCheckbox}
                value={item.isCompleted}
                type="checkbox"
                id=""
                className=" min-h-8 min-w-8  accent-black cursor-pointer "
              />
              <div className={item.isCompleted ? "line-through" : ""}>
                {item.todo}
              </div>
            </div>

            <div className="flex gap-5 mx-5 ">
              <Button
                onClick={(e) => {
                  handleEdit(e, item.id);
                }}
                className=""
              >
                edits
              </Button>
              <Button
                onClick={(e) => {
                  handleDelete(e, item.id);
                }}
                variant="destructive"
              >
                Delete
              </Button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
