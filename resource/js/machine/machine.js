class App {
    $target = null;
    $menu = null;
    $balance = null;

    constructor($target){
        this.$target = $target;

        api.init().then((res) => {

            this.$myinfo = new Myinfo({
                $target
            })

            this.$basket = new Basket({
                $target,
                getBalance: () => this.$balance.getBalance(),
                setStateBalance: (balance) => this.$balance.setState(balance),
                getColaList: this.$myinfo.getMyColaList.bind(this.$myinfo),
                setStateMyinfo: this.$myinfo.setState.bind(this.$myinfo),
                requestBuyCola: api.buyCola,
                initSelect: () => this.$menu.initSelect(),
                setStateMenu: (nextState) => this.$menu.setState(nextState)
            })

            this.$menu = new Menu({
                $target,
                cola: res[1],
                addCola: this.$basket.addCola.bind(this.$basket)
            })

            this.$balance = new Balance({
                $target,
                balance: res[0],
                requestWithdraw: api.withdraw,
                requestDeposit: api.deposit,
                setStateMyinfo: this.$myinfo.setState.bind(this.$myinfo),
                getMyMoney: this.$myinfo.getMyMoney.bind(this.$myinfo)
            })

        })


    }

}