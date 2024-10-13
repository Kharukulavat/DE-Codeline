import React from 'react';
import ClueDisplay from './components/ClueDisplay';
import Chat from './components/Chat';

function App() {
  const nTakeName = 'Khawhom';  // Example N'Take
  const pTakeId = 'Khajee';     // Example P'Take

  return (
    <div className="App">
      <h1>P'Take & N'Take Code Line Activity</h1>
      <ClueDisplay nTakeName={nTakeName} />
      <Chat pTakeId={pTakeId} nTakeId={nTakeName} />
    </div>
  );
}

export default App;