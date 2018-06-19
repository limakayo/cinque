import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button'
import Grid from 'material-ui/Grid';
import TextField from 'material-ui/TextField';
import Typography from 'material-ui/Typography';
import { FormControl } from 'material-ui/Form';
import Input, { InputLabel } from 'material-ui/Input';

import { observer } from 'mobx-react';

const styles = theme => ({
	textField: {
		width: '100%'
	},
	formControl: {
		width: '100%'
	}
})

const PedidosVestido = observer(function PedidosVestido(props) {
	const { 
		classes, 
		changeVestido, 
		removeVestido, 
		vestido,
		vestidos 
	} = props

	return (
		<Grid container spacing={16}>
			<Grid item xs={12}>
	      <Typography variant="body2" style={{ paddingTop: 16 }}>
	        Vestido #{vestido.id + 1}
	      </Typography>
	    </Grid>
			<Grid item xs={12} sm={3}>
	      <TextField
		      label="Descrição"
		      className={classes.textField}
		      value={vestido.descricao}
					onChange={changeVestido.bind(this, 'descricao', vestido.id)}/>
	    </Grid>
	    
    	<Grid item xs={12}>
	    	<Button 
	    		size="small"
        	variant="outlined" 
        	color="secondary" 
        	className={classes.button}
        	onClick={removeVestido.bind(this, vestido.id)}>
	        Remover
	      </Button>
	    </Grid>
	  </Grid>
	)
})

PedidosVestido.propTypes = {
	classes: PropTypes.object.isRequired
}

export default withStyles(styles)(PedidosVestido)