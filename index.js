const express = require('express');
const app = express();
const conn = require('./db');
app.use(express.json());

function distKm(lat1, lon1, lat2, lon2) {
  const toRad = (val) => (val * Math.PI) / 180;
  const R = 6371;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

app.post('/addSchool', (req, res) => {
    console.log('Inserting into DB:', conn.config.database);
  const { name, address, latitude, longitude } = req.body;
  if (!name || !address || typeof latitude !== 'number' || typeof longitude !== 'number') {
    return res.status(400).json({ error: 'Invalid name, address, latitude, or longitude' });
  }

  const q = 'INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)';
  conn.query(q, [name, address, latitude, longitude], (err, result) => {
    if (err) {
      console.error('Insert error:', err);
      return res.status(500).json({ error: 'DB error' });
    }
    res.status(201).json({ message: 'Added', id: result.insertId });
  });
});

app.get('/listSchools', (req, res) => {
  const lat = parseFloat(req.query.latitude);
  const lon = parseFloat(req.query.longitude);

  if (isNaN(lat) || isNaN(lon)) {
    return res.status(400).json({ error: 'Invalid latitude or longitude' });
  }

  const q = 'SELECT * FROM schools';
  conn.query(q, (err, results) => {
    if (err) {
      console.error('Fetch error:', err);
      return res.status(500).json({ error: 'DB error' });
    }

    const data = results.map((s) => ({
      ...s,
      distance: distKm(lat, lon, s.latitude, s.longitude),
    }));

    data.sort((a, b) => a.distance - b.distance);
    res.json(data);
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Running on port ${PORT}`);
});
