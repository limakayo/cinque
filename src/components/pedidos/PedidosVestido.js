import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import Grid from 'material-ui/Grid';
import TextField from 'material-ui/TextField';
import Typography from 'material-ui/Typography';
import { FormControl } from 'material-ui/Form';
import Input, { InputLabel } from 'material-ui/Input';
import Currency from '../Currency';

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
		      placeholder="Vestido Raposita"
					onChange={changeVestido.bind(this, 'descricao', vestido.id)}/>
	    </Grid>
	    <Grid item xs={12} sm={3}>
	      <TextField
		      label="Tamanho"
		      className={classes.textField}
		      value={vestido.tamanho}
		      placeholder="2 anos"
					onChange={changeVestido.bind(this, 'tamanho', vestido.id)}/>
	    </Grid>
	    <Grid item xs={12} sm={3}>
				<FormControl className={classes.formControl}>
          <InputLabel htmlFor="valor">Valor</InputLabel>
          <Input
            id="valor"
            name="valor"
            fullWidth
            value={vestido.valor ? vestido.valor : '0,00'}
            onChange={changeVestido.bind(this, 'valor', vestido.id)}
            inputComponent={Currency}
          />
        </FormControl>
	    </Grid>
    	<Grid item xs={12} sm={3} style={{ paddingTop: 16 }}>
	    	<Button 
	    		size="small"
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