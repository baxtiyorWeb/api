const express = require('express')
const router = express.Router();

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: "Handling GET requests to /products"
    })
})
router.post('/', (req, res, next) => {
    const product = {
        name: req.body.productid,
        price: req.body.price 
    }
    res.status(201).json({
        message: "Handling GET requests to /products",
        createdProduct: product
    })
})

router.get('/:productsid', (req, res, next) => {
    const id = req.param.productid;
    if (id === 'special') {
        res.status(200).json({
            message: "Your Discovered the special ID",
            id: id,
        })
    } else {
        res.status(200).json({
            message: "You passed an ID"

        })
    }
})
router.patch('/:productsid', (req, res, next) => {
    const id = req.param.productid;
    res.status(200).json({
        message: "Update Product",
        id: id,
    })
})
router.delete('/:productsid', (req, res, next) => {
    const id = req.param.productid;
    res.status(200).json({
        message: "Deleted Product",
        id: id,
    })
})

module.exports = router