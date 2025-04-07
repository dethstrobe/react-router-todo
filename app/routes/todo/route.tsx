import { Link, Outlet } from "react-router"
import type { Route } from "./+types/route"
import { TodoList } from "./todo-list"

export async function loader() {
  const data: string[] = await fetch("http://localhost:8008").then((res) =>
    res.json(),
  )
  return data
}

export default ({ loaderData }: Route.ComponentProps) => {
  return (
    <main className="grid grid-rows-[5rem_1fr] grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 grid-flow-col gap-4 bg-gray-100 dark:bg-gray-900 h-full">
      <h1 className="text-xl font-semibold text-center col-span-full col-start-1 row-start-1 h-full flex items-center justify-center">
        A very simple TODO app
      </h1>

      <section className="row-span-full col-span-full col-start-2 row-start-2 p-4">
        <Outlet />
      </section>

      <section className="row-span-full col-start-1 row-start-2 p-4">
        <Link
          className="block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4"
          to="/todo/create"
          viewTransition
        >
          Create a new todo
        </Link>
        <h2 className="text-l font-semibold">List of todos</h2>
        <TodoList todos={loaderData} />
      </section>
    </main>
  )
}
