

let id_timer;
function move(deley) {
    
  let barTime = document.getElementById("BarTime");
  let width = 100;
  let smout = 0.01;
  if(deley <10) smout = 0.1;

  newDellay = (deley*1000*smout)/100;
  clearInterval(id_timer);
  id_timer = setInterval(frame, newDellay);
  function frame() {
      if (width <=0) {
          clearInterval(id_timer);
          timerfail();
          
          i = 0;
      } else {
          width-=smout;
          barTime.style.width = width + "%";
          if(width<=65 && width>25 ) barTime.style.backgroundColor = "#fde24f";
          else if(width<=35) barTime.style.backgroundColor = "red";
          else{
            barTime.style.backgroundColor = "green";
          }
      }
  }
}

function sleep (time){
                return new Promise((resolve) => setTimeout(resolve, time));
              }
let arrObj=[];
let range=[];
function getJson_data(){

  const xhr = new XMLHttpRequest();
  xhr.onload = function() {
    arrObj = JSON.parse(this.responseText);
    range = randomUniqueNum(arrObj.length-1);
    showQuestion(arrObj)
  }
  xhr.open("GET", "../assets/js/data.json", true);
  xhr.send();
}
let count = 0;
let correct=null;
let totalcorrect=0;
function showQuestion(arrObj){
       if(count<arrObj.length){
        move(30);
        correct =arrObj[range[count]].correct;
        document.getElementById("answers").innerHTML="";
        document.getElementById("question").innerText =arrObj[range[count]].question;
       
        document.getElementById("countquestion").innerText =(count+1)+"/"+arrObj.length;
      
          for(let i=0;i<arrObj[range[count]].answer.length;i++){
            document.getElementById("answers").innerHTML+=`
            <div class="answer"  onclick="checkAnswer(this)" id="${i+1}">  ${arrObj[range[count]].answer[i]}                                  
            </div>
            `;
          }
        count++;
       }
      else{
        document.getElementById("progress").innerHTML="";
                document.getElementById("answers").innerHTML="";
                document.getElementById("question").innerHTML="";
                document.getElementById("answers").innerHTML=` <div class="container"><h1 class="correctAs">Your Score Is: ${totalcorrect}/${arrObj.length}</h1></div>`;
      }
}
getJson_data();

function randomUniqueNum(outputCount) {

  let arr = []
  for (let i = 0; i <= outputCount; i++) {
    arr.push(i)
  }

  let result = [];

  for (let i = 0; i <= outputCount; i++) {
    const random = Math.floor(Math.random() * (outputCount - i));
    result.push(arr[random]);
    arr[random] = arr[outputCount - i];
  }
  return result;
}
function timerfail(){
  sleep(1).then(() => {
    move(30);
    showQuestion(arrObj);
});  

}

function checkAnswer(tag){
  if(correct==tag.id){
    tag.setAttribute("class", " answer color-secces");
    totalcorrect+=1;
  }else{
      tag.setAttribute("class", " answer color-fail");}
  
 
  sleep(700).then(() => {
    showQuestion(arrObj);
});  
}









