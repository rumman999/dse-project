import jwt from 'jsonwebtoken'
import pool from '../db/index.js'

export async function protectRoute(req, res, next){
    if(!req.header.token && !req.header.token.startsWith("Bearer")){
        return res.status(401).json({message: 'No token, authorization denied' })
    }

    try{
        const token = req.headers.authorization.split(' ')[1]

        const secretKey = "THIS_IS_A_SECRET_KEY"

        const decoded = jwt.verify(token, secretKey)

        const checkUserSql = 'SELECT id, email FROM users WHERE id = ?'
        const [ userRows ] = await pool.query(checkUserSql, [decoded.id])

        if(userRows.length === 0){
            return res.status(401).json({ message: 'User not found' })
        }

        req.user = userRows[0]

        next()

    } catch(error){
        return res.status(401).json({ message: 'Token is invalid' })
    }

}