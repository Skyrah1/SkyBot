class Command{

    #keyword;
    #func;

    constructor(keyword, func){
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