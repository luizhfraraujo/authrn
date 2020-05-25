interface Response {
    token: string;
    user: {
        name: string;
        email: string;
    }
}
export function signIn(): Promise<Response> {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve({
                token: 'h12ghhy189dh9h129hd9hquswhdhasdhiahsuidh1982hd89qhd',
                user: {
                    name: 'Luiz Araújo',
                    email: 'luiz.araujo@teste.com'
                }
            });
        }, 2000)
    });
}