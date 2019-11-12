const fs = require("fs");

var fileName = "loginToken"

var output = fs.readFileSync(fileName, "utf-8", (err, data) => {
    if (err){
        return err;
    } else {
        return data;
    }
})

function main(){
    console.log(output);
}

main();