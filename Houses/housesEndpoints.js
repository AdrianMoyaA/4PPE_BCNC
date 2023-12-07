module.exports = function (app) {
    DBBops = require('../DBBops');
    const House = require('./House').House;


    app.get("/houses/:username", (req, res) => {
        try {
        const username = req.params.username;
        if (username == undefined) {
            return res.status(404).send('Bad request');
        }
        let reqUser = DBBops.getUser(username);
        if (reqUser) {
            var findHouses = new Array(House);
            //hacemos la busqueda
            DBBops.filterHouses(findHouses, req.params.username, req.params.city, req.params.street, req.params.country);
            if (findHouses.length != 1)
                return res.status(200).json(findHouses);
            return res.status(204).send('No houses');

        } else {
            return res.status(404).send('Not found');
        }
    } catch (error) {
        console.log(error);
        return res.send(500);
    }
    });


    app.post("/housesOperations/:username", (req, res) => {
        try {
        const username = req.params.username;
        const newHouse = new House(req.body.house.city, req.body.house.street, req.body.house.country, req.body.house.owner);
        if (newHouse == undefined || req.body.house.owner != username)
            return res.status(404).send('Bad request');
        let reqUser = DBBops.getUser(username);
        if (reqUser == undefined)
            return res.status(404).send('Not user found');
        // no es necesario checkear si tenemos una casa con el mismo id dado que esto nunca se delega al cliente. se le permite mandarnos el campo por homogeneidad con la clase.
        DBBops.createHouse(newHouse) //creamos la casa
        return res.status(201).send('House created');
    } catch (error) {
        console.log(error);
        return res.send(500);
    }
    });

    app.delete("/housesOperations/:username", (req, res) => {
        try {
        const username = req.params.username;
        const id = req.body.house.id;
        if (username == undefined || id == undefined) {
            return res.status(404).send('Bad request');
        }
        switch (DBBops.deleteHouse(id, username)) {
            case -1:
                return res.status(403).send('you are not the owner');
            case 0:
                return res.status(404).send('House not found');
            case 1:
                return res.status(204).send('House deleted');
        }
    } catch (error) {
        console.log(error);
        return res.send(500);
    }
    });

    app.patch("/housesOperations/:username", (req, res) => {
        try {
        const username = req.params.username;
        const houseId = req.body.house.id;
        if (username == undefined || houseId == undefined || (req.body.house.address == undefined && req.body.house.city == undefined && req.body.house.country == undefined)) {
            return res.status(404).send('Bad request');
        }
        switch (DBBops.modifyHouse(username, req.body.house)) {
            case -1:
                return res.status(403).send('you are not the owner');
            case 0:
                return res.status(404).send('House not found');
            case 1:
                return res.status(200).send('House modified');
        }
    } catch (error) {
        console.log(error);
        return res.send(500);
    }
    });
}