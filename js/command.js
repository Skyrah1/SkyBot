class Command{

    #keyword;
    #description;
    #func;

    constructor(keyword, description, func){
        this.#keyword = keyword;
        this.#description = description;
        this.#func = func;
    }

    execute(keyword, args){
        if (keyword === this.#keyword){
            return this.#func(args);
        } else {
            return false;
        }
    }

    getKeyword(){
        return this.#keyword;
    }

    getDescription(){
        return this.#description;
    }

    toString(){
        return `Command: ${this.#keyword}`;
    }
}

module.exports = {
    Command
};