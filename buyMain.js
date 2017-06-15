console.log("start of buyMain.js");



$(document).ready(function(){
    console.log("Beginning of sendBuyData()")
    
    //Variable to hold request
    var request;
    
         var submitButton = document.getElementById("submitButton"); 
        var confirmButton = document.getElementById("confirmButton");
        var cancelButton = document.getElementById("cancelButton");
        var loading = document.getElementById("sk-folding-cube");
        var loadingPrint = document.getElementById("loading");
        var output = document.getElementById('confirmInfo'); 
    
    $('#confirmInfo').hide();
    
    submitButton.onclick = function(){
        loading.style.visibility = "visible";
        loadingPrint.style.visibility = "visible";
        submitButton.style.visibility = "hidden";
    }

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
        output.style.visibility = "visible";
        confirmButton.style.visibility = "visible";
        cancelButton.style.visibility = "visible";
        loading.style.visibility = "hidden";
        loadingPrint.style.visibility = "hidden";
        $('#confirmInfo').fadeIn(1000);
        $('.co').fadeIn(1000);
        
        
        
        
    });
        
    cancelButton.onclick = function(){
            output.style.visibility = "hidden";
            $('.co').fadeOut(500);
            confirmButton.style.visibility = "hidden";
            cancelButton.style.visibility = "hidden";
            $('#submitButton').hide();
            submitButton.style.visibility = "visible";
            $('#submitButton').fadeIn(1000);
            loading.style.visibility = "hidden";
            loadingPrint.style.visibility = "hidden";
            deleteOldData();
        
            
        }

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


function deleteOldData(){
     var output = document.getElementById('confirmInfo'); 
   output.innerHTML = "";
}

function displayData(JsonData){
    var itemInfo = "";
    for (var part in JsonData){
        itemInfo = itemInfo + part + ": " + JsonData[part] + "<br>";        
        
    }
    
    var output = document.getElementById('confirmInfo'); 
   output.innerHTML = itemInfo;
    
}


//Test to learn Github
