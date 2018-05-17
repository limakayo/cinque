import React, { Component } from 'react'
import Content from '../components/layout/Content'
import ClientesFormComponent from '../components/clientes/ClientesForm'
import { observer } from 'mobx-react'
import clienteStore from '../stores/ClienteStore'

const ClientesFormContainer = observer(class ClientesFormContainer extends Component {
  state = {
    title: 'Cadastrar Cliente'
  }

  componentDidMount() {
    clienteStore.reset()
    const id = this.props.match.params.id
    if (id !== undefined) {
      this.setState({ title: 'Editar Cliente'})
      clienteStore.getCliente(id)
    }
  }

  handleChange(name, event) {
    if (name !== 'instagram' && name !== 'email') {
      event.target.value = event.target.value.charAt(0).toUpperCase() + event.target.value.slice(1)
    }
    clienteStore.change(name, event)
  }

  handleBlur(name, event) {
    if (name === 'cep' && event.target.value.length === 9) {
      let value = event.target.value.slice(0,5) + event.target.value.slice(6,9)
      clienteStore.cep(value)
    }
  }

  handleSubmit() {
    if (clienteStore.cliente._id !== "")
      clienteStore.put()
    else
      clienteStore.post()
  }

  handleDelete() {
    clienteStore.delete()
  }

	render() {
		return (
			<div>
				<Content
          action="back"
          title={this.state.title}>
  				<ClientesFormComponent
            handleChange={this.handleChange.bind(this)}
            handleSubmit={this.handleSubmit.bind(this)}
            handleDelete={this.handleDelete.bind(this)}
            handleBlur={this.handleBlur.bind(this)}/>
				</Content>
			</div>
		)
	}
})

export default ClientesFormContainer
