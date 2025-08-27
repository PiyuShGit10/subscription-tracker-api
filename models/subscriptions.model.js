import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema({
    name : {
        type : String,
        required : [true, "Name is required"],
        trim : true, 
        minLength : 1,
        maxLength : 50,
    },
    price : {
        type : Number,
        required : [true, "Subscription price is required"],
        min : [0, "Price must be greater than 0"]
    },
    currency : {
        type : String ,
        enum : ['USD' , 'GBR' , 'INR'],
        default :  'INR'
    },
    frequency : {
        type : String,
        enum : ['daily', 'weekly', 'monthly' , 'yearly'],
    },
    category : {
        type : String,
        enum : ['sports', 'news', 'entertainment', 'technology', 'others'],
        required : [true, "Subscription category is required"]
    },
    paymentmethod : {
        type : String,
        required : true,
        trim : true,
    },
    status : {
        type : String,
        enum : ['active', 'cancelled','expired'],
        default : 'active'
    },
    startDate: {
        type : Date,
        required : true,
        validate : {
            validator : (value) => value <= new Date(),
            message : "start date must be in the past"
        }
    },
    renewalDate : {
        type : Date,
         
        validate : {
            validator : function (value) {
                return value > this.startDate
            },
            message : "Renawal date must be after the startDate"
        }
    },
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
        required : true,    
        index : true,
    }
},
{
    timestamps : true
})


subscriptionSchema.pre('save', function (next) {
    if(!this.renewalDate) {
        const renewalPeriods = {
        daily : 1,
        weekly : 7,
        monthly : 30,
        yearly : 365,
    }

    this.renewalDate = new Date(this.startDate)
    this.renewalDate.setDate(this.renewalDate.getDate() + renewalPeriods[this.frequency])
    
    // auto update status 

}
if(this.renewalDate < new Date()) {
        this.status = "expired"
    }

    next();
})

const Subscriptions = mongoose.model("Subscriptions",subscriptionSchema)

export default Subscriptions