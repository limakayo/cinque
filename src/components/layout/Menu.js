import React from 'react'
import MenuItem from './MenuItem'
import Icon from 'material-ui/Icon'
import { isLoggedIn } from '../../utils/AuthService'

const Menu = (props) => {

  return(
    <div>
      <MenuItem location="/home" title="Home" pathname={props.pathname}>
        <Icon>home</Icon>
      </MenuItem>
      {isLoggedIn() ? (
        <div>
          <MenuItem
            location="/clientes"
            title="Clientes">
            <Icon>people</Icon>
          </MenuItem>
          <MenuItem
            location="/vestidos"
            title="Vestidos">
            <Icon>local_florist</Icon>
          </MenuItem>
          <MenuItem
            location="/pedidos"
            title="Pedidos">
            <Icon>assignment</Icon>
          </MenuItem>
          <MenuItem
            location="/compras"
            title="Compras">
            <Icon>shopping_basket</Icon>
          </MenuItem>
        </div>
      ) : null}
    </div>
  )
}

export default Menu
