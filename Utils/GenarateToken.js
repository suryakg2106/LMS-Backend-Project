import jwt from "jsonwebtoken";

export const GenarateToken=(id)=>{
    return jwt.sign(
        {id},
        process.env.JWT_SECRET,
        {expiresIn:process.env.JWTEXP || "10D" }
    );
}