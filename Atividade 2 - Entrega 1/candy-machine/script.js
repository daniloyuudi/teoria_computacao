var valueAll = 0;
var valueMaxProduct = 0;
var valueProductA = 6;
var valueProductB = 7;
var valueProductC = 8;
var valueOutput = 0

document.getElementById('bt1').style.display = 'none';
document.getElementById('bt2').style.display = 'none';
document.getElementById('bt3').style.display = 'none';

document.getElementById('candyA').style.display = 'none';
document.getElementById('candyB').style.display = 'none';
document.getElementById('candyC').style.display = 'none';
document.getElementById('take').style.display = 'none';


document.getElementById("show-value-all").innerHTML = 'R$ ' + valueAll;

let ballot5 = document.getElementById('r5');
let ballot2 = document.getElementById('r2');
let ballot1 = document.getElementById('r1');

let productA = document.getElementById('bt1');
let productB = document.getElementById('bt2');
let productC = document.getElementById('bt3');

let take = document.getElementById('take');

let check = document.getElementById('check');


let wallet = document.getElementById('carteira');

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

function showButtons() {
    document.getElementById("show-value-all").innerHTML = 'R$ ' + valueAll;
    if (valueProductA <= valueAll) { document.getElementById('bt1').style.display = 'flex'; } else { document.getElementById('bt1').style.display = 'none'; }
    if (valueProductB <= valueAll) { document.getElementById('bt2').style.display = 'flex'; } else { document.getElementById('bt2').style.display = 'none'; }
    if (valueProductC <= valueAll) { document.getElementById('bt3').style.display = 'flex'; } else { document.getElementById('bt3').style.display = 'none'; }
}

function checkValueOutput() {
    document.getElementById("show-value-output").innerHTML = 'R$ ' + valueOutput;
}

function getProductsAndValueReturn(product) {
    switch (product) {
        case 'a':
            {
                valueOutput += valueAll - valueProductA;
                checkValueOutput();
                document.getElementById('candyA').style.display = 'block';
                break;
            }
        case 'b':
            {
                valueOutput += valueAll - valueProductB;
                checkValueOutput();
                document.getElementById('candyB').style.display = 'block';
                break;
            }
        case 'c':
            {
                valueOutput += valueAll - valueProductC;
                checkValueOutput();
                document.getElementById('candyC').style.display = 'block';
                break;
            }
    }
}

function clearCM() {
    document.getElementById('bt1').style.display = 'none';
    document.getElementById('bt2').style.display = 'none';
    document.getElementById('bt3').style.display = 'none';

    document.getElementById('candyA').style.display = 'none';
    document.getElementById('candyB').style.display = 'none';
    document.getElementById('candyC').style.display = 'none';
    document.getElementById('take').style.display = 'none';

    valueAll = 0;
    valueOutput = 0;

    document.getElementById("show-value-output").innerHTML = '';
    wallet.style.display = 'block';
}

valueMaxProduct = maxValue();

ballot5.addEventListener('click', function() {
    if (validationValueProduct(valueMaxProduct, valueAll)) {
        valueAll += 5;
        showButtons();
    }
});

ballot2.addEventListener('click', function() {
    if (validationValueProduct(valueMaxProduct, valueAll)) {
        valueAll += 2;
        showButtons();
    }
});

ballot1.addEventListener('click', function() {
    if (validationValueProduct(valueMaxProduct, valueAll)) {
        valueAll++;
        showButtons();
    }
});

productA.addEventListener('click', function() {
    getProductsAndValueReturn('a');
    valueAll = 0;
    showButtons();
    check.checked = false;
    wallet.style.display = 'none';
    document.getElementById('take').style.display = 'flex';
});

productB.addEventListener('click', function() {
    getProductsAndValueReturn('b');
    valueAll = 0;
    showButtons();
    check.checked = false;
    wallet.style.display = 'none';
    document.getElementById('take').style.display = 'flex';
});

productC.addEventListener('click', function() {
    getProductsAndValueReturn('c');
    valueAll = 0;
    showButtons();
    check.checked = false;
    wallet.style.display = 'none';
    document.getElementById('take').style.display = 'flex';
});

take.addEventListener('click', function() {
    clearCM()
});