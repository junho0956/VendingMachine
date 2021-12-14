const baseURL = 'http://localhost:3000/menu';
const headers = {'Content-Type':'application/json'};

const API = {
    productStatus: (id) => {
        return fetch(`${baseURL}/product?id=${id}`, {
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
    buyProduct: (basket) => {
        return fetch(`${baseURL}/buy`, {
            method: 'POST',
            body: JSON.stringify({basket}),
            headers
        })
        .then(res => res.json())
    },
    initData: async() => {
        return await Promise.all([
            fetch(`${baseURL}/money`).then(res => res.json()),
            fetch(`${baseURL}/product`).then(res => res.json())
        ])
    }
}