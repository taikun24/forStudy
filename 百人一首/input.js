let keys = '';
let input = document.getElementById('input');
window.onload = function(){
	document.addEventListener('keydown', function(e){
		if(e.key == 'Backspace'){
			keydel();
		}else if(e.key == 'n'){
			if(keys.length != 0){
				let bef = keys[keys.length - 1];
				if(bef == 'n'){keydel();keyadd('ん');}else{keyadd(e.key);}
			}else{
				keyadd(e.key);
			}
		}else if(e.key.length == 1 && e.key.match(/[a-z]/i)){
			keyadd(e.key);
		}else if(e.key == '-'){
			keys += 'ー';
		}else if(e.key == 'Enter'){
			check();
		}
		update();
	});
}
const boin = {'a': 'あ','i': 'い','u': 'う','e': 'え','o': 'お'};
const idbo = ['a','i','u','e','o']
const siin = {'k': 'かきくけこ', 's': 'さしすせそ', 't':'たちつてと', 'n':'なにぬねの', 'h': 'はひふへほ'
		,'m': 'まみむめも', 'y':'やいゆえよ', 'r': 'らりるれろ', 'w': 'わゐうゑを'
		,'p': 'ぱぴぷぺぽ', 'b': 'ばびぶべぼ', 'g':'がぎぐげご', 'z': 'ざじずぜぞ',
		'd': 'だぢづでど', 'f': ['ふぁ', 'ふぃ', 'ふ', 'ふぇ', 'ふぉ'], 'x': 'ぁぃぅぇぉ','l': 'ぁぃぅぇぉ',
		'c': 'かしくせこ',
		'v': ['ゔぁ', 'ゔぃ', 'ゔ', 'ゔぇ', 'ゔぉ'],
		 'q': ['くぁ', 'くぃ', 'く', 'くぇ', 'くぉ'],
		'j': ['じゃ', 'じ', 'じゅ', 'じぇ', 'じょ']}
const dsiin = {
'xt': ['xた', 'xち', 'っ', 'xて', 'xと'],
'xk': ['ゕ', 'xき', 'xく', 'ゖ', 'xこ'],
'xw': ['ゎ', 'xうぃ', 'xう', 'xうぇ', 'xを'],
'xy': ['ゃ', 'ぃ', 'ゅ', 'ぇ', 'ょ'],
'qy': ['くゃ', 'くぃ', 'くゅ', 'くぇ', 'くょ']};
const py = 'ゃぃゅぇょ';
function keyadd(k){
	let bef2 = undefined;
	if(keys.length >= 2){
		bef2 = keys[keys.length - 2]
	}
	let bef = keys[keys.length - 1];
	if(k in boin){
		if(keys[keys.length - 1] in siin){
			keydel();
			if((bef2 + bef) in dsiin){
				keydel();
				keys += dsiin[bef2 + bef][idbo.indexOf(k)];
			}else if(bef == 'y' && bef2 in siin){
				keydel();
				keys += siin[bef2][1];
				keys += py[idbo.indexOf(k)];
			}else{
				keys += siin[bef][idbo.indexOf(k)];
			}
		}else{
			keys += boin[k];
		}
	}else{
		if(bef == k && bef !== undefined){
			keydel();
			keys += 'っ'
		}
		keys += k;
	}
}
function keydel(){
	if(keys.length != 0){
		keys = keys.substring(0, keys.length - 1);
	}
}
function update(){
	input.innerHTML = keys;
	if(keys == '')input.innerHTML = '(入力して下さい)';
}