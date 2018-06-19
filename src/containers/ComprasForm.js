import React, { Component } from 'react'
import Content from '../components/layout/Content'
import ComprasFormComponent from '../components/compras/ComprasForm'
import { observer } from 'mobx-react'
import compraStore from '../stores/CompraStore'

const ComprasFormContainer = observer(class ComprasFormContainer extends Component {
  state = {
    title: 'Cadastrar Compra'
  }

  componentDidMount() {
    compraStore.reset()
    const id = this.props.match.params.id
    if (id !== undefined) {
      this.setState({ title: 'Editar Compra'})
      compraStore.getCompra(id)
    }
  }

  handleChange(name, event) {
    if (event.target === undefined) return;
    if (name !== 'valor')
      event.target.value = event.target.value.charAt(0).toUpperCase() + event.target.value.slice(1)
    
    compraStore.change(name, event)
  }

  handleSubmit() {
    if (compraStore.compra._id !== "")
      compraStore.put()
    else
      compraStore.post()
  }

  handleDelete() {
    compraStore.delete()
  }

	render() {
		return (
			<div>
				<Content
          action="back"
          title={this.state.title}>
  				<ComprasFormComponent
            handleChange={this.handleChange.bind(this)}
            handleSubmit={this.handleSubmit.bind(this)}
            handleDelete={this.handleDelete.bind(this)}/>
				</Content>
			</div>
		)
	}
})

export default ComprasFormContainer
