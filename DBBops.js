User = require('./Users/User').User;
House = require('./Houses/House').House;
var users = new Array(User);
var houses = new Array(House);
//este fichero deberia de ser reescrito con llamadas a una BDD 

function modifyUser(username, userToModify) {
    const index = users.findIndex(u => u.username == username);
    if (index !== -1) {
        if (userToModify.username !== undefined) {
            users[index].username = userToModify.username;
            var i = 0;
            houses.forEach(h => {
                if (h.owner == username)
                    houses[i].owner == userToModify.username;
                i++;
            });
        }
        if (userToModify.email !== undefined)
            users[index].email = userToModify.email;

    }
}

function createUser(userToAdd) {
    users.push(userToAdd);
}

function createHouse(houseToAdd) {
    var size = houses.length;
    if (size == 1)
        houseToAdd.id = 1;
    else
        houseToAdd.id = houses[size - 1].id + 1;
    houses.push(houseToAdd);
}

function getUser(username) {
    return users.find(u => u.username == username);
}

function checkHouses(username) {
    return houses.find(u => u.username == username);
}

function filterHouses(findHouses, username, city, street, country) {
    //lo ideal seria crear una query por partes y lanzarla una vez completados esta busqueda
    houses.forEach(h => {
        if (h.owner == username)
            if ((h.street == street || street == undefined)&&(h.city == city || city == undefined)&&(h.country == country || country == undefined))
                        findHouses.push(h);
    });
    return findHouses;
}

function getAllUser() {
    return users;
}

function deleteUser(username) {
    const position = users.findIndex(u => u.username == username);
    if (position !== -1)
        if (users.splice(position, 1))
            return true;
    return false;
}

function deleteHouse(houseID, username) {
    const position = houses.findIndex(h => h.id == houseID);
    if (position !== -1) {
        if (houses[position].username = username) {
            if (houses.splice(position, 1))
                return 1;
        } else {
            return -1
        }
    } else {
        return 0;
    }
}


function modifyHouse(username, houseToModify) {
    const index = houses.findIndex(h => h.id == houseToModify.id);
    if (index !== -1) {
        if (username = houses[index].owner) {
            if (houseToModify.address != undefined)
                houses[index].address = houseToModify.address;
            if (houseToModify.city != undefined)
                houses[index].city = houseToModify.city;
            if (houseToModify.country != undefined)
                houses[index].city = houseToModify.country;
            return 1
        }
        else
            return -1;
    } else
        return 0;
}

exports.modifyUser = modifyUser;
exports.createUser = createUser;
exports.createHouse = createHouse;
exports.getUser = getUser;
exports.filterHouses = filterHouses;
exports.checkHouses = checkHouses;
exports.deleteUser = deleteUser;
exports.modifyHouse = modifyHouse;
exports.deleteHouse = deleteHouse;
exports.getAllUser = getAllUser;