let mainArray = [''];
let displayArray = [''];
let allowNumber = true;
let decimalCounter = 0;






$(document).ready(function() {

    $('.number').on("click", function ()
    {

        let value = $(this).text();

        if (allowNumber === true)
        {
            if (value==='.' && decimalCounter === 1)
            {
                return;
            }

            else
            {

                if (value === '.' && decimalCounter === 0)
                {
                    decimalCounter = 1;
                }

                mainArray[mainArray.length - 1] += value;
                displayArray = mainArray.join("");
                // print();
                console.log(mainArray);

            }
        }

        else
        {
            mainArray=[''];
            mainArray[mainArray.length - 1] += value;
            displayArr = mainArray.join("");
            // print();
            allowNumber = true;

        }


    });


    $('.operator').on("click",function()
    {

        // operatorCheck = 1;
        // decimalCounter = 0;
        let operator = $(this).text();


        // if ( mainArray[mainArray.length-1] === '' && (mainArray[mainArray.length-2] !== "(" &&  mainArray[mainArray.length-2] !== ")" ) )
        // {
        //     mainArray.splice((mainArray.length-2),2);
        // }
        mainArray.push(operator);
        mainArray.push('');
        displayArray = mainArray.join("");
        // print();                                    // print the display
        allowNumber = true;          //let array to accept new number
        console.log(mainArray);

    });

    $('#equal').on("click",doMath);


});