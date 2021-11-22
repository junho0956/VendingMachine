class Menu {
    cola = [];
    addCola = null;
    constructor({$target, cola, addCola}){
        this.cola = cola;
        this.$menu = $target.querySelector('.list-item');
        this.addCola = addCola;
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
        console.log(this.cola);
        this.$menu.innerHTML = this.cola.map((item) => {
            return `
                <li>
                    <button 
                    class="btn-item"
                    id=${item.id}
                >   
                    <img src="${item.image}" alt="클릭시 ${item.item}을 장바구니에 추가합니다." class="${item.count > 0 ? 'img-item' : 'img-item soldout'}">
                    <strong class="tit-item">${item.item}</strong>
                    <span class="txt-item">${writePricePoints(item.price)}원</span>
                </button>
                </li>
            `
        }).join('');

        Array.from(this.$menu.children).forEach((child) => {
            child.addEventListener('click', (e) => {
                if(!e.currentTarget.children[0].classList.contains('select')){
                    e.currentTarget.children[0].classList.add('select');
                }
                this.addCola(e.currentTarget.children[0].id);
            })
        })
    }
}