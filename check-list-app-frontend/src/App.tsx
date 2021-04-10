import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';

import TasksPage from './components/TasksPage';
import { ClientProvider } from './hooks/useClient';

const GlobalStyle = createGlobalStyle`
body{
  font-family: Work Sans, sans-serif;
}
`

function App() {
  return (
    <>
      <GlobalStyle />
      <ClientProvider url="http://192.168.1.14:3000/">
        <Router>
          <Switch>
            <Route path="/">
              <TasksPage />
            </Route>
          </Switch>
        </Router>
      </ClientProvider>
    </> 
  );
}

export default App;
