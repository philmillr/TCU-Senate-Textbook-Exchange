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
    var email = document.getElementById("email").value;
    var phoneNumber = document.getElementById("phoneNumber").value;
    var venmo = document.getElementById("venmo").value;
    sessionStorage.setItem("email", email);
    sessionStorage.setItem("phoneNumber", phoneNumber);
    sessionStorage.setItem("venmo", venmo);
    
    console.log("saving " + email);
    console.log("saving " + venmo);
    console.log("saving " + phoneNumber);
}
