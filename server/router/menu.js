import express from 'express';
import * as menuController from '../controller/menu.js';
const router = express.Router();

router.get('/money', menuController.getMoney);
router.get('/product', menuController.getProduct);
router.put('/deposit', menuController.updateDeposit)
router.put('/withdraw', menuController.updateWithDraw)
router.post('/buy', menuController.buyProduct);

export default router;