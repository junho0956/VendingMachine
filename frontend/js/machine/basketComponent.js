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
        return this.basket.find(product => product.id == id);
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
        this.$basket.innerHTML = this.basket.map(product => {
            return `
                <li class="item-staged">
                    <img src=${product.image} alt="" class="img-item">
                    <strong class="txt-item">${product.item}</strong>
                    <span class="ir">${product.item}을 ${product.count}개 선택하셨습니다.</span>
                    <span class="num-counter">${product.count}</span>
                </li>
            `
        }).join('');
    }
}