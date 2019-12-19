import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
  NavLink
} from 'react-router-dom';
import * as styles from './styles.module.scss';

import { P1 } from './P1';
import { P2 } from './P2';

export const ReactApp = () => {
  ReactDOM.render(
    <Router>
      <div className={`toolbar ${styles.toolbar}`}>
        <img
          width='40'
          alt='React Logo'
          // tslint:disable-next-line: max-line-length
          src='data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9Ii0xMS41IC0xMC4yMzE3NCAyMyAyMC40NjM0OCI+CiAgPHRpdGxlPlJlYWN0IExvZ288L3RpdGxlPgogIDxjaXJjbGUgY3g9IjAiIGN5PSIwIiByPSIyLjA1IiBmaWxsPSIjNjFkYWZiIi8+CiAgPGcgc3Ryb2tlPSIjNjFkYWZiIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiPgogICAgPGVsbGlwc2Ugcng9IjExIiByeT0iNC4yIi8+CiAgICA8ZWxsaXBzZSByeD0iMTEiIHJ5PSI0LjIiIHRyYW5zZm9ybT0icm90YXRlKDYwKSIvPgogICAgPGVsbGlwc2Ugcng9IjExIiByeT0iNC4yIiB0cmFuc2Zvcm09InJvdGF0ZSgxMjApIi8+CiAgPC9nPgo8L3N2Zz4K'
        />
        <span>
          Welcome React -&nbsp;
          <Switch>
            <Route path='/p1' component={P1} />
            <Route path='/p2' component={P2} />
            <Redirect to='/p1' />
          </Switch>
        </span>

        <span className={`nav ${styles.nav}`}>
          <NavLink to='/p1' activeClassName={styles.active}>P1</NavLink>
          <NavLink to='/p2' activeClassName={styles.active}>P2</NavLink>
        </span>
      </div>
    </Router>,
    document.getElementById('react')
  );
};

