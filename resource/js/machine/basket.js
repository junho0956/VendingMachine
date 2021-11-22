class Basket {
    basket = [];

    constructor({$target, getBalance, setStateBalance, getColaList, setStateMyinfo, requestBuyCola, initSelect, setStateMenu}){
        this.$basket = $target.querySelector('.list-item-staged');
        this.$buyBtn = $target.querySelector('.btn-get');

        this.$buyBtn.addEventListener('click', () => {
            if(this.basket.length){
                const basketPrice = this.getPrice();
                const balance = getBalance();
                if(balance >= basketPrice) {
                    requestBuyCola(this.basket).then(res => {
                        if(res.result) {
                            setStateBalance(balance - basketPrice);
                            setStateMyinfo(this.updateColaList(getColaList()));
                            this.setState([]);
                            initSelect();
                            setStateMenu(res.cola);
                            alert('구매완료');
                        } else {
                            alert('구매할 수 없습니다.');
                            console.error(res);
                        }
                    })
                }
                else {
                    alert('잔액이 부족해 구매할 수 없습니다.');
                    $target.querySelector('.inp-put').focus();
                }
            } else {
                alert('선택한 상품이 없습니다.');
            }
        })
    }

    updateColaList(colaList){
        const newBasket = colaList.map(v => v);
        const newCola = [];
        for(let i = 0; i<this.basket.length; i++){
            let update = false;
            for(let j = 0; j<newBasket.length; j++){
                if(newBasket[j].id == this.basket[i].id){
                    newBasket[j].count += this.basket[i].count;
                    update = true;
                    break;
                }
            }
            if(!update) newCola.push(this.basket[i]);
        }
        newCola.forEach((v)=> newBasket.push(v));
        return newBasket;
    }

    getPrice(){
        return this.basket.reduce((acc, cur) => acc+(cur.price*cur.count), 0);
    }

    checkColaInBasket(id){
        return this.basket.find(cola => cola.id == id);
    }

    getColaForm(colaInfo){
       return {
           image: colaInfo.image,
           id: colaInfo.id,
           price: colaInfo.price,
           item: colaInfo.item,
           count: 1,
       }
    }

    // 1. 추가하는 작업에는 반드시 백엔드에 콜라가 남아있는지 확인하는 작업 필요함
    // 2. this.cola 에 선택한 cola가 이미 존재하는지 확인
    //      없으면 백엔드에 콜라 정보 가져오고,
    //      있으면 count만 추가시켜줌
    // 3. 선택한 품목을 더 추가할 수 있는지 체크해야한다.
    async addCola(selectId){
        const colaStatus = await api.colaStatus(selectId);
        if(colaStatus.count>0){
            const result = this.checkColaInBasket(selectId);
            if(result) {
                let checkIn = true;
                const nextState = this.basket.map(cola => {
                    if(selectId != cola.id) return cola;
                    else {
                        if(cola.count+1 > colaStatus.count) {
                            checkIn = false;
                            return cola;
                        }
                        return {...cola, count: ++cola.count};
                    }
                })
                if(checkIn){
                    this.setState(nextState);
                }
                else{
                    alert('더이상 구매할 수 없습니다.');
                }
            }
            else {
                const nextState = this.basket.concat(this.getColaForm(colaStatus))
                this.setState(nextState);
            }
        } else {
            // cant add cola
            alert('선택하신 상품은 재고가 없습니다.');
        }
    }

    setState(nextState){
        this.basket = nextState;
        this.render();
    }

    render(){
        this.$basket.innerHTML = this.basket.map(cola => {
            return `
                <li class="item-staged">
                    <img src=${cola.image} alt="" class="img-item">
                    <strong class="txt-item">${cola.item}</strong>
                    <span class="ir">${cola.item}을 ${cola.count}개 선택하셨습니다.</span>
                    <span class="num-counter">${cola.count}</span>
                </li>
            `
        }).join('');


    }
}