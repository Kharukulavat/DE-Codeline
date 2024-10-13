// Send message from N'Take to P'Take or vice versa
app.post('/message', (req, res) => {
    const { fromUserId, toUserId, message } = req.body;
    const query = `
      INSERT INTO messages (from_user_id, to_user_id, message_text)
      VALUES (?, ?, ?)
    `;
    db.query(query, [fromUserId, toUserId, message], (err) => {
      if (err) throw err;
      res.status(200).json({ message: 'Message sent!' });
    });
  });
  
  // Retrieve conversation between P'Take and N'Take
  app.get('/messages/:nTakeId/:pTakeId', (req, res) => {
    const { nTakeId, pTakeId } = req.params;
    const query = `
      SELECT * FROM messages 
      WHERE (from_user_id = ? AND to_user_id = ?) 
      OR (from_user_id = ? AND to_user_id = ?)
      ORDER BY timestamp ASC
    `;
    
    db.query(query, [nTakeId, pTakeId, pTakeId, nTakeId], (err, results) => {
      if (err) throw err;
      res.status(200).json(results);
    });
  });