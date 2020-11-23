const knex = require('../database');


module.exports = {

    async index (request , response) {
        const results = await knex('t_pacientes').select('*').whereNotNull('telefone_2').whereNull('empresa');

        
        // data processing process
        const formattedResult = results.map(user => ({
            id: user.codigo,
            name: user.nome,
            cadastro: user.datacadastro,
            phone_1: user.telefone_1.replace("(87)", "").replace(".", "").replace(" ", "").replace(/-/g, "").replace(/[A-Z a-z]/g,''),
            phone_2: user.telefone_2.replace("(87)", "").replace(".", "").replace(" ", "").replace(/-/g, "").replace(/[A-Z a-z]/g,''),
            whatsapp: user.empresa,
        }));

        
        //end of data process
      
        //pagination
        const page = parseInt(request.query.page)
        const limit = parseInt(request.query.limit)

 
        const startIndex = (page - 1) * limit
        const endIndex = page * limit
 
        const pages = {}
 
        if (endIndex < formattedResult.length) {
            pages.next = {
                page: page + 1,

                limit: limit,
            }
        }
         
        if (startIndex > 0) {
            pages.previous = {
                page: page - 1,
                limit: limit,
            }
        }
        
        pages.pacients = formattedResult.slice(startIndex, endIndex)
        // end of pagination
        
        const total = parseInt(formattedResult.length);
        
        return response.json({total:total, pages});
    
    },

    async update (request, response, next) {
        try {
            const codigo = parseInt(request.params.id);
            const { empresa } = request.body;
            
            await knex('t_pacientes')
            .update({ empresa })
            .where({ codigo })


            return response.status(200).json('Mensagem Enviada');

        }catch (error) {
            next(error)
        }
    }
}