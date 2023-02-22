const $input = document.querySelector('#input');
const $form =  document.querySelector('#form');
const $logs = document.querySelector('#logs');


const numbers = []

for(i=0; i < 9; i++){
  numbers.push( i + 1 );
}

const answer = [];
for (let i = 0; i < 4; i++){
  const index = Math.floor(Math.random()*  (9 - i));
  answer.push(numbers[index]);
  numbers.splice(index, 1);
}

console.log(answer);

const tries =[];
function checkInput(input) { // 검사하는 코드
  if(input.length !== 4) {
    return alert ('4자리 숫자를 입력해 주세요.');
  }
  if(new Set(input).size !==4 ){
    return alert('중복되지 않게 입력해 주세요.');
  }
  if(tries.includes(input)) { // 이미 시도한 값
    return alert('이미 시도한 값입니다');
  }
  return true;
}

function defeated() {
  const message = document.createTextNode(`패배! 😭 정답은 ${answer.join('')}`);
    $logs.appendChild(message);
}
let out = 0;

$form.addEventListener('submit', (event) => {
  event.preventDefault(); // 기본 동작 막기
  console.log('submit');
  const value = $input.value;
  $input.value = '';
  if(!checkInput(value)){
    return;
  }
  if(answer.join('') === value) {
    $logs.textContent = '🥳🎉⚾️ 홈런! ⚾️🥳🎉';
    return;
  }
  if(tries.length >= 9){
    defeated();
    return;
  }
  // 몇 볼 몇 스트라크인지 계산하기
  let strike = 0;
  let ball = 0;
  // answer = 3146 , value = 1234 
  for(let i = 0; i < answer.length; i++){
    const index = value.indexOf(answer[i]);
    if(index > -1){ // 일치하는 숫자가 발견
      if (index === i) {  // 자릿수 같음
        strike += 1;
      } else {  // 숫자만 같음
        ball += 1;
      }
    }
  }
  if(strike === 0 && ball === 0) {
    const br = document.createElement('br');
    out++;
    $logs.append(
      `${value}`, 
      document.createElement('br'), 
      ` 🙅🏻‍♂️ 아웃 🙅🏻‍♂️`,  
      document.createElement('br'), 
      document.createElement('br')
    );
  } else {
      $logs.append(
        `${value}`,
        document.createElement('br'), 
        `${strike} 스트라이크 ${ball} 볼`, 
        document.createElement('br'), 
        document.createElement('br')
      );
  }
  if (out === 3) {
    defeated();
    return;
  }
  tries.push(value);
});


// 게임 방법 

const rules = document.querySelector('.rules');
const rulesGame = document.querySelector('.game-rules');
const close = document.querySelector('.game-start');

rules.addEventListener("click", () => {
  rulesGame.style.display = 'block';
});
close.addEventListener("click", () => {
  rulesGame.style.display = 'none';
})

