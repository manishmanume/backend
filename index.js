const express = require('express')
const cors = require('cors')
const mysql = require('mysql')
const app = express()

app.use(express.json())
app.use(cors())


app.listen(3000,()=>{
    console.log('Server is running on port')
})

const db = mysql.createConnection({
    user:"root",
    host:"localhost",
    password:"1234",
    database:"planthub"
})

db.connect(err => {
  if (err) console.log("not Connected")
  else console.log("connected")
})


app.post('/regist', (req,resp)=>{
  const sentEmail =req.body.email
  const sentUsernae =req.body.username
  const sentPassword =req.body.password

  const SQL ='INSERT INTO users(email,username,password) VALUES(?, ?, ?)'
  const VALUES =[sentEmail,sentUsernae,sentPassword]

  db.query(SQL,VALUES, (err,result)=>{
    if(err){
      resp.send(err)
    }else{
      console.log('user created successfully')
      resp.send({message:'User added!'})
    }
  })
})

app.post('/login',(req,res)=>{
  const sentLoginemail =req.body.email
  const sentLoginPassword =req.body.password

  const SQL ='SELECT * FROM users WHERE username=? && password=? '
  const VALUES =[sentLoginemail,sentLoginPassword]

  db.query(SQL,VALUES, (err,result)=>{
    if(err){
      res.send({error:err})
    }
    if(result.length>0){
      res.send(result)
    }
    else{
      res.send({message:'Credentials Do not match!'})
    }
  })
})

