const express = require("express")
const app = express();
const morgan = require('morgan')
const bodyparser = require('body-parser')

const productRoutes = require("./api/routes/products")
const orderRoutes = require("./api/routes/order")

app.use(morgan('dev'))
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json())

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", '*')
    res.header("Access-Control-Allow-Headers", 'Origin, X-Requested-With, Content-Type, Accept, Authorization')
    if (req.method === "OPTIONS") {
        res.header('Access-Control-Allow-Method', 'PUT, POST, PATCH, DELETE, GET')
        return res.status(200).json({})
    }
})

app.use('/products', productRoutes)
app.use('/orders', orderRoutes)


app.use((req, res, next) => {
    const error = new Error("Not found");
    error.status = 404
    next(error)
})
app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    })
})


module.exports = app