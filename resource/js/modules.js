function writePricePoints(number) {
    const str = Number(number).toString().split('').reverse();
    const revs = [];
    let cnts = 1;
    for(let i = 0; i<str.length; i++){
        if(cnts%4 !== 0){
            revs.push(str[i]);
        } else {
            revs.push(',');
            i--;
        }
        cnts++;
    }
    return revs.reverse().join('');
}

function calculatePrice(writePrice){
    return Number(writePrice.split(',').join(''));
}