import jwt from "jsonwebtoken";


export const checkToken = async (req: any, res: any, next: any) => {
    const token = req.headers.authorization;
    if (!token) {
        return res.status(401).json({
            success: false,
            message: 'Acess denied...Token is required'
        })
    }
    try {
        jwt.verify(token, 'cdmi', (err: any, decoded: any) => {
            if (err) {
                return res.status(401).json({
                    success: false,
                    message: err.message
                });
            }
            next();
        });
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: 'invalid token'
        })
    }
}