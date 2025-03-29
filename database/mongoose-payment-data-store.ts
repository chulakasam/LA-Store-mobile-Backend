import Payment from "../model/Payment";
import PaymentModel from "../model/modal/Payment-modal";

export async function AddPayment(p:Payment){
    console.log('receive data',p);
    try {
        const added_payment=await PaymentModel.create({
            totalAmount: p.totalAmount,
            mobileNumber: p.mobileNumber,
            address: p.address,
            cardNumber: p.cardNumber,
            expiryDate:p.expiryDate,
            cvv:p.cvv
        });
        console.log('payment added successfully',added_payment);
        return added_payment;
    }catch (error){
        console.log('error adding payment');
    }
}