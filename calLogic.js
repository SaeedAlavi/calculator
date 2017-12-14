let mainArray = [''];
let display = null;
let allowNumber = true;
let decimalCounter = 0;
let operatorCheck = true;
let lastOperator = null;






$(document).ready(function() {

    $('.number').on("click", getNumbers);
    $('.operator').on("click",getOperators);
    $('.equal').on("click",doMath);
    $('#clear').on("click",clearAll);
    $('.prantesis').on("click",getPrantesis);

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
            display = mainArray.join("");
            print();
            console.log(mainArray);

        }
    }

    else {
        mainArray = [''];
        mainArray[mainArray.length - 1] += value;
        display = mainArray.join("");
        allowNumber = true;

    }

    operatorCheck = true;



}

function getOperators()
{
    let operator = $(this).text();

    if (operatorCheck === true){
        mainArray.push(operator);
        mainArray.push('');
        display = mainArray.join("");
        print();
        allowNumber = true;
        console.log(mainArray);
        lastOperator = operator;
        operatorCheck = false;
    }

    else if (operator === lastOperator){
        return;
    }

    else {
        mainArray.splice(mainArray.length-2,1,operator);
        lastOperator = operator;
        console.log(mainArray);
        print();
    }


}

function getPrantesis()
{
    let prant = $(this).text();
    mainArray.push(prant);
    mainArray.push('');
    display = mainArray.join("");
    print();
    allowNumber = true;
    console.log(mainArray);

}

function spaceCollector()
{
    for (let i = 0 ; i < mainArray.length ; i++)
    {
        if (mainArray[i] === "")
        {
            mainArray.splice(i,1);
        }
    }

    garbageCollector();

}

function garbageCollector()
{
    for (let i = 0 ; i < mainArray.length ; i++)
    {
        if (mainArray[i] === "(" && mainArray[i+1] === ")")
        {
            mainArray.splice(i+1,0,"0");
        }

        if (mainArray[i] === "(" && ( mainArray[i-1] !== "+" && mainArray[i-1] !== "-" && mainArray[i-1] !== "/" && mainArray[i-1] !== "×") && i!== 0)
        {
            mainArray.splice(i,0,"×");
            console.log(mainArray);
        }

        if (mainArray[i] === ")" && ( mainArray[i+1] !== "+" && mainArray[i-1] !== "-" && mainArray[i-1] !== "/" && mainArray[i-1] !== "×"))
        {
            mainArray.splice(i+1,0,"×");
            console.log(mainArray);
        }



        if (mainArray[i] === "(" && mainArray[i+2] === ")")
        {
            mainArray.splice(i,1);
            mainArray.splice(i+1,1);
        }


        if (mainArray[0]==='×' || mainArray[0]==='+' || mainArray[0]==='/')
        {
            mainArray.splice(0,1);
        }

        if (mainArray[0]==='-')
        {

            mainArray[1]=mainArray[1]-2*mainArray[1];
            mainArray.splice(0,1);

        }



    }

    display = mainArray.join("");
    $('#history').text(display);

}

function doMath() {

    spaceCollector();
    console.log(mainArray);
    let startPoint = null;
    let endPoint = null;

    while (mainArray.length > 1) {

        for (let i = mainArray.length - 1; i >= 0; i--)
        {
            if (mainArray[i] === "(")
            {
                console.log("first prantes is in ", i);
                for (let j = i + 1; j < mainArray.length; j++)
                {
                    if (mainArray[j] === ")")
                    {
                        startPoint = i;
                        endPoint = j;
                        console.log("startPoint: ", startPoint);
                        console.log("endPoint: ", endPoint);
                        break;
                    }
                }

                for (let i = startPoint + 1; i < endPoint; i++)
                {

                    if (mainArray[i] === "/")
                    {
                        if (parseFloat(mainArray[i + 1]) === 0)
                        {
                            printDown("ERROR");
                            return;
                        }

                        else
                        {
                            mainArray[i - 1] = parseFloat(mainArray[i - 1]) / parseFloat(mainArray[i + 1]);
                            mainArray.splice(i, 2);
                            endPoint = endPoint -2;
                            i = startPoint+1;
                            console.log(mainArray);
                        }

                    }
                    if (mainArray[i] === "×")
                    {
                        mainArray[i - 1] = parseFloat(mainArray[i - 1]) * parseFloat(mainArray[i + 1]);
                        mainArray.splice(i, 2);
                        endPoint = endPoint -2;
                        i = startPoint+1;
                        console.log(mainArray);

                    }


                }

                for (let i = startPoint + 1; i < endPoint; i++)
                {

                    if (mainArray[i] === "+")
                    {
                        mainArray[i - 1] = parseFloat(mainArray[i - 1]) + parseFloat(mainArray[i + 1]);
                        console.log(mainArray);
                        mainArray.splice(i, 2);
                        endPoint = endPoint -2;
                        i = startPoint+1;
                        console.log("+++++",mainArray);
                    }

                    if (mainArray[i] === "-")
                    {
                        mainArray[i - 1] = parseFloat(mainArray[i - 1]) - parseFloat(mainArray[i + 1]);
                        mainArray.splice(i, 2);
                        endPoint = endPoint -2;
                        i = startPoint+1;
                        console.log(mainArray);
                    }

                }
                console.log(mainArray);
                mainArray.splice(startPoint + 2, 1);
                mainArray.splice(startPoint, 1);
                console.log(mainArray);
                i = startPoint;
            }

        }

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


           if (mainArray[i] === "×") {
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
                console.log("length:",mainArray.length);

            }
        }


    }

    // display = mainArray.join("");
    console.log("display:",display);
    $('#result').text(mainArray)

}


function print()
{
    console.log("in print");
    display = mainArray.join("");
    // $('#result').text(display);
    $('#history').text(display);


}

function clearAll(){
    $('#result').text("0");
    $('#history').text("0");
    mainArray = [''];


}
