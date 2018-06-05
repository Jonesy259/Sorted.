/***********************
** VARIABLES
***********************/

var ascDOM, decDOM, inputDOM, sortDOM, passDOM, searchBtnDOM, searchDOM;

//Buttons/inputs/displays are used in multiple parts of code, using global variables for these makes code smaller.

ascDOM = document.getElementById('btn-asc');
decDOM = document.getElementById('btn-dec');
inputDOM = document.getElementById('input');
sortDOM = document.getElementById('btn-sort');
passDOM = document.getElementById('counter');
searchBtnDOM = document.getElementById('btn-search');
searchDOM = document.querySelector('.input-search');


/***********************
** FUNCTIONS
***********************/

//Toggles active CSS class when clicked. 
function decChange() {
    if ( !decDOM.className.match(/(?:^|\s)active(?!\S)/) ) {
        decDOM.classList.toggle('active');
    } else if ( decDOM.className.match(/(?:^|\s)active(?!\S)/) ) {
        decDOM.classList.toggle('active');
    }
}

//Toggles active CSS class when clicked. 
function ascChange() {
    if ( !ascDOM.className.match(/(?:^|\s)active(?!\S)/) ) {
        ascDOM.classList.toggle('active');
    } else if ( ascDOM.className.match(/(?:^|\s)active(?!\S)/) ) {
        ascDOM.classList.toggle('active');
    }
}

//Checks if input is valid (no letters, new lines) Alerts user and returns false if input cannot be sorted. Otherwise returns true.
//Variable x is a counter.
function validate(arr) {
    for (var x = 0; x < arr.length; x ++) {
        if (isNaN(arr[x])) { //isNaN = If is Not a Number.
            if (arr[x].indexOf('*') >= 0) { //Alerts the user specifically if highlight is left in list. '*'
                alert("Please Remove Highlight!");
                return false;
                break; }
            alert("No Letters or New Lines!");
            return false;
            break;
        }
    } return true;
}

//Sorts input in ascending order. Variables i + j are counters.
function sortAsc(arr) {
        var arrLength = arr.length;
        for (var i = 0; i < arrLength-1; i++) { //The length of the array - 1 is the amount of times we must pass through the list to sort it accurately.
            for (var j = 0; j < arrLength-i-1; j++) { //Only reiterates through the section of the list that is unsorted.
                if (parseInt(arr[j]) > parseInt(arr[j+1])) {
                    // Swaps numbers if next number is greater than current number.
                    var temp = arr[j];
                    arr[j] = arr[j+1];
                    arr[j+1] = temp;
                }
            }
        }
    //Returns sorted array and passes
    var array = [arr, (i)];
    return array;
}

//Sorts input in decending order. Variables i + j are counters.
function sortDec(arr) {
        var arrLength = arr.length; 
        for (var i = 0; i < arrLength-1; i++) { //The length of the array - 1 is the amount of times we must pass through the list to sort it accurately.
            for (var j = 0; j < arrLength-i-1; j++) { //Only reiterates through the section of the list that is unsorted.
                if (parseInt(arr[j]) < parseInt(arr[j+1])) {
                    // Swaps numbers if the number next number is less than current number.
                    var temp = arr[j+1];
                    arr[j + 1] = arr[j];
                    arr[j] = temp;
                }
            }
        }
    //Returns sorted array and passes
    var array = [arr, (i)];
    return array;
}

//Search function. Returns positions to string.
//Variable x is a counter. 'Arr' is array passed to search.
function search(num, arr) {
    var array = [], x; //Define variables. Array is a list to return as we need to return 2 values
       for (x = 0; x < arr.length; x++) { //Reiterates through the whole array.
           if (arr[x] === num) {
               arr[x] = '*' + arr[x] + '*'; //If number is what we searched, it is highlighted.
               array.push(x); //Adds position to array.
           }
       } return array;
}    

//Converts array to string, each element is added to a string with a double space.
//Variable K is a counter.
function toString(arr) {
    var output = ''
    for (var k = 0; k < arr.length; k++) {
        if (k === arr.length - 1) {
            output += (arr[k]);
        } else { output += (arr[k] + '  '); }
    }
    return output;
} 

/***********************
** BUTTONS
***********************/

//Toggle Sort Descending. If Sort Ascending is toggled, will untoggle.
decDOM.addEventListener('click', function() {
    if (ascDOM.className.match(/(?:^|\s)active(?!\S)/) ) {
        ascDOM.classList.toggle('active');
        decChange();
    } else { decChange(); }
} );

//Toggle Sort Ascending . If Sort Decending is toggled, will untoggle.
ascDOM.addEventListener('click', function() {
    if (decDOM.className.match(/(?:^|\s)active(?!\S)/) ) {
        decDOM.classList.toggle('active');
        ascChange();
    } else { ascChange(); }
} );

//Sorts either ascending or descending, based on boolean. Will split input into array before 
//checking for invalid characters. If no invalid characters will sort accordingly depending on
//toggled button.
sortDOM.addEventListener('click', function() {
    passDOM.textContent= 0;
    if (inputDOM.value) {
        var newArray = inputDOM.value.split(/(?:,| )+/); //Splits input into array.
        if (validate(newArray)) { //Checks if input is valid.
            if (ascDOM.className.match(/(?:^|\s)active(?!\S)/)) { //If Sort Ascending is toggled, sort ascending.
                inputDOM.value = toString(sortAsc(newArray)[0]);
                passDOM.textContent = sortAsc(newArray)[1]; //Passes counter
            }
            else if (decDOM.className.match(/(?:^|\s)active(?!\S)/)) { //If Sort Descending is toggled, sort descending.
                inputDOM.value = toString(sortDec(newArray)[0]);
                passDOM.textContent = sortDec(newArray)[1]; //Passes counter
            }
    }
    } 
} );

//Searches the number inputed, highlights numbers + outputs number of results.
searchBtnDOM.addEventListener('click', function() {
    var num = searchDOM.value; //Value inputed
    var newArray = inputDOM.value.split(/(?:,| )+/);
    if (inputDOM.value) {
        searchDOM.value = 'Found ' + search(num, newArray).length + ' value(s)';
        inputDOM.value = toString(newArray); //Converts to string, then outputs.
        passDOM.textContent = 1; //Passes counter
    } 
});