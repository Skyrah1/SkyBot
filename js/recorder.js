const fs = require("fs");
const records = "records";

function recordForbiddenWord(){
    if (!fs.existsSync(records)){
        fs.mkdirSync(records);
    }
    let date = Date.parse(new Date());
    let diff = 0;
    let forbidden = records + "/forbidden";
    if (fs.existsSync(forbidden)){
        let earlier = fs.readFileSync(forbidden, function (err){
            if (err){
                throw err;
            } else {
                console.log("Recording new date...");
            }
        });
        diff = (date - earlier) / (1000 * 60 * 60 * 24);
    } else {
        diff = -1;
    }
    fs.writeFile(forbidden, date, function (err) {
        if (err){
            throw err;
        } else {
            console.log("HERESY DETECTED");
            console.log(diff);
        }
    });
    return diff;
}

module.exports = {
    recordForbiddenWord
};