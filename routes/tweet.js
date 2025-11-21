var express = require('express')
var router = express.Router();
const Tweet = require('../models/tweet');
require('../models/connection')
const User = require('../models/users')


router.post('/addTweet', async (req, res) => {
    const {content, token} = req.body;

    try{
        if (!content || content.length > 280) {
            res.status(400).json({result: false, error: 'Le contenu est vide ou trop long'})
        }
        const user = await User.findOne({token})
        console.log(user)
       if (!user){
        res.status(404).json({error: 'Utilisateur non trouvé'})
       }
        const newTweet = new Tweet({
            content: content,
            autor: user._id
        })

        await newTweet.save();
        res.status(201).json({result: true, tweetId: newTweet._id})
    } catch (error) {
        console.log(error);
        res.status(500).json({error: 'Erreur serveur'})
    }
})

module.exports = router;