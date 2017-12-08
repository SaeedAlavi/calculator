let mainArray = [''];
let displayArray = [''];
let allowNumber = true;
let decimalCounter = 0;






$(document).ready(function() {

    $('.number').on("click", getNumbers);
    $('.operator').on("click",getOperators);
    $('.equal').on("click",doMath);


});

function getNumbers() {

    let value = $(this).text();

    if (allowNumber === true) {
        if (value === '.' && decimalCounter === 1) {
            return;
        }

        else {

            if (value === '.' && decimalCounter === 0) {
                decimalCounter = 1;
            }

            mainArray[mainArray.length - 1] += value;
            displayArray = mainArray.join("");
            console.log(mainArray);

        }
    }

    else {
        mainArray = [''];
        mainArray[mainArray.length - 1] += value;
        displayArr = mainArray.join("");
        allowNumber = true;

    }

}

function getOperators()
{

    let operator = $(this).text();
    mainArray.push(operator);
    mainArray.push('');
    displayArray = mainArray.join("");
    allowNumber = true;
    console.log(mainArray);

}

function doMath() {

    console.log("main array after eqaul sign", mainArray);

    while (mainArray.length > 1) {

        for (let i = 0; i <= mainArray.length-1; i++) {

           if (mainArray[i] === "/") {
               if (parseFloat(mainArray[i + 1]) === 0) {
                   console.log("Error");
                   return;
               }

               else {
                   mainArray[i - 1] = parseFloat(mainArray[i - 1]) / parseFloat(mainArray[i + 1]);
                   mainArray.splice(i, 2);
                   i = i-1;
                   console.log(mainArray);
               }
           }


           if (mainArray[i] === "X") {
               mainArray[i - 1] = parseFloat(mainArray[i - 1]) * parseFloat(mainArray[i + 1]);
               mainArray.splice(i, 2);
               i = i-1;
               console.log(mainArray);

           }
        }

        for (let i = 0; i <= mainArray.length-1 ; i++) {

            if (mainArray[i] === "+") {
                mainArray[i - 1] = parseFloat(mainArray[i - 1]) + parseFloat(mainArray[i + 1]);
                mainArray.splice(i, 2);
                i = i-1;
                console.log(mainArray);

            }

            if (mainArray[i] === "-") {
                mainArray[i - 1] = parseFloat(mainArray[i - 1]) - parseFloat(mainArray[i + 1]);
                mainArray.splice(i, 2);
                i = i-1;
                console.log(mainArray);

            }
        }


    }
}
