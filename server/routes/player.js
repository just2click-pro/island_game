import { Router } from 'express';
import Player from '../models/player.js';
import ip from 'ip';
import Activity from '../models/activity.js';

const routerPlayer = Router(); 

routerPlayer.post('/api/users/player', async (req, res) => {
    try {
        const {name, email} = req.body;
        console.log(name, email);

        const newPlayer = await Player.create({name: name, email: email});
        
        await new Activity()
        .withProperties({'IP': ip.address()})
        .use('new player')
        .log(`${name} joined`);

        res.json(newPlayer);
    } catch (error) {
        console.log(error);
        res.status(500).json({error: "Could not add new player"}); 
    }
})

routerPlayer.get('/api/users/me', async (req, res) => {
    try {
        const email = req.headers.email;
        const player = await Player.findOne({email: email});

        await new Activity()
        .withProperties({'IP': ip.address()})
        .use('player enter')
        .log(`${player.name} enter the game`);

        res.json(player);
    } catch (error) {
        console.log(error);
        res.status(500).json({error: "Could not find the player"}); 
    }
})

routerPlayer.put('/api/users/updateStatus', async (req, res) => {
    try {
        const email = req.headers.email;
        const {isWin} = req.body;
        const player = await Player.findOne({email: email});
         
        if (isWin ) player.wins++
        else player.losings++;
        await player.save();

        const status = isWin ? "win" : "lose";

        await new Activity()
        .withProperties({'IP': ip.address()})
        .use('player status')
        .log(`${player.name} ${status}`);

        res.json(player);
    } catch (error) {
        console.log(error);
        res.status(500).json({error: "Could not find the player"}); 
    }
})

export default routerPlayer;
