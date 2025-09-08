import './App.css';
import LoginForm from './login_form/login';
import Register from './register_form/register';
import { BrowserRouter, Route, Switch } from 'react-router-dom/cjs/react-router-dom.min';
import NavBar from './components/NavbarComponent/NavBar.jsx';
import Home from './Home/home';
import MovieDetails from './MovieDetails/MovieDetails';
import FavMovies from './FavMovies/FavMovies.jsx';
import { LanguageContext } from '../src/context/langContext.jsx';
import { useState } from 'react';
function App() {
  const [lang, setLang] = useState("en")
  return (
    <div className="App">

      <BrowserRouter>
        <LanguageContext.Provider value={{ lang, setLang }}>
          <NavBar></NavBar>
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/favourites">
              <FavMovies />
            </Route>
            <Route path="/movie/:id">
              <MovieDetails></MovieDetails>
            </Route>
            <Route path="/register">
              <Register />
            </Route>
            <Route path="/login">
              <LoginForm />
            </Route>
          
          </Switch>
        </LanguageContext.Provider>
      </BrowserRouter>

    </div>
  );
}

export default App;
