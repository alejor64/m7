import React, { lazy, Suspense } from "react";
import { Redirect, Route, Switch } from 'react-router-dom';
import Loading from 'components/shared-components/Loading';

const Dashboards = ({ match }) => {
  return(
  <Suspense fallback={<Loading cover="content"/>}>
    <Switch>
      <Route path={`${match.url}/escritorio`} component={lazy(() => import(`./default`))} />
      <Route path={`${match.url}/pedidos`} component={lazy(() => import(`./analytic`))} />
      <Route path={`${match.url}/ordenes`} component={lazy(() => import(`./sales`))} />
      <Route path={`${match.url}/vehiculos`} component={lazy(() => import(`./vehiculos`))} />
      <Route path={`${match.url}/cliente`} component={lazy(() => import(`./profile`))} />
      <Redirect from={`${match.url}`} to={`${match.url}/escritorio`} />
    </Switch>
  </Suspense>
)};

export default Dashboards;