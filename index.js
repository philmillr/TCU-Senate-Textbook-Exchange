console.log("start of index.js");

function initializeValues(){
    sessionStorage.setItem("email", "");
    sessionStorage.setItem("phoneNumber", "");
    sessionStorage.setItem("venmo", "");
    
    console.log(sessionStorage.phoneNumber)
    console.log("initializing session storage values")
}

initializeValues();
