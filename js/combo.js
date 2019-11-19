class Combo{

    #name;
    #description;
    #flavour;

    constructor(name, description, flavour){
        this.#name = name;
        this.#description = description;
        this.#flavour = flavour;
    }

    getName(){
        return this.#name;
    }

    getDescription(){
        return this.#description;
    }

    getFlavour(){
        return this.#flavour;
    }

}