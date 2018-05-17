import { action, extendObservable } from 'mobx'
import { URL } from '../utils/Constants'
import Cliente from '../models/Cliente'
import history from '../utils/history'

import { getIdToken } from '../utils/AuthService'

const BEARER = `Bearer ${getIdToken()}`

class ClienteStore {
	constructor() {
		extendObservable(this, {
			clientes: [],
			cliente: new Cliente(),
			erroCEP: false,
			isLoaded: false,
			reset: action(() => {
				this.cliente = new Cliente()
				this.isLoaded = true
			}),
			all: action(() => {
				this.isLoaded = false
				fetch(URL + '/clientes', {
					headers: {
						'Authorization': BEARER
					}
				})
					.then(response => response.json())
					.then(json => {
						this.clientes = json
						this.isLoaded = true
					})
					.catch(err => console.log(err))
			}),
			getCliente: action((id) => {
				this.isLoaded = false
				fetch(URL + '/clientes/' + id, {
					headers: {
						'Authorization': BEARER
					}
				})
					.then(response => response.json())
					.then(json => {
						this.cliente = json
						this.isLoaded = true
					})
					.catch(err => console.log(err))
			}),
			change: action((name, event) => {
				this.cliente[name] = event.target.value
			}),
			post: action(() => {
				fetch(URL + '/clientes', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
						'Authorization': BEARER
					},
					body: JSON.stringify(this.cliente)
				})
				.then(response => response.json())
				.then(json => {
					history.goBack()
				})
			}),
			put: action(() => {
				fetch(URL + '/clientes/' + this.cliente._id, {
					method: 'PUT',
					headers: {
						'Content-type': 'application/json',
						'Authorization': BEARER
					},
					body: JSON.stringify(this.cliente)
				})
				.then(response => response.json())
				.then(json => {
					history.goBack()
				})
			}),
			delete: action(() => {
				fetch(URL + '/clientes/' + this.cliente._id, {
					method: 'DELETE',
					headers: {
						'Authorization': BEARER
					}
				})
				.then(response => response.json())
				.then(json => {
					history.goBack()
				})
			}),
			cep: action((value) => {
				fetch(`https://viacep.com.br/ws/${value}/json/`)
					.then(response => response.json())
					.then(json => {
						if (json.erro) {
							this.erroCEP = true
						} else {
							this.cliente.logradouro = json.logradouro
							this.cliente.bairro = json.bairro
							this.cliente.cidade = json.localidade
							this.cliente.estado = json.uf
						}
					})
					.catch(err => console.log(err))
			})
		})
	}
}

export default new ClienteStore()
