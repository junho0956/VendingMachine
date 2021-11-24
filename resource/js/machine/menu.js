class Menu {
    cola = [];
    addCola = null;
    constructor({$target, cola, addCola}){
        this.cola = cola;
        this.$menu = $target.querySelector('.list-item');
        this.addCola = addCola;

        this.$menu.addEventListener('click', (e) => {
            const button = e.target.closest('button');
            if(!button.classList.contains('select')) {
                button.classList.add('select');
            }
            addCola(button.id);
        })

        this.render();
    }

    initSelect(){
        Array.from(this.$menu.children).forEach(v => {
            if(v.children[0].classList.contains('select')){
                v.children[0].classList.remove('select');
            }
        })
    }

    setState(nextState) {
        this.cola = nextState;
        this.render();
    }

    render() {
        this.$menu.innerHTML = this.cola.map((item) => {
            return `
                <li class="${item.count === 0 ? 'soldout' : ''}">
                    <button 
                    class="btn-item"
                    id=${item.id}
                >   
                    <img src="${item.image}" alt="클릭시 ${item.item}을 장바구니에 추가합니다." class="img-item">
                    <strong class="tit-item">${item.item}</strong>
                    <span class="txt-item">${writePricePoints(item.price)}원</span>
                </button>
                </li>
            `
        }).join('');
    }
}