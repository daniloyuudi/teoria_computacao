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
    if (valueProductC <= valueAll) { productC.style.display = 'flex'; } else { productC.style.display = 'none'; }
}

function HideInputValuesAndButtons() {
    valueAll = 0;
    validationvalidationShowProductButtons();
    check.checked = false;
    wallet.style.display = 'none';
}

function showOutputValuesAndButtons() {
    outCash.innerHTML = 'R$ ' + valueOutput;
    take.style.display = 'flex';
    HideInputValuesAndButtons();
}

function getProductsAndValueReturn(product) {
    switch (product) {
        case 'a':
            {
                valueOutput += valueAll - valueProductA;
                showOutputValuesAndButtons();
                productAF.style.display = 'block';
                break;
            }
        case 'b':
            {
                valueOutput += valueAll - valueProductB;
                showOutputValuesAndButtons();
                productBF.style.display = 'block';
                break;
            }
        case 'c':
            {
                valueOutput += valueAll - valueProductC;
                showOutputValuesAndButtons();
                productCF.style.display = 'block';
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