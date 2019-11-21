const fs = require("fs");
const comboDir = "comboDir";


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

function getComboList(){
    var comboList = [];
    fs.readdirSync(comboDir).forEach(file => {
        //console.log(file);
        var fileString = comboDir + "/" + file;
        var comboArgs = fs.readFileSync(fileString, "utf-8", (err, data) => {
            if (err){
                return err;
            } else {
                return data;
            }
        }).split("\n");
        //console.log(comboName);
        if (comboArgs.length >= 3){
            var keyword = file.toString().replace(".txt", "");
            var comboFlavor = "";
            for (i = 2; i < comboArgs.length; i++){
                comboFlavor += comboArgs[i];
                if (i != comboArgs.length - 1){
                    comboFlavor += "\n";
                }
            }
            comboList.push(new Combo(keyword,comboArgs[0], comboArgs[1], comboFlavor));
            //console.log(comboArgs[0]);
        } else {
            console.log(`Invalid/incomplete combo file: ${file}`)
        }
    });
    return comboList;
}

module.exports = {
    Combo,
    getComboList
}