"use client";

import Image from "next/image";
import Navbar from "@/components/Navbar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState, useTransition } from "react";

export default function Home() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);

  const handleEdit = () => {};

  const handleDelete = () => {};

  const handleAdd = () => {
    setTodos([...todos, { todo, isCompleted: false }]);
  };

  const handleChange = (e) => {
    setTodo(e.target.value);
  };
  return (
    <div className="m-5">
      <Navbar />
      <h1 className="mt-9 mb-9">Add your To-Do's here:</h1>
      <div className="h-12 mt-9 mb-9 inline">
        <Input
          onChange={handleChange}
          value={todo}
          type="email"
          placeholder="Writ it down!"
          className="mt-4 mb-2"
        />
        <Button onClick={handleAdd}>Add</Button>
      </div>
      <div className="flex my-6">
        <h2>Your To-Do's</h2>
      </div>

      <div className="flex">
        <div className="text text-justify">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ad, earum
          modi? Dolorem!
        </div>
        <div className="flex gap-5 mx-5">
          <Button onClick={handleEdit} className="">
            edits
          </Button>
          <Button onClick={handleDelete} variant="destructive">
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
}
