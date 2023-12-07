
module.exports = function (app) {

    const DBBops = require('../DBBops');
    const User = require('./User').User;

    app.get("/users", (req, res) => {
        try {
            //se obtienen todos los usuarios
            var users = DBBops.getAllUser();
            if (users.length != 1) 
                return res.status(200).json(users);
            return res.status(204).send('No users');
        } catch (error) {
            console.log(error);
            return res.send(500);
        }
    });

    app.get("/users/:username", (req, res) => {
        try {
            const username = req.params.username;
            if (username == undefined) {
                return res.status(404).send('Bad request');
            }
            // Buscamos el usuario
            let reqUser = DBBops.getUser(username);
            if (reqUser) {
                return res.status(200).json(reqUser);
            } else {
                return res.status(404).send('User not found');
            }
        } catch (error) {
            console.log(error);
            return res.send(500);
        }
    });

    app.post("/newuser", (req, res) => {
        try {
            const newuser = req.body.user;
            if (newuser == undefined)
                return res.status(404).send('Bad request');
            //se comprueba que todos los campos estan informados
            if (newuser.username == undefined || newuser.email == undefined) {
                return res.status(404).send('Bad request');
            }
            if( DBBops.getUser(newuser.username)) //buscamos que no esta ya dentro del sistema (se toma el nombre de usuario como clave)
                return res.status(409).send('Username not available');
            let userToAdd = new User(newuser.username, newuser.email);
            DBBops.createUser(userToAdd); //creado
            res.status(201).json(userToAdd);
        } catch (error) {
            console.log(error);
            return res.send(500);
        }
    });

    app.patch("/updateuser/:username", (req, res) => {
        try {
            var username = req.params.username;
            var userToModify = req.body.user;
            if (username == undefined || userToModify == undefined) {
                return res.status(404).send('Bad request');
            }
            var reqUser = DBBops.getUser(username);//revisamos que este el usuario y todos los campos
            if (reqUser) {
                if (userToModify.username == undefined && userToModify.email == undefined) {
                    return res.status(400).json({ error: 'Bad request' });
                } else {
                    //no permitimos que actualice todo el usuario, no tendria sentido. Seria mejor crear uno nuevo.
                    if (userToModify.username == undefined || userToModify.email == undefined) {
                        DBBops.modifyUser(username, userToModify)
                        return res.status(201).send('User modified sucesfully');
                    }
                    else
                        return res.status(403).send('full update not available');
                }
            } else {
                return res.status(404).send('User not found');
            }
        } catch (error) {
            console.log(error);
            return res.send(500);
        }
    });
    app.put("/fullupdateuser/:username", (req, res) => {
        try {
            var username = req.params.username;
            var userToModify = req.body.user;
            if (username == undefined || userToModify == undefined) {
                return res.status(404).send('Bad request');
            }
            var reqUser = DBBops.getUser(username);
            if (reqUser) {
                //revisamos que el usuario este completo antes de sustiuirlo
                if (userToModify.username == undefined || userToModify.email == undefined) {
                    return res.status(404).send('Bad request');
                } else {
                    DBBops.modifyUser(username, userToModify) //hacemos el cambio completo
                    res.status(201).send('User modified sucesfully');
                }
            } else {
                return res.status(404).send('User not found');
            }
        } catch (error) {
            console.log(error);
            return res.send(500);
        }

    });

    app.delete("/deleteuser/:username", (req, res) => {
        try {
            const username = req.params.username;
            if (username == undefined) {
                return res.status(404).send('Bad request');
            }
            if (DBBops.checkHouses(username) != undefined) //check para ver si no se quedan casa huerfanas en el sistema
                return res.status(403).send('The user still has houses');
            if (DBBops.deleteUser(username)) { //todo esta bien, lo borramos
                return res.status(204).send('User deleted');
            } else {
                return res.status(404).send('User not found');
            }
        } catch (error) {
            console.log(error);
            return res.send(500);
        }
    });
}