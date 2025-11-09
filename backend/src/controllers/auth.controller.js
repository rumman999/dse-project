import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

import pool from '../db/index.js'

export async function register(req, res) {
    const { email, password } = req.body

    if(!email || !password){
        return res.status(400).json({ message: "Email and password are required" })
    }

    const saltRounds = 10;
    try{
        const checkSql = 'SELECT email FROM users WHERE email = ?'
        const [ existingUsers ] = await pool.query(checkSql, [email])

        if(existingUsers.length === 0){

            const hash = await bcrypt.hash(password, saltRounds)

            const insertSql = 'INSERT INTO users(email, password) VALUES (?, ?)'
            await pool.query(insertSql, [email,hash])
            
            return res.status(201).json({ message: "User registered successfully!" })
            
        } else{
            return res.status(409).json({ message: "Email already in use" })
        }
    } catch(error){
        console.log("Database error: ", error)
        res.status(500).json({ message: "Error Signing up" })
    }
}


export async function login(req, res) {
    const { email, password } = req.body

    if(!email || !password){
        return res.status(400).json({ message: "Email and password are required" })
    }

    const saltRounds = 10;
    try{
        const checkSql = 'SELECT * FROM users WHERE email = ?'
        const [ existingUsers ] = await pool.query(checkSql, [email])

        if(existingUsers.length === 0){
            return res.status(404).json({ message: "Email not found" })
        } 
            
            const user = existingUsers[0]
            const passMatch = await bcrypt.compare(password, user.password);

            if(passMatch){

                const payload = {
                    id: user.id,
                    email: user.email
                }

                const secretKey = "THIS_IS_A_SECRET_KEY"

                const token = jwt.sign(payload, secretKey, { expiresIn: '1h'})

                return res.status(200).json({
                    message: "Login successful",
                    token: token
                })
            } else{
                return res.status(401).json({ message: "Invalid credentials" })
            }
               
    } catch(error){
        console.log("Database error: ", error)
        res.status(500).json({ message: "Error Signing up" })
    }
}