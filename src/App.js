import './App.css';
import './lib/icon/fontawesome-free-6.0.0-web/css/all.css';
import { useState } from 'react';
import Login from './components/Login';
import Home from './components/Home';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

function App() {
  const [dialog, setDialog] = useState(null);

  const showDialog = (dialogNeedShow) => {
    setDialog(dialogNeedShow);
  }
  const hideDialog = () => {
    setDialog(null);
  }

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path='/' element={<Login showDialog={showDialog} hideDialog={hideDialog}/>} />
          <Route path='/Home' element={<Home />} />
        </Routes>
        {dialog}
      </div>
    </Router>
  );
}

export default App;
