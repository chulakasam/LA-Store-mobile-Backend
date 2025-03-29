import express from "express";
import {AddPayment} from "../database/mongoose-payment-data-store";

const router = express.Router();
router.post('/add',async (req, res) => {
    const new_payment = req.body;
    try {
        const adding_payment = await AddPayment(new_payment);
        res.json(adding_payment);
    }catch (error) {
        console.log('error adding payment',error);
    }
})
export default router;