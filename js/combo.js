const fs = require("fs");
const comboDir = "comboDir";


class Combo{

    #keyword;
    #name;
    #description;
    #extensions;
    #flavour;

    constructor(keyword, name, description, extensions, flavour){
        this.#keyword = keyword;
        this.#name = name;
        this.#description = description;
        this.#extensions = extensions;
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

    getExtensions(){
        return this.#extensions;
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
            let keyword = file.toString().replace(".txt", "");
            let comboFlavor = "";
            let comboExtensions = [];
            let lineNum = 2;
            let noMoreExtensions = false;
            while (!noMoreExtensions){
                if (comboArgs[lineNum].startsWith("Extension:")){
                    comboExtensions.push(comboArgs[lineNum]);
                    lineNum++;
                } else {
                    noMoreExtensions = true;
                }
            }
            for (i = lineNum; i < comboArgs.length; i++){
                comboFlavor += comboArgs[i];
                if (i != comboArgs.length - 1){
                    comboFlavor += "\n";
                }
            }
            comboList.push(new Combo(keyword,comboArgs[0], comboArgs[1], comboExtensions, comboFlavor));
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