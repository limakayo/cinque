import React from 'react'
import {
  ListItem,
  ListItemText,
} from 'material-ui/List'
import Divider from 'material-ui/Divider'
import { withStyles } from 'material-ui/styles'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import moment from 'moment'
import 'moment/locale/pt-br'

const styles = theme => ({
  list: {
    paddingLeft: 16,
    [theme.breakpoints.up('sm')]: {
    	paddingLeft: 24
    }
  },
  listItem: {
  	padding: 0
  },
  naoEntregue: {
  	float: 'right',
  	color: '#EF5350'
  },
  entregue: {
  	float: 'right',
  	color: '#009688'
  }
})

const PedidoRow = (props) => {
	const { pedidos, classes } = props

	return (
		pedidos.map((e) => {
	    return (
	      <div key={e._id}>
	        <ListItem
	          button
	          className={classes.list}
	          component={Link}
	          to={`pedidos/view/${e._id}`}>
	          <ListItemText
	          	className={classes.listItem}
	            primary={e.cliente ? e.cliente.nome : e._id}
	            secondary={
	            	<span>
		            	<span>{moment(e.createdAt).locale('pt-br').format('L') + ' - R$ ' + e.valorTotal}</span>
		            	{e.dataEntrega === '' ? ( 
		            		<span className={classes.naoEntregue}>Não entregue</span>
		            	) : (
		            		<span className={classes.entregue}>Entregue</span>
		            	)}
		            </span>
	            }/>
	        </ListItem>
	        <li>
	          <Divider />
	        </li>
	      </div>
	    )
	  })
	)
}

PedidoRow.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(PedidoRow)