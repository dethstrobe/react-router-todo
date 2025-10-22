import { Form, redirect } from "react-router"
import type { Route } from "../+types/root"

export async function action({ request }: Route.ActionArgs) {
  const data = await request.formData()
  const body = JSON.stringify({
    key: data.get("title"),
    value: { description: data.get("description"), done: false },
  })

  const res = await fetch("http://localhost:8008", {
    method: "POST",
    body,
  })

  if (res.ok) {
    return redirect(`/todo/${data.get("title")}`)
  }
  return new Response("Failed to add todo", { status: 500 })
}

export default () => {
  return (
    <section>
      <h2 id="form-title" className="text-l font-semibold">
        Add a todo
      </h2>
      <Form
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        method="post"
        action="/todo/create"
        aria-labelledby="form-title"
      >
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="title"
        >
          Task Name
        </label>
        <input
          id="title"
          name="title"
          className="text-black shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="text"
          placeholder="Name of task"
        />
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="description"
        >
          Description
        </label>
        <textarea
          id="description"
          name="description"
          className="text-black shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="Give more details about the task."
        />
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
        >
          Add
        </button>
      </Form>
    </section>
  )
}
