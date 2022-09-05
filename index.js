const { projects } = require("./fakeProjects")
const { user } = require("./fakeUser")

const
   express = require("express"),
   app = express(),
   swaggerUi = require('swagger-ui-express'),
   swaggerFile = require('./swagger_output.json')

app.use(require("cors")())
app.use(express.json())


app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile))


app.get("/api/user", (req, res) => res.send(user))

app.get("/api/all-projects", (req, res) => res.send(projects))

app.get("/api/project/:id", (req, res) => {
   const { id } = req.params
   console.log("get project by id ", id);
   const found = projects.find(p => p._id === id)
   res.send(found)
})

app.post("/api/project", (req, res) => {
   const { body } = req
   console.log("add new project", body);
   body._id = `${Math.random()}`
   projects.push(body)
   res.send(projects)
})

app.put("/api/project/:id", (req, res) => {
   const { body, params: { id } } = req
   console.log("update project by id", id, body);
   const found = projects.find(p => p._id === id)

   if (!found)
      return res.status(404).send("not Found")

   Object.keys(body).forEach(key => {
      found[key] = body[key]
   })

   res.send(found)
})


app.listen(3210, () => console.log("server runing on 3210 port"))