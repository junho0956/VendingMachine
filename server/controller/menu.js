import * as menuRepository from '../model/menu.js';

export async function getStatus(req, res, next) {
    try{
        const colaStatus = await menuRepository.getStatus(req.params.id);
        return res.status(200).json(colaStatus);
    }
    catch(error){
        console.error(error);
    }
}

export async function getMoney(req, res, next) {
    try{
        const money = await menuRepository.getMoney();
        return res.status(200).json(money);
    }
    catch(error){
        console.error(error);
    }
}

export async function getCola(req, res, next) {
    try{
        const cola = await menuRepository.getCola();
        return res.status(200).json(cola);
    }
    catch(error){
        console.error(error);
    }
}

export async function buyCola(req, res, next){
    try{
        const resDataStatus = await menuRepository.buyCola(req.body.basket);
        return res.status(200).json(resDataStatus);
    }
    catch(error){
        console.error(error);
    }
}

export async function updateDeposit(req, res, next) {
    try{
        const result = await menuRepository.updateDeposit(req.body.money);
        return res.status(200).json(result);
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