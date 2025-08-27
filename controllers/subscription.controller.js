import Subscriptions from "../models/subscriptions.model.js"


export const createSubscription = async(req, res, next) => {
    try {
        const subscription = await Subscriptions.create({
            ...req.body,
            user : req.user._id,
        })

        console.log(subscription)
        res.status(201).json({
            success : true,
            message : "Subscription created successfully",
            data : {
                subscription,
            }
        })
    } catch (error) {
        next(error)
    }
}

export const getUserSubscriptions = async(req,res,next) => {

    try {

        if(req.user.id !== req.params.id){
            const error = new Error("You are not the owner of this account")
            error.status = 401;
            throw error
        }

        const subscriptions = await Subscriptions.find({
            user : req.params.id,
        })

        res.status(201).json({
            success : true,
            data : {
                subscriptions,
            }
        })
    } catch (error) {
        next(error)
    }
}

export const getSubscriptionById = async(req,res,next) => {
    try {
        const subscriptionData = await Subscriptions.findById({
            _id : req.params.id,
        })

        res.status(201).json({
            success : true,
            data : {
                subscriptionData
            }
        })

    } catch (error) {
        next(error)
    }
}

export const getAllSubscriptions = async(req,res,next) => {
    try {
        const subscriptions = await Subscriptions.find() 

        res.status(201).json({
            success : true,
            data : {
                subscriptions
            }
        })
    } catch (error) {
        next(error)
    }
}


export const getUpcomingSubscriptions = async(req,res,next) => {
    try {
        const now = new Date()
        console.log(now)
        const upcomingSubscriptions = await Subscriptions.find({
            renewalDate : { $gte : now}
        })
         
        console.log(upcomingSubscriptions)
        if(upcomingSubscriptions.length === 0) {
             return res.status(200).json({
                success : false,
                message : "No upcoming subscriptions found",
             } )
        }
        res.status(200).json({
            success : true,
            data : {
                upcomingSubscriptions
            }
        })
    } catch (error) {
        next(error)
    }
}

export const deleteSubscription = async (req,res,next) => {
    try {
        const deletedSubscription = await Subscriptions.findByIdAndDelete(
         req.params.id,
        )
        
        if(!deletedSubscription){
            return res.status(404).json({
                success : false,
                message : "Subscription not found"
            })
        }

        res.status(200).json({
            success : true,
            message : "Subscription successfully deleted",
            data : deletedSubscription
        })
    } catch (error) {
        next(error)
    }
}

export const updateSubscription = async (req,res,next) => {
    try {
        const updatedSubscription = await Subscriptions.findByIdAndUpdate(
            req.params.id,
            {$set : req.body},
            {new : true,runValidators : true}
        )

        if(!updatedSubscription){
            res.status(404).json({
                success : false,
                message : "Subscription not found",
            })
        }
        
        res.status(200).json({
            success : true,
            data : {
                updatedSubscription
            }
        })
    } catch (error) {
        next(error)
    }
}

export const cancelSubscription = async(req,res,next) => {
    try {
        const cancelledSubscription = await Subscriptions.findByIdAndUpdate(
            req.params.id,
            {$set : {
                status : 'cancelled',
            }},
            {new : true, runValidators : true}
        )

        if(!cancelledSubscription){
            res.status(404).json({
                success : false,
                message : "Subscription not found",
            })
        }

        res.status(200).json({
            success :true, 
            data : cancelledSubscription,
            message : "Subscrition has been cancelled"
        })

    } catch (error) {
        next(error)
    }
}
