import { Form, redirect, useFetcher } from "react-router"
import type { Route } from "../+types/home"

export interface TodoCardProps {
  title: string
  description: string
  done: boolean
}

export async function action({ request }: Route.ActionArgs) {
  if (request.method === "POST") {
    let data = await request.formData()
    let body = JSON.stringify({
      key: data.get("title"),
      value: { done: data.get("done") === "true" },
    })

    return fetch(`http://localhost:8008/`, {
      method: "PUT",
      body,
    })
  } else if (request.method === "DELETE") {
    const url = new URL(request.url)
    const title = url.pathname.split("/").pop()

    await fetch(`http://localhost:8008/${title}`, {
      method: "DELETE",
    })
    return redirect("/todo")
  }
}

export const TodoCard = ({
  title,
  description,
  done = false,
}: TodoCardProps) => {
  const fetcher = useFetcher()
  return (
    <article className="w-full rounded overflow-hidden shadow-lg p-4 bg-white dark:bg-gray-800">
      <h1 className="text-xl font-semibold">{title}</h1>
      <p className="my-4">{description}</p>
      <footer className="flex justify-between">
        <fetcher.Form
          className="flex justify-between"
          method="put"
          action={`/todo/${title}`}
        >
          <label className="relative flex justify-between items-center group p-2 text-xl">
            Done?
            <input
              name="done"
              value={done.toString()}
              type="checkbox"
              className="absolute left-1/2 -translate-x-1/2 w-full h-full peer appearance-none rounded-md"
              checked={done}
              onChange={(e) => {
                const { form } = e.target
                const doneElement = form?.elements.namedItem("done")
                if (doneElement instanceof HTMLElement) {
                  doneElement.setAttribute("value", (!done).toString())
                }
                fetcher.submit(form)
              }}
            />
            <span className="w-16 h-10 flex items-center flex-shrink-0 ml-4 p-1 bg-gray-300 rounded-full duration-300 ease-in-out peer-checked:bg-green-400 after:w-8 after:h-8 after:bg-white after:rounded-full after:shadow-md after:duration-300 peer-checked:after:translate-x-6 group-hover:after:translate-x-1"></span>
          </label>

          <input type="hidden" name="title" value={title} />
        </fetcher.Form>

        <Form
          className="flex justify-between"
          method="delete"
          action={`/todo/${title}`}
        >
          <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
            Delete
          </button>
        </Form>
      </footer>
    </article>
  )
}
