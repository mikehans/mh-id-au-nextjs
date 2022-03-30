import dotenv from "dotenv";
dotenv.config();

const auth = async(req, res) => {
    if(req.method === 'POST') {
        const {identifier, password} = req.body;

        // hit up strapi auth
        const url = `${process.env.API_URL}/auth/local`;
        // console.log('url', url)

        const response = await fetch(url,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                identifier: `${process.env.API_USERNAME}`,
                password: `${process.env.API_PASSWORD}`
            })
        });

        // console.log('response', response);
        const json = await response.json();
        // console.log('json', json);

        if(response.status === 200) {
            res.status(response.status).json(json);
        } else {
            res.status(response.status).json({message: response.statusText})
        }


    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).json({message: `Method ${req.method} not allowed`});
    }
};

export default auth;