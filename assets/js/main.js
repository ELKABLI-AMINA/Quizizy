

let id_timer;
range=[];
let incorrect=[];
function move(deley) {
    
  let barTime = document.getElementById("BarTime");
  let width = 100;
  let smout = 0.01;
 

  newDellay = (deley*1000*smout)/100;
  clearInterval(id_timer);
  id_timer = setInterval(frame, newDellay);
  function frame() {

      if (width <=0) {
          clearInterval(id_timer);
          
          i = 0;
      } else {
          width-=smout;
          barTime.style.width = width + "%";
          if(width<=65 && width>25 ) barTime.style.backgroundColor = "#FE9900";
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
    if (this.readyState == 4 && this.status == 200) { // readyState = l'état du requete 
    arrObj = JSON.parse(this.responseText);
    console.log(arrObj)
    
    randoom(arrObj.length);
    showQuestion(arrObj)
    }
  }
  xhr.open("GET", "assets/php/quiz.php", true);
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
          
          for(let i=0;i<arrObj[range[count]].answer.length;i++){ 
            document.getElementById("answers").innerHTML+=`
            <div class="answer"  onclick="addSelected(this)" id="${arrObj[range[count]].answer[i]}">  ${arrObj[range[count]].answer[i]}                                  
            </div>
            `;
          }
        
          document.getElementById("answers").innerHTML+=`<center><button style="display:none;" id="next"class="button-8" onclick="checkcorerect()">Next</button></center>`
        count++;
       }
      else{
        document.getElementById("progress").innerHTML="";
                document.getElementById("answers").innerHTML="";
                document.getElementById("question").innerHTML="";
                let corectRange = (totalcorrect*100)/arrObj.length;
                if(corectRange<=25){
                  document.getElementById("answers").innerHTML=`
                  <div class="img-center">
                <img  class="emoji" src="assets/img/sad.png" alt="">
                <h3 class="avis"> Focus more you can do it</h3> </div>`
                ;

                }else if(corectRange<=55){
                  document.getElementById("answers").innerHTML=`
                  <div class="img-center">
                <img class="emoji" src="assets/img/passable.png"  alt="">
                <h3 class="avis"> Good job continue</h3> </div>`
                ;

                }
                else if(corectRange<=90){
                  document.getElementById("answers").innerHTML=`
                  <div class="img-center">
                <img class="emoji" src="assets/img/bien.png"   alt="">
                <h3 class="avis"> Exelent near to be Master</h3> </div>`
                ;

                }
                else{
                  document.getElementById("answers").innerHTML=`
                  <div class="img-center">
                  <img class="emoji" src="assets/img/exelent.png"  alt="">
                    <h3 class="avis"> You are the Master</h3> </div>`
                    var audio100 = new Audio('assets/sound/app.mp3');
                     audio100.play();
                  ;

                }
                document.getElementById("answers").innerHTML+=` <div class="container">
                <h1 class="correctAs">Your Score Is: ${totalcorrect}/${arrObj.length}</h1>
                <a href="quiz.html"><button class="button-6" role="button">Replay</button></a>
                
                </div>`;
                document.getElementById("answers").innerHTML+=`<div  id="explicationn" class="explication">`;
                for (let i of incorrect) { // la valeur       // in (propriétés)
                  document.getElementById("answers").innerHTML+=` <ul class="ul"><li class="questionli"> <strong>Question ${i}:</strong> ${ arrObj[i].question} </li> <li class="reponseli">  <strong>Reponse</strong> :${ arrObj[i].correct} </li> <li class="explicationli" > <strong>Explication:</strong> ${ arrObj[i].Explication} </li> </ul>`;
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
 let selected=[];
let  addSelected = (tag)=>{  // arrow function
  selected=tag.id;
  tag.setAttribute("class","answer bg-regulare");
  let answers = document.getElementsByClassName("answer");
  for(let answer of answers){
    answer.setAttribute("class","answer");
    document.getElementById("next").style.display="block";
  }
  tag.setAttribute("class","answer bg-regulare");
}
// check selected choices---------------------------
let checkcorerect = ()=>{

    if(selected ==correct){
      totalcorrect+=1;
      document.getElementById(selected).setAttribute("class", "answer bg-green");
      var audio = new Audio('assets/sound/bonneR.mp3');
         audio.play();
        
  }
  else{
          incorrect.push(range[count-1]);  // explication                   
          document.getElementById(selected).setAttribute("class", "answer bg-red");
          document.getElementById(correct).setAttribute("class", "answer bg-green");
          var audioE = new Audio('assets/sound/Echeck.mp3');
              audioE.play();
    }
  setTimeout(() => { if(count<arrObj.length){   
    move(29);}
    showQuestion(arrObj);
}, 700);
}


document.getElementById("nom").innerHTML=localStorage.getItem("textvalue").toUpperCase();; 




