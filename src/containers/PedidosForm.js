import React, { Component } from 'react'
import Content from '../components/layout/Content'
import PedidosFormComponent from '../components/pedidos/PedidosForm'
import { observer } from 'mobx-react'
import pedidoStore from '../stores/PedidoStore'
import clienteStore from '../stores/ClienteStore'
import vestidoStore from '../stores/VestidoStore'

const PedidosFormContainer = observer(class PedidosFormContainer extends Component {
  state = {
    title: 'Cadastrar Pedido',
    vestidosSelecionados: [],
  }

  componentDidMount() {
    pedidoStore.reset()
    const id = this.props.match.params.id
    if (id !== undefined) {
      this.setState({ title: 'Editar Pedido', editar: true })
      pedidoStore.getPedido(id)
    }
    clienteStore.all()
    vestidoStore.all()
  }

  somaVestidos() {
    var valores = []
    var vestidosSelecionados = pedidoStore.editar ? pedidoStore.vestidosId : pedidoStore.pedido.vestidos
    var vestidos = vestidoStore.vestidos

    for (var i = vestidos.length - 1; i >= 0; i--) {
      for (var j = vestidosSelecionados.length - 1; j >= 0; j--) {
        if (vestidos[i]._id === vestidosSelecionados[j]) {
          valores.push(vestidos[i].valor)
        }
      }
    }

    return this.somaValores(valores)
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

    if (name === 'vestidos') {
      var currency = this.somaVestidos()
      pedidoStore.change('valorVestidos', currency)
    }

    var total = this.somaTotal()
    pedidoStore.change('valorTotal', total)
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
            vestidosId={pedidoStore.vestidosId}
            isLoaded={pedidoStore.isLoaded}
            clientes={clienteStore.clientes}
            vestidos={vestidoStore.vestidos}
            handleChange={this.handleChange.bind(this)}
            handleSubmit={this.handleSubmit.bind(this)}
            handleClienteSelected={this.handleClienteSelected.bind(this)}/>
				</Content>
			</div>
		)
	}
})

export default PedidosFormContainer
