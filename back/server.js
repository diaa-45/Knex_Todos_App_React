const express=require('express')
const app = express()
require('dotenv').config();
const authRouter=require('./router/authRouter');
const taskRouter=require('./router/taskRouter');
const bodyParser=require('body-parser')
const path =require('path')
const cors=require('cors')
const PORT = process.env.PORT || 4000
app.use(bodyParser.json())
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));
app.use(cors())

app.use('/api/auth', authRouter);
app.use('/api/tasks', taskRouter);



app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
  });
  
app.get('/register', (req, res) => {
res.sendFile(path.join(__dirname, 'views', 'register.html'));
});

app.get('/login', (req, res) => {
res.sendFile(path.join(__dirname, 'views', 'login.html'));
});




app.use('*',(req,res)=>{
    res.send("The route is not correct , plz  use a correct route  ");
})

app.listen(PORT,()=>{
    console.log(`Server is listening on PORT ${PORT} succesfully `);
})