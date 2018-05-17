import { action, extendObservable } from 'mobx'
import { URL } from '../utils/Constants'
import Vestido from '../models/Vestido'
import history from '../utils/history'

import { getIdToken } from '../utils/AuthService'

const BEARER = `Bearer ${getIdToken()}`

class VestidoStore {
	constructor() {
		extendObservable(this, {
			vestidos: [],
			vestido: new Vestido(),
			isLoaded: false,
			reset: action(() => {
				this.vestido = new Vestido()
				this.isLoaded = true
			}),
			all: action(() => {
				this.isLoaded = false
				fetch(URL + '/vestidos', {
					headers: {
						'Authorization': BEARER
					}
				})
					.then(response => response.json())
					.then(json => {
						this.vestidos = json
						this.isLoaded = true
					})
					.catch(err => console.log(err))
			}),
			getVestido: action((id) => {
				this.isLoaded = false
				fetch(URL + '/vestidos/' + id, {
					headers: {
						'Authorization': BEARER
					}
				})
					.then(response => response.json())
					.then(json => {
						this.vestido = json
						this.isLoaded = true
					})
					.catch(err => console.log(err))
			}),
			change: action((name, event) => {
				this.vestido[name] = event.target.value
			}),
			post: action(() => {
				fetch(URL + '/vestidos', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
						'Authorization': BEARER
					},
					body: JSON.stringify(this.vestido)
				})
				.then(response => response.json())
				.then(json => {
					history.goBack()
				})
			}),
			put: action(() => {
				fetch(URL + '/vestidos/' + this.vestido._id, {
					method: 'PUT',
					headers: {
						'Content-type': 'application/json',
						'Authorization': BEARER
					},
					body: JSON.stringify(this.vestido)
				})
				.then(response => response.json())
				.then(json => {
					history.goBack()
				})
			}),
			delete: action(() => {
				fetch(URL + '/vestidos/' + this.vestido._id, {
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

export default new VestidoStore()
