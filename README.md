# Vending Machine
사용 스택 - html, css, javascript

### 목표
자바스크립트로 상태관리 연습하기

### 실행

> `$ git clone https://github.com/junho0956/VendingMachine.git`

> `$ cd .VendingMachine/server`

> `$ npm i`

> `$ npm start` (*default port : 3000*)

Open `index.html ` with Live server  

### 구조
```
- resource
    └─ img
    └─ js
        └─ machine
        │   └─ balanceComponent.js
        │   └─ basketComponent.js
        │   └─ machine.js
        │   └─ menuComponent.js
        │   └─ productList.js
        └─ myinfo
        │   └─ myinfoComponent.js
        └─ App.js
        └─ data.js
        └─ modules.js
    └─ style
- server
    └─ controller / menu.js
    └─ model / menu.js
    └─ router / menu.js
    └─ static
    │   └─ img
    └─ app.js
```

### API
|action|method|source|request|response|status|
|:---:|:---:|:---:|:---:|:---:|:---:|
|자판기 잔액 가져오기|GET|`/money`||`{money}`|200|
|자판기 재고 가져오기|GET|`/product`||`{productType[]}`|200|
|자판기 특정 재고 가져오기|GET|`/product?id`||`{productType}`|200|
|자판기 입금하기|PUT|`/deposit`|`{money}`|`{money}`|201|
|자판기 출금하기|PUT|`/withdraw`|`{money}`||204|
|상품 구매하기|POST|`/buy`|`{[basket]}`|`{result, money, product}`|201|

### 결과물
![img](example.PNG)