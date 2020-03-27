const database = require('../database');

module.exports = {
  async create(req, res) {
    const { id } = req.body;

    const ong = await database('ongs')
      .where('id', id)
      .first();

    if (!ong) {
      return res.status(400).json({ error: 'no ONG found with this ID' });
    }

    return res.json(ong);
  }
};
