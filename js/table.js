/* 
    Course: COMP.4610 GUI Programming I
    Name: William Zouzas
    Email: william_zouzas@student.uml.edu
    Date Created: 10/24/2021

    File: table.js
    GUI Assignment: HW4 Part 1 Validation Plugin
    File Description: This file contains functions that take user input from the form created in index.html and then create a multiplication table with those values. The function in this file both displays the values and also calculates the result by multiplying the entered range of numbers. There are three for-loops in this function. The first will display the column header numbers. The next is for adding rows to the multiplication table. Finally, the nested for-loop inside this for-loop calculates and writes the data by multiplying the column and row values. The content is cleared each time the user presses the button on the form. In order to start this JavaScript code, the user must press the button "Generate Multiplication Table". This was achieved by using the "onclick" functionality of JavaScript. The beginning part of this JavaScript file validates the user input by checking if there is missing data from the form, if the values are indeed numbers, if those numbers are integers, if the numbers are within the correct range, and a final check to make sure the minimum values are less than the maximum values entered in the form.

    Copyright (c) 2021 by William. All rights reserved. May be freely copied or excerpted for educational purposes with credit to the author.
    Updated by WZ on 11/20/21
*/

// https://jsfiddle.net/mcu9sgtj/
//$(document).ready(function() {
function validateForm() {

    // Check to make sure the minimum value is less than the maximum value (for row or column)
    // https://coderedirect.com/questions/267573/jquery-validate-less-than
    $.validator.addMethod('lessThanEqual', function(value, element, param) {    
        var i = parseInt(value);
        var j = parseInt(document.getElementById(param[0]).value);
        return i <= j;
    });

    // List of rules for form validation
    // The rules indicate that each entry is required and cannot be left blank, only numbers are allowed, the range is -50 to 50, and the minimum range value must be less than the maximum range value
    $('#myForm').validate({
        rules: {
            columnMin: {
                required: true,
                number: true,
                range: [-50, 50],
                lessThanEqual: ['columnMax']
            },
            columnMax: {
                required: true,
                number: true,
                range: [-50, 50]
            },
            rowMin: {
                required: true,
                number: true,
                range: [-50, 50],
                lessThanEqual: ['rowMax']
            },
            rowMax: {
                required: true,
                number: true,
                range: [-50, 50]
            }
        },
        // Unique messages are displayed to the user if they enter invalid data
        messages: {
            columnMin: {
                required: 'MISSING VALUE: No number was entered. Please enter a number between -50 and 50 for the minimum column value.',
                number: 'INVALID ENTRY: No number was entered. Please enter a number between -50 and 50 for the minimum column value.',
                range: 'OUT OF RANGE: The number entered is out of range. Please enter a number between -50 and 50 for the minimum column value.',
                lessThanEqual: 'ERROR: The minimum column value must be less than the maximum column value. Please make sure the minimum is less than the maximum to create a valid table.'
            },
            columnMax: {
                required: 'MISSING VALUE: No number was entered. Please enter a number between -50 and 50 for the maximum column value.',
                number: 'INVALID ENTRY: No number was entered. Please enter a number between -50 and 50 for the maximum column value.',
                range: 'OUT OF RANGE: The number entered is out of range. Please enter a number between -50 and 50 for the maximum column value.'
            },
            rowMin: {
                required: 'MISSING VALUE: No number was entered. Please enter a number between -50 and 50 for the minimum row value.',
                number: 'INVALID ENTRY: No number was entered. Please enter a number between -50 and 50 for the minimum row value.',
                range: 'OUT OF RANGE: The number entered is out of range. Please enter a number between -50 and 50 for the minimum row value.',
                lessThanEqual: 'ERROR: The minimum row value must be less than the maximum row value. Please make sure the minimum is less than the maximum to create a valid table.'
            },
            rowMax: {
                required: 'MISSING VALUE: No number was entered. Please enter a number between -50 and 50 for the maximum row value.',
                number: 'INVALID ENTRY: No number was entered. Please enter a number between -50 and 50 for the maximum row value.',
                range: 'OUT OF RANGE: The number entered is out of range. Please enter a number between -50 and 50 for the maximum row value.'
            }
        }
    });

    return $("#myForm").valid();
}

// Create multiplication table here
document.getElementById("clickMe").onclick = function () { 

    // Clear content of multiplication table to make room for new table generated by user input
    // This will also clear any prior error messages
    clearContent();

    // If the form is invalid, do not create a multiplication table
    // For example, if the form contains characters or a value out of range, do not proceed with the multiplication table generation
    if(!validateForm()) {
        return;
    }

    // Initialize values entered by user
    var columnMin = document.getElementById("columnMin").value;
    var columnMax = document.getElementById("columnMax").value;
    var rowMin = document.getElementById("rowMin").value;
    var rowMax = document.getElementById("rowMax").value;

    // Check if the numbers are decimals and round the decimals to the nearest integer
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/round
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/isInteger
    if (!(Number.isInteger(columnMin))) {
        columnMin = Math.round(columnMin);
    }
    if (!(Number.isInteger(columnMax))) {
        columnMax = Math.round(columnMax);
    }
    if (!(Number.isInteger(rowMin))) {
        rowMin = Math.round(rowMin);
    }
    if (!(Number.isInteger(rowMax))) {
        rowMax = Math.round(rowMax);
    }

    // Create the elements needed to display the table on the webpage
    var tableDisplaySection = document.getElementById("result");
    var table = document.createElement('TABLE');
    var tableBody = document.createElement('TBODY');
    table.appendChild(tableBody);

    // Display column header values above table
    var tr = document.createElement('TR');
    var td = document.createElement('TD');
    td.width = '75';
    tr.appendChild(td);
    for(var j = columnMin; j <= columnMax; j++) {
        td = document.createElement('TD');
        td.width = '75'; 
        td.appendChild(document.createTextNode(j));
        tr.appendChild(td);
    }
    tableBody.appendChild(tr);

    // Calculate values and display table body using two for-loops
    var value;
    for (var i = rowMin; i <= rowMax; i++) {
        
        // Create a new row element to display the data
        tr = document.createElement('TR');
        td = document.createElement('TD');
        
        // Set width for space between columns
        td.width = '75';
        
        // Add new row element in table
        td.appendChild(document.createTextNode(i));
        tr.appendChild(td);
        tableBody.appendChild(tr);
        
        // Display and calculate the data values in the table
        for (var j = columnMin; j <= columnMax; j++) {
            td = document.createElement('TD');
            td.width = '75';
            value = i * j;
            td.appendChild(document.createTextNode(value));
            tr.appendChild(td);
        }
    }
    // Add the resulting table to the appriopriate section in HTML
    tableDisplaySection.appendChild(table);
}

/* 
Function used to clear the multiplication table when a new table is generated
Source: https://www.geeksforgeeks.org/how-to-clear-the-content-of-a-div-using-javascript/
*/
function clearContent() {
    document.getElementById("result").innerHTML = "";
}

