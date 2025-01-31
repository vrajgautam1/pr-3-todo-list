const express = require("express")
const path = require("path")
const app = express()

let taskList = []
app.use(express.urlencoded({extended:true}))
app.set('view engine', 'ejs');
app.set('views', 'views')

app.use(express.static(path.join(__dirname, "public")))
app.get("/", (req, res)=>{
    res.render("index", {taskList})
})

app.get("/delete/:id", (req, res)=>{
    const {id} = req.params
    taskList = taskList.filter((task)=>{
        return task.id !== id
    })
    return res.redirect("/")
})

app.get("/edit/:id", (req, res)=>{
    const{id} = req.params
    const taskToEdit = taskList.find((task)=>{
        return task.id === id
    })
    return res.render("edit", {taskToEdit})
})

app.get("/complete/:id",(req, res)=>{
    const{id} = req.params;
    let completedTask = taskList.find((task)=>{
        return task.id === id
    })
    completedTask.status = "Completed";
    res.redirect("/")
})

app.post("/edit", (req, res)=>{
    let editedTask = req.body
    taskList = taskList.map((task)=>{
        if(task.id === editedTask.id){
            return editedTask
        }else{
            return task
        }
    })
    res.redirect("/")
})

app.post("/", (req, res)=>{
    let task = req.body
    task.status = "pending"
    taskList.push(task)
    return res.redirect("/")
})

app.listen(8081, ()=>{
    console.log("server has started on:");
    console.log("http://localhost:"+8081)
})