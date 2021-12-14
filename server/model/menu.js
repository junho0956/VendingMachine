export async function getProductById(id){
    return dummyData.products.find(products => products.id == id);
}

export async function getMoney() {
    return dummyData.money;
}

export async function getProducts() {
    return dummyData.products;
}

export async function buyProduct(basket) {
    const requireAmount = basket.reduce((acc, cur) => acc+cur.count*cur.price, 0);
    if(requireAmount <= dummyData.money) {
        let canBuy = true;
        basket.forEach(product => {
            for(let i = 0; i<dummyData.products.length; i++){
                if(dummyData.products[i].id === product.id){
                    if(dummyData.products[i].count < product.count){
                        canBuy = false;
                    }
                    break;
                }
            }
        })

        if(canBuy) {
            basket.forEach(product => {
                for(let i = 0; i<dummyData.products.length; i++){
                    if(dummyData.products[i].id === product.id){
                        if(dummyData.products[i].count >= product.count){
                            dummyData.products[i].count -= product.count;
                        }
                        break;
                    }
                }
            })
            dummyData.money -= requireAmount;
        }
        return {result: canBuy, money: dummyData.money, product: dummyData.products};
    }
    return {result: false, money:dummyData.money, product: dummyData.products};
}

export async function updateDeposit(money) {
    dummyData.money += Number(money);
    return dummyData.money;
}

export async function updateWithDraw() {
    dummyData.money = 0;
    return dummyData.money;
}

const baseURL = 'http://localhost:3000';

const dummyData = {
    money: 0,
    products: [
        {
            id: 1,
            item: "Original Cola",
            count: 5,
            price: 1000,
            image: `${baseURL}/img/Original_Cola.png`,
        },
        {
            id: 2,
            item: "Yellow Cola",
            count: 5,
            price: 1100,
            image: `${baseURL}/img/Yellow_Cola.png`,
        },
        {
            id: 3,
            item: "Violet Cola",
            count: 5,
            price: 1200,
            image: `${baseURL}/img/Violet_Cola.png`,
        },
        {
            id: 4,
            item: "Orange Cola",
            count: 5,
            price: 1300,
            image: `${baseURL}/img/Orange_Cola.png`,
        },
        {
            id: 5,
            item: "Green Cola",
            count: 5,
            price: 1400,
            image: `${baseURL}/img/Green_Cola.png`,
        },
        {
            id: 6,
            item: "Cool Cola",
            count: 5,
            price: 1500,
            image: `${baseURL}/img/Cool_Cola.png`,
        }
    ]
};