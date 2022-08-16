var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

canvas.width = window.innerWidth - 100;
canvas.height = window.innerHeight - 100;

var dino_img = new Image();
dino_img.scr = 'dino.png';

// 공룡 그리기
var dino = {
  x: 10,
  y: 200,
  width: 50,
  height: 50,
  draw() {
    // 초록색으로
    ctx.fillStyle = 'green';
    // (10,10) 좌표값에 100*100 크기의 네모
    // ctx.fillRect(10, 10, 100, 100);
    ctx.fillRect(this.x, this.y, this.width, this.height);
    ctx.drawImage(dino_img, this.x, this.y);
  }
}

var cactus_img = new Image();
cactus_img.scr = 'cactus.png';

// 장애물 그리기
class Cactus {
  constructor() {
    this.x = 500;
    this.y = 200;
    this.width = 50;
    this.height = 50;
  }
  draw() {
    ctx.fillStyle = 'red';
    ctx.fillRect(this.x, this.y, this.width, this.height);
    ctx.drawImage(cactus_img, this.x, this.y);
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
    if(dino.y < 200) {
      dino.y += 3;
    }
  }
  if(jump_timer > 50) {
    jump = false;
    jump_timer = 0;
  }

  dino.draw();
}

frame();

//충돌 확인
function crush(dino, cactus) {
  var x_distance = cactus.x - (dino.x + dino.width)
  var y_distance = cactus.y - (dino.y + dino.height)
  if (x_distance < 0 && y_distance < 0) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    cancelAnimationFrame(animation);
  }
}

var jump = false;

document.addEventListener('keydown', (e) => {
  if(e.code === 'Space') {
    jump = true;
  }
})