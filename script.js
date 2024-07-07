const currencies = [
    "USD", "EUR", "GBP", "JPY", "AUD", "CAD", "CHF", "CNY", "SEK", "NZD",
    "MXN", "SGD", "HKD", "NOK", "KRW", "TRY", "INR", "RUB", "BRL", "ZAR","ILS"
];

async function getRates() {
    try {
        const response = await fetch('https://api.exchangerate-api.com/v4/latest/USD');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data.rates;
    } catch (error) {
        console.error("There was a problem with the fetch operation:", error);
    }
}

async function initialize() {
    const rates = await getRates();
    if (!rates) {
        alert("Failed to fetch exchange rates. Please try again later.");
        return;
    }
    const fromCurrency = document.getElementById('fromCurrency');
    const toCurrency = document.getElementById('toCurrency');

    currencies.forEach(currency => {
        if (rates[currency]) {
            const option1 = document.createElement('option');
            const option2 = document.createElement('option');
            option1.value = currency;
            option1.text = currency;
            option2.value = currency;
            option2.text = currency;
            fromCurrency.add(option1);
            toCurrency.add(option2);
        }
    });
}

async function convertCurrency() {
    const amount = document.getElementById('amount').value;
    if (!amount) {
        alert("Please enter an amount.");
        return;
    }

    const fromCurrency = document.getElementById('fromCurrency').value;
    const toCurrency = document.getElementById('toCurrency').value;

    if (!fromCurrency || !toCurrency) {
        alert("Please select both currencies.");
        return;
    }

    const rates = await getRates();
    if (!rates) {
        alert("Failed to fetch exchange rates. Please try again later.");
        return;
    }

    const result = (amount * rates[toCurrency] / rates[fromCurrency]).toFixed(2);
    document.getElementById('result').innerText = `Converted Amount: ${result} ${toCurrency}`;
}

document.getElementById('convert').addEventListener('click', convertCurrency);

window.onload = initialize;
