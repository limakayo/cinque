import React from 'react'
import { Route, Redirect } from 'react-router-dom'

import Callback from './components/Callback'
import Home from './components/Home'
import Clientes from './containers/Clientes'
import ClientesForm from './containers/ClientesForm'
import Vestidos from './containers/Vestidos'
import VestidosForm from './containers/VestidosForm'
import Pedidos from './containers/Pedidos'
import PedidosView from './containers/PedidosView'
import PedidosForm from './containers/PedidosForm'
import Compras from './containers/Compras'
import ComprasForm from './containers/ComprasForm'

import { isLoggedIn } from './utils/AuthService'

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => (
    isLoggedIn()
      ? <Component {...props} />
      : <Redirect to='/home' />
  )} />
)

const Routes = () => (
  <div>
    <Route exact path="/home" component={Home}/>
    <Route exact path="/" render={() => (
      <Redirect to="/home"/>
    )}/>
    <PrivateRoute exact path="/clientes" component={Clientes}/>
    <PrivateRoute path="/clientes/cadastrar" component={ClientesForm}/>
	  <PrivateRoute path="/clientes/editar/:id" component={ClientesForm}/>
    <PrivateRoute exact path="/vestidos" component={Vestidos}/>
    <PrivateRoute path="/vestidos/cadastrar" component={VestidosForm}/>
    <PrivateRoute path="/vestidos/editar/:id" component={VestidosForm}/>
    <PrivateRoute exact path="/pedidos" component={Pedidos}/>
    <PrivateRoute path="/pedidos/cadastrar" component={PedidosForm}/>
    <PrivateRoute path="/pedidos/view/:id" component={PedidosView}/>
    <PrivateRoute path="/pedidos/editar/:id" component={PedidosForm}/>
    <PrivateRoute exact path="/compras" component={Compras}/>
    <PrivateRoute path="/compras/cadastrar" component={ComprasForm}/>
    <PrivateRoute path="/compras/editar/:id" component={ComprasForm}/>
    <Route path="/callback" component={Callback}/>
  </div>
)

export default Routes
