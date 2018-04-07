import React from 'react';
import ReactDOM from 'react-dom';
import AppRouter from './container/AppRouter';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<AppRouter />, div);
});
