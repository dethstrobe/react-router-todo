import { Link } from "react-router"

export default () => {
  return (
    <section>
      <h1>Index page</h1>
      <p>This goes all over the place</p>
      <nav>
        <ul>
          <li>
            <Link to="/home" viewTransition>
              Home
            </Link>
          </li>
          <li>
            <Link to="/todo" viewTransition>
              TODO
            </Link>
          </li>
        </ul>
      </nav>
    </section>
  )
}
