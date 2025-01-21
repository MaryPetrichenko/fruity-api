const fruits = require("../fruits.json")


class Fruit {
    constructor({genus, name, id, family, order, nutritions}) { // destructing the object to pass it
        this.genus = genus,
        this.name = name,
        this.id = id,
        this.family = family,
        this.order = order,
        this.nutritions = nutritions
    }
    static showAll = () => {
        console.log("ShowAll function called");
        return fruits.map(fruit => new Fruit(fruit))
    }
    static show = (name) => {
        console.log("Show function called with the name:", name)        
        const fruit = fruits.find((fruit) => fruit.name.toLowerCase() === name)
        if(fruit) {
            return new Fruit(fruit)
        }
        else {
            throw Error("The fruit doesn't exist")
        }
    }
    static create = (data) => { // data means request body that was passed in
        const newFruit = data
        console.log("Model: create function called with the name: ", newFruit.name);
        // Checking if there is a fruit with the same name
        const fruit = fruits.find(fruit => fruit.name.toLowerCase() === newFruit.name.toLowerCase()) 
        if(fruit) {
            console.log("Model: error - the fruit already exists")
            throw Error("The fruit already exists")
        }
        else {
            newFruit['id'] = fruits.length + 1 // adding the id
            fruits.push(newFruit)
            console.log("Model: new fruit added", newFruit);
            return new Fruit(newFruit)
        }
    }
    update(data) {
        const updatedFruit = fruits.find(fruit => fruit.name.toLocaleLowerCase() === this.name.toLocaleLowerCase())
        if(updatedFruit) {
            updatedFruit.name = data.name
            updatedFruit.family = data.family
            return new Fruit(updatedFruit)
        }
        else {
            throw Error("Fruit not found")
        }
    }
    destroy() {
        console.log("Model: delete function on: ", this.name)
        const deletedFruit = fruits.find(fruit => fruit.name.toLowerCase() === this.name.toLowerCase())
        if(deletedFruit) {
            const index = fruits.indexOf(deletedFruit)
            fruits.splice(index, 1)
        }
        else {
            throw Error("Fruit not found")
        }
    }
}


module.exports = Fruit