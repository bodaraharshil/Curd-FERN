import  React from 'react';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import { Provider } from 'react-redux';
import Route from './route';
import store from './store/store';

function App() {
  return (
    <React.Fragment>
      <Provider store={store}>
      <BrowserRouter>
        <Route/>
      </BrowserRouter>
      </Provider>
    </React.Fragment>
  );
}

export default App;
