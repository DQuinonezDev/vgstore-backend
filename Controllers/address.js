const { response, request } = require('express');
const Address = require("../Models/address");
const User = require('../Models/User');

const postAdress = async (req, res) => {
    try {
        const userId = req.user.id;
        const { street, reference, municipality, country, additionalInfo, phone } = req.body;

        // Crea una instancia de Address
        const newAddress = new Address({
            user: userId,
            street,
            reference,
            municipality,
            country,
            additionalInfo,
            phone,
        });

        // Guarda la dirección en la base de datos
        await newAddress.save();

        // Carga el usuario desde la base de datos
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        // Asocia la dirección con el usuario
        user.shippingAddress = newAddress._id;

        // Guarda los cambios en el usuario
        await user.save();

        res.status(201).json(newAddress);
    } catch (error) {
        console.error('Error al crear la dirección:', error);
        res.status(500).json({ message: 'Error al crear la dirección', error });
    }
};

const getAddressByUser = async (req, res) => {
    try {
        const userId = req.user.id; // Puedes obtener el ID del usuario desde el token o la sesión
        const addresses = await Address.find({ user: userId });

        res.json({ addresses });
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener las direcciones del usuario', error });
    }
};

const getAddressById = async (req, res) => {
    const { id } = req.params;
    try {
        const address = await Address.findById(id);
        if (!address) {
            return res.status(404).json({ message: 'Dirección no encontrada' });
        }

        res.json(address);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener la dirección', error });
    }
};

const updateAddress = async (req, res) => {
    const { id } = req.params;
    try {
        const updatedAddress = await Address.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedAddress) {
            return res.status(404).json({ message: 'Dirección no encontrada' });
        }

        res.json(updatedAddress);
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar la dirección', error });
    }
};

const deleteAddress = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedAddress = await Address.findByIdAndDelete(id);
        if (!deletedAddress) {
            return res.status(404).json({ message: 'Dirección no encontrada' });
        }

        res.json(deletedAddress);
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar la dirección', error });
    }
};

module.exports = {
    postAdress,
    getAddressByUser,
    getAddressById,
    updateAddress,
    deleteAddress,
};
