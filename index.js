const express = require('express'); // import express
const app = express(); // create express app
const joi = require('joi'); //using for validation
const { v4: uuidv4 } = require('uuid'); // using for unique id


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
app.use(express.json()); // to use req.body

app.post("/api/products",(req,res)=>{

    const {error} = validation(req.body);

    if(error){
        res.status(400).json({
            message: error.details[0].message
        })
    }

    const product = { 
        id: uuidv4(),
        name: req.body.name,
        price: req.body.price,
    };
    products.push(product);
    return res.json(product);
});



// Update Specific product data (Using Put Method)
app.put("/api/products/:id",(req,res)=>{

    const {error} = validation(req.body);
    if(error){
        res.status(400).json({
            message: error.details[0].message
        })
    };

    const index = products.findIndex(prod => prod.id === req.params.id);
    if(index === -1){
        return res.status(404).json({
            message: 'Product is not found with this id'
        });
    }

    products[index].name = req.body.name;
    products[index].price = req.body.price;
    
    return res.json({
        product : products[index]
    });


});


// validation schema
function validation(body){
        const schema = joi.object({
            name: joi.string().min(3).max(20).required(),
            price: joi.number().required(),
        })

        return schema.validate(body);
}

// Update Specific product data (Using PATCH Method)

app.patch("/api/products/:id",(req,res)=>{
    const index = products.findIndex(prod => prod.id === req.params.id);
    if(index === -1){
        return res.status(404).json({
            message: 'Product is not found with this id'
        });
    }

    let UpdatedProduct = {
        ...products[index],
        ...req.body
    }
    products[index] = UpdatedProduct;
    return res.json(UpdatedProduct);
    // {name: 'apple', price: 200}
})



// Delete Specific product data

app.delete("/api/products/:id",(req,res)=>{
    const product = products.find(prod => prod.id === req.params.id);
    if(!product){
        return res.status(404).json({
            message: 'Product is not found with this id'
        });
    }
    
    const index = products.findIndex(prod => prod.id === req.params.id); 
    products.splice(index,1);
    return res.json(product);
    
});



// Delete all products



app.listen(3000,()=> console.log('server is running at http://localhost:3000'));