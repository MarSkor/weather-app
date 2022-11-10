import './styles/main.scss';
import Weather from './container/Weather';
import { Navbar, Footer } from './components';

function App() {



  return (
    <div className="layout">
      <Weather defaultCity="Oslo"/>
    </div>
  );
}

export default App;
