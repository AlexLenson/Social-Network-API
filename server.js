const express = require("express")
const db = require("./config/connection")
const routes = require("./routes")

const PORT = process.env.PORT || 8080

const app = express()
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(routes)

db.once("open", () => {
    console.log("database connected")
    app.listen(PORT, () => {
        console.log(`api server running on port ${PORT}`);
    })
})