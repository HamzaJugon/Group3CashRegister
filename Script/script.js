// YOUR CODE

/*
Price - Purchase Price
cash - payment
cid - cash-in-drawer
*/

function cashRegister(price, cash, cid) { 
    // 2D array listing available currency.
        let currencyTypes = {
            "PENNY": 0.01, // [0][1] = 0.01
            "NICKEL": 0.05,// [1][1] = 0.02
            "DIME": 0.1,    // [2][1]
            "QUARTER": 0.25,
            "ONE": 1,
            "FIVE": 5,
            "TEN": 10,
            "TWENTY": 20,
            "ONE HUNDRED": 100
        };
    
    // calculate change.
    if (cash < price) {
        return {status: "INCORRECT_PAYMENT", change: []}
    } else {
        var ChangeDue = cash - price;
    }
    
    //calculate total cash in drawer (CID).
        // iterate through 2D array (CID), calculate total amount of CID.
        // add second element of current iteration's array to total.
    let totalCashInDrawer = 0;
        for (let i=0; i < cid.length; i++) {
            totalCashInDrawer += cid[i][1];
        }
    
    // check enough CID for change.
    if (ChangeDue > totalCashInDrawer) {
        return {status: "INSUFFICIENT_FUNDS", change: []};
    } 
    
    
    // now check if exact change can be given.
        // round to 2 decimal places cuz money.
    if (ChangeDue.toFixed(2) === totalCashInDrawer.toFixed(2)) {
        return {status: "CLOSED", change: cid}
    }
    
    // calculate change to give.
        // new array to track change.
        // need to output - Currency type [i][0]. Value of Currency using Currency type. 
        // Count for currency for number of currency types of specific type.
    let change = [];
        for (let i = cid.length - 1; i >= 0; i--) {
            let currencyName = cid[i][0];
            let currencyValue = currencyTypes[currencyName];
            let currencyCount = 0;
    
            // check ChangeDue is more or = to currency value and if CID has money.
                // true = reduce ChangeDue by currencyValue.
                // true = reduce CID by currencyValue.
                    // record of number of that currency being used as change.
                while (ChangeDue >= currencyValue && cid[i][1] > 0) {
                    ChangeDue -= currencyValue;
                    ChangeDue = ChangeDue.toFixed(2);
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
        if (ChangeDue > 0) {
            return {status: "INSUFFICIENT_FUNDS", change: []};
        }
    
        return {status: "OPEN", change: change};
    
    }



    /*
-----------------------------------------------------------------------------------------------------------------------------

    */
// Connection
console.log("Script connected!");

const form = document.getElementById("user-input");
const priceInput = document.getElementById("price-amount");
const cashInput = document.getElementById("cash-amount");
const cidInput = document.getElementById("cid");

form.addEventListener("submit", function(event) {
  event.preventDefault();
  const price = parseFloat(priceInput.value);
  const cash = parseFloat(cashInput.value);
  const cid = JSON.parse(cidInput.value);
  const result = cashRegister(price, cash, cid);
  console.log(result);
});

