import * as React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import SignIn from './Auth/SignIn';
import SignUp from './Auth/SignUp';
import Main from './Main/Main'
import AddItemForm from './Main/AddItemForm';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AddItemForm />} />
        <Route path="/" element={<Main />} />
        <Route path="/" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </Router>
  );
}

export default App;
