import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import Grid from 'material-ui/Grid'
import Icon from 'material-ui/Icon'
import Button from 'material-ui/Button'
import TextField from 'material-ui/TextField'
import Typography from 'material-ui/Typography'
import { observer } from 'mobx-react'
import { CircularProgress } from 'material-ui/Progress'
import { FormControl } from 'material-ui/Form'
import Select from 'material-ui/Select'
import { MenuItem } from 'material-ui/Menu'
import { InputLabel } from 'material-ui/Input'
import { ESTADOS } from '../../utils/Estados'
import Masked from '../Masked'
import Input from 'material-ui/Input'
import Dialog, { 
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle } from 'material-ui/Dialog';

import clienteStore from '../../stores/ClienteStore'

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
	floatButtonDelete: {
		position: 'fixed',
    bottom: 80,
    right: 16
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

const ClientesFormComponent = observer(class ClientesFormComponent extends Component {

	state = {
    open: false,
    openLoadingDialog: false,
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClickOpenLoading = () => {
  	this.setState({ openLoadingDialog: true })
  	this.props.handleSubmit()
  }

  handleClose = () => {
    this.setState({ open: false });
  };

  handleDelete = () => {
  	this.setState({ open: false })
  	this.props.handleDelete()
  }

	render() {
		const {
			classes,
			handleSubmit,
			handleChange,
			handleDelete,
			handleBlur
		} = this.props

		const { cliente, isLoaded } = clienteStore

		return(
			<div className={classes.container}>
				{isLoaded ? (
				<form className={classes.form} autoComplete="off">
					<Grid container spacing={24}>
						<Grid item xs={12} style={{ paddingBottom: 0 }}>
							<Typography variant="title" gutterBottom>
				        Contato
				      </Typography>
						</Grid>
						<Grid item xs={12} sm={6} md={3}>
					    <TextField
					      id="nome"
					      label="Nome"
					      className={classes.textField}
					      value={cliente.nome}
								onChange={handleChange.bind(this, 'nome')}/>
						</Grid>
						<Grid item xs={12} sm={6} md={3}>
					    <TextField
					      id="instagram"
					      label="Instagram"
					      className={classes.textField}
					      value={cliente.instagram}
								onChange={handleChange.bind(this, 'instagram')}/>
						</Grid>
						<Grid item xs={12} sm={6} md={3}>
					    <TextField
					      id="email"
					      label="E-mail"
					      type="email"
					      className={classes.textField}
					      value={cliente.email}
								onChange={handleChange.bind(this, 'email')}/>
						</Grid>
						<Grid item xs={12} sm={6} md={3}>
							<FormControl className={classes.formControl}>
		            <InputLabel htmlFor="cpf">CPF</InputLabel>
		            <Input
		              id="cpf"
		              name="cpf"
		              fullWidth
		              value={cliente.cpf}
		              inputComponent={Masked}
		              inputProps={{
		              	mask: [/\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/, /\d/],
		              	placeholder: 'Insira o CPF',
		              	guide: false
		              }}
		              onChange={handleChange.bind(this, 'cpf')}
		            />
		          </FormControl>
						</Grid>
						<Grid item xs={12} style={{ paddingBottom: 0 }}>
							<Typography variant="title" gutterBottom>
				        Endereço
				      </Typography>
						</Grid>
						<Grid item xs={12} sm={6} md={2}>
							<FormControl className={classes.formControl}>
		            <InputLabel htmlFor="cep">CEP</InputLabel>
		            <Input
		              id="cep"
		              name="cep"
		              fullWidth
		              value={cliente.cep}
		              inputComponent={Masked}
		              inputProps={{
		              	mask: [/\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/],
		              	placeholder: 'Insira o CEP',
		              	guide: false
		              }}
		              onChange={handleChange.bind(this, 'cep')}
		              onBlur={handleBlur.bind(this, 'cep')}
		            />
		          </FormControl>
						</Grid>
						<Grid item xs={12} sm={6} md={4}>
							<TextField
								id="logradouro"
								label="Logradouro"
								className={classes.textField}
								value={cliente.logradouro}
								onChange={handleChange.bind(this, 'logradouro')}/>
						</Grid>
						<Grid item xs={12} sm={6} md={2}>
							<TextField
								id="numero"
								label="Número"
								className={classes.textField}
								value={cliente.numero}
								onChange={handleChange.bind(this, 'numero')}/>
						</Grid>
						<Grid item xs={12} sm={6} md={4}>
							<TextField
								id="complemento"
								label="Complemento"
								className={classes.textField}
								value={cliente.complemento}
								onChange={handleChange.bind(this, 'complemento')}/>
						</Grid>
						<Grid item xs={12} sm={6} md={4}>
					    <TextField
					      id="bairro"
					      label="Bairro"
					      className={classes.textField}
					      value={cliente.bairro}
								onChange={handleChange.bind(this, 'bairro')}/>
						</Grid>
						<Grid item xs={12} sm={6} md={4}>
					    <TextField
					      id="cidade"
					      label="Cidade"
					      className={classes.textField}
					      value={cliente.cidade}
								onChange={handleChange.bind(this, 'cidade')}/>
						</Grid>
						<Grid item xs={12} sm={6} md={4}>
							<FormControl className={classes.formControl}>
			          <InputLabel htmlFor="estado">Estado</InputLabel>
			          <Select
			            value={cliente.estado}
			            onChange={handleChange.bind(this, 'estado')}
			            inputProps={{
			              name: 'estado',
			              id: 'estado',
			            }}
			          >
			            <MenuItem value="">
			              <em>Selecione</em>
			            </MenuItem>
									{ESTADOS.map((e) => {
										return <MenuItem key={e.id} value={e.sigla}>{e.sigla}</MenuItem>
									})}
			          </Select>
			        </FormControl>
						</Grid>
						<Button
							variant="fab"
							color="primary"
							aria-label="add"
							className={classes.floatButton}
							onClick={this.handleClickOpenLoading}>
							<Icon>done</Icon>
				    </Button>
						{cliente._id !== "" ?
							<Button
					      variant="fab"
					      color="primary"
					      aria-label="delete"
					      className={classes.floatButtonDelete}
					      onClick={this.handleClickOpen}>
					      <Icon>delete</Icon>
					    </Button>
						: null}
					</Grid>

					<Dialog
		          open={this.state.open}
		          onClose={this.handleClose}
		          aria-labelledby="alert-dialog-title"
		          aria-describedby="alert-dialog-description"
		        >
		          <DialogTitle id="alert-dialog-title">{"Tem certeza?"}</DialogTitle>
		          <DialogContent>
		            <DialogContentText id="alert-dialog-description">
		              Essa ação removerá todos os dados do cliente.
		            </DialogContentText>
		          </DialogContent>
		          <DialogActions>
		            <Button onClick={this.handleClose} color="primary">
		              Cancelar
		            </Button>
		            <Button onClick={this.handleDelete} color="primary" autoFocus>
		              Confirmar
		            </Button>
		          </DialogActions>
		        </Dialog>

		       <Dialog open={this.state.openLoadingDialog}>
	          <DialogContent style={{ width: 200 }}>
	            <div style={{ width: '100%', textAlign: 'center' }}>
	              <CircularProgress className={classes.progress} size={50} />
	              <h3>Salvando...</h3>
	            </div>
	          </DialogContent>
	        </Dialog>
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

ClientesFormComponent.propTypes = {
	classes: PropTypes.object.isRequired
}

export default withStyles(styles)(ClientesFormComponent)
