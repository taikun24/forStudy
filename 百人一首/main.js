const up = document.getElementById('up');
const down = document.getElementById('down');
let quizs = []
let now = 0;
let correct = 0;
let num = document.getElementById('num');
let check_ans = document.getElementById('check-ans');
const progression = document.getElementById('progression');
const progress_bar = document.getElementById('progress-bar');

// 配列シャッフル
function shuffleArray(array) {
	const cloneArray = [...array];
	for (let i = cloneArray.length - 1; i >= 0; i--) {
		let rand = Math.floor(Math.random() * (i + 1));
		[cloneArray[i], cloneArray[rand]] = [cloneArray[rand], cloneArray[i]];
	}
	return cloneArray;
}

// 問題表示
function show(id, quiz, show = false, correct = true) {
	num.textContent = (id + 1) + '番';
	let ku = ogura[id].slice();
	ku[quiz] = `<b style="color:${show ? (correct ? 'red' : 'blue') : 'red'};">${show ? ku[quiz] : '？'.repeat(ku[quiz].length)}</b>`;
	up.innerHTML = ku[0] + '　' + ku[1] + '　' + ku[2];
	down.innerHTML = ku[3] + '　' + ku[4];
}

// ヒント表示
function showHint() {
	const q = quizs[now];
	const answer = ogura[q.id][q.quiz];
	if (!result) {
		let hintLength = answer.length > 1 ? 2 : 1;
		hintE.textContent = 'ヒント: ' + answer.slice(0, hintLength) + '...';
	} else {
		hintE.textContent = '';
	}
}

// 回答チェック
function check() {
	const q = quizs[now];
	if (!result) {
		check_ans.textContent = '次へ';
		if (keys === ogura[q.id][q.quiz]) {
			resultE.innerHTML = '<b style="color:red;">正解</b>';
			animation();
			correct++;
			progression.textContent = `${correct} / ${count}`;
			progress_bar.style.width = (correct / count * 100) + '%';
		} else {
			resultE.innerHTML = `<b style="color:blue;">不正解</b><br>正答　${ogura[q.id][q.quiz]}`;
			quizs.push(quizs[now]);
		}
		show(q.id, q.quiz, true, keys === ogura[q.id][q.quiz]);
		result = true;
	} else {
		check_ans.textContent = '解答する';
		now++;
		if (now === quizs.length) {
			location.href = 'index.html';
			return;
		}
		resultE.textContent = '';
		keys = '';
		show(quizs[now].id, quizs[now].quiz);
		update();
		result = false;
		hintE.textContent = '';
	}
}

// 桜アニメーション
function animation() {
	const createPetal = () => {
		const petalEl = document.createElement('span');
		petalEl.className = 'petal';
		const size = Math.random() * 6 + 10;
		petalEl.style.width = `${size}px`;
		petalEl.style.height = `${size}px`;
		petalEl.style.left = Math.random() * 0.9 * innerWidth + 'px';
		document.body.appendChild(petalEl);
		setTimeout(() => petalEl.remove(), 3000);
	};
	setTimeout(async () => {
		for (let i = 0; i < 30; i++) {
			createPetal();
			await new Promise(resolve => setTimeout(resolve, 50));
		}
	});
}

// --- 初期化 ---
let result = false;
let resultE = document.getElementById('result');
let hintE = document.getElementById('hint');
let start, end, count;
let url = new URL(window.location.href);
let params = url.searchParams;
start = params.get('s') - 1;
end = params.get('e') - 1;
count = params.get('c') || 10;
quizs = [];
for (let i = start; i <= end; i++) {
	for (let j = 0; j < 5; j++) {
		quizs.push({ id: i, quiz: j });
	}
}
quizs = shuffleArray(quizs);
if (count < quizs.length) quizs = quizs.slice(0, count);
progression.textContent = `0 / ${count}`;
show(quizs[now].id, quizs[now].quiz);
document.addEventListener('click', () => document.getElementById('vkey').focus());
document.getElementById('vkey').addEventListener('change', () => { document.getElementById('vkey').value = null });