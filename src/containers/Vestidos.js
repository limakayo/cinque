import React, { Component } from 'react'
import Content from '../components/layout/Content'
import VestidosComponent from '../components/vestidos/Vestidos'
import { observer } from 'mobx-react'
import vestidoStore from '../stores/VestidoStore'

const VestidosContainer = observer(class VestidosContainer extends Component {
  componentDidMount() {
      vestidoStore.all()
  }

	render() {
		return (
			<div>
				<Content
          title="Vestidos">
  				<VestidosComponent
            vestidos={vestidoStore.vestidos}/>
				</Content>
			</div>
		)
	}
})

export default VestidosContainer
