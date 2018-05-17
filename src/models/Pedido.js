import { extendObservable } from 'mobx'

class Pedido {
  constructor() {
    extendObservable(this, {
      _id: '',
      cliente: '',
      vestidos: [],
      valorVestidos: '',
      formaEntrega: '',
      valorEntrega: '',
      prazoCorreios: '',
      servicoCorreios: '',
      codigoCorreios: '',
      dataPostagem: '',
      dataEntrega: '',
      formaPagamento: '',
      bancoPagamento: '',
      dataPagamento: '',
      desconto: '',
      valorTotal: '',
      encomenda: false,
      descricao: ''
    })
  }
}

export default Pedido
