// Query clues for N'Take
app.get('/clues/:nTakeId', (req, res) => {
    const nTakeId = req.params.nTakeId;
    const query = `
      SELECT clue1, clue2 
      FROM clues 
      WHERE n_take_user_id = ?
    `;
    db.query(query, [nTakeId], (err, results) => {
      if (err) throw err;
      if (results.length > 0) {
        res.status(200).json(results[0]);
      } else {
        res.status(404).json({ message: 'Clues not found' });
      }
    });
  });