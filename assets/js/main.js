

let id_timer;
range=[];
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
                document.getElementById("answers").innerHTML=` <div class="container">
                <h1 class="correctAs">Your Score Is: ${totalcorrect}/${arrObj.length}</h1>
                <a href="quiz.html"><button class="button-6" role="button">Replay</button></a>
                </div>`;
                
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

function checkAnswer(tag){
  if(correct==tag.id){
    tag.setAttribute("class", " answer bg-green");
    totalcorrect+=1;
  }else{
      tag.setAttribute("class", " answer bg-red");}
  
 
  sleep(700).then(() => {
    showQuestion(arrObj);
});  
}









