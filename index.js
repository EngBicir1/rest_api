const express = require('express');
const app = express();

app.get('/',(req,res)=>{
    res.send('hellow express');
});
 
const products =[
    {
        id:1,
        name:'Orage',
        price:20,
    },
    {
        id:2,
        name:'Apple',
        price:30,
    }
]
app.get("/products", (req,res)=>{
    res.json(products);
})



app.listen(3000,()=> console.log('server is running at http://localhost:3000'));