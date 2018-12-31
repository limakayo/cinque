import { extendObservable } from 'mobx'

class Vestido {
  constructor() {
    extendObservable(this, {
      descricao: '',
      tamanho: '',
      valor: ''
    })
  }
}

export default Vestido
