class BasketComponent {
    basket = [];

    constructor({
        $target,
        buyProducts
    }){

        this.$basket = $target.querySelector('.list-item-staged');
        this.$buyBtn = $target.querySelector('.btn-get');

        this.$buyBtn.addEventListener('click', () => {
            buyProducts(this.basket, this.calculateTotalPrice());
        })
    }

    calculateTotalPrice(){
        return this.basket.reduce((acc, cur) => acc+(cur.price*cur.count), 0);
    }

    checkProductInBasket(id){
        return this.basket.find(cola => cola.id == id);
    }

    getProductForm(productInfo){
       return {
           image: productInfo.image,
           id: productInfo.id,
           price: productInfo.price,
           item: productInfo.item,
           count: 1,
       }
    }

    getBasket(){
        return this.basket;
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