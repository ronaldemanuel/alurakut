import { SiteClient } from 'datocms-client';

export default async function reciverRequests(req, res) {
    if(req.method === 'POST') {
        const TOKEN = process.env.REACT_APP_API_TOKEN_ACCESS;
        const client = new SiteClient(TOKEN);

        //Validar os dados, antes de sair cadastrando
        const recordCreated = await client.items.create({
            itemType: "971606",
            ...req.body,
        })
    
        res.json({
            recordCreated: recordCreated,
        })
        return;
    }

    res.status(404).json({
        message: 'Ainda não temos nada no GET, mas no POST tem!'
    });
}