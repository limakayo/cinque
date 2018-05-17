import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import Grid from 'material-ui/Grid'
import Icon from 'material-ui/Icon'
import Button from 'material-ui/Button'
import TextField from 'material-ui/TextField'
import { observer } from 'mobx-react'
import { CircularProgress } from 'material-ui/Progress'
import Currency from '../Currency'
import Input, { InputLabel } from 'material-ui/Input'
import { FormControl } from 'material-ui/Form'
import Dialog, { 
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle } from 'material-ui/Dialog';

import vestidoStore from '../../stores/VestidoStore'

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

const VestidosFormComponent = observer(class VestidosFormComponent extends Component {

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
			handleDelete
		} = this.props

		const { vestido, isLoaded } = vestidoStore

		return(
			<div className={classes.container}>
				{isLoaded ? (
				<form className={classes.form} autoComplete="off">
					<Grid container spacing={24}>
						<Grid item xs={12} sm={6} md={3}>
					    <TextField
					      id="nome"
					      label="Nome"
					      className={classes.textField}
					      value={vestido.nome}
								onChange={handleChange.bind(this, 'nome')}/>
						</Grid>
						<Grid item xs={12} sm={6} md={3}>
					    <TextField
					      id="tamanho"
					      label="Tamanho"
					      className={classes.textField}
					      value={vestido.tamanho}
								onChange={handleChange.bind(this, 'tamanho')}/>
						</Grid>
						<Grid item xs={12} sm={6} md={3}>
							<FormControl className={classes.formControl}>
		            <InputLabel htmlFor="valor">Valor</InputLabel>
		            <Input
		              id="valor"
		              name="valor"
		              fullWidth
		              value={vestido.valor ? vestido.valor : '0,00'}
		              inputComponent={Currency}
		              onChange={handleChange.bind(this, 'valor')}
		            />
		          </FormControl>
						</Grid>
						<Grid item xs={12} sm={6} md={3}>
					    <TextField
					      id="tecido"
					      label="Tecido"
					      className={classes.textField}
					      value={vestido.tecido}
								onChange={handleChange.bind(this, 'tecido')}/>
						</Grid>
						<Grid item xs={12} sm={6} md={3}>
							<TextField
								id="medidas"
								label="Medidas"
								multiline
          			rowsMax="4"
								className={classes.textField}
								value={vestido.medidas}
								onChange={handleChange.bind(this, 'medidas')}/>
						</Grid>
						<Grid item xs={12} sm={6} md={3}>
							<TextField
								id="descricao"
								label="Descricao"
								multiline
          			rowsMax="4"
								className={classes.textField}
								value={vestido.descricao}
								onChange={handleChange.bind(this, 'descricao')}/>
						</Grid>
						<Button
							variant="fab"
							color="primary"
							aria-label="add"
							className={classes.floatButton}
							onClick={this.handleClickOpenLoading}>
							<Icon>done</Icon>
				    </Button>
						{vestido._id !== "" ?
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
		              Essa ação removerá todos os dados do vestido.
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

VestidosFormComponent.propTypes = {
	classes: PropTypes.object.isRequired
}

export default withStyles(styles)(VestidosFormComponent)
