import { extendObservable } from 'mobx'

class Compra {
  constructor() {
    extendObservable(this, {
      _id: '',
      descricao: '',
      data: '',
      formaPagamento: '',
      valorTotal: '',
      valorMetro: '',
    })
  }
}

export default Compra
