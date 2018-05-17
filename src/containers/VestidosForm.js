import React, { Component } from 'react'
import Content from '../components/layout/Content'
import VestidosFormComponent from '../components/vestidos/VestidosForm'
import { observer } from 'mobx-react'
import vestidoStore from '../stores/VestidoStore'

const VestidosFormContainer = observer(class VestidosFormContainer extends Component {
  state = {
    title: 'Cadastrar Vestido'
  }

  componentDidMount() {
    vestidoStore.reset()
    const id = this.props.match.params.id
    if (id !== undefined) {
      this.setState({ title: 'Editar Vestido'})
      vestidoStore.getVestido(id)
    }
  }

  handleChange(name, event) {
    if (event.target === undefined) return;
    if (name !== 'valor')
      event.target.value = event.target.value.charAt(0).toUpperCase() + event.target.value.slice(1)
    
    vestidoStore.change(name, event)
  }

  handleSubmit() {
    if (vestidoStore.vestido._id !== "")
      vestidoStore.put()
    else
      vestidoStore.post()
  }

  handleDelete() {
    vestidoStore.delete()
  }

	render() {
		return (
			<div>
				<Content
          action="back"
          title={this.state.title}>
  				<VestidosFormComponent
            handleChange={this.handleChange.bind(this)}
            handleSubmit={this.handleSubmit.bind(this)}
            handleDelete={this.handleDelete.bind(this)}/>
				</Content>
			</div>
		)
	}
})

export default VestidosFormContainer
