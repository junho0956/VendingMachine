const baseURL = 'http://localhost:3000/menu';
const headers = {'Content-Type':'application/json'};

const api = {
    colaStatus: (id) => {
        return fetch(`${baseURL}/status/${id}`, {
            method: "GET",
            headers
        })
        .then(res => res.json())
    },
    deposit: (money) => {
        return fetch(`${baseURL}/deposit`, {
            method: 'PUT',
            body: JSON.stringify({money}),
            headers
        })
        .then(res => res.json())
    },
    withdraw: (money) => {
        return fetch(`${baseURL}/withdraw`, {
            method: 'PUT',
            body: JSON.stringify({money}),
            headers
        })
    },
    buyCola: (basket) => {
        return fetch(`${baseURL}/buy`, {
            method: 'POST',
            body: JSON.stringify({basket}),
            headers
        })
        .then(res => res.json())
    },
    init: async() => {
        return await Promise.all([
            fetch(`${baseURL}/money`).then(res => res.json()),
            fetch(`${baseURL}/cola`).then(res => res.json())
        ])
    }
}