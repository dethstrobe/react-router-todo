import type { Route } from "./+types/route"
import { type TodoCardProps, TodoCard } from "./todo"
import { TodoList } from "../todo/todo-list"
export { action } from "./todo"

export async function loader({ params }: Route.LoaderArgs) {
  const todoData: TodoCardProps | string[] = await fetch(
    `http://localhost:8008/${params.id ?? ""}`,
  ).then((res) => res.json())

  return todoData
}

export default ({ loaderData }: Route.ComponentProps) => {
  if (Array.isArray(loaderData)) {
    return (
      <>
        <h2>Todo List</h2>
        <p>Todo not found, try one of these instead</p>
        <TodoList todos={loaderData} />
      </>
    )
  }

  return <TodoCard {...loaderData} />
}
