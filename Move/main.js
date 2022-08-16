const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const start = document.getElementById('start-button');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

//start 버튼 누르면 frame 함수 실행
start.addEventListener('click', () => {
  start.style.display = 'none';
  frame();
})


// 공룡 그리기
const dino_img = new Image();
dino_img.src = './img/dino.png';

const dino = {
  x: 50,
  y: 400,
  width: 50,
  height: 50,
  draw() {
    // 초록색으로
    ctx.fillStyle = 'gray';
    // (10,10) 좌표값에 100*100 크기의 네모
    // ctx.fillRect(10, 10, 100, 100);
    // ctx.fillRect(this.x, this.y, this.width, this.height);
    // context.drawImage($image, $sx, $sy, $sWidth, $sHeight, $dx, $dy, $dWidth, $dHeight);
    ctx.drawImage(dino_img, this.x, this.y, this.width, this.height);
    ctx.font = "italic bold 25px 'Press Start 2P', sans-serif"; //Arial서체 없을 경우, sans-serif 적용
    ctx.fillText("Let's Go!", 100, 100);
  }
}

const cactus_img = new Image();
cactus_img.src = './img/cactus.png';

// 장애물 그리기
// const Cactus = {
//   x : 700,
//   y : 300,
//   width : 50,
//   height : 50,
//   draw() {
//     ctx.fillStyle = 'red';
//     // ctx.fillRect(this.x, this.y, this.width, this.height);
//     ctx.drawImage(cactus_img, this.x, this.y, this.width, this.height);
//   }
// }
class Cactus {
  constructor() {
    this.x = 700;
    this.y = 400;
    this.width = 50;
    this.height = 50;

  }
  draw() {
    ctx.fillStyle = 'red';
    // ctx.fillRect(this.x, this.y, this.width, this.height);
    ctx.drawImage(cactus_img, this.x, this.y, this.width, this.height);
  }
}

var timer = 0;
var cactus_array = [];
var jump_timer = 0;
var animation;

//프레임마다 실행할 코드
function frame() {
  // 1초에 60번 그려짐 (모니터 frame에 따라 달라짐)
  animation = requestAnimationFrame(frame);
  timer++;
  // 잔상을 없애기 위해 캔버스 초기화
  ctx.clearRect(0,0, canvas.width, canvas.height);

  //200 프레임마다 cactus 그려지게
  if(timer % 200 == 0) {
    // 클래스 사용법
    var cactus = new Cactus();
    cactus_array.push(cactus);
  }

  cactus_array.forEach((a, i, o) => {
    // x좌표가 0미만이면 리스트에서 장애물 제거
    if(a.x < 0) {
      o.splice(i, 1)
    }
    a.x--;
    // 장애물 각 요소들이 매 번 다이노와 충돌하는지 확인해야 하기 때문에 반복문 안에 삽입
    crush(dino, a);

    a.draw();
  })

  if(jump == true) {
    dino.y -= 3;
    jump_timer++; 
  }
  if(jump == false) {
    if(dino.y < 400) {
      dino.y += 3;
    }
  }
  if(jump_timer > 50) {
    jump = false;
    jump_timer = 0;
  }

  dino.draw();
}


//충돌 확인
function crush(dino, cactus) {
  // 선인장 이미지 크기에 맞게 cactus.x에 +15 해줌
  var x_distance = (cactus.x + 15) - (dino.x + dino.width)
  var y_distance = cactus.y - (dino.y + dino.height)
  if (x_distance < 0 && y_distance < 0) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    cancelAnimationFrame(animation);
    const gameOver = document.getElementById('game-over');
    gameOver.style.display = 'block';
  }
}

var jump = false;

document.addEventListener('keydown', (e) => {
  if(e.code === 'Space') {
    jump = true;
  }
})

