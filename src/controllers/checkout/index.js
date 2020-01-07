const initiate = (req, res) => {
  //under construction (não remover)
  
  //aqui serve para criarmos o carrinho
}

const create = (req, res) => {
  //under construction (não remover)
  // https://docs.pagar.me/docs/inserindo-o-checkout

  let checkoutOptions = {
    amount: 8000,
    createToken: true,
    postbackUrl: '',
    paymentMethods: 'redit_card',
    customerData: false,
    customer: {
      external_id: '#123456789', //codigo do cliente no meu sistema
      name: 'Fulano',
      type: 'individual',
      country: 'br',
      email: 'fulano@email.com',
      documents: [
        {
          type: 'cpf',
          number: '71404665560',
        },
      ],
      phone_numbers: ['+5511999998888', '+5511888889999'],
      birthday: '1985-01-01',
    },
    items: [
      {
        id: '1', //codigo do meu produto/serviço
        title: 'Bola de futebol',
        unit_price: 12000,
        quantity: 1,
        tangible: true
      }
    ]
  };

  return res.status(200).json(checkoutOptions);
}

export {
  initiate,
  create,
}