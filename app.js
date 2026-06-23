// let FLAG_URL = `https://flagsapi.com/IN/flat/64.png`;
let BASE_URL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";

let dropdowns = document.querySelectorAll(".select-container select");
let btn = document.querySelector("form button");

const fromcurr = document.querySelector(".from select");
const tocurr = document.querySelector(".to select");
const prompt = document.querySelector(".msg");
const swap = document.querySelector(".dropdown i");

// dropdowns added from country.js to select and eventlistener for change in option
for (let select of dropdowns) {
    // console.log(select);
    for (let currcode in countryList) {
        let newoption = document.createElement("option");
        newoption.innerText = currcode;
        newoption.value = currcode;

        if (select.name === "from" && currcode === "USD") {
            newoption.selected = true;
        }

        else if (select.name === "to" && currcode === "INR") {
            newoption.selected = true;
        }
        select.append(newoption);
    }

    select.addEventListener("change", (evt) => {
        updateFlag(evt.target);
        // console.log(evt.target);
    })
}

// update flag while option get selected
const updateFlag = (element) => {
    let CounCode = countryList[element.value];
    // console.log(element.value);
    let newsrc = `https://flagsapi.com/${CounCode}/flat/64.png`;
    // console.log(currshortcode);
    let img = element.parentElement.querySelector("img");
    img.src = newsrc;
    // getdata(element.name, element.value);
}

// btn to change get exchange rate
btn.addEventListener("click", (evt) => {
    evt.preventDefault();
    let amount = document.querySelector(".amount input");
    // console.log(amount);
    let amtVal = amount.value;
    if (amtVal === "" || amtVal < 1) {
        amtVal = 1;
        amount.value = "1";
    }

    GetExchange(fromcurr.value, tocurr.value, amount.value);
})

swap.addEventListener("click", (evt) => {
    let temp = fromcurr.value;
    fromcurr.value = tocurr.value;
    tocurr.value = temp;
    updateFlag(fromcurr);
    updateFlag(tocurr);

    GetExchange(
        fromcurr.value,
        tocurr.value,
        document.querySelector(".amount input").value
    );
})

// [fromcurr.value, tocurr.value].forEach(select => {
//     select.addEventListener("change", (evt) => {
//         console.log(evt.target);
//     });
// });




async function GetExchange(fromcode, tocode, amount) {
    let NEW_BASE_URL = `${BASE_URL}/${fromcode.toLowerCase()}.json`;
    let response = await fetch(NEW_BASE_URL);
    let data = await response.json();
    let value = amount * data[fromcode.toLowerCase()][tocode.toLowerCase()];
    prompt.innerText = value;
}

// getdata();

// const fromcurr = document.querySelector(".from select");
// console.log(fromcurr.value);
// console.log(fromcurr.value);
// console.log(`https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/usd.json`);