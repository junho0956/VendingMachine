class ProductList {

    products = [];

    constructor(initProducts){
        this.products = initProducts;
    }
    
    getProducts(){
        return this.products;    
    }
    
    // 정렬이 되어있지 않다고 가정
    getProduct(id) {
        return this.products.find(product => product.id == id);
    }
    
    setState(nextState) {
        this.products = nextState;
    }
}