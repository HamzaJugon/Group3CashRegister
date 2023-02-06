// YOUR CODE

/*
Price - Purchase Price
cash - payment
cid - cash-in-drawer
*/

function cashRegister(price, cash, cid) {
  // 2D array listing available currency.
  let currencyTypes = {
    PENNY: 0.01, // [0][1] = 0.01
    NICKEL: 0.05, // [1][1] = 0.02
    DIME: 0.1, // [2][1]
    QUARTER: 0.25,
    ONE: 1,
    FIVE: 5,
    TEN: 10,
    TWENTY: 20,
    "ONE HUNDRED": 100,
  };

  // calculate change.
  if (cash < price) {
    return { status: "INCORRECT_PAYMENT", change: [] };
  } else {
    var ChangeDue = cash - price;
  }

  //calculate total cash in drawer (CID).
  // iterate through 2D array (CID), calculate total amount of CID.
  // add second element of current iteration's array to total.
  let totalCashInDrawer = 0;
  for (let i = 0; i < cid.length; i++) {
    totalCashInDrawer += cid[i][1];
  }

  // check enough CID for change.
  if (ChangeDue > totalCashInDrawer) {
    return { status: "INSUFFICIENT_FUNDS", change: [] };
  }

  // now check if exact change can be given.
  // round to 2 decimal places cuz money.
  if (ChangeDue.toFixed(2) === totalCashInDrawer.toFixed(2)) {
    return { status: "CLOSED", change: cid };
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
      ChangeDue = Number(ChangeDue.toFixed(2));
      cid[i][1] -= currencyValue;
      currencyCount++;
    }

    // if more, push to change array.
    // display change as currency name, and amount.
    if (currencyCount > 0) {
      change.unshift([currencyName, currencyValue * currencyCount]);
    }
  }

  //check if exact change can be given.
  if (ChangeDue > 0) {
    return { status: "INSUFFICIENT_FUNDS", change: [] };
  }

  return { status: "OPEN", change: change };
}

/*
-----------------------------------------------------------------------------------------------------------------------------

    */
// Connection
const form = document.getElementById("user-input");
const priceInput = document.getElementById("price-amount");
const cashInput = document.getElementById("cash-amount");
const cidInput = document.getElementById("cid");

form.addEventListener("submit", function (event) {
  event.preventDefault();
  const price = parseFloat(priceInput.value);
  const cash = parseFloat(cashInput.value);
  const cid = JSON.parse(cidInput.value);
  const result = cashRegister(price, cash, cid);
  const resultArr = result.change;
  const change = document.createElement("h3");

  if (resultArr.length === 1) {
    change.innerText = `Your change is $${resultArr[0][1]}.toFixed(2)}`;
    document.querySelector(".result").append(change);
  } else {
    let sum = 0;
    for (let i = 0; i < result.change.length; i++) {
      sum += result.change[i][1];
    }
    change.innerText = `Your change is $${sum.toFixed(2)}`;
    document.querySelector(".result").append(change);
  }

  for (let i = 0; i < resultArr.length; i++) {
    let quantity = 0;
    let element = "";

    switch (resultArr[i][0]) {
      case "PENNY":
        quantity += resultArr[i][1] / 0.01;
        element = document.getElementById("penny");
        element.innerText = quantity.toFixed(2);
        element.style.color = "#CE1F6A";
        element.style.fontWeight = "bold";
        break;
      case "NICKEL":
        quantity += resultArr[i][1] / 0.05;
        element = document.getElementById("nickel");
        element.innerText = quantity.toFixed(2);
        element.style.color = "#CE1F6A";
        element.style.fontWeight = "bold";
        break;
      case "DIME":
        quantity += resultArr[i][1] / 0.1;
        element = document.getElementById("dime");
        element.innerText = quantity.toFixed(2);
        element.style.color = "#CE1F6A";
        element.style.fontWeight = "bold";
        break;
      case "QUARTER":
        quantity += resultArr[i][1] / 0.25;
        element = document.getElementById("quarter");
        element.innerText = quantity.toFixed(2);
        element.style.color = "#CE1F6A";
        element.style.fontWeight = "bold";
        break;
      case "ONE":
        quantity += resultArr[i][1] / 1;
        element = document.getElementById("one");
        element.innerText = quantity.toFixed(2);
        element.style.color = "#CE1F6A";
        element.style.fontWeight = "bold";
        break;
      case "FIVE":
        quantity += resultArr[i][1] / 5;
        element = document.getElementById("five");
        element.innerText = quantity.toFixed(2);
        element.style.color = "#CE1F6A";
        element.style.fontWeight = "bold";
        break;
      case "TEN":
        quantity += resultArr[i][1] / 10;
        element = document.getElementById("ten");
        element.innerText = quantity.toFixed(2);
        element.style.color = "#CE1F6A";
        element.style.fontWeight = "bold";
        break;
      case "TWENTY":
        quantity += resultArr[i][1] / 20;
        element = document.getElementById("twenty");
        element.innerText =quantity.toFixed(2);
        element.style.color = "#CE1F6A";
        element.style.fontWeight = "bold";
        break;
      case "ONE HUNDRED":
        quantity += resultArr[i][1] / 100;
        element = document.getElementById("hundred");
        element.innerText = quantity.toFixed(2);
        element.style.color = "#CE1F6A";
        element.style.fontWeight = "bold";
        break;
    }
  }
});

// HTMl Reload baby.
document.getElementById("reloadButton").addEventListener("click", function(){
  location.reload();
});