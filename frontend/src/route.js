import React from 'react'
import { Switch,Route } from 'react-router-dom';
import Adduser from './components/adduser';
import Home from './components/home';

const Router = () => {
    return (    
        <React.Fragment>
            <Switch>
                <Route exact path="/">
                    <Home/>
                </Route>
                <Route path="/adduser">
                    <Adduser/>
                </Route>
            </Switch>
        </React.Fragment>
    )
}

export default Router;
