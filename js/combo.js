class Combo{

    #keyword;
    #name;
    #description;
    #flavour;

    constructor(keyword, name, description, flavour){
        this.#keyword = keyword;
        this.#name = name;
        this.#description = description;
        this.#flavour = flavour;
    }

    getKeyword(){
        return this.#keyword;
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

module.exports = {
    Combo
}