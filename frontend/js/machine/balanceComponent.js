class BalanceComponent {
    balance = 0;
    
    constructor({
        $target, 
        initBalance, 
        setStateMyinfo, 
        getClientMoney
    }) {
            
        this.$txt_balance = $target.querySelector('.txt-balance');
        this.$withdrawButton = $target.querySelector('.btn-return');
        this.$input = $target.querySelector('.inp-put');
        this.$depositButton = $target.querySelector('.btn-put');
        this.setState(initBalance);

        this.$withdrawButton.addEventListener('click', () => {
            if(this.balance > 0) {
                API.withdraw(this.balance)
                .then(() => {
                    setStateMyinfo(getClientMoney() + Number(this.balance));
                    const withdrawBalance = this.balance;
                    this.setState(0);
                    alert(`거스름돈 ${setPricePoints(withdrawBalance)}원을 출금했습니다.`);
                })
                .catch((error) => {
                    console.error(error);
                    alert('출금을 실패했습니다.');
                })
            }
        })

        // !refactor
        // type check를 확실하게 하도록 흐름을 파악하자
        const deposit = () => {
            if(this.$input.value) {
                if(this.$input.value == 0) {
                    alert('입금액은 최소 1원 이상이어야 합니다.');
                    return;
                }

                if(Number(this.$input.value) <= Number(getClientMoney())){
                    API.deposit(this.$input.value)
                    .then(() => {
                        this.setState(this.balance + Number(this.$input.value));
                        setStateMyinfo(getClientMoney() - Number(this.$input.value));
                        const depositMoney = this.$input.value;
                        this.$input.value = '';
                        this.$input.blur();
                        alert(`자판기에 ${setPricePoints(depositMoney)}원을 입금했습니다.`);
                    })
                    .catch((error) => {
                        console.error(error);
                        alert('입금을 실패했습니다.');
                    })
                }
            }
            else {
                this.$input.focus();
            }
        };

        this.$depositButton.addEventListener('click', (e) => {
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
        this.$txt_balance.innerHTML = setPricePoints(this.balance);
    }
}