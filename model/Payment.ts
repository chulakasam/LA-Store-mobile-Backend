export default class Payment{
    totalAmount: number;
    mobileNumber: number;
    address: string;
    cardNumber: number;
    expiryDate:string;
    cvv:number;

    constructor(totalAmount: number,mobileNumber: number,address: string,cardNumber:number,expiryDate:string,cvv:number) {
        this.totalAmount = totalAmount;
        this.mobileNumber = mobileNumber;
        this.address = address;
        this.cardNumber = cardNumber;
        this.expiryDate = expiryDate;
        this.cvv = cvv;
    }
}