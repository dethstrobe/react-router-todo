import { Link } from "react-router"

interface TodoListProps {
  todos: string[]
}

export const TodoList = ({ todos }: TodoListProps) => {
  return (
    <ul className="list-inside flex flex-col gap-4">
      {todos.map((title) => (
        <li key={title} className="w-full">
          <Link
            className="block p-2 bg-blue-100 dark:bg-blue-800 w-full hover:bg-blue-300"
            to={`/todo/${title}`}
            viewTransition
          >
            {title}
          </Link>
        </li>
      ))}
    </ul>
  )
}
