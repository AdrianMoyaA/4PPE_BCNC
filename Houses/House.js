class House {
    id;
    city;
    street;
    country;
    owner;

    constructor(city, street, country, owner) {
        if (city == undefined || street == undefined || country == undefined || owner == undefined)
            return null;
        this.city = city;
        this.street = street;
        this.country = country;
        this.owner = owner;
    }
}
module.exports.House = House;