class MenuComponent {
    $menu = null;
    productList = null;

    constructor({
        $target,
        initProducts,
        selectProduct
    }){
        
        this.$menu = $target.querySelector('.list-item');
        this.productList = new ProductList(initProducts);

        this.$menu.addEventListener('click', (e) => {
            const button = e.target.closest('button');
            if(button){
                if(!button.classList.contains('select')) {
                    button.classList.add('select');
                }
                selectProduct(button.id);
            }
        })

        this.render(this.productList.getProducts());
    }

    initSelected(){
        Array.from(this.$menu.children).forEach(v => {
            if(v.children[0].classList.contains('select')){
                v.children[0].classList.remove('select');
            }
        })
    }

    setState(nextState) {
        this.productList.setState(nextState);
        this.render(this.productList.getProducts());
    }

    render(products) {
        this.$menu.innerHTML = products.map((product) => {
            return `
                <li class="${product.count === 0 ? 'soldout' : ''}">
                    <button 
                    class="btn-item"
                    id=${product.id}
                >   
                    <img src="${product.image}" alt="클릭시 ${product.item}을 장바구니에 추가합니다." class="img-item">
                    <strong class="tit-item">${product.item}</strong>
                    <span class="txt-item">${setPricePoints(product.price)}원</span>
                </button>
                </li>
            `
        }).join('');
    }
}