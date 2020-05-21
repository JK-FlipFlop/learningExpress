//Routes folder helps in placing all the similar routes in one single file
const express = require('express')
const router = express.Router()
const members = require('../../Members')
const uuid = require('uuid')


//Get request (getting members)
router.get('/', (req,res) => {
    res.json(members)
})

//Get a particular member
router.get('/:id', (req,res) => {

    const found = members.some(member => member.id === parseInt(req.params.id))
    if(found)
    {
        res.json(members.filter(member => member.id === parseInt(req.params.id)))
    }
    else
    {
        res.status(400).json({ msg : `No member with id ${req.params.id}`})
    }

})

//Create a new Member
router.post('/', (req, res) => {
    const newMember = {
        id: uuid.v4(),
        name: req.body.name,
        email: req.body.email,
        status:"active"
    }

    if(!newMember.name || !newMember.email)
    {
        return res.status(400).json({msg:'Please include a name and an email'})
    }

    members.push(newMember)
    // res.json(members)

    //Redirects to the home page
    res.redirect('/')
})

//Update a Member
router.put('/:id', (req, res) => {
    const found = members.some(member => member.id === parseInt(req.params.id))

    if(found)
    {
        const updateMember = req.body;
        members.forEach(member => {
            if(member.id === parseInt(req.params.id))
            {
                member.name = updateMember.name ? updateMember.name : member.name;
                member.email = updateMember.email ? updateMember.email : member.email

                res.json({msg:'Member updated', member, members})
            }
        })
    }
    else
    {
        return res.status(400).json({msg:`No member found with the id ${req.params.id}`})
    }
    
})

//Delete a Memeber
router.delete('/:id', (req,res) => {
    const found = members.some(member => member.id === parseInt(req.params.id))
    if(found)
    {
        res.json({msg:'Member deleted', members: members.filter(member => member.id !== parseInt(req.params.id))})
    }
    else
    {
        res.status(400).json({ msg : `No member with id ${req.params.id}`})
    }

})


module.exports = router