import { extendObservable } from 'mobx'

class Cliente {
  constructor() {
    extendObservable(this, {
      _id: '',
      nome: '',
      instagram: '',
      cpf: '',
      email: '',
      cep: '',
      logradouro: '',
      numero: '',
      complemento: '',
      bairro: '',
      cidade: '',
      estado: ''
    })
  }
}

export default Cliente
