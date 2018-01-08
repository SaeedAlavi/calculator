let mainArray = [''];
let display = null;
let allowNumber = true;
let decimalCounter = 0;
let operatorCheck = false;
let lastOperator = null;
let lastOperant = null;






$(document).ready(function() {

    let canvas = document.querySelector('canvas');
    // canvas.width = window.innerWidth * 30/100;
    // canvas.height = window.innerHeight * 80/100;

    let c = canvas.getContext("2d");
    console.log("height:"+canvas.height);
    console.log("width:"+canvas.width);
    c.beginPath();
    c.moveTo(canvas.width*.4,canvas.height*.05);
    c.lineTo(canvas.width*.4,canvas.height*.95);
    c.stroke();
    c.closePath();
    c.beginPath();
    c.moveTo(canvas.width*.05,canvas.height*.6);
    c.lineTo(canvas.width*.95,canvas.height*.6);
    c.stroke();
    c.closePath();

    $('.number').on("click", getNumbers);
    $('.operator').on("click",getOperators);
    $('.equal').on("click",doMath);
    $('#clear').on("click",clearAll);
    $('.prantesis').on("click",getPrantesis);
    $("#sin").on("click",sinCal);
    $("#cos").on("click",cosCal);
    $("#tan").on("click",tanCal);
    $("#cot").on("click",cotCal);
    $("#logarithm").on("click",logCal);
    $("#ln").on("click",lnCal);
    $("#factoriel").on("click",factorCal);
    $("#sqrt").on("click",sqrtCal);
    $("#sqr").on("click",sqrCal);
    $("#power").on("click",powerCal);
    $("#percent").on("click",percentCal);
    $("#euler").on("click",eulerCal);
    $("#pi").on("click",piCal);

    $("#plot").on("click",plot)




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
        print();
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

    // if (mainArray[mainArray.length-2] === "(")
    // {
    //
    //     if (operator === "-")
    //     {
    //         mainArray.push(operator);
    //         display = mainArray.join("");
    //         print();
    //         mainArray.push('');
    //         allowNumber = true;
    //         console.log(mainArray);
    //         lastOperator = operator;
    //         operatorCheck = false;
    //     }
    //
    //     else {
    //         return;
    //     }
    //
    // }



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
        if (mainArray[i] === "(" && mainArray[i+1] === "-")
        {
            mainArray.splice(i+1,2,(-1*mainArray[i+2]));
        }
    }

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
    if (mainArray.length === 1)
    {

        mainArray.push(lastOperator, lastOperant);
        console.log(mainArray);
        displayArr = mainArray.join("");
        print();
        doMath();



    }
    functionColector();
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

    if (endingToOperator === true){
        mainArray.push(lastOperator,lastOperant);
        doMath();
        operatorCheck = true;
    }





    // display = mainArray.join("");
    console.log("display:",display);
    $('#result').text(mainArray);
    allowNumber = false;

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

function sinCal()
{
    mainArray.push("sin","");
    display = mainArray.join("");
    print();
}

function cosCal()
{
    mainArray.push("cos","");
    display = mainArray.join("");
    print();
}

function tanCal()
{
    mainArray.push("tan","");
    display = mainArray.join("");
    print();
}

function cotCal()
{
    mainArray.push("cot","");
    display = mainArray.join("");
    print();
}

function logCal()
{
    mainArray.push("log","");
    display = mainArray.join("");
    print();
}

function lnCal()
{
    mainArray.push("ln","");
    display = mainArray.join("");
    print();
}

function factorCal()
{
    mainArray.push("!","");
    display = mainArray.join("");
    print();
}

function sqrtCal()
{
    mainArray.push("√","");
    display = mainArray.join("");
    print();
}

function sqrCal()
{
    mainArray.push("^","2","");
    display = mainArray.join("");
    print();
}

function powerCal()
{
    mainArray.push("^","");
    display = mainArray.join("");
    print();
}

function percentCal()
{
    mainArray.push("%","");
    display = mainArray.join("");
    print();
}

function eulerCal()
{
    mainArray.push(Math.E);
    display = mainArray.join("");
    print();
}

function piCal()
{
    mainArray.push(Math.PI);
    display = mainArray.join("");
    print();
}


function functionColector()
{

    for (let i=mainArray.length-1; i>=0; i--)
    {
        if (mainArray[i] === "sin")
        {
            mainArray[i] = Math.sin(mainArray[i+1]/180*Math.PI);
            if (mainArray[i]<1e-15){mainArray[i] = 0;}
            mainArray.splice(i+1,1);
            console.log(mainArray);
        }

        if (mainArray[i] === "cos")
        {
            mainArray[i] = Math.cos(mainArray[i+1]/180*Math.PI);
            if (mainArray[i]<1e-15){mainArray[i] = 0;}
            mainArray.splice(i+1,1);
            console.log(mainArray);
        }

        if (mainArray[i] === "tan")
        {
            if (Math.cos(mainArray[i+1]/180*Math.PI)<1e-15)
            {
                $("#result").text("ERROR");
                return;
            }
            mainArray[i] = Math.tan(mainArray[i+1]/180*Math.PI);
            console.log("here4",mainArray[i]);
            mainArray.splice(i+1,1);
            console.log(mainArray);
        }

        if (mainArray[i] === "cot")
        {
            if (Math.sin(mainArray[i+1]/180*Math.PI)<1e-15)
            {
                error = 1;
                return;
            }
            mainArray[i] = 1/(Math.tan(mainArray[i+1]/180*Math.PI));
            mainArray.splice(i+1,1);
            console.log(mainArray);
        }

        if (mainArray[i] === "log")
        {
            if (mainArray[i+1] <= 0)
            {
                $("#result").text("ERROR");
                return;
            }
            mainArray[i] = Math.log10(mainArray[i+1]);
            mainArray.splice(i+1,1);
            console.log(mainArray);
        }

        if (mainArray[i] === "ln")
        {
            if (mainArray[i+1] <= 0)
            {
                $("#result").text("ERROR");
                return;
            }
            mainArray[i] = Math.log(mainArray[i+1]);
            mainArray.splice(i+1,1);
            console.log(mainArray);
        }

        if (mainArray[i] === "!")
        {
            mainArray[i-1] = factoriel(mainArray[i-1]);
            mainArray.splice(i,1);
            console.log(mainArray);
        }

        if (mainArray[i] === "√")
        {
            mainArray[i] = Math.sqrt(mainArray[i+1]);
            mainArray.splice(i+1,1);
            console.log(mainArray);
        }

        if (mainArray[i] === "^")
        {
            mainArray[i-1] = power(mainArray[i-1],mainArray[i+1]);
            mainArray.splice(i,2);
            console.log(mainArray);
        }

        if (mainArray[i] ==="%")
        {
            console.log("1");
            if (i === 0)
            {
                console.log("2");
                mainArray[0] = 0;
                mainArray.splice(1,2);
            }
            else
            {
                mainArray[i-1] = mainArray[i-1]*mainArray[i+1]/100;
                mainArray.splice(i,2);
                console.log(mainArray);
            }



        }
        // mainArr[i] = parseFloat(mainArr[i]);
        // mainArr[i] = mainArr[i].toFixed(15);

    }

    if (mainArray.length === 1)
    {
        console.log("3");
        displayArray = mainArray.join("");
        print();
        // printDown(mainArray);

    }
}

function factoriel(num)
{
    let answer = 1;
    for (let i=1; i<=num; i++)
    {
        answer = answer * i;
    }
    return answer;
}

function power(num,power)
{
    if (power>=2)
    {
        let temp = 1;
        for (let i=1; i<=power; i++)
        {
            temp = temp*num;
        }
        return temp;
    }

    if (power === 0)
    {
        num = 1;
        return num;
    }


}

function plot()
{
    let canvas = document.querySelector('canvas');
    let c = canvas.getContext("2d");
    let a = parseInt($("#a").val());
    let b = parseInt($("#b").val());
    let c1 = parseInt($("#c").val());
    let x0 = -7;
    let y0 = null;
    let y1 = null;
    let xp0 = null;
    let xp1 = null;

    for (let x = -6, counter = 1; x <= 11 ; x+=1,counter++)
    {

        y0 = a * Math.pow(x0,2)+ b*x0 + c1;
        y1 = a * Math.pow(x,2)+ b*x + c1;

        y0 = (.6 - y0*.05)*canvas.height;
        y1 = (.6 - y1*.05)*canvas.height;
        xp0 = (.4 + x0*.05)*canvas.width;
        xp1 = (x*.05 + .4)*canvas.width;

        c.beginPath();
        c.moveTo(xp0, y0);
        c.lineTo(xp1,y1);
        c.stroke();
        c.closePath();
        x0 = x;

    }

}



