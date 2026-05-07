// Get all the elements we need
let inputField = document.getElementById('tempValue');
let convertButton = document.getElementById('convertBtn');
let resultDisplay = document.getElementById('resultDisplay');
let resultDesc = document.getElementById('resultDesc');
let errorBox = document.getElementById('errorMsg');

// Function to hide error message
function hideError() {
    errorBox.style.display = 'none';
    inputField.style.borderColor = '#ddd';
}

// Function to show error message
function showError() {
    errorBox.style.display = 'block';
    inputField.style.borderColor = '#c0392b';
    resultDisplay.innerHTML = '—';
    resultDesc.innerHTML = 'Invalid input';
}

// Function to get which radio button is selected
function getSelectedUnit() {
    let radios = document.querySelectorAll('input[name="unit"]');
    for(let i = 0; i < radios.length; i++) {
        if(radios[i].checked) {
            return radios[i].value;
        }
    }
    return 'celsius';
}

// Function to round numbers to 2 decimal places
function roundNumber(num) {
    return Math.round(num * 100) / 100;
}

// Main conversion function - this does all the math
function doConversion() {
    // First hide any old error
    hideError();
    
    // Get the value user entered
    let userInput = inputField.value.trim();
    
    // Check if empty
    if(userInput === '') {
        showError();
        return;
    }
    
    // Convert to number
    let numberValue = parseFloat(userInput);
    
    // Check if it's actually a number
    if(isNaN(numberValue)) {
        showError();
        return;
    }
    
    // Get which unit user selected
    let fromUnit = getSelectedUnit();
    
    // Variables to store results
    let celsius = null;
    let fahrenheit = null;
    let kelvin = null;
    
    // Do conversion based on input unit
    if(fromUnit === 'celsius') {
        celsius = numberValue;
        fahrenheit = (numberValue * 9/5) + 32;
        kelvin = numberValue + 273.15;
        
        // Show results
        resultDisplay.innerHTML = roundNumber(fahrenheit) + ' °F  |  ' + roundNumber(kelvin) + ' K';
        resultDesc.innerHTML = 'Converted from Celsius → Fahrenheit & Kelvin';
    }
    else if(fromUnit === 'fahrenheit') {
        celsius = (numberValue - 32) * 5/9;
        fahrenheit = numberValue;
        kelvin = (numberValue - 32) * 5/9 + 273.15;
        
        resultDisplay.innerHTML = roundNumber(celsius) + ' °C  |  ' + roundNumber(kelvin) + ' K';
        resultDesc.innerHTML = 'Converted from Fahrenheit → Celsius & Kelvin';
    }
    else if(fromUnit === 'kelvin') {
        celsius = numberValue - 273.15;
        fahrenheit = (numberValue - 273.15) * 9/5 + 32;
        kelvin = numberValue;
        
        resultDisplay.innerHTML = roundNumber(celsius) + ' °C  |  ' + roundNumber(fahrenheit) + ' °F';
        resultDesc.innerHTML = 'Converted from Kelvin → Celsius & Fahrenheit';
    }
    
    // Small animation effect
    resultDisplay.style.transform = 'scale(1.1)';
    setTimeout(function() {
        resultDisplay.style.transform = 'scale(1)';
    }, 200);
}

// When user clicks the convert button
convertButton.addEventListener('click', doConversion);

// Also allow Enter key press
inputField.addEventListener('keypress', function(event) {
    if(event.key === 'Enter') {
        doConversion();
    }
});

// Clear error when user starts typing again
inputField.addEventListener('input', function() {
    hideError();
    if(inputField.value.trim() === '') {
        resultDisplay.innerHTML = '—';
        resultDesc.innerHTML = 'Waiting for input';
    }
});