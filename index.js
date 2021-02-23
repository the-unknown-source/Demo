const express = require('express');
const app = express();
const mongoose = require('mongoose');   
const moviesRouter = require('./routes/movies.js')
const validate = require('./validate.js');
const PORT = process.env.PORT || 3000;
// const DATABASE = process.env.DATABASE || 

mongoose.connect('mongodb://localhost/movies',{useNewUrlParser:true,useUnifiedTopology: true}
); 
const db = mongoose.connection;
db.on('error',error=>console.error(error));
db.once('open',()=>console.log('Connected to a database'));

app.use(express.static('public'));
app.use('/movies',moviesRouter);

// const lessons=[
//     {id:1,lesson:"lesson 1"},
//     {id:2,lesson:"lesson 2"},
//     {id:3,lesson:"lesson 3"}

// ]
// //GET METHOD
// app.get('/', (req, res)=>
//     res.send("Hello from the server!")
// );
// //GET METHOD
// app.get('/api/lessons',(req, res) => {
//     res.send(lessons);
// });
// //GET METHOD
// app.get('/api/lessons/:id',(req, res) => {
//     const lesson = lessons.find( l => l.id === parseInt(req.params.id));
//     if(!lesson) res.status(404).send("The lessson ID not found!");  
//     res.send(lesson);
// });
// //POST METHOD
// app.post('/api/lessons',(req,res)=>{    
//     validate(req,res);          
//     const lesson = {
//         id: lessons.length+1,           
//         lesson : req.body.lesson
//     };
//     lessons.push(lesson);   
//     res.send(lesson);
// })
// //PUT METHOD
// app.put('/api/lessons/:id',(req,res)=>{
//     const lesson = lessons.find( l => l.id === parseInt(req.params.id));
//     if(!lesson) res.status(404).send("The lessson ID not found!");  
//     validate(req,res);  
//     lesson.lesson = req.body.lesson;
//     res.send(lesson);
// })
// //DELETE METHOD
// app.delete('/api/lessons/:id',(req,res)=>{
//     const lesson = lessons.find( l => l.id === parseInt(req.params.id));
//     if(!lesson) res.status(404).send("The lesson ID was not found.");
//     const index = lessons.indexOf(lesson);
//     lessons.splice(index, 1);
//     res.send(lesson);   
// })
app.listen(PORT,()=>{
    console.log("listening to the port 3000")
});