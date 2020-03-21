//   Métodos do controller: 
//   Index   => Retorna uma listagem de itens (Sessão)
//   Show    => Retorna um único item
//   Store   => Criar um novo item
//   Update  => Atualizar um item existente
//   Destroy => Excluir um item existente

const User = require('../models/User');

module.exports = {
    async store(req, res) {
        const {email} = req.body;
        let user = await User.findOne({
            email
        })
        if (!user) {
            user = await User.create({
                email
            });
        }    

        return res.json(user)    
    }
}