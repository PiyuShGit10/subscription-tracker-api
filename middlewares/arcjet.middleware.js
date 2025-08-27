import aj from "../config/arcjet.js";

const rateLimitMiddleware = async(req,res,next) => {
    try {
        const decision = await aj.protect(req, {requested : 1})
        if(decision.isDenied()){
            if(decision.reason.isRateLimit()) {
                res.status(429).json({
                     message : "Rate limit exceeded"
                })
            }
            if(decision.reason.isBot()){
                res.status(403).json({
                    message : "Bot activity detected"
                })
            }

            res.status(403).json({
                message : "Access denied"
            })
        }

        next()
        
    } catch (error) {
        console.log(error);
        next(error)
        
    }
}

export default rateLimitMiddleware
