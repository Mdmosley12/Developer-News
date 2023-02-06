import { Route, Routes } from 'react-router-dom';
import './App.css';
import { Header } from './components/Header';
import { Articles } from './components/Articles';

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
      <Route path="/" element={<Articles />}></Route>
      </Routes>
    </div>
  );
}

export default App;
