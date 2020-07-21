function rng(min, max) {
    //console.log(`Min and max: ${min}, ${max}`);
    var difference = parseInt(max) - parseInt(min);
    var result = 0;
    if (difference != max) {
        result = Math.floor((Math.random() * (difference + 1)));
        result += parseInt(min);
    } else {
        result = Math.floor((Math.random() * max) + 1);
    }
    //console.log(result);
    return result;
}

module.exports = rng;