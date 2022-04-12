import { useEffect, useState } from "react";
import "./App.scss";
import PostList from "./components/PostList";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";

function App() {
  const [todoList, setTodoList] = useState([
    { id: 1, title: "Todo" },
    { id: 2, title: "Todo List" },
    { id: 3, title: "Todo Item" },
  ]);

  const [postList, setPostList] = useState([]);

  useEffect(() => {
    async function fetchPostList() {
      //  ...
      try {
        const requestUrl =
          "http://js-post-api.herokuapp.com/api/posts?_limit=10&_page=1";
        const response = await fetch(requestUrl);
        const responseJSON = await response.json();

        const { data, pagination } = responseJSON;
        // console.log(data);
        // console.log(pagination);

        setPostList(data);
      } catch (error) {
        console.log("Fail", error.message);
      }
    }

    fetchPostList();
  }, []);

  // Handle Todo List Click
  function handleTodoClick(todo) {
    console.log(todo);
    const index = todoList.findIndex((x) => x.id === todo.id);
    if (index < 0) return;

    const newTodoList = [...todoList];
    newTodoList.splice(index, 1);
    setTodoList(newTodoList);
  }

  // Handle TodoList Submit
  function handleTodoFormSubmit(formValues) {
    // console.log(formValues);
    // add new todo to current todo list
    const newTodo = {
      id: +new Date(),
      ...formValues,
    };
    const newTodoList = [...todoList];
    newTodoList.push(newTodo);
    setTodoList(newTodoList);
  }

  return (
    <div className="App">
      <h1>ReactJS hook - Post List</h1>

      {/* <ColorBox /> */}
      {/* <TodoForm onSubmit={handleTodoFormSubmit} />
      <TodoList todos={todoList} onTodoClick={handleTodoClick} /> */}
      <PostList posts={postList} />
    </div>
  );
}

export default App;
