console.log("start of buyMain.js");

$(document).ready(function(){
    console.log("Beginning of sendBuyData()")
    
    //Variable to hold request
    var request;

    // bind to the submit event in our form

    $("#buyForm").submit(function(event){
    
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
        console.log(serializedData);

            //Disable inputs while Ajax request is occuring
    $inputs.prop("disabled", true);

    console.log("before sending request");
    //Send the request
    request = $.ajax({                      
        url:"https://script.google.com/macros/s/AKfycbydLfnoSs0icYiMoFaC1LkjDUJM_M9IVU9AWNKtFuomRxXBxWU/exec",
        type: "get",
        data: serializedData
    });
        
        //Callback handler that will be called on success
    request.done(function(response, textStatus, jqXHR){
        //Log message to console
        console.log("buyMain AJAX worked!");
        console.log(response)
        console.log(textStatus);
        console.log(jqXHR);
        displayData(response);

    });

    //Callback handler that will be called on failure
    request.fail(function(jqXHR, textStatus, errorThrown){
        console.error("The following error occured: " + textStatus, erorrThrown);
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


function displayData(JsonData){
    var itemInfo = "";
    for (var part in JsonData){
        itemInfo = itemInfo + part + ":" + JsonData[part] + ", ";        
        
    }
    
    window.confirm(itemInfo);
    
}


//Test to learn Github
