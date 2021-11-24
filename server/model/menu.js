export async function getStatus(id){
    return dummyData.cola.find(cola => cola.id == id);
}

export async function getMoney() {
    return dummyData.money;
}

export async function getCola() {
    return dummyData.cola;
}

export async function buyCola(basket) {
    // money validate (client에서 진행했어도 백에서도 꼭 검증해주자)
    const requireAmount = basket.reduce((acc, cur) => acc+cur.count*cur.price, 0);
    if(requireAmount <= dummyData.money) {
        // basket 에는 사려고하는 콜라가 들어있는데
        // dummyData 각각 탐색하는데는 총 O(NM) 의 많은 시간복잡도가 필요
        // 물론 여기서는 안해도 되는 데이터양이지만,
        // 데이터가 많아지는 곳에서는 알고리즘을 고려해주자

        // 최소한의 트랜잭션을 만족시키기 위해
        // 각 콜라의 구매갯수도 validate해서 
        // 단 하나의 콜라라도 살수없는 오류가 있다면
        // 구매못하도록 막자
        let canBuy = true;
        basket.forEach(cola => {
            for(let i = 0; i<dummyData.cola.length; i++){
                if(dummyData.cola[i].id === cola.id){
                    if(dummyData.cola[i].count < cola.count){
                        canBuy = false;
                    }
                    break;
                }
            }
        })

        if(canBuy) {
            basket.forEach(cola => {
                for(let i = 0; i<dummyData.cola.length; i++){
                    if(dummyData.cola[i].id === cola.id){
                        if(dummyData.cola[i].count >= cola.count){
                            dummyData.cola[i].count -= cola.count;
                            // if(dummyData.cola[i].count == 0){
                            //     dummyData.cola[i].image = `${baseURL}/img/Sold-out.png`;
                            // }
                        }
                        break;
                    }
                }
            })
            dummyData.money -= requireAmount;
        }
        return {result: canBuy, money: dummyData.money, cola: dummyData.cola};
    }
    return {result: false, money:dummyData.money, cola: dummyData.cola};
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
    cola: [
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