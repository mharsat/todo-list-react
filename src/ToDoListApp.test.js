import React from 'react';
import ReactDOM from 'react-dom';
import ToDoListApp from './ToDoListApp';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<ToDoListApp />, div);
  ReactDOM.unmountComponentAtNode(div);
});
