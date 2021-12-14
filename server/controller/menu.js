import * as menuRepository from '../model/menu.js';

export async function getMoney(req, res, next) {
    try{
        const money = await menuRepository.getMoney();
        return res.status(200).json(money);
    }
    catch(error){
        console.error(error);
    }
}

export async function getProduct(req, res, next) {
    try{
        if(req.query.id){
            const product = await menuRepository.getProductById(req.query.id);
            return res.status(200).json(product);
        } else {
            const products = await menuRepository.getProducts();
            return res.status(200).json(products);
        }
    }
    catch(error){
        console.error(error);
    }
}

export async function buyProduct(req, res, next){
    try{
        const resDataStatus = await menuRepository.buyProduct(req.body.basket);
        return res.status(201).json(resDataStatus);
    }
    catch(error){
        console.error(error);
    }
}

export async function updateDeposit(req, res, next) {
    try{
        const result = await menuRepository.updateDeposit(req.body.money);
        return res.status(201).json(result);
    }
    catch(error){
        console.error(error);
    }
}

export async function updateWithDraw(req, res, next) {
    try{
        const withdrawResult = await menuRepository.updateWithDraw(req.body.money);
        return res.sendStatus(204)
    }
    catch(error){
        console.error(error);
    }
}