import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import TasksPage from './components/TasksPage';
import { ClientProvider } from './hooks/useClient';

function App() {
  return (
    <ClientProvider url="http://localhost:3000/">
      <Router>
        <Switch>
          <Route path="/">
            <TasksPage />
          </Route>
        </Switch>
      </Router>
    </ClientProvider>
  );
}

export default App;
