import { action, extendObservable } from 'mobx'
import { URL } from '../utils/Constants'
import Compra from '../models/Compra'
import history from '../utils/history'

import { getIdToken } from '../utils/AuthService'

const BEARER = `Bearer ${getIdToken()}`

class CompraStore {
	constructor() {
		extendObservable(this, {
			compras: [],
			compra: new Compra(),
			isLoaded: false,
			reset: action(() => {
				this.compra = new Compra()
				this.isLoaded = true
			}),
			all: action(() => {
				this.isLoaded = false
				fetch(URL + '/compras', {
					headers: {
						'Authorization': BEARER
					}
				})
					.then(response => response.json())
					.then(json => {
						this.compras = json
						this.isLoaded = true
					})
					.catch(err => console.log(err))
			}),
			getCompra: action((id) => {
				this.isLoaded = false
				fetch(URL + '/compras/' + id, {
					headers: {
						'Authorization': BEARER
					}
				})
					.then(response => response.json())
					.then(json => {
						this.compra = json
						this.isLoaded = true
					})
					.catch(err => console.log(err))
			}),
			change: action((name, event) => {
				this.compra[name] = event.target.value
			}),
			post: action(() => {
				fetch(URL + '/compras', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
						'Authorization': BEARER
					},
					body: JSON.stringify(this.compra)
				})
				.then(response => response.json())
				.then(json => {
					history.goBack()
				})
			}),
			put: action(() => {
				fetch(URL + '/compras/' + this.compra._id, {
					method: 'PUT',
					headers: {
						'Content-type': 'application/json',
						'Authorization': BEARER
					},
					body: JSON.stringify(this.compra)
				})
				.then(response => response.json())
				.then(json => {
					history.goBack()
				})
			}),
			delete: action(() => {
				fetch(URL + '/compras/' + this.compra._id, {
					method: 'DELETE',
					headers: {
						'Authorization': BEARER
					}
				})
				.then(response => response.json())
				.then(json => {
					history.goBack()
				})
			})
		})
	}
}

export default new CompraStore()
