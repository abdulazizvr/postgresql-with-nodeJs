const {fetchAll, fetch} = require('../utils/pg.js');


module.exports = {
    GETONE: async (req,res)=>{
        let {id } = req.params
        let users =await fetch('select * from users where id = $1',id)
        res.send(users)
    },
    GETALL: async (req,res)=>{
        let users =await fetchAll('select * from users')
        res.send(users)
    },
    POST: async(req,res)=>{
        let {firstName,lastName,contact,adress} = req.body
        let {id} = await fetch("INSERT INTO users (first_name, last_name, contact, adress, image_link)  values($1,$2,$3,$4,$5) returning id",firstName,lastName,contact,adress,'/image/12.jpg')
        console.log(id);
        if(id)res.send("user added!")
        else res.send("error")
    },
    PUT:async(req,res)=>{
        let {id} = req.params
        let {firstName,lastName,contact,adress,image} = req.body
        if(!firstName && !lastName && !contact && !adress && !image)res.send("you must send data for update!")
        let user =await fetch('select * from users where id = $1',id)
        if (!user)res.send("Not found user = "+id)
        let updateuser =await fetch('update users set first_name = $2, last_name = $3, contact = $4, adress = $5, image_link = $6  where id = $1',id,firstName||user.first_name,lastName||user.last_name,contact||user.contact,adress||user.adress,image||user.image_link)
        res.send('updated user!')
        
    
    },
    DELETE:async (req,res)=>{
        let {id } = req.params
        let user =await fetch('delete from users where id = $1 returning *',id)
        console.log(user);
        res.send(user) 
    }

}