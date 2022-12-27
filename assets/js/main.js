

let id_timer;
range=[];
let incorrect=[];
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
function getJson_data(){

  const xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
    arrObj = JSON.parse(this.responseText);
    randoom(arrObj.length);
    showQuestion(arrObj)
    }
  }
  xhr.open("GET", "../assets/js/data.json", true);
  xhr.send();
}
let count = 0;
let correct=0;
let totalcorrect=0;
function showQuestion(arrObj){
       if(count<arrObj.length){
        move(30);
        correct =arrObj[range[count]].correct;
        document.getElementById("answers").innerHTML="";
        document.getElementById("question").innerText =arrObj[range[count]].question;
       
        document.getElementById("countquestion").innerText =(count+1)+"/"+arrObj.length;
          
          for(let i=0;i<arrObj[range[count]].answer.length;i++){ // pour afficher les 4 réponses
            document.getElementById("answers").innerHTML+=`
            <div class="answer"  onclick="addSelected(this)" id="${i+1}">  ${arrObj[range[count]].answer[i]}                                  
            </div>
            `;
          }
          document.getElementById("answers").innerHTML+=`<center><button class="button-8" onclick="checkcorerect()">Next</button></center>`
        count++;
       }
      else{
        document.getElementById("progress").innerHTML="";
                document.getElementById("answers").innerHTML="";
                document.getElementById("question").innerHTML="";
                document.getElementById("answers").innerHTML=` <div class="container">
                <h1 class="correctAs">Your Score Is: ${totalcorrect}/${arrObj.length}</h1>
                <a href="quiz.html"><button class="button-6" role="button">Replay</button></a>
                <button class="button-7" onclick="focusex()">Explication</button>
                </div>`;
                document.getElementById("answers").innerHTML+=`<div  id="explicationn" class="explication">`;
                for (let i  of incorrect) {
                  document.getElementById("answers").innerHTML+=` <ul class="ul"><li class="questionli"> <strong>Question:</strong> ${ arrObj[i].question} </li> <li class="reponseli">  <strong>Reponse</strong> :${ arrObj[i].answer[ arrObj[i].correct-1]} </li> <li class="explicationli" > <strong>Explication:</strong> ${ arrObj[i].Explication} </li> </ul>`;

                 
                }
                document.getElementById("answers").innerHTML+=`</div>`;
                
                
      }
}
getJson_data();

function randoom(max){
  let newnum;
  for(let i=1;i<=max;i++){
   newnum =  Math.floor(Math.random() * (max));
   while (range.includes(newnum)){
    newnum =  Math.floor(Math.random() * (max));
   }
   range.push(newnum);
  }
}



let selected;
let  addSelected = (tag)=>{
  selected=tag.id;
  tag.setAttribute("class","answer bg-regulare");
  let answers = document.getElementsByClassName("answer");
  for(let answer of answers){
    answer.setAttribute("class","answer");
  }
  tag.setAttribute("class","answer bg-regulare");
}
// check selected choices---------------------------
let checkcorerect = ()=>{
  if(selected ==correct){
    totalcorrect+=1;
      document.getElementById(selected).setAttribute("class", "answer bg-green");
  }
  else{
          incorrect.push(count-1);  // explication
          document.getElementById(selected).setAttribute("class", "answer bg-red");
          document.getElementById(correct).setAttribute("class", "answer bg-green");
    }
  setTimeout(() => { if(count<arrObj.length){
    move(29);}
    showQuestion(arrObj);
}, 700);
}
function focusex(){
  document.getElementById('explicationn').scrollIntoView();
}




