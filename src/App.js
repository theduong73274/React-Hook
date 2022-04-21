import { useEffect, useState } from "react";
import "./App.scss";
import Pagination from "./components/Pagination";
import queryString from "query-string";
import PostList from "./components/PostList";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import PostFiltersForm from "./components/PostFiltersForm";

function App() {
  const [todoList, setTodoList] = useState([
    { id: 1, title: "Todo" },
    { id: 2, title: "Todo List" },
    { id: 3, title: "Todo Item" },
  ]);

  const [postList, setPostList] = useState([]);
  const [pagination, setPagination] = useState({
    _page: 1,
    _limit: 10,
    _totalRows: 1,
  });

  const [filters, setFilters] = useState({
    _limit: 10,
    _page: 1,
  });

  useEffect(() => {
    async function fetchPostList() {
      //  ...
      try {
        // _limit=10&_page=1
        // code space text
        const paramsString = queryString.stringify(filters);
        const requestUrl = `http://js-post-api.herokuapp.com/api/posts?${paramsString}`;
        const response = await fetch(requestUrl);
        const responseJSON = await response.json();

        const { data, pagination } = responseJSON;
        // console.log(data);
        // console.log(pagination);

        setPostList(data);
        setPagination(pagination);
      } catch (error) {
        console.log("Fail", error.message);
      }
    }

    fetchPostList();
  }, [filters]);

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

  function handlePageChange(newPage) {
    console.log("New page: " + newPage);
    setFilters({
      ...filters,
      _page: newPage,
    });
  }

  function handleFiltersChange(newFilters) {
    console.log(newFilters);
    setFilters({
      ...filters,
      _page: 1,
      title_like: newFilters.searchTerm,
    });
  }

  return (
    <div className="App">
      <h1>ReactJS hook - Post List</h1>

      {/* <ColorBox /> */}
      {/* <TodoForm onSubmit={handleTodoFormSubmit} />
      <TodoList todos={todoList} onTodoClick={handleTodoClick} /> */}

      <PostFiltersForm onSubmit={handleFiltersChange} />
      <PostList posts={postList} />
      <Pagination pagination={pagination} onPageChange={handlePageChange} />
    </div>
  );
}

export default App;
