var valueAll = 0;
var valueOutput = 0
var valueMaxProduct = 0;
var chash5 = 5;
var chash2 = 2;
var chash1 = 1;
var valueProductA = 6;
var valueProductB = 7;
var valueProductC = 8;

var inputCash = document.getElementById('show-input-cash');

var outCash = document.getElementById("show-output-cash");

var ballot5 = document.getElementById('cash-5');
var ballot2 = document.getElementById('cash-2');
var ballot1 = document.getElementById('cash-1');

var productA = document.getElementById('btA');
var productB = document.getElementById('btB');
var productC = document.getElementById('btC');

var productAF = document.getElementById('candyA');
var productBF = document.getElementById('candyB');
var productCF = document.getElementById('candyC');

var take = document.getElementById('take');

var check = document.getElementById('check');

var wallet = document.getElementById('wallet');

var actionViewCandyMachine = document.getElementById('candy-machine-button');

var actionViewElevator = document.getElementById('elevator-button');

var containerCandyMachine = document.getElementById('container-candy-machine');

var containerElevator = document.getElementById('container-elevator');

var header = document.getElementsByTagName('header')[0];

function maxValue() {
    if (valueProductA > valueProductB && valueProductA > valueProductC) { return valueProductA; }
    if (valueProductB > valueProductA && valueProductB > valueProductC) { return valueProductB; }
    if (valueProductC > valueProductA && valueProductC > valueProductB) { return valueProductC; }
};

function validationValueProduct(valueMax, value) {
    var status = false;
    if (valueMax > value) { status = true; }
    return status;
}

function validationvalidationShowProductButtons() {
    inputCash.innerHTML = 'R$ ' + valueAll;
    if (valueProductA <= valueAll) { productA.style.display = 'flex'; } else { productA.style.display = 'none'; }
    if (valueProductB <= valueAll) { productB.style.display = 'flex'; } else { productB.style.display = 'none'; }
    if (valueProductC <= valueAll) {
        productC.style.display = 'flex';
        HideInputCashButtons();
    } else { productC.style.display = 'none'; }
}

function HideInputCashButtons() {
    check.checked = false;
    wallet.style.display = 'none';
}

function HideInputValuesAndButtons() {
    valueAll = 0;
    validationvalidationShowProductButtons();
    HideInputCashButtons();
}

function showOutputValuesAndButtons() {
    outCash.innerHTML = 'R$ ' + valueOutput;
    take.style = 'display: flex;  animation: pulse-white 2s infinite;';
    HideInputValuesAndButtons();
}

function showCandyMachine() {
    actionViewCandyMachine.style = 'display: flex; animation: action 5s infinite ease-in-out; animation-name: action; animation-duration: .5s; animation-timing-function: linear;';
    actionViewElevator.style = 'display: flex;';
    containerElevator.style.display = 'none';
    containerCandyMachine.style.display = 'flex';
    header.style = 'background-color: #2f323a; width: 100%; transition: .5s;';
}

function showElevator() {
    actionViewElevator.style = 'display: flex; animation: action 5s infinite ease-in-out; animation-name: action; animation-duration: .5s; animation-timing-function: linear;';
    actionViewCandyMachine.style = 'display: flex;';
    containerElevator.style.display = 'flex';
    containerCandyMachine.style.display = 'none';
    header.style = 'background-color: #0f0000; width: 100%; transition: .5s;';
}

function getProductsAndValueReturn(product) {
    switch (product) {
        case 'a':
            {
                valueOutput += valueAll - valueProductA;
                showOutputValuesAndButtons();
                productAF.style = 'display: block;  animation: scale-in 1s cubic-bezier(0.250, 0.460, 0.450, 0.940);';
                break;
            }
        case 'b':
            {
                valueOutput += valueAll - valueProductB;
                showOutputValuesAndButtons();
                productBF.style = 'display: block;  animation: scale-in 1s cubic-bezier(0.250, 0.460, 0.450, 0.940);';
                break;
            }
        case 'c':
            {
                valueOutput += valueAll - valueProductC;
                showOutputValuesAndButtons();
                productCF.style = 'display: block;  animation: scale-in 1s cubic-bezier(0.250, 0.460, 0.450, 0.940);';
                break;
            }
    }
}


function StartOrRestartCM() {
    valueOutput = 0;
    outCash.innerHTML = '';
    productAF.style.display = 'none';
    productBF.style.display = 'none';
    productCF.style.display = 'none';

    valueAll = 0;
    validationvalidationShowProductButtons();

    take.style.display = 'none';
    wallet.style.display = 'block';
}

StartOrRestartCM();

valueMaxProduct = maxValue();

// showCandyMachine();
showElevator();

ballot5.addEventListener('click', function() {
    if (validationValueProduct(valueMaxProduct, valueAll)) {
        valueAll += chash5;
        validationvalidationShowProductButtons();
    }
});

ballot2.addEventListener('click', function() {
    if (validationValueProduct(valueMaxProduct, valueAll)) {
        valueAll += chash2;
        validationvalidationShowProductButtons();
    }
});

ballot1.addEventListener('click', function() {
    if (validationValueProduct(valueMaxProduct, valueAll)) {
        valueAll += chash1;
        validationvalidationShowProductButtons();
    }
});

productA.addEventListener('click', function() { getProductsAndValueReturn('a'); });

productB.addEventListener('click', function() { getProductsAndValueReturn('b'); });

productC.addEventListener('click', function() { getProductsAndValueReturn('c'); });

take.addEventListener('click', function() { StartOrRestartCM() });

actionViewCandyMachine.addEventListener('click', function() { showCandyMachine(); });
actionViewElevator.addEventListener('click', function() { showElevator(); });