import React, { Component } from 'react'
import Content from '../components/layout/Content'
import ClientesComponent from '../components/clientes/Clientes'
import { observer } from 'mobx-react'
import clienteStore from '../stores/ClienteStore'

const ClientesContainer = observer(class ClientesContainer extends Component {
  componentDidMount() {
      clienteStore.all()
  }

	render() {
		return (
			<div>
				<Content 
          title="Clientes">
  				<ClientesComponent
            clientes={clienteStore.clientes}/>
				</Content>
			</div>
		)
	}
})

export default ClientesContainer
