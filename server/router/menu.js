import express from 'express';
import * as menuController from '../controller/menu.js';
const router = express.Router();

router.get('/money', menuController.getMoney);
router.get('/cola', menuController.getCola);
router.put('/deposit', menuController.updateDeposit)
router.put('/withdraw', menuController.updateWithDraw)
router.post('/buy', menuController.buyCola);

export default router;