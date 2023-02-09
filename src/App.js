import { Route, Routes } from 'react-router-dom';
import './App.css';
import { Header } from './components/Header';
import { Articles } from './components/Articles';
import { SingleArticle } from './components/SingleArticle';
import { UserLogin } from './components/UserLogin';
import { useState } from 'react';

function App() {
  const [user, setUser] = useState()

  return (
    <div className="App">
      <Header user={user}/>
      <Routes>
        <Route path="/" element={<Articles />}></Route>
        <Route path="/articles/:article_id/*" element={<SingleArticle user={user}/>}></Route>
        <Route path="/userLogin" element={<UserLogin user={user} setUser={setUser}/>}></Route>
      </Routes>
    </div>
  );
}

export default App;
