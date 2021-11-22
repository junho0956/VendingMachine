class Myinfo {
    usedMoney = null;
    money = null;
    colaList = [];

    constructor({$target}){
        this.$mymoney = $target.querySelector('.txt-mymoney');
        this.$listCotainer = $target.querySelector('.cont-myitems > .list-item-staged');
        this.$usedMoney = $target.querySelector('.txt-total-money');

        this.initData();
        this.render();
    }

    initData(){
        this.money = localStorage.getItem('money');
        this.usedMoney = localStorage.getItem('usedMoney');
        this.colaList = JSON.parse(localStorage.getItem('colaList'));

        if(!this.money){
            localStorage.setItem('money', 25000);
            this.money = 25000;
        }
        if(!this.usedMoney){
            localStorage.setItem('usedMoney', 0);
            this.usedMoney = 0; 
        }
        if(!this.colaList){
            localStorage.setItem('colaList', JSON.stringify([]));
            this.colaList = [];
        }
    }

    calculateUsedMoney(nextState){
        return nextState.reduce((acc, cur) => acc+cur.count*cur.price, 0);
    }

    getMyColaList(){
        return this.colaList;
    }

    getMyMoney(){
        return this.money;
    }

    setState(nextState){
        if(Array.isArray(nextState)) {
            this.colaList = nextState;
            this.usedMoney = this.calculateUsedMoney(nextState);
            localStorage.setItem('colaList', JSON.stringify(this.colaList));
            localStorage.setItem('usedMoney', this.usedMoney);
        }
        else {
            this.money = nextState;
            localStorage.setItem('money', this.money);
        }
        this.render();
    }

    render(){
        // ! refactor
        // ! 하나의 state만 변경해도 다른 state가 변경되고 있음
        this.$mymoney.innerHTML = writePricePoints(this.money);
        this.$listCotainer.innerHTML = this.colaList.map(item => {
            return `
                <li class="item-staged">
                    <img src=${item.image} alt="" class="img-item">
                    <strong class="txt-item">${item.item}</strong>
                    <span class="num-counter">${item.count}</span>
                </li>
            `
        }).join('');
        this.$usedMoney.innerHTML = writePricePoints(this.usedMoney);
    }
}