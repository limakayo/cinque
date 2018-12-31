import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import Icon from 'material-ui/Icon';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import { observer } from 'mobx-react';
import { CircularProgress } from 'material-ui/Progress';
import ClienteDownshift from '../ClienteDownshift';
import Typography from 'material-ui/Typography';
import { FormControlLabel, FormControl } from 'material-ui/Form';
import Select from 'material-ui/Select';
import { MenuItem } from 'material-ui/Menu';
import Input, { InputLabel } from 'material-ui/Input';
import Currency from '../Currency';
import Switch from 'material-ui/Switch';
import Dialog, { 
	DialogContent } from 'material-ui/Dialog';
import PedidosVestido from './PedidosVestido';

const styles = theme => ({
	progress: {
    margin: theme.spacing.unit * 2,
  },
	progressContainer: {
    height: 160,
    lineHeight: '200px',
    textAlign: 'center'
  },
	floatButton: {
    position: 'fixed',
    bottom: 16,
    right: 16
  },
  fabContainer: {
		position: 'fixed',
		bottom: 0,
		right: 0
	},
	fabFrame: {
		position: 'relative'
	},
	fabDone: {
		position: 'absolute',
		bottom: theme.spacing.unit * 2,
		right: theme.spacing.unit * 2
	},
	container: {
		flexWrap: 'wrap',
		width: '100%',
		marginBottom: 200,
		[theme.breakpoints.up('sm')]: {
			marginLeft: 30,
			marginRight: 30,
			marginTop: 20
    },
    [theme.breakpoints.down('sm')]: {
			marginLeft: 32,
			marginRight: 32,
			marginTop: 20
    },
	},
	formControl: {
    width: '100%',
  },
	form: {
		width: '100%'
	},
	textField: {
		width: '100%'
	},
	typo: {
		marginLeft: theme.spacing.unit,
		marginRight: theme.spacing.unit,
		lineHeight: '50px',
		height: '50px'
	}
})

const PedidosFormComponent = observer(class PedidosFormComponent extends Component {

	state = {
    open: false,
    openLoadingDialog: false,
  };

  handleClickOpenLoading = () => {
  	this.setState({ openLoadingDialog: true })
  	this.props.handleSubmit()
  }

	render() {
		const {
			classes,
			handleChange,
			handleClienteSelected,
			addVestido,
			changeVestido,
			removeVestido,
			clientes,
			vestidos,
			isLoaded,
			pedido,
			editar,
		} = this.props

		return(
			<div className={classes.container}>
				{isLoaded ? (
				<form className={classes.form} autoComplete="off">
					<Grid container spacing={24}>
						<Grid item xs={12}>
							<FormControlLabel
			          control={
			            <Switch
			              checked={pedido.encomenda}
			              onChange={handleChange.bind(this, 'encomenda')}
			              value="encomenda"
			            />
			          }
			          label="Encomenda"
			        />
						</Grid>
						<Grid item xs={12}>
							{editar ? 
								<TextField
						      id="cliente"
						      label="Cliente"
						      className={classes.textField}
						      value={pedido.cliente ? pedido.cliente.nome : ''}
						      disabled/>
								: 
								<div>
									<ClienteDownshift
		                suggestions={clientes}
		                handleSuggestionSelected={handleClienteSelected}/>
		              <Typography type="caption" style={{ marginTop: '0.35em', color: 'rgba(0, 0, 0, 0.54)' }}>
		            		Selecione um cliente
		          		</Typography>
		          	</div>
							}
						</Grid>
					</Grid>
					<Grid container spacing={16} style={{ paddingTop: 24 }}>
		        <Grid item xs={12}>
			        <Typography variant="subheading">
				        Vestidos
				      </Typography>
				    </Grid>
				  </Grid>

				  {vestidos.map((vestido) => (
				  	<PedidosVestido
				  		changeVestido={changeVestido}
				  		removeVestido={removeVestido}
				  		vestido={vestido}
				  		key={vestido.id} />
				  ))}

			  	<Grid container spacing={16}>
				  	<Grid item xs={12}>
		          <Button 
		          	color="primary" 
		          	className={classes.button}
		          	style={{ marginRight: 16 }}
		          	onClick={addVestido}>
				        Adicionar outro
				      </Button>
		        </Grid>
				  </Grid>

				  <Grid container spacing={16} style={{ paddingTop: 16 }}>
						<Grid item xs={12} style={{ paddingBottom: 0 }}>
							<Typography variant="subheading" gutterBottom>
				        Entrega
				      </Typography>
						</Grid>
						<Grid item xs={12} sm={6} md={3}>
								<FormControl className={classes.formControl}>
				          <InputLabel htmlFor="formaEntrega">Forma de entrega</InputLabel>
				          <Select
				            value={pedido.formaEntrega}
				            onChange={handleChange.bind(this, 'formaEntrega')}
				            inputProps={{
				              name: 'formaEntrega',
				              id: 'formaEntrega',
				            }}
				          >
				          	<MenuItem value=""><em>Selecione</em></MenuItem>
				            <MenuItem value="Correios">Correios</MenuItem>
				            <MenuItem value="Loja">Loja</MenuItem>
				            <MenuItem value="Motoboy">Motoboy</MenuItem>
				          </Select>
				        </FormControl>
						</Grid>
						{pedido.formaEntrega === 'Correios' ? (
							<Grid item xs={12} sm={6} md={3}>
									<FormControl className={classes.formControl}>
					          <InputLabel htmlFor="servicoCorreios">Serviço Correios</InputLabel>
					          <Select
					            value={pedido.servicoCorreios}
					            onChange={handleChange.bind(this, 'servicoCorreios')}
					            inputProps={{
					              name: 'servicoCorreios',
					              id: 'servicoCorreios',
					            }}
					          >
					          	<MenuItem value=""><em>Selecione</em></MenuItem>
					            <MenuItem value="PAC">PAC</MenuItem>
					            <MenuItem value="Sedex">Sedex</MenuItem>
					          </Select>
					        </FormControl>
							</Grid>
						) : null}
						{pedido.formaEntrega === 'Correios' ? (
							<Grid item xs={12} sm={6} md={3}>
						    <TextField
						      id="codigoCorreios"
						      label="Código Correios"
						      className={classes.textField}
						      value={pedido.codigoCorreios}
									onChange={handleChange.bind(this, 'codigoCorreios')}/>
							</Grid>
						) : null}
						{pedido.formaEntrega === 'Correios' ? (
							<Grid item xs={12} sm={6} md={3}>
								<TextField
						    	type="date"
						      id="dataPostagem"
						      label="Data Postagem"
						      className={classes.textField}
						      value={pedido.dataPostagem}
									onChange={handleChange.bind(this, 'dataPostagem')}
									InputLabelProps={{
					          shrink: true,
					        }}/>
							</Grid>
						) : null}
						<Grid item xs={12} sm={6} md={3}>
					    <TextField
					    	type="date"
					      id="dataEntrega"
					      label="Data Entrega"
					      className={classes.textField}
					      value={pedido.dataEntrega}
								onChange={handleChange.bind(this, 'dataEntrega')}
								InputLabelProps={{
				          shrink: true,
				        }}/>
						</Grid>
						<Grid item xs={12} style={{ paddingBottom: 0 }}>
							<Typography variant="subheading" gutterBottom>
				        Valores
				      </Typography>
						</Grid>
						<Grid item xs={12} sm={6} md={3}>
							<FormControl className={classes.formControl}>
		            <InputLabel htmlFor="valorVestidos">Valor Vestidos</InputLabel>
		            <Input
		              id="valorVestidos"
		              name="valorVestidos"
		              fullWidth
		              value={pedido.valorVestidos ? pedido.valorVestidos : '0,00'}
		              disabled
		              inputComponent={Currency}
		            />
		          </FormControl>
						</Grid>
						<Grid item xs={12} sm={6} md={3}>
					    <FormControl className={classes.formControl}>
		            <InputLabel htmlFor="valorEntrega">Valor Entrega</InputLabel>
		            <Input
		              id="valorEntrega"
		              name="valorEntrega"
		              fullWidth
		              value={pedido.valorEntrega ? pedido.valorEntrega : '0,00'}
		              onChange={handleChange.bind(this, 'valorEntrega')}
		              inputComponent={Currency}
		            />
		          </FormControl>
						</Grid>
						<Grid item xs={12} sm={6} md={3}>
					    <FormControl className={classes.formControl}>
		            <InputLabel htmlFor="desconto">Valor Desconto</InputLabel>
		            <Input
		              id="desconto"
		              name="desconto"
		              fullWidth
		              value={pedido.desconto ? pedido.desconto : '0,00'}
		              onChange={handleChange.bind(this, 'desconto')}
		              inputComponent={Currency}
		            />
		          </FormControl>
						</Grid>
						<Grid item xs={12} sm={6} md={3}>
					    <FormControl className={classes.formControl}>
		            <InputLabel htmlFor="valorTotal">Valor Total</InputLabel>
		            <Input
		              id="valorTotal"
		              name="valorTotal"
		              fullWidth
		              value={pedido.valorTotal ? pedido.valorTotal : '0,00'}
		              disabled
		              inputComponent={Currency}
		            />
		          </FormControl>
						</Grid>
						<Grid item xs={12} style={{ paddingBottom: 0 }}>
							<Typography variant="subheading" gutterBottom>
				        Pagamento
				      </Typography>
						</Grid>
						<Grid item xs={12} sm={6} md={3}>
							<FormControl className={classes.formControl}>
			          <InputLabel htmlFor="formaPagamento">Forma Pagamento</InputLabel>
			          <Select
			            value={pedido.formaPagamento}
			            onChange={handleChange.bind(this, 'formaPagamento')}
			            inputProps={{
			              name: 'formaPagamento',
			              id: 'formaPagamento',
			            }}
			          >
			          	<MenuItem value=""><em>Selecione</em></MenuItem>
			            <MenuItem value="Depósito">Depósito / Transferência</MenuItem>
			            <MenuItem value="Cartão">Cartão de Crédito</MenuItem>
			            <MenuItem value="Dinheiro">Dinheiro</MenuItem>
			          </Select>
			        </FormControl>
						</Grid>
						{pedido.formaPagamento === 'Depósito' ? (
							<Grid item xs={12} sm={6} md={3}>
								<FormControl className={classes.formControl}>
				          <InputLabel htmlFor="bancoPagamento">Banco Pagamento</InputLabel>
				          <Select
				            value={pedido.bancoPagamento}
				            onChange={handleChange.bind(this, 'bancoPagamento')}
				            inputProps={{
				              name: 'bancoPagamento',
				              id: 'bancoPagamento',
				            }}
				          >
				          	<MenuItem value=""><em>Selecione</em></MenuItem>
				            <MenuItem value="Itaú">Itaú</MenuItem>
				            <MenuItem value="Banco do Brasil">Banco do Brasil</MenuItem>
				            <MenuItem value="Caixa">Caixa</MenuItem>
				          </Select>
				        </FormControl>
							</Grid>
						) : null}
						<Grid item xs={12} sm={6} md={3}>
					    <TextField
					    	type="date"
					      id="dataPagamento"
					      label="Data Pagamento"
					      className={classes.textField}
					      value={pedido.dataPagamento}
								onChange={handleChange.bind(this, 'dataPagamento')}
								InputLabelProps={{
				          shrink: true,
				        }}/>
						</Grid>
					</Grid>
					<Dialog open={this.state.openLoadingDialog}>
	          <DialogContent style={{ width: 200 }}>
	            <div style={{ width: '100%', textAlign: 'center' }}>
	              <CircularProgress className={classes.progress} size={50} />
	              <h3>Salvando...</h3>
	            </div>
	          </DialogContent>
	        </Dialog>
	        <div className={classes.fabContainer}>
		  			<div className={classes.fabFrame}>
				  		<Button 
				  			variant="fab" 
				  			color="primary" 
				  			aria-label="done" 
				  			className={classes.fabDone}
				  			onClick={this.handleClickOpenLoading}>
				        <Icon>done</Icon>
				      </Button>
				    </div>
			    </div>
				</form>
				) : (
          <div className={classes.progressContainer}>
            <CircularProgress className={classes.progress} />
          </div>
        )}
	    </div>
		)
	}
})

PedidosFormComponent.propTypes = {
	classes: PropTypes.object.isRequired
}

export default withStyles(styles)(PedidosFormComponent)
