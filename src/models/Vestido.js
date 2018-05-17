import { extendObservable } from 'mobx'

class Vestido {
  constructor() {
    extendObservable(this, {
      _id: '',
      nome: '',
      tamanho: '',
      valor: '',
      tecido: '',
      medidas: '',
      descricao: ''
    })
  }
}

export default Vestido
