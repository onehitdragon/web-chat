import './App.css';
import './lib/icon/fontawesome-free-6.0.0-web/css/all.css';
import Login from './components/Login';
import { useState } from 'react';

function App() {
  const [dialog, setDialog] = useState(null);
  const showDialog = (dialogNeedShow) => {
    setDialog(dialogNeedShow);
  }
  const hideDialog = () => {
    setDialog(null);
  }

  return (
    <div className="App">
      <Login showDialog={showDialog} hideDialog={hideDialog}/>
      {dialog}
    </div>
  );
}

export default App;
