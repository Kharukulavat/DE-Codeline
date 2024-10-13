import React, { useEffect, useState } from 'react';
import axios from 'axios';

function ClueDisplay({ nTakeName }) {
  const [clues, setClues] = useState({ clue1: '', clue2: '' });

  useEffect(() => {
    const fetchClues = async () => {
      try {
        const response = await axios.get(`/clues/${nTakeName}`);
        setClues(response.data);
      } catch (error) {
        console.error('Error fetching clues:', error);
      }
    };

    fetchClues();
  }, [nTakeName]);

  return (
    <div>
      <h2>Clues for {nTakeName}</h2>
      <div>
        <strong>Clue 1:</strong> {clues.clue1}
      </div>
      <div>
        <strong>Clue 2:</strong> {clues.clue2}
      </div>
    </div>
  );
}

export default ClueDisplay;