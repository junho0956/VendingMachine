class Balance {
    balance = null;
    
    constructor({$target, balance, requestWithdraw, requestDeposit, setStateMyinfo, getMyMoney}) {
        this.$txt_balance = $target.querySelector('.txt-balance');
        this.$withdrawButton = $target.querySelector('.btn-return');
        this.$input = $target.querySelector('.inp-put');
        this.$depositButton = $target.querySelector('.btn-put');
        this.setState(balance);

        this.$withdrawButton.addEventListener('click', () => {
            if(this.balance > 0) {
                requestWithdraw(this.balance)
                .then(() => {
                    setStateMyinfo(getMyMoney() + Number(this.balance));
                    alert(`거스름돈 ${writePricePoints(this.balance)}원을 출금했습니다.`);
                    this.setState(0);
                })
            }
        })

        const deposit = () => {
            if(this.$input.value) {
                if(this.$input.value <= getMyMoney()){
                    requestDeposit(this.$input.value)
                    .then(res => {
                        this.setState(this.balance + Number(this.$input.value));
                        setStateMyinfo(getMyMoney() - Number(this.$input.value));
                        alert(`자판기에 ${writePricePoints(this.$input.value)}원을 입금했습니다.`);
                        this.$input.value = '';
                        this.$input.blur();
                    })
                }
            }
            else {
                this.$input.focus();
            }
        };

        this.$depositButton.addEventListener('click', e => {
            deposit();
        });
        this.$input.addEventListener('keyup', (e) => {
            if(e.key === 'Enter') deposit();
        })

    }

    getBalance(){
        return this.balance;
    }

    setState(nextBalance){
        this.balance = nextBalance;
        this.render();
    }
    
    render(){
        this.$txt_balance.innerHTML = writePricePoints(this.balance);
    }
}