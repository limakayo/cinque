import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import Grid from 'material-ui/Grid'
import Icon from 'material-ui/Icon'
import Button from 'material-ui/Button'
import { observer } from 'mobx-react'
import { CircularProgress } from 'material-ui/Progress'
import pedidoStore from '../../stores/PedidoStore'
import Typography from 'material-ui/Typography'
import { Link } from 'react-router-dom'
import Dialog, { 
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle } from 'material-ui/Dialog';
import moment from 'moment'
import 'moment/locale/pt-br'

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
	rightIcon: {
    marginLeft: theme.spacing.unit,
  },
	typo: {
		marginLeft: theme.spacing.unit,
		marginRight: theme.spacing.unit,
		lineHeight: '50px',
		height: '50px'
	}
})

const PedidosViewComponent = observer(class PedidosViewComponent extends Component {
	state = {
    open: false,
    openLoadingDialog: false,
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClickOpenLoading = () => {
  	this.setState({ openLoadingDialog: true })
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
			handleDelete
		} = this.props

		const { pedido, isLoaded } = pedidoStore

		return(
			<div className={classes.container}>
				{isLoaded ? (
					<div>
						<Grid container spacing={24}>
							<Grid item xs={12}>
								<Typography variant="title" gutterBottom>
					        {pedido.cliente ? pedido.cliente.nome : pedido._id}
					      </Typography>
					      {pedido.cliente ? (
					      	<div>
							      <Typography gutterBottom>
							        	<strong>Instagram:</strong> {pedido.cliente.instagram}
							      </Typography>
							      <Typography gutterBottom>
							        <strong>CPF:</strong> {pedido.cliente.cpf}
							      </Typography>
							      {pedido.cliente.email ? (
							      	<Typography gutterBottom>
								        <strong>E-mail:</strong> {pedido.cliente.email}
								      </Typography>
								    ) : null}
							      <Typography gutterBottom>
							        <strong>Encomenda:</strong> {pedido.encomenda ? 'Sim' : 'Não'}
							      </Typography>
							      <hr/>
							      <Typography variant="subheading" gutterBottom>
							        Endereço
							      </Typography>
							      <Typography gutterBottom>
							        <strong>CEP:</strong> {pedido.cliente.cep}
							      </Typography>
							      <Typography gutterBottom>
							        <strong>Logradouro:</strong> {pedido.cliente.logradouro}
							      </Typography>
							      <Typography gutterBottom>
							        <strong>Número:</strong> {pedido.cliente.numero}
							      </Typography>
							      {pedido.cliente.complemento ? (
							      	<Typography gutterBottom>
							        	<strong>Complemento:</strong> {pedido.cliente.complemento}
							      	</Typography>
							      ) : null}
							      <Typography gutterBottom>
							        <strong>Bairro:</strong> {pedido.cliente.bairro}
							      </Typography>
							      <Typography gutterBottom>
							        <strong>Cidade:</strong> {pedido.cliente.cidade}
							      </Typography>
							      <Typography gutterBottom>
							        <strong>UF:</strong> {pedido.cliente.estado}
							      </Typography>
							    </div>
							  ) : null}
					      <hr/>
					      <Typography variant="subheading" gutterBottom>
					        Vestidos
					      </Typography>
					      {pedido.vestidos && pedido.vestidos.map((v) => (
					      	<div key={v._id}>
						      	<Typography gutterBottom>
						         {v.nome + ' ' + v.tamanho + ' - R$ ' + v.valor}
						      	</Typography>
					      	</div>
					      ))}
					      {pedido.descricao ? (
					      	<Typography gutterBottom>
					        	<strong>Descrição:</strong> {pedido.descricao}
					      	</Typography>
					      ) : null}
					      <hr/>
					      <Typography variant="subheading" gutterBottom>
					        Entrega
					      </Typography>
					      {pedido.formaEntrega ? (
					      	<div>
						      	<Typography gutterBottom>
							      	<strong>Forma de Entrega:</strong> {pedido.formaEntrega}
							      </Typography>
							      {pedido.formaEntrega === 'Correios' ? (
							      	<div>
								      	<Typography gutterBottom>
									      	<strong>Serviço Correios:</strong> {pedido.servicoCorreios}
									      </Typography>
									      {pedido.prazoCorreios ? (
									      	<Typography gutterBottom>
									      		<strong>Prazo Correios:</strong> {pedido.prazoCorreios}
									      	</Typography>
									      ) : null}
									      {pedido.codigoCorreios ? (
													<Typography gutterBottom>
									      		<strong>Código Correios:</strong> {pedido.codigoCorreios}
									      	</Typography>
									      ) : null}
									      {pedido.dataPostagem ? (
									      	<Typography gutterBottom>
										      	<strong>Data da Postagem:</strong> {moment(pedido.dataPostagem).locale('pt-br').format('L')}
										      </Typography>
									      ) : null}
									    </div>
							      ) : null}
							      {pedido.dataEntrega ? (
							      	<Typography gutterBottom>
								      	<strong>Data da Entrega:</strong> {moment(pedido.dataEntrega).locale('pt-br').format('L')}
								      </Typography>
							      ) : null}
							     </div>
					      ) : (
					      	<Typography gutterBottom>
						      	Entrega não definida
						      </Typography>
					      )}
					      <hr/>
					      <Typography variant="subheading" gutterBottom>
					        Pagamento
					      </Typography>
					      {pedido.valorVestidos ? (
					      	<Typography gutterBottom>
					        	<strong>Valor dos Vestidos: </strong> R$ {pedido.valorVestidos}
					      	</Typography>
					      ) : null}
					      {pedido.valorEntrega ? (
					      	<Typography gutterBottom>
					      		<strong>Valor da Entrega: </strong> R$ {pedido.valorEntrega}
					      	</Typography>
					      ) : null}
					      {pedido.desconto ? (
					      	<Typography gutterBottom>
					      		<strong>Desconto: </strong> R$ {pedido.desconto}
					      	</Typography>
					      ) : null}
					      {pedido.valorTotal ? (
					      	<Typography gutterBottom>
					      		<strong>Valor Total: </strong> R$ {pedido.valorTotal}
					      	</Typography>
					      ) : null}
					      {pedido.formaPagamento ? (
					      	<Typography gutterBottom>
						      	<strong>Forma de Pagamento: </strong>{pedido.formaPagamento}
						      </Typography>
					      ) : null}
					      {pedido.formaPagamento === 'Depósito' && pedido.bancoPagamento ? (
				      		<Typography gutterBottom>
							    	<strong>Banco de Pagamento: </strong>{pedido.bancoPagamento}
							    </Typography>
					      ) : null}
					      {pedido.dataPagamento ? (
					      	<Typography gutterBottom>
						      	<strong>Data do Pagamento: </strong>{moment(pedido.dataPagamento).locale('pt-br').format('L')}
						      </Typography>
					      ) : null}
							</Grid>
							{pedido._id !== "" ? (
								<Grid item xs={12}>
									<Button 
										size="small"
										className={classes.button} 
										variant="raised" 
										style={{backgroundColor: '#C62828', color: 'white'}}
										onClick={this.handleClickOpen}>
						        Remover
						        <Icon className={classes.rightIcon}>delete</Icon>
						      </Button>
								</Grid>
							) : null}
						</Grid>
						<Button
							variant="fab"
							color="primary"
							aria-label="add"
							className={classes.floatButton}
							component={Link}
              to={`/pedidos/editar/${pedido._id}`}>
							<Icon>edit</Icon>
				    </Button>

				    <Dialog
		          open={this.state.open}
		          onClose={this.handleClose}
		          aria-labelledby="alert-dialog-title"
		          aria-describedby="alert-dialog-description"
		        >
		          <DialogTitle id="alert-dialog-title">{"Tem certeza?"}</DialogTitle>
		          <DialogContent>
		            <DialogContentText id="alert-dialog-description">
		              Essa ação removerá todos os dados do pedido.
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
				  </div>
				) : (
          <div className={classes.progressContainer}>
            <CircularProgress className={classes.progress} />
          </div>
        )}
	    </div>
		)
	}
})

PedidosViewComponent.propTypes = {
	classes: PropTypes.object.isRequired
}

export default withStyles(styles)(PedidosViewComponent)
