let mainArray = [''];
let display = null;
let allowNumber = true;
let decimalCounter = 0;
let operatorCheck = false;
let lastOperator = null;
let lastOperant = null;






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

    if ( mainArray[0] === ""){
        if(operator !== "-"){
            return;
        }

        else{
            mainArray[1] = mainArray[1] - 2*mainArray[1];
            mainArray.splice(0,2);
        }

    }

    if (mainArray[mainArray.length-2] === "(")
    {

        if (operator === "-")
        {
            mainArray.push(operator);
            display = mainArray.join("");
            print();
            mainArray.push('');
            allowNumber = true;
            console.log(mainArray);
            lastOperator = operator;
            operatorCheck = false;
        }

        else {
            return;
        }

    }



    if (operatorCheck === true)
    {
        mainArray.push(operator);
        display = mainArray.join("");
        print();
        mainArray.push('');
        allowNumber = true;
        console.log(mainArray);
        lastOperator = operator;
        operatorCheck = false;
    }

    else if (operator !== lastOperator)
    {
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

    console.log("after spaces Removal",mainArray);

}

function prantFixer()
{
    for (let i = 0 ; i < mainArray.length ; i++)
    {


        if (mainArray[i] === "(" && ( mainArray[i-1] !== "+" && mainArray[i-1] !== "-" && mainArray[i-1] !== "/" && mainArray[i-1] !== "×") && i!== 0)
        {
            mainArray.splice(i,0,"×");
            console.log(mainArray);
        }

        if (mainArray[i] === ")" && mainArray[i+1]!== undefined &&( mainArray[i+1] !== "+" && mainArray[i-1] !== "-" && mainArray[i-1] !== "/" && mainArray[i-1] !== "×"))
        {
            mainArray.splice(i+1,0,"×");
            console.log(mainArray);
        }


    }

    for (let i = 0 ; i < mainArray.length ; i++)
    {
        if (mainArray[i] === "(" && mainArray[i+1] === "-")
        {
            mainArray.splice(i+1,2,(-1*mainArray[i+2]));
        }
    }

    for (let i = 0 ; i < mainArray.length ; i++){
        if (mainArray[i] === "(" && mainArray[i+1] === ")")
        {
            mainArray.splice(i+1,0,"0");
        }


        if (mainArray[i] === "(" && mainArray[i+2] === ")")
        {
            mainArray.splice(i,1);
            mainArray.splice(i+1,1);
        }
    }

    console.log("after prants applied",mainArray);

    display = mainArray.join("");
    $('#history').text(display);

}

function doMath() {

    spaceCollector();
    prantFixer();
    console.log(mainArray);
    let startPoint = null;
    let endPoint = null;
    let endingToOperator = false;

    if (mainArray[mainArray.length-1]==='×' || mainArray[mainArray.length-1]==='/' || mainArray[mainArray.length-1]==='+'
        || mainArray[mainArray.length-1]==='-')
    {
        lastOperator = mainArray[mainArray.length - 1];
        mainArray.splice(-1);
        endingToOperator = true;
    }




    while (mainArray.length > 1) {

        if (mainArray.length === 3) {
            lastOperator = mainArray[1];
            lastOperant = mainArray[2];
        }

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
                            $("#result").text("ERROR");
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
                   $("#result").text("ERROR");
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

    if (mainArray.length === 1)
    {
        // if (endingToOperator === true){
        //     mainArray.push(lastOperator,lastOperant);
        //     doMath();
        // }
        //
        // else{
        //     mainArray.push(lastOperator,lastOperant);
        //     console.log(mainArray);
        //     // displayArr=mainArr.join("");
            print();
            allowNumber = false;
        // }



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
