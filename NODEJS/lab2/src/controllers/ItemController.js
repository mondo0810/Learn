const { format } = require('date-fns');
const Item = require('../models/item');

class ItemController {
    async create(req, res) {
        try {
            const item = await Item.create(req.body);
            res.status(201).json({ success: true, message: 'Item created successfully', data: item });
        } catch (err) {
            res.status(500).json({ success: false, message: err.message });
        }
    }

    async getAll(req, res) {
        try {
            const items = await Item.findAll({
                attributes: ['id', 'name', 'description', 'createdAt']
            });

            const formattedItems = items.map(item => ({
                id: item.id,
                name: item.name,
                description: item.description,
                createdAt: format(new Date(item.createdAt), 'MMMM do yyyy, h:mm:ss a')
            }));

            res.status(200).json({ success: true, message: 'Items retrieved successfully', data: formattedItems });
        } catch (err) {
            res.status(500).json({ success: false, message: err.message });
        }
    }

    async update(req, res) {
        try {
            const { id } = req.params;
            const [updated] = await Item.update(req.body, { where: { id } });
            if (updated) {
                const updatedItem = await Item.findOne({ where: { id } });
                res.status(200).json({ success: true, message: 'Item updated successfully', data: updatedItem });
            } else {
                res.status(404).json({ success: false, message: 'Item not found' });
            }
        } catch (err) {
            res.status(500).json({ success: false, message: err.message });
        }
    }

    async delete(req, res) {
        try {
            const { id } = req.params;
            const deleted = await Item.destroy({ where: { id } });
            if (deleted) {
                res.status(200).json({ success: true, message: 'Item deleted successfully' });
            } else {
                res.status(404).json({ success: false, message: 'Item not found' });
            }
        } catch (err) {
            res.status(500).json({ success: false, message: err.message });
        }
    }
}

module.exports = new ItemController();
