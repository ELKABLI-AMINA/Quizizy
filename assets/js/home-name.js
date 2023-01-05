function setname(){

  let firstname =document.getElementById("name").value;
  localStorage.setItem("textvalue",firstname);
}
function validateName(){

let name = document.getElementById('name');
let button = document.getElementById('checkbtn');
regName = /^([\w]{5})+$/;
if(name.value==''){
    console.log("disabled")
}else {
  if(!regName.test(name.value)){ 
    button.removeAttribute("disabled")
    console.log(name)
  }else {
     button.setAttribute("disabled","disabled");
  }
}

}

