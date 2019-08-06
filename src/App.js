import React from 'react';
import { Provider } from 'react-redux';
import './App.css';
import configureStore from './store';
import RootComponent from './Components/RootComponent';

const store = configureStore();

function App() {
  return (
    <Provider store={store}>
      <RootComponent />
    </Provider>
  )
}

export default App
