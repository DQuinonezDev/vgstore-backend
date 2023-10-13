const { response, request } = require('express');

const Product = require('../Models/product');
const Cart = require('../Models/buycart');

const getCart = async (req = request, res = response) => {
    const userId = req.user.id;
    try {
        const cart = await Cart.findOne({ user: userId }).populate('products.product' , 'name price');
        if (!cart) {
            return res.status(404).json({ message: 'Cart no exists' });
        }
        res.json(cart);
    } catch (error) {
        res.status(500).json({ message: 'Error ', error });
    }
};

const postCart = async (req, res) => {
    const userId = req.user.id; 

    try {
        const { productId, quantity } = req.body;
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: 'product no exists' });
        }

        if (product.stock < quantity) {
            return res.status(400).json({ message: 'No sufficent Stock' });
        }

        let cart = await Cart.findOne({ user: userId });
        if (!cart) {
            cart = new Cart({ user: userId, products: [] });
        }

        const existingProductIndex = cart.products.findIndex((item) =>
            item.product.equals(productId)
        );
        if (existingProductIndex !== -1) {
            cart.products[existingProductIndex].quantity += quantity;
            cart.products[existingProductIndex].subtotal = product.price * cart.products[existingProductIndex].quantity;
        } else {
            cart.products.push({ product: productId, quantity, subtotal: product.price * quantity });
        }

        cart.total = cart.products.reduce((total, item) => total + item.subtotal, 0);

        product.stock -= quantity;
        await product.save();
        await cart.save();
        res.json(cart);
    } catch (error) {
        res.status(500).json({ message: 'Error ', error });
    }
};

const deleteCart = async (req, res) => {
    try {
        const userId = req.user.id; 
        const { productId } = req.params;

        const cart = await Cart.findOne({ user: userId });
        if (!cart) {
            return res.status(404).json({ message: 'Carrito no encontrado' });
        }

        const productIndex = cart.products.findIndex(
            (item) => item.product.equals(productId)
        );

        if (productIndex !== -1) {
            const productInCart = cart.products[productIndex];

            const product = await Product.findById(productId);
            const productPrice = product.price;

            // Disminuye la cantidad en 1
            productInCart.quantity -= 1;

            // Calcula el subtotal del producto
            productInCart.subtotal = productPrice * productInCart.quantity;

            if (productInCart.quantity === 0) {
                cart.products.splice(productIndex, 1);
            }

            cart.total = cart.products.reduce((total, item) => total + item.subtotal, 0);

            product.stock += 1; 

            await product.save();
            await cart.save();
            res.json(cart);
        } else {
            res.status(404).json({ message: 'Producto no encontrado en el carrito' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar del carrito', error });
    }
};

module.exports = {
    getCart,
    postCart,
    deleteCart
};
