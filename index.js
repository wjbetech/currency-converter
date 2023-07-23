import API_KEY from "./apikey.js";

// theme toggle
const toggler = document.getElementById('toggle');

function toggleTheme() {
    document.body.classList.toggle('dark-mode');
    const setTheme = document.body.classList.contains('dark-mode');
    localStorage.setItem('dark-mode', setTheme);
}

toggler.addEventListener('click', toggleTheme);

console.log(API_KEY);

// currency scripting
const fromInput = document.querySelector(".from select");
const toInput = document.querySelector(".to select");
const getRateButton = document.querySelector("form button");
const exchangeIcon = document.querySelector("form .reverse");
const amount = document.querySelector("form input");
const exchangeRateText = document.querySelector("form .result");

// function to pull country and curr codes
[fromInput, toInput].forEach((select, i) => {
    for (let curCode in Country_List) {
        const selected = (i === 0 && curCode === "USD") || (i === 1 && curCode === "GBP") ? "selected" : "";
        select.insertAdjacentHTML("beforeend", `<option value="${curCode}" ${selected}>${curCode}</option>`);
    }
    select.addEventListener("change", () => {
        const code = select.value;
        const imgTag = select.parentElement.querySelector("img");
        imgTag.src = `https://flagcdn.com/48x36/${Country_List[code].toLowerCase()}.png`;
    });
});

// function to get exchange rates
async function getExchangeRate() {
    const value = amount.value || 1;
    exchangeRateText.innerText = "Getting exchange rate...";
    try {
        const response = await fetch(`https://v6.exchangerate-api.com/v6/${API_KEY}/latest/${fromInput.value}`);
        const result = await response.json();
        const exchangeRate = result.conversion.rates[toInput.value];
        const totalExchangeRate = (amount * exchangeRate).toFixed(2);
        exchangeRateText.innerText = `${value} ${fromInput.value} = ${totalExchangeRate} ${toInput.value}`;
    } catch (error) {
        console.log("ERROR - Failed to find correct exchange rate data")
        exchangeRateText.innerText = "Oh no! Something went wrong...";
    }
}

// Event handlers for buttons and icons
window.addEventListener("load", getExchangeRate)





