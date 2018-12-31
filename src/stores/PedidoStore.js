import { action, extendObservable } from 'mobx'
import { URL } from '../utils/Constants'
import Pedido from '../models/Pedido'
import history from '../utils/history'

import Vestido from '../models/Vestido'

import { getIdToken } from '../utils/AuthService'

const BEARER = `Bearer ${getIdToken()}`

class PedidoStore {
	constructor() {
		extendObservable(this, {
			pedidosAPostar: [],
			pedidosPostados: [],
			pedidosEncomendas: [],
			pedidosEntregues: [],
			vestidos: [],			
			editar: false,
			pedido: new Pedido(),
			isLoaded: false,
			reset: action(() => {
				this.pedido = new Pedido()
				this.vestidos = []
				this.isLoaded = true
				this.editar = false
			}),
			getAPostar: action(() => {
				this.isLoaded = false
				fetch(URL + '/pedidos/pedidosAPostar', {
					headers: {
						'Authorization': BEARER
					}
				})
					.then(response => response.json())
					.then(json => {
						this.pedidosAPostar = json
						this.isLoaded = true
					})
					.catch(err => console.log(err))
			}),
			getPostados: action(() => {
				this.isLoaded = false
				fetch(URL + '/pedidos/pedidosPostados', {
					headers: {
						'Authorization': BEARER
					}
				})
					.then(response => response.json())
					.then(json => {
						this.pedidosPostados = json
						this.isLoaded = true
					})
					.catch(err => console.log(err))
			}),
			getEncomendas: action(() => {
				this.isLoaded = false
				fetch(URL + '/pedidos/pedidosEncomendas', {
					headers: {
						'Authorization': BEARER
					}
				})
					.then(response => response.json())
					.then(json => {
						this.pedidosEncomendas = json
						this.isLoaded = true
					})
					.catch(err => console.log(err))
			}),
			getEntregues: action(() => {
				this.isLoaded = false
				fetch(URL + '/pedidos/pedidosEntregues', {
					headers: {
						'Authorization': BEARER
					}
				})
					.then(response => response.json())
					.then(json => {
						this.pedidosEntregues = json
						this.isLoaded = true
					})
					.catch(err => console.log(err))
			}),
			getPedido: action((id) => {
				this.isLoaded = false
				this.editar = true
				fetch(URL + '/pedidos/' + id, {
					headers: {
						'Authorization': BEARER
					}
				})
					.then(response => response.json())
					.then(json => {
						this.pedido = json
						this.vestidos = this.pedido.vestidos
						this.isLoaded = true
					})
					.catch(err => console.log(err))
			}),
			change: action((name, value) => {
				this.pedido[name] = value
			}),
			clienteSelected: action((cliente) => {
				this.pedido.cliente = cliente._id
			}),
			addVestido: action(() => {
				var vestido = new Vestido()
				vestido.id = this.vestidos.length
				this.vestidos = [...this.vestidos, vestido]
			}),
			removeVestido: action((id) => {
				this.vestidos = this.vestidos.filter((e) => e.id !== id)
				this.pedido.vestidos = this.vestidos
			}),
			changeVestido: action((name, id, value) => {
				var vestido = this.vestidos[id]
				vestido[name] = value
				this.pedido.vestidos = this.vestidos
			}),
			post: action(() => {
				fetch(URL + '/pedidos', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
						'Authorization': BEARER
					},
					body: JSON.stringify(this.pedido)
				})
				.then(response => response.json())
				.then(json => {
					history.goBack()
				})
				.catch(err => console.log(err))
			}),
			put: action(() => {
				fetch(URL + '/pedidos/' + this.pedido._id, {
					method: 'PUT',
					headers: {
						'Content-type': 'application/json',
						'Authorization': BEARER
					},
					body: JSON.stringify(this.pedido)
				})
				.then(response => response.json())
				.then(json => {
					history.goBack()
				})
				.catch(err => console.log(err))
			}),
			delete: action(() => {
				fetch(URL + '/pedidos/' + this.pedido._id, {
					method: 'DELETE',
					headers: {
						'Authorization': BEARER
					}
				})
				.then(response => response.json())
				.then(json => {
					history.goBack()
				})
				.catch(err => console.log(err))
			})
		})
	}
}

export default new PedidoStore()
