import express, { json } from "express"
import fetch from "node-fetch"
import cors from "cors"

const app = express()

app.use(cors())
app.get("/", (req, res) => {
  res.send("hello worlds")
})

app.get("*", async (req, res) => {
  const finalPath = req.path
  if (finalPath === "" || finalPath === "/") return res.json({})
  try {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com${finalPath}`
    )
    const data = await response.json()
    res.set("x-codedamn-project", "jsonproxyholder")
    res.json(data)
  } catch (err) {
    res.json({
      status: "error ",
      err: "Error proxying to jsonplaceholder",
    })
  }
})

app.listen(4000, () => {
  console.log(`listening on http://localhost:${4000}`)
})
