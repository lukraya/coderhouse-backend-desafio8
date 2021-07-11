import express from 'express';
//const express = require('express');
const app = express();
const PORT = 8080;

import {Producto} from "./productosClase.js";
//const Producto = require("./productosClase");
  
app.use(express.json());
app.use(express.urlencoded());

let productos = [];

app.get('/productos', (req, res)=>{
    if (productos.length == 0) {
        res.send('{error: "no hay productos cargados"}')
    } else {
        res.send(productos)
    }
});
app.post('/productos', (req, res)=>{
    let toAdd = req.body;
    let prod = new Producto(toAdd.title, toAdd.price, toAdd.thumbnail, 1);
    productos.push(prod);
    res.send(prod)
});

app.get('/productos/:id', (req, res)=>{
    let id = parseInt(req.params.id);
    let prodId = productos.find(producto => {producto.id == id});
    res.send(prodId)
})

app.listen(PORT, (err) => {
    if (err) {console.log(err);}
    else {console.log("Server listening on PORT", PORT);}
});