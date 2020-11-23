import { BrowserRouter, Switch, Route } from 'react-router-dom';
import React from 'react';

import FormPaciente from './components/FormPaciente';
import Oppup from './components/Oppup';

export default function Routes() {
    return(
        <BrowserRouter>
            <Switch>
                <Route path="/" exact={true} component={FormPaciente}/>
                <Route path="/paciente/:id" component={Oppup}/>
            </Switch>
        </BrowserRouter>
    )
}