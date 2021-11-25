class MyinfoComponent {
    usedMoney = null;
    availableMoney = null;
    productList = [];

    constructor({$target}){
        this.$mymoney = $target.querySelector('.txt-mymoney');
        this.$listCotainer = $target.querySelector('.cont-myitems > .list-item-staged');
        this.$usedMoney = $target.querySelector('.txt-total-money');

        this.initData();
        this.render();
    }

    initData(){
        this.availableMoney = localStorage.getItem('availableMoney');
        this.usedMoney = localStorage.getItem('usedMoney');
        this.productList = JSON.parse(localStorage.getItem('productList'));

        if(!this.availableMoney){
            localStorage.setItem('availableMoney', 25000);
            this.availableMoney = 25000;
        }
        if(!this.usedMoney){
            localStorage.setItem('usedMoney', 0);
            this.usedMoney = 0; 
        }
        if(!this.productList){
            localStorage.setItem('productList', JSON.stringify([]));
            this.productList = [];
        }
    }

    calculateUsedMoney(products){
        return products.reduce((acc, cur) => acc+cur.count*cur.price, 0);
    }

    getClientProductList(){
        return this.productList;
    }

    getClientMoney(){
        return this.availableMoney;
    }

    updateProductList(boughtProducts){
        const newProduct = this.productList.map(v => v);
        for(let i = 0; i<boughtProducts.length; i++){
            let update = false;
            for(let j = 0; j<newProduct.length; j++){
                if(boughtProducts[i].id == newProduct[j].id){
                    newProduct[j].count += boughtProducts[i].count;
                    update = true;
                    break;
                }
            }
            if(!update) newProduct.push(boughtProducts[i]);
        }
        return newProduct;
    }

    setState(nextState){
        if(Array.isArray(nextState)) {
            this.productList = this.updateProductList(nextState);
            this.usedMoney = this.calculateUsedMoney(this.productList);
            localStorage.setItem('productList', JSON.stringify(this.productList));
            localStorage.setItem('usedMoney', this.usedMoney);
        }
        else {
            this.availableMoney = nextState;
            localStorage.setItem('availableMoney', this.availableMoney);
        }
        this.render();
    }

    render(){
        // ! refactor
        // ! 하나의 state만 변경해도 다른 state가 변경되고 있음
        this.$mymoney.innerHTML = setPricePoints(this.availableMoney);
        this.$usedMoney.innerHTML = setPricePoints(this.usedMoney);
        this.$listCotainer.innerHTML = this.productList.map(item => {
            return `
                <li class="item-staged">
                    <img src=${item.image} alt="" class="img-item">
                    <strong class="txt-item">${item.item}</strong>
                    <span class="ir">${item.item}을 ${item.count}개 구매하셨습니다.</span>
                    <span class="num-counter">${item.count}</span>
                </li>
            `
        }).join('');
    }
}