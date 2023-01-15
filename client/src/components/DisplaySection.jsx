import React from 'react';
import { useLocation, useRouteMatch, Switch, Route } from 'react-router-dom';

import ProjectList from './ProjectList';
import BugsList from './BugsList';
import AddBug from './AddBug';

export default () => {
  const { path, url } = useRouteMatch();
  console.log('path', path);
  console.log('url', url);
  return (
    <div className="w-full bg-gray-200 rounded-lg p-4">
      <div className="text-2xl font-bold text-center mb-4">This is the display section</div>
      <Switch>
        <Route
          path="/projects"
          render={(props) => <ProjectList {...props} />}
        />
        <Route
          path="/bugs"
          render={(props) => (
            <div>
              <h2 className="text-lg font-bold mb-2">Bug List</h2>
              <BugsList {...props} />
            </div>
          )}
        />
        <Route
          path="/createbug"
          render={() => (
            <div>
              <h2 className="text-lg font-bold mb-2">Create a new bug</h2>
              <AddBug />
            </div>
          )}
        />
      </Switch>
    </div>
  );
};
