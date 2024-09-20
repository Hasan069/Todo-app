"use client";

import Image from "next/image";
import Navbar from "@/components/Navbar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useState, useTransition } from "react";
import { v4 as uuidv4 } from "uuid";
import { ReceiptEuro } from "lucide-react";

export default function Home() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);

  const handleEdit = () => {};

  const handleDelete = () => {};

  const handleAdd = () => {
    if (!todo) {
      return;
    }
    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }]);
    setTodo("");
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
  };
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
      {todos.map((item) => {
        return (
          <div
            key={item.id}
            className="flex m-2 p-3 my-2 w-4/5 justify-between "
          >
            <input
              name={item.id}
              onChange={handleCheckbox}
              value={item.isCompleted}
              type="checkbox"
              id=""
              className=" h-8 w-8  accent-black cursor-pointer"
            />
            <div className={item.isCompleted ? "line-through" : ""}>
              {item.todo}
            </div>
            <div className="flex gap-5 mx-5 ">
              <Button onClick={handleEdit} className="">
                edits
              </Button>
              <Button onClick={handleDelete} variant="destructive">
                Delete
              </Button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
