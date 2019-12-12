class Command{

    #keyword;
    #description;
    #func;

    constructor(keyword, description, func){
        this.#keyword = keyword;
        this.#func = func;
    }

    execute(keyword, args){
        if (keyword === this.#keyword){
            return this.#func(args);
        } else {
            return false;
        }
    }

    toString(){
        return `Command: ${this.#keyword}`;
    }
}

module.exports = {
    Command
};