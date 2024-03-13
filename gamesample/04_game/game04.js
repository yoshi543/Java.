var canvas, g;
var plyaer, enemy;
var score;
var scene;
var frameCount;
var bound;
var particles;
// シーンの定義
const Scenes = {
  GameMain: "GameMain",
  GameOver: "GameOver",
};

onload = function () {
  // 描画コンテキストの取得
  canvas = document.getElementById("gamecanvas");
  g = canvas.getContext("2d");
  // 初期化
  init();
  // 入力処理の指定
  document.onkeydown = keydown;
  // ゲームループの設定 60FPS
  setInterval("gameloop()", 16);
};

function init() {
  // 自キャラ初期化
  player = new Sprite();
  player.posx = 100;
  player.posy = 400;
  player.r = 16;
  player.image = new Image();
  player.image.src = "./reimu.png";
  player.speed = 0;
  player.acceleration = 0;

  // 敵キャラ初期化
  enemy = new Sprite();
  enemy.posx = 600;
  enemy.posy = 400;
  enemy.r = 16;
  enemy.image = new Image();
  enemy.image.src = "./marisa.png";
  enemy.speed = 5;
  enemy.acceleration = 0;

  // パーティクル初期化
  particles = [];

  // ゲーム管理データの初期化
  score = 0;
  frameCount = 0;
  bound = false;
  scene = Scenes.GameMain;
}

function keydown(e) {
  // ゲームプレイ中
  if (scene == Scenes.GameMain) {
    if (player.speed == 0) {
      player.speed = -20;
      player.acceleration = 1.5;
    }
    // ゲームオーバー中
  } else if (scene == Scenes.GameOver) {
    if (frameCount > 60) {
      init();
    }
  }
}

function gameloop() {
  update();
  draw();
}

function update() {
  // ゲームプレイ中
  if (scene == Scenes.GameMain) {
    // 自キャラの状態更新
    player.speed = player.speed + player.acceleration;
    player.posy = player.posy + player.speed;
    if (player.posy > 400) {
      player.posy = 400;
      player.speed = 0;
      player.acceleration = 0;
    }

    // 敵キャラの状態更新
    enemy.posx -= enemy.speed;
    if (enemy.posx < -100) {
      enemy.posx = 600;
      score += 100;
    }

    // 当たり判定
    var diffX = player.posx - enemy.posx;
    var diffY = player.posy - enemy.posy;
    var distance = Math.sqrt(diffX * diffX + diffY * diffY);
    if (distance < player.r + enemy.r) {
      // 当たったときの処理
      scene = Scenes.GameOver;
      frameCount = 0;

      // パーティクル生成
      for (var i = 0; i < 300; i++) {
        particles.push(new Particle(player.posx, player.posy));
      }
    }

    // ゲームオーバー中
  } else if (scene == Scenes.GameOver) {
    // パーティクルの状態更新
    particles.forEach((p) => {
      p.update();
    });

    // 敵キャラの状態更新
    enemy.posx -= enemy.speed;
  }

  // 現在何フレーム目かをカウント
  frameCount++;
}

function draw() {
  g.imageSmoothingEnabled = false;

  // ゲームプレイ中
  if (scene == Scenes.GameMain) {
    // 背景描画
    g.fillStyle = "rgb(0,0,0)";
    g.fillRect(0, 0, 480, 480);

    //キャラクタ描画;
    player.draw(g);

    // 敵キャラクタ描画
    enemy.draw(g);

    // スコア描画
    g.fillStyle = "rgb(255,255,255)";
    g.font = "16pt Arial";
    var scoreLabel = "SCORE : " + score;
    var scoreLabelWidth = g.measureText(scoreLabel).width;
    g.fillText(scoreLabel, 460 - scoreLabelWidth, 40);

    // ゲームオーバー中
  } else if (scene == Scenes.GameOver) {
    // 背景描画
    g.fillStyle = "rgb(0,0,0)";
    g.fillRect(0, 0, 480, 480);

    //パーティクル描画
    particles.forEach((p) => {
      p.draw(g);
    });

    // 敵キャラクタ描画
    g.drawImage(
      enemy.image,
      enemy.posx - enemy.image.width / 2,
      enemy.posy - enemy.image.height / 2
    );

    // スコア描画
    g.fillStyle = "rgb(255,255,255)";
    g.font = "16pt Arial";
    var scoreLabel = "SCORE : " + score;
    var scoreLabelWidth = g.measureText(scoreLabel).width;
    g.fillText(scoreLabel, 460 - scoreLabelWidth, 40);

    // ゲームオーバー表示
    g.fillStyle = "rgb(255,255,255)";
    g.font = "48pt Arial";
    var scoreLabel = "GAME OVER";
    var scoreLabelWidth = g.measureText(scoreLabel).width;
    g.fillText(scoreLabel, 240 - scoreLabelWidth / 2, 240);
  }
}

// スプライトクラス
class Sprite {
  image = null;
  posx = 0;
  posy = 0;
  speed = 0;
  acceleration = 0;
  r = 0;

  // コンストラクタ
  constructor() {}

  // 描画処理
  draw(g) {
    // 画像を描画する
    g.drawImage(
      this.image,
      this.posx - this.image.width / 2,
      this.posy - this.image.height / 2
    );
  }
}

// パーティクルクラス
class Particle extends Sprite {
  baseLine = 0;
  acceleration = 0;
  speedy = 0;
  speedx = 0;

  constructor(x, y) {
    super();
    this.posx = x;
    this.posy = y;
    this.baseLine = 420;
    this.acceleration = 0.5;
    var angle = (Math.PI * 5) / 4 + (Math.PI / 2) * Math.random();
    this.speed = 5 + Math.random() * 20;
    this.speedx = this.speed * Math.cos(angle);
    this.speedy = this.speed * Math.sin(angle);
    this.r = 2;
  }

  update() {
    this.speedx *= 0.97;
    this.speedy += this.acceleration;
    this.posx += this.speedx;
    this.posy += this.speedy;
    if (this.posy > this.baseLine) {
      this.posy = this.baseLine;
      this.speedy = this.speedy * -1 * (Math.random() * 0.5 + 0.3);
    }
  }

  draw(g) {
    g.fillStyle = "rgb(255,50,50)";
    g.fillRect(this.posx - this.r, this.posy - this.r, this.r * 2, this.r * 2);
  }
}
