console.log("start of sellMain.js");

window.onload = function (){
    console.log(sessionStorage.email);
    
    var emailID = document.getElementById("email");
    var phoneNumberID = document.getElementById("phoneNumber");
    var venmoID = document.getElementById("venmo");
    
    var email = sessionStorage.email;
    var phoneNumber = sessionStorage.phoneNumber;
    var venmo = sessionStorage.venmo;
    
    emailID.setAttribute("value", email);
    phoneNumberID.setAttribute("value", phoneNumber);
    venmoID.setAttribute("value", venmo);
    
    console.log("Loading " + phoneNumber);
    console.log("Loading " + email);
    console.log("Loading " + venmo);
}

$(document).ready(function(){
console.log("start of function");


//Variable to hold request
var request;

// bind to the submit event in our form

$("#sellForm").submit(function(event){
    
    saveCrap();
    
    //Abort any pending request
    if (request) {
        console.log("aborting request");
        request.abort()
        
    }

    // setup some local variables
    var $form = $(this);
    console.log("set up local variables");
    
    //Select and cache all fields
    var $inputs = $form.find("input, select, button, textarea");
    
    //Serialize the data in the form
    var serializedData = $form.serialize();
    
    //TODO - CREATE FUNCTION TO GENERATE ID NUMBERS
    console.log(serializedData);
    serializedData = serializedData + "&id=" + "2020"; 
    console.log(serializedData);
    //Disable inputs while Ajax request is occuring
    $inputs.prop("disabled", true);

    console.log("before sending request");
    //Send the request
    request = $.ajax({
        url:"https://script.google.com/macros/s/AKfycbxvb88TNK1jhtxjKBAmmAfUioIWr4pbeACqljb07KeNAOjX8C3a/exec",
        type: "post",
        data: serializedData
    });

    //Callback handler that will be called on success
    request.done(function(response, textStatus, jqXHR){
        //Log message to console
        console.log("It worked!");
        console.log(response)
        console.log(textStatus);
        console.log(jqXHR);        
    });

    //Callback handler that will be called on failure
    request.fail(function(jqXHR, textStatus, errorThrown){
        console.error("The following error occured: " +                         textStatus, erorrThrown);
    });

    //handler that will always be called
    request.always(function(){
        //Enable inputs again
        $inputs.prop("disabled", false);
    });
    
    //Prevent default posting of form
    event.preventDefault();
    console.log("sendData")
});
});

function saveCrap(){
    var emailID = document.getElementById("email");
    var phoneNumberID = document.getElementById("phoneNumber");
    var venmoID = document.getElementById("venmo");
     
    sessionStorage.setItem("email", emailID.value);
    sessionStorage.setItem("phoneNumber", phoneNumberID.value);
    sessionStorage.setItem("venmo", venmoID.value);
    
    console.log("saving " + sessionStorage.email);
    console.log("saving " + sessionStorage.venmo);
    console.log("saving " + sessionStorage.phoneNumber);   
    
    //calculates textbook ID
    var textbookID = Date.now();
    console.log(textbookID);
    
    //saves textbook ID to session storage to be displayed on next page
    sessionStorage.setitem("textbookID", textbookID);
}
