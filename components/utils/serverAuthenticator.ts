import dotenv from "dotenv";

const authenticator = async () => {
    const url = `${process.env.API_URL}/auth/local`;

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

    if(response.status === 200) {
        const json = await response.json();
        return {
            status: 200,
            data: json
        }
    } else {
        return {
            status: response.status,
            message: response.statusText
        }
    }
};

export default authenticator;