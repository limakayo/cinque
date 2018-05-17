import React, { Component } from 'react'
import Content from '../components/layout/Content'
import PedidosViewComponent from '../components/pedidos/PedidosView'
import { observer } from 'mobx-react'
import pedidoStore from '../stores/PedidoStore'

const PedidosViewContainer = observer(class PedidosViewContainer extends Component {

  componentDidMount() {
    pedidoStore.reset()
    const id = this.props.match.params.id
    if (id !== undefined) {
      pedidoStore.getPedido(id)
    }
  }

  handleDelete() {
    pedidoStore.delete()
  }

	render() {
		return (
			<div>
				<Content
          action="back"
          title='Pedido'>
  				<PedidosViewComponent 
            handleDelete={this.handleDelete.bind(this)}/>
				</Content>
			</div>
		)
	}
})

export default PedidosViewContainer
