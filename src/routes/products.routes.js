import { Router } from "express";
import { uploadImage } from "../middleware/upload.middleware.js";

const productsRouter = Router()

//POST products / create a product
productsRouter.post("/",uploadImage("productImage"), (req, res) => {
    try {
        console.log(req.body);
    
        res.status(201).json({
            image: req.body.productImage,
        });
    } catch (error) {
        console.log("atrapando el error")
        res.status(500).json(error)
    }
})

export {productsRouter}