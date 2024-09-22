
import './App.css';
import Login from './Pages/Login/Login';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faUser, faCoffee } from '@fortawesome/free-solid-svg-icons';

library.add(faUser, faCoffee);
function App() {
  return (
    <div>
      <Login/>
    </div>
  );
}

export default App;
