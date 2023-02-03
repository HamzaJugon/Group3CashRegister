
/*
Price - Purchase Price
cash - payment
cid - cash-in-drawer
*/

function checkRegister(price, cash, cid) { 
// 2D array listing available currency.
    const currencyTypes = {
        "ONE PENNY": 0.01, // [0][1] = 0.01
        "TWO PENCE": 0.02, // [1][1] = 0.02
        "FIVE PENCE": 0.05,// [2][1]
        "TEN PENCE": 0.10,
        "TWENTY PENCE": 0.20,
        "FIFTY PENCE": 0.50,
        "ONE POUND": 1,
        "FIVE POUND NOTE": 5,
        "TEN POUND NOTE": 10,
        "TWENTY POUND NOTE": 20,
        "FIFTY POUND NOTE": 50
    };

// calculate change.
const changeNeed = cash - price;

//calculate total cash in drawer (CID).
    // iterate through 2D array (CID), calculate total amount of CID.
    // add second element of current iteration's array to total.
let totalCashInDrawer = 0;
    for (let i=0; i < cid.length; i++) {
        totalCashInDrawer += cid[i][1];
    }

// check enough CID for change.
if (changeNeed > totalCashInDrawer) {
    return {status: "INSUFFICIENT_FUNDS", change: []}
}

// now check if exact change can be given.
    // round to 2 decimal places cuz money.
if (changeNeed.toFixed(2) === totalCashInDrawer.toFixed(2)) {
    return {status: "CLOSED", change: cid}
}

// calculate change to give.
    // new array to track change.
    // need to output - Currency type [i][0]. Value of Currency using Currency type. 
    // Count for currency for number of currency types of specific type.
let change = [];
    for (let i = cid.length - 1; i >= 0; i--) {
        const currencyName = cid[i][0];
        const currencyValue = currencyTypes[currencyName];
        let currencyCount = 0;

        // check changeNeed is more or = to currency value and if CID has money.
            // true = reduce changeNeed by currencyValue.
            // true = reduce CID by currencyValue.
                // record of number of that currency being used as change.
            while (changeNeed >= currencyValue && cid[i][1] > 0) {
                changeNeed -= currencyValue;
                changeNeed = changeNeed.toFixed(2);
                cid[0][1] -= currencyValue;
                currencyCount ++
            }

                // if more, push to change array. 
                // display change as currency name, and amount.
            if (currencyCount > 0){
                change.push([currencyName, currencyValue * currencyCount])
            }
    }

    //check if exact change can be given.
    if (changeNeed > 0) {
        return {status: "INSUFFICIENT_FUNDS", change: []};
    }

    return {status: "OPEN", change: change};

}