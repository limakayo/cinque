import { action, extendObservable } from 'mobx'

class UserStore {
	constructor() {
		extendObservable(this, {
			profile: {},
      setProfile: action(function(profile) {
				this.profile = profile
			}),
			removeProfile: action(function() {
				this.profile = {}
			})
		})
	}
}

export default new UserStore()
