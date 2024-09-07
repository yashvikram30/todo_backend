const express = require("express")
const app = express()
const port = 4000;

app.use(express.json());

let todos = [
    { id: 1, title: "Buy groceries", description: "Milk, bread, cheese", completed: false },
    { id: 2, title: "Do laundry", description: "Wash and fold clothes", completed: true },
];


app.get('/todos',function(req,res){
    res.status(200).json(todos);
})

app.get(`/todos/:id`,function(req,res){
    const todoID = parseInt(req.params.id)
    const todo = todos.find((todo) => todo.id === todoID)

    if(todo){
        res.status(200).json(todo)
    }else{
        res.status(404).json({error: "Todo item not found"});
    }
})

app.post('/todos', (req, res) => {
    // Destructuring to extract fields from the request body
    const { title, description, completed } = req.body;

    // Validate the presence of required fields
    if (!title || !description) {
        return res.status(400).json({ error: "Title and description are required" });
    }

    // Create a new ToDo item
    const newTodo = {
        id: todos.length + 1,
        title: title,
        description: description,
        completed: completed || false  // Default to false if not provided
    };

    // Add the new ToDo item to the list
    todos.push(newTodo);

    // Respond with the newly created ToDo item
    res.status(201).json(newTodo);
});

app.put('/todos/:id',(req,res)=>{
    const todoID = parseInt(req.params.id);
    const {title, description, completed} = req.body;

    const todo = todos.find((todo) => todo.id === todoID)
    if(!todo){
        res.status(404).send("Todo not found :(");
    }
    if(!title || !description){
        res.send(400).send("Title and description are essentially required!")
    }

    todo.title = title;
    todo.description = description;
    todo.completed = completed;

    res.status(200).json(todo);

})

app.delete('/todos/:id', (req,res)=>{
    const todoId = parseInt(req.params.id);
    const todo = ((todo) => todo.id === todoId);

    if(!todo){
        res.status(404).send("Todo not found :(")
    }

    todos.splice(todoId-1 ,1);
    res.status(200).json(todos);
})

app.listen(port,()=>{
    console.log("The port is running!")
});