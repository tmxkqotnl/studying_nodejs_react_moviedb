import React, { Suspense } from 'react';
import { Route, Switch } from "react-router-dom";
import Auth from "../hoc/auth";

import LandingPage from "./views/LandingPage/LandingPage";
import LoginPage from "./views/LoginPage/LoginPage";
import RegisterPage from "./views/RegisterPage/RegisterPage";
import NavBar from "./views/NavBar/NavBar";
import Footer from "./views/Footer/Footer"
import MovieDetail from "./views/MovieDetail/MovieDetail";
import FavoritePage from "./views/FavoritePage/FavoritePage";

function App() {
  return (
    <Suspense fallback={(<div>불러오는 중...</div>)}>
      <NavBar/>
      <div style={{ paddingTop: '69px', minHeight: 'calc(100vh - 80px)' }}>
        <Switch>
          <Route exact path='/' component={Auth(LandingPage,null)} />
          <Route exact path='/login' component={Auth(LoginPage,false)} />
          <Route exact path='/register' component={Auth(RegisterPage,false)} />
          <Route exact path='/movie/:movieId' component={Auth(MovieDetail,null)} />
          <Route exact path='/favorite' component={Auth(FavoritePage,true)} />
        </Switch>
      </div>
      <Footer/>
    </Suspense>
  );
}

export default App;
