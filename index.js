const express = require('express');
const app = express();

const { v4: uuidv4 } = require('uuid');


app.get('/',(req,res)=>{
    res.send('hellow express');
});
 
const products =[
    {
        id:'1',
        name:'Orage',
        price:20,
    },
    {
        id:'2',
        name:'Apple',
        price:30,
    }
]

// Show list of products
app.get("/api/products", (req,res)=>{
    res.json(products);
})

// Show Specific product by id
app.get("/api/products/:id", (req,res)=>{
    const {id} = req.params;
    const product = products.find(prod => prod.id === id);

    if(!product){
        return res.status(404).json({
            Error:'Product not found'
        });
    }
    return res.json(product);
});

// insert A product Data
app.use(express.json());

app.post("/api/products",(req,res)=>{

    const product = {
        id: uuidv4(),
        name: req.body.name,
        price: req.body.price,
    };
    products.push(product);
    return res.json(product);
});



// Update Specific product data (Using Put Method)
// Update Specific product data (Using PATCH Method)
// Delete Specific product data


app.listen(3000,()=> console.log('server is running at http://localhost:3000'));