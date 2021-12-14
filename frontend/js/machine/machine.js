class App {
    $target = null;
    $menu = null;
    $balance = null;
    $basket = null;
    $myinfo = null;

    constructor($target){
        this.$target = $target;

        API.initData()
        .then((data) => {

            this.$menu = new MenuComponent({
                $target,
                initProducts: data[1],
                selectProduct: (id) => this.selectProduct(id),
            })
            
            this.$balance = new BalanceComponent({
                $target,
                initBalance: data[0],
                setStateMyinfo: (nextState) => this.$myinfo.setState(nextState),
                getClientMoney: () => this.$myinfo.getClientMoney()
            })

            this.$basket = new BasketComponent({
                $target,
                buyProducts: (basket, totalPrice) => this.buyProducts(basket, totalPrice)
            })
            
            this.$myinfo = new MyinfoComponent({
                $target
            })

        })
        .catch(error => {
            console.error(error);
        })
    }


    async selectProduct(id){
        const productStatus = await API.productStatus(id);
        if(productStatus.count>0){
            const result = this.$basket.checkProductInBasket(id);
            
            if(result) {
                let canBuy = true;
                const nextState = this.$basket.getBasket().map(product => {
                    if(id != product.id) {
                        return product;
                    } else {
                        if(product.count+1 > productStatus.count) {
                            canBuy = false;
                            return product;
                        }
                        return {...product, count: ++product.count};
                    }
                })

                if(canBuy){
                    this.$basket.setState(nextState);
                } else{
                    alert('더이상 구매할 수 없습니다.');
                }
            }
            else {
                const nextState = this.$basket.getBasket().concat(this.$basket.getProductForm(productStatus))
                this.$basket.setState(nextState);
            }
        } else {
            alert('선택하신 상품은 재고가 없습니다.');
        }
    }

    async buyProducts(basket, totalPrice){
        if(basket.length){
            const balance = this.$balance.getBalance();
            if(balance >= totalPrice) {
                API.buyProduct(basket)
                .then(res => {
                    if(res.result) {
                        this.$balance.setState(balance - totalPrice);
                        this.$myinfo.setState(basket);
                        this.$basket.setState([]);
                        this.$menu.initSelected();
                        this.$menu.setState(res.cola);
                        alert('구매완료');
                    } else {
                        console.error(res);
                        alert('구매 실패하였습니다.')
                    }
                })
                .catch((error) => {
                    console.error(error);
                    alert('구매 실패하였습니다.')
                })
            }
            else {
                alert('잔액이 부족해 구매할 수 없습니다.');
                this.$target.querySelector('.inp-put').focus();
            }
        } else {
            alert('선택한 상품이 없습니다.');
        }
    }

}