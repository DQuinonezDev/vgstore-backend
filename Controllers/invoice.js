const Invoice = require('../Models/Invoice');
const Cart = require('../Models/buycart');

const getUserInvoices = async (req, res) => {
    const userId = req.user.id;

    const invoices = await Invoice.find({ user: userId }).sort({ createdAt: -1 });
    res.json({
        invoices
    });
};

const getLastInvoice = async (req, res) => {
    try {
        const userId = req.user.id;
        const invoices = await Invoice.find({ user: userId }).sort({ createdAt: -1 });

        if (invoices.length === 0) {
            return res.status(404).json({ message: 'User Has not Invoices' });
        }
        const lastInvoice = invoices[0];
        res.json(lastInvoice);
    } catch (error) {
        res.status(500).json({ message: 'Error', error });
    }
};

const getAllInvoices = async (req, res) => {
    try {
        const invoices = await Invoice.find().sort({ createdAt: -1 });

        res.json(invoices);
    } catch (error) {
        res.status(500).json({ message: 'Error al listar todas las facturas', error });
    }
};

const postInvoice = async (req, res) => {
    try {
        const userId = req.user.id; 
        const cart = await Cart.findOne({ user: userId }).populate('products.product');
        if (!cart) {
            return res.status(404).json({ message: 'Carrito no encontrado' });
        }

        const invoice = new Invoice({
            user: userId,
            products: cart.products,
            total: cart.total,
        });

        await invoice.save();

        cart.products = [];
        cart.total = 0;
        await cart.save();

        res.json(invoice);
    } catch (error) {
        res.status(500).json({ message: 'Error al crear la factura', error });
    }
};


module.exports = {
    getUserInvoices,
    getLastInvoice,
    getAllInvoices,
    postInvoice
}