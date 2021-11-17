let timer = null;
const MAX = 3;
let count = 0;
const APPLICATION_KEY = "0e8ceb09b65528818ac295e9c38444a19de7e63f4761ba0b4c3fcdaf7a1b8b58";
const CLIENT_KEY = "1a18e61fa7d30d2c0fa84830fea1d0524066642273979304dfe0016c112ae9dd";
const ncmb = new NCMB(APPLICATION_KEY,CLIENT_KEY);
const DBName = "TestClass";
let TestClass = ncmb.DataStore(DBName);

function init() {
  if (timer == null) {
    start = new Date();
    time();
    gameStart();
  }
}


function gameStart() {
  let size = 5;
  let qnum = Math.floor(Math.random()*q.length);

  for(let i = 0; i < size*size; i++){
    let s = document.createElement("span");
    s.textContent = q[qnum][0];
    s.setAttribute("id" , "num"+i);
    s.addEventListener("click" , function(){

      if(this.textContent == q[qnum][1]){
        correct.play();
        count++;
        while(cells.firstChild){
          cells.removeChild(cells.firstChild);
        }
        if(count == MAX){
          clearTimeout(timer);
          alert("Game clear!");
          save();
          load();
          }else{
            gameStart();
          }
      }else{
        wrong.play();
      }
    });

    cells.appendChild(s);
    if(i % size == size - 1){
      const br = document.createElement("br");
      cells.appendChild(br);
    }
  }

  let p = Math.floor(Math.random()*size*size);
  let ans = document.getElementById("num" + p);
  ans.textContent = q[qnum][1];
}

function time() {
  let now = new Date();
  let eTime = parseInt((now.getTime() - start.getTime())/1000);
  score.textContent = eTime;
  timer = setTimeout("time()" , 1000);
}

function save(){
  let test = new TestClass();
  let key = "message";
  // let value = "Hello, NCMB!";
  const text = document.getElementById('message');
  let value = timer;
  test.set(key,parseInt(value));
  test.save()
    .then(function(){
      console.log('成功');
    })
    .catch(function(err){
      console.log('エラー発生：' + err);
    });
}

function load(){
  TestClass
  .order("message")
  .fetchAll()
  .then(function(results) {
    for(let i = 0; i <results.length; i++){
      console.log(results[i].message);
      if(timer < results[0].message){
        alert("High score!" + timer);
      }
    }
  })
  .catch(function(err){
    console.log("エラー発生：" + err);
  });
}
