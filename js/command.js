class Command{

    #keyword;
    #category;
    #description;
    #func;
    
    /*
    constructor(keyword, description, func){
        this.#keyword = keyword;
        this.#description = description;
        this.#func = func;
    }*/

    constructor(keyword, category, description, func){
        this.#keyword = keyword;
        this.#description = description;
        this.#func = func;
        this.#category = category;
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
    
    getCategory(){
        return this.#category;
    }

    toString(){
        return `Command: ${this.#keyword}`;
    }
}

const DND = "D&D";
const MUSIC = "Music";
const MISC = "Misc";
const JOKE = "Joke";

class CommandList{
    dict;

    constructor(){

        this.dict = {};
        this.dict[DND] = [];
        this.dict[MUSIC] = [];
        this.dict[MISC] = [];
        this.dict[JOKE] = [];
    }

    push(command){
        this.dict[command.getCategory()].push(command);
    }

    toString(){
        let str = "";
        for (let key in this.dict){
            let list = this.dict[key];
            str += `**${key} commands:**\n`
            for (let i in list){
                str += `\n**${list[i].getKeyword()}** - ${list[i].getDescription()}`;
            }
            str += "\n\n"
        }
        return str;
    }

    execute(commandKeyword, args){
        let valid = false;
        for (let key in this.dict){
            let list = this.dict[key];
            for (let i = 0; i < list.length && !valid; i++){
                valid = list[i].execute(commandKeyword, args);
            }
            if (valid){
                break;
            }
        }
        return valid;
    }
}


module.exports = {
    Command,
    CommandList,
    DND,
    MUSIC,
    MISC,
    JOKE,
};