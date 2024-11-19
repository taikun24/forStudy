const up = document.getElementById('up');
const down = document.getElementById('down');
let quizs = []
let now = 0;
let correct = 0;
let num = document.getElementById('num');
let check_ans = document.getElementById('check-ans');
 const shuffleArray = (array) => {
    const cloneArray = [...array]

    for (let i = cloneArray.length - 1; i >= 0; i--) {
      let rand = Math.floor(Math.random() * (i + 1))
      // 配列の要素の順番を入れ替える
      let tmpStorage = cloneArray[i]
      cloneArray[i] = cloneArray[rand]
      cloneArray[rand] = tmpStorage
    }

    return cloneArray
  }
function show(id, quiz, show=false, correct=true){
	num.innerHTML = (id + 1) + '番';
	let ku = ogura[id].slice(0, ogura[id].length);
	ku[quiz] = '<b style="color:'+(show?(correct?'red':'blue'):'red')+';">'+(show?ku[quiz]:('？'.repeat(ku[quiz].length)))+'</b>';
	up.innerHTML = ku[0]+'　'+ku[1]+'　'+ku[2];
	down.innerHTML = ku[3]+'　'+ku[4];
}
let result = false;
let resultE = document.getElementById('result');
function check(){
	const q = quizs[now];
	if(!result){
		check_ans.innerHTML = '次へ';
		if(keys == ogura[q['id']][q['quiz']]){
			resultE.innerHTML = '<b style="color:red;">正解</b>'
			animation();
			correct += 1;
		}else{
			resultE.innerHTML = '<b style="color:blue;">不正解</b><br>正答　'+ogura[q['id']][q['quiz']];
		}
		show(quizs[now]['id'], quizs[now]['quiz'], true, keys == ogura[q['id']][q['quiz']]);
		result = true;
	}else{
		check_ans.innerHTML = '解答する'
		now++;
		if(now == quizs.length){
			location.href = 'index.html?r='+parseInt(correct/quizs.length*10000);
			return;
		}
		resultE.innerHTML = '';
		keys = '';
		show(quizs[now]['id'], quizs[now]['quiz'])
		update();
		result = false;
	}
}
let start, end, count;
let url = new URL(window.location.href);
let params = url.searchParams;
start = params.get('s')-1;
end = params.get('e')-1;
count = params.get('c') || 10;
// Create Quiz
for (var i = start; i <= end; i++) {
	for (var j = 0; j < 5; j++) {
		quizs.push({'id': i, 'quiz': j});
		//console.log('a');
	}
}
quizs = shuffleArray(quizs);
if(count < quizs.length){
	quizs = quizs.slice(0, count);
}
show(quizs[now]['id'], quizs[now]['quiz'])
document.addEventListener('click',()=>document.getElementById('vkey').focus());
document.getElementById('vkey').addEventListener('change',()=>{document.getElementById('vkey').value=null});
function animation(){
  const createPetal = () => {
    const petalEl = document.createElement('span');
    petalEl.className = 'petal';
    const minSize = 10;
    const maxSize = 15;
    const size = Math.random() * (maxSize + 1 - minSize) + minSize;
    petalEl.style.width = `${size}px`;
    petalEl.style.height = `${size}px`;
    petalEl.style.left = Math.random() * 0.9* innerWidth + 'px';
    document.body.appendChild(petalEl);

    // 一定時間が経てば花びらを消す
    setTimeout(() => {
      petalEl.remove();
    }, 3000);
  	
  }
  setTimeout(async ()=>{
  	for (var i = 0; i < 30; i++) {
  		createPetal();
  		await new Promise(resolve => setTimeout(resolve, 50));
  	}
  });
}