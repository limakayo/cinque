import React, { Component } from 'react'
import Content from '../components/layout/Content'
import ComprasComponent from '../components/compras/Compras'
import { observer } from 'mobx-react'
import compraStore from '../stores/CompraStore'

const ComprasContainer = observer(class ComprasContainer extends Component {
  componentDidMount() {
      compraStore.all()
  }

	render() {
		return (
			<div>
				<Content 
          title="Compras">
  				<ComprasComponent
            compras={compraStore.compras}/>
				</Content>
			</div>
		)
	}
})

export default ComprasContainer
