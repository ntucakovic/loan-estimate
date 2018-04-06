import React from 'react';
import { render } from 'react-dom';
import './App.css';
import AppRouter from './components/AppRouter';
import registerServiceWorker from './registerServiceWorker';

render(<AppRouter />, document.getElementById('root'));
registerServiceWorker();
