import React, { Component } from 'react'
import Content from '../components/layout/Content'
import PedidosFormComponent from '../components/pedidos/PedidosForm'
import { observer } from 'mobx-react'
import pedidoStore from '../stores/PedidoStore'
import clienteStore from '../stores/ClienteStore'

const PedidosFormContainer = observer(class PedidosFormContainer extends Component {
  constructor() {
    super()
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleClienteSelected = this.handleClienteSelected.bind(this)
    this.addVestido = this.addVestido.bind(this)
    this.removeVestido = this.removeVestido.bind(this)
    this.changeVestido = this.changeVestido.bind(this)
  }
  state = {
    title: 'Cadastrar Pedido',
  }

  componentDidMount() {
    pedidoStore.reset()
    this.addVestido()
    const id = this.props.match.params.id
    if (id !== undefined) {
      this.setState({ title: 'Editar Pedido', editar: true })
      pedidoStore.getPedido(id)
    }
    clienteStore.all()
  }

  somaVestidos() {
    var valores = []
    for(var i = 0; i < pedidoStore.pedido.vestidos.length; i++) {
      valores = [...valores, pedidoStore.pedido.vestidos[i].valor]
    }
    return this.somaValores(valores)
  }

  capitalize(string) {
    return string.replace(/(^|\s)\S/g, l => l.toUpperCase())
  }

  somaValores(valores) {
    var soma = 0.0
    for (var k = valores.length - 1; k >= 0; k--) {
      var valor = parseFloat( ('0' + valores[k]).replace(/[^0-9-]/g, ''), 10 );
      soma = soma + valor
    }
    soma = soma.toString()
    var len = soma.length
    var currency = soma.substring(0, len-2) + ',' + soma.substring(len-2)
    if (soma === '0') {
      currency = '0,00'
    }
    return currency
  }

  somaTotal() {
    var valores = []
    var valorVestidos = pedidoStore.pedido.valorVestidos
    var valorEntrega = pedidoStore.pedido.valorEntrega
    var valorDesconto = pedidoStore.pedido.desconto
    valores.push(valorVestidos)
    valores.push(valorEntrega)
    valores.push(valorDesconto)
    return this.somaValores(valores)
  }

  handleChange(name, event) {
    let value = event.target ? event.target.value : event

    if (name === 'encomenda') {
      value = event.target.checked
    }

    pedidoStore.change(name, value)

    var total = this.somaTotal()
    pedidoStore.change('valorTotal', total)
  }

  addVestido() {
    pedidoStore.addVestido()
  }

  removeVestido(id) {
    pedidoStore.removeVestido(id)
    var valorVestidos = this.somaVestidos()
    pedidoStore.change('valorVestidos', valorVestidos)
  }

  changeVestido(name, id, event) {
    let value = event.target ? event.target.value : event
    if (name === 'descricao') {
      value = this.capitalize(value)
    }
    if (name === 'valor') {
      var valorVestidos = this.somaVestidos()
      pedidoStore.change('valorVestidos', valorVestidos)
    }
    pedidoStore.changeVestido(name, id, value)
  }

  handleSubmit() {
    if (pedidoStore.pedido._id !== "") pedidoStore.put()
    else pedidoStore.post()
  }
  
  handleClienteSelected(cliente) {
    pedidoStore.clienteSelected(cliente)
  }

	render() {
		return (
			<div>
				<Content
          action="back"
          title={this.state.title}>
  				<PedidosFormComponent
            pedido={pedidoStore.pedido}
            editar={pedidoStore.editar}
            isLoaded={pedidoStore.isLoaded}
            clientes={clienteStore.clientes}
            vestidos={pedidoStore.vestidos}
            changeVestido={this.changeVestido}
            removeVestido={this.removeVestido}
            addVestido={this.addVestido}
            handleChange={this.handleChange}
            handleSubmit={this.handleSubmit}
            handleClienteSelected={this.handleClienteSelected}/>
				</Content>
			</div>
		)
	}
})

export default PedidosFormContainer
