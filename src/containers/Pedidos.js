import React, { Component } from 'react'
import Content from '../components/layout/Content'
import PedidosComponent from '../components/pedidos/Pedidos'
import { observer } from 'mobx-react'
import pedidoStore from '../stores/PedidoStore'

const PedidosContainer = observer(class PedidosContainer extends Component {
  componentDidMount() {
      pedidoStore.getAPostar()
      pedidoStore.getPostados()
      pedidoStore.getEncomendas()
      pedidoStore.getEntregues()
  }

	render() {
		return (
			<div>
				<Content
          title="Pedidos">
  				<PedidosComponent
            pedidosAPostar={pedidoStore.pedidosAPostar}
            pedidosPostados={pedidoStore.pedidosPostados}
            pedidosEncomendas={pedidoStore.pedidosEncomendas}
            pedidosEntregues={pedidoStore.pedidosEntregues}/>
				</Content>
			</div>
		)
	}
})

export default PedidosContainer
