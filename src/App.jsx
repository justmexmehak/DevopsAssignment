import './App.css';
import Form from './components/Form'
import UserList from './components/UserList';

import React, { useState } from 'react';

function App() {

  const [selectedComponent, setSelectedComponent] = useState('form')
  return (
    <div className="App">
      <header className="App-header">
        <img src="Octocat2.png" className="App-logo" alt="logo" />
        <p>
          DEVOPS <span className="heart">♥️</span>
        </p>
        
      </header>
      <div className="radio-buttons">
        <label><input type="radio" value="form" checked={selectedComponent === 'form'} onChange={() => setSelectedComponent('form')} />Form</label>
        <label><input type="radio" value="users" checked={selectedComponent === 'users'} onChange={() => setSelectedComponent('users')} />Users</label>
      </div>
      {selectedComponent === 'form' ? <Form /> : <UserList />}
    </div>
  );
}

export default App;
