"use client";

import Navbar from "@/components/Navbar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
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
  //useEffect for loading LocalStorage: When the component mounts, we retrieve todos from localStorage and parse them if they exist. If not, the state defaults to an empty array (setTodos([]

  useEffect(() => {
    console.log("Updating localStorage with todos:", todos);
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);
  // useEffect for saving to LocalStorage:This runs every time the todos state changes, ensuring that localStorage is kept in sync with your todos. This is the key to ensuring that your changes are reflected in the storage.

  const saveToLocalStorage = (params) => {
    localStorage.setItem("todos", JSON.stringify(todos));
  };
  //Saving Notes in LocalStorage with "todos" key.

  // const deleteFromLocalStorage = () => {
  //   localStorage.removeItem("todos", JSON.stringify(todos)); //If you want to delete all the notes at once.
  // };

  const handleAdd = () => {
    if (!todo) {
      alert("Cannot add an empty note");
      return;
    }
    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }]);
    setTodo("");
    saveToLocalStorage();
    console.log("adding");
  };
  //This function adds the notes. it doesn't stores the empty notes and alerts the users. is uses uuidv4() function to generate id. After saving the notes it uses useState functions to clear the placeholder to empty again.

  const handleEdit = (e, id) => {
    let note = todos.filter((i) => i.id === id);
    setTodo(note[0].todo);
    let newTodos = todos.filter((item) => {
      return item.id !== id;
    });
    setTodos(newTodos);
    saveToLocalStorage();
  };
  //You want to edit a to-do item. First, you find the to-do item that matches the id you passed in. You set the to-do content (like text) in the state, so it can be shown in an input field for editing. You then filter out (temporarily remove) the old version of the to-do from the list. Finally, you update the to-do list to reflect that you're editing one item, so it’s no longer in the displayed list.

  const handleDelete = (e, id) => {
    let deleteIteam = confirm("Do you want to delete this item?");
    if (deleteIteam) {
      let newTodos = todos.filter((item) => {
        return item.id !== id;
      });
      setTodos(newTodos);
      console.log("deleting");
      saveToLocalStorage();
    } else {
      return;
    }
  };
  //You have a list of items (to-dos).When you call handleDelete, you want to delete one of those items based on its id.The filter function removes the item with the matching id from the list.After filtering, you update the state with the new list that no longer contains the deleted item.

  const handleChange = (e) => {
    setTodo(e.target.value);
  };
  // this function keeps the component's state (represented by todo) in sync with the user's input. As the user changes the value in the input field, the handleChange function captures the new value and updates the state using setTodo. This updated state can then be used to display the current input value or perform other actions based on the user's input.

  const handleCheckbox = (e) => {
    let id = e.target.name;
    let index = todos.findIndex((item) => {
      return item.id === id;
    });
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos);
    saveToLocalStorage();
  };
  //this function handles checkbox clicks in a to-do list. It identifies the clicked checkbox's corresponding to-do item, toggles its completion status (isCompleted), and updates both the application state and potentially local storage.

  const togglefinished = (e) => {
    setshowFinished(!showFinished);
  };
  //This toggles finished and unfinished notes.

  return (
    <div className=" m-auto w-full sm:w-2/3 justify-center  ">
      <Navbar />
      <h1 className="mt-9  mb-9 sm:text-4xl text-yellow-200">Add Here: 👇🏻</h1>
      <div className="h-12 mt-9 mb-9 inline ">
        <Input
          onChange={handleChange}
          value={todo}
          type="Text"
          placeholder="Writ it down!✍🏻"
          className="mt-4 mb-2 font-bold h-14 w-[375px] sm:w-[900px]"
        />
        <Button onClick={handleAdd}>Add</Button>
      </div>

      <div className="text-yellow-200">
        <input
          onChange={togglefinished}
          type="checkbox"
          checked={showFinished}
          className="inline-block h-8 w-8 translate-y-3 accent-yellow-400 rounded-full cursor-pointer mr-5 sm:text-3xl text-xs "
        />{" "}
        Finished Tasks
      </div>

      <div className="flex my-6 ">
        <h2 className="text-base sm:text-4xl">Your To-Do&apos;s: 📝</h2>
      </div>
      {todos.length === 0 && (
        <div className="mt-28  text-center sm:max-w-[410px] text-sm sm:text-3xl antialiased">
          {" "}
          You haven&apos;t made any note!🤷
        </div>
      )}
      {todos.map((item) => {
        return (
          (showFinished || !item.isCompleted) && (
            <div className="flex " key={item.id}>
              <div className="flex sm:m-2 p-3 w-4/5 gap-6 text-justify ">
                <input
                  name={item.id}
                  onChange={handleCheckbox}
                  value={item.isCompleted}
                  type="checkbox"
                  id=""
                  className="sm:h-8 sm:w-8  accent-yellow-400 cursor-pointer "
                />
                <div className={item.isCompleted ? "line-through" : "w-[375px] sm:w-screen text-yellow-200 hyphens-auto"}>
                  {item.todo}
                </div>
              </div>

              <div className="flex  sm:gap-5 translate-y-2">
                <Button
                  onClick={(e) => {
                    handleEdit(e, item.id);
                  }}
                  className="h-1 w-1 sm:h-16 sm:w-16 text-3xl sm:text-3xl"
                  variant="ghost"
                >
                  🔪
                </Button>
                <Button
                  onClick={(e) => {
                    handleDelete(e, item.id);
                  }}
                  variant="ghost"
                  className="h-1 w-1 sm:h-16 sm:w-16 text-3xl sm:text-3xl"
                >
                  🗑️
                </Button>
              </div>
            </div>
          )
        );
      })}
    </div>
  );
}
