import http from "http"

const storage = new Map()

const server = http.createServer((req, res) => {
  switch (req.method) {
    case "GET": {
      if (!req.url) {
        res.statusCode = 400
        res.end("bad request\n")
        return
      }
      const key = decodeURIComponent(req.url.slice(1))
      if (storage.has(key)) {
        const { description, done } = storage.get(key)
        res.end(JSON.stringify({ title: key, description, done }))
      } else {
        res.end(JSON.stringify(Array.from(storage.keys())))
      }
      break
    }
    case "POST": {
      let body = ""
      req.on("data", (chunk) => {
        body += chunk
      })
      req.on("end", () => {
        const { key, value } = JSON.parse(body)
        storage.set(key, value)
        res.end("OK\n")
      })
      break
    }
    case "PUT": {
      let body = ""
      req.on("data", (chunk) => {
        body += chunk
      })
      req.on("end", () => {
        const {
          key,
          value: { description: newDescription, done: newDone },
        } = JSON.parse(body)
        if (storage.has(key)) {
          const { description: oldDescription, done: oldDone } =
            storage.get(key)
          storage.set(key, {
            description: newDescription ?? oldDescription,
            done: newDone ?? oldDone,
          })
          res.end("OK\n")
        } else {
          res.statusCode = 404
          res.end("key not found\n")
        }
      })
      break
    }
    case "DELETE": {
      if (!req.url) {
        res.statusCode = 400
        res.end("bad request\n")
        return
      }
      const key = decodeURIComponent(req.url.slice(1))
      if (storage.has(key)) {
        storage.delete(key)
        res.end("OK\n")
      } else {
        res.statusCode = 404
        res.end("key not found\n")
      }
      break
    }
    default:
      res.statusCode = 405
      res.end("unsupported method!\n")
  }
})

const port = 8008

server.listen(port, () => {
  console.log(`Server running on port ${port}`)
})
