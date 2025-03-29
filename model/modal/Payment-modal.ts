import mongoose from "mongoose";

const PaymentSchema = new mongoose.Schema(
    {
        totalAmount: { type: Number, required: true },
        mobileNumber: { type: Number, required: true },
        address: { type: String, required: true },
        cardNumber: { type: Number, required: true },
        expiryDate: { type: String, required: true },
        cvv: { type: Number, required: true },
    },
    { timestamps: true }
);

const PaymentModel = mongoose.model("payment", PaymentSchema);
export default PaymentModel;


