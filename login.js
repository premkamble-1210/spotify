const btn = document.querySelector(".loginbtn");
const usernameInput = document.querySelector(".user");
const passInput = document.querySelector(".pass");

btn.addEventListener("click", () => {
    console.log("hello", usernameInput.value, "  ", passInput.value);

    if (validate()) {
       
        usernameInput.value = '';
        passInput.value = '';
    } else {
        alert("Wrong credentials");
    }
});

var attempt = 3; // Variable to count number of attempts.

function validate() {
    var username = usernameInput.value;
    var password = passInput.value;
    if (username === password && password === username) {
        // alert("Login successful");
        swal("Done", "Your data successfully received", "success");
        setTimeout(function (){
            
        },1000);
        window.location = "index1.html"; 
        
        // window.location = "index.html"; // Redirecting to other page.
        return true;
    } else {
        attempt--;
        alert("You have left " + attempt + " attempt(s).");
        // Disabling fields after 3 attempts.
        if (attempt === 0) {
            usernameInput.disabled = true;
            passInput.disabled = true;
            btn.disabled = true;
        }
        return false;
    }
}
const google=document.querySelector(".google-login");
google.addEventListener("click",()=>{
    console.log("..");
    swal("Done", "Continue with Google", "success");
        setTimeout(function (){
            
            window.location = "index1.html"; 
        },3000);
});
const facebook=document.querySelector(".facebook-login");
facebook.addEventListener("click",()=>{
    console.log("..");
    swal("Done", "Continue with facebook", "success");
    setTimeout(function (){
        
        window.location = "index1.html"; 
    },3000); 
});
const apple=document.querySelector(".apple-login");
apple.addEventListener("click",()=>{
    console.log("..");
    swal("Done", "Continue with apple", "success");
    setTimeout(function (){
        
        window.location = "index1.html"; 
    },3000);
});