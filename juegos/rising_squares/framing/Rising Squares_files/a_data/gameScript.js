import Background from "./background.js";
import Player from "./player.js";
import ObsManager from "./obs.js";
import Ui from "./ui.js";
import Score from "./score.js";
import addInputListeners from "./inputs.js";
import Particle from "./particle.js";
import CollectableManager from "./collectable.js";
import { Collectable } from "./collectable.js";
import ObjectPool from "./objectPools.js";
import { playerData } from "./playerData.js";
(function () {
  var b = document.createElement("style");
  document.head.appendChild(b),
    (b.innerHTML =
      "canvas{-webkit-touch-callout:none;-webkit-user-select:none;-khtml-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;outline:0;-webkit-tap-highlight-color:rgba(255,255,255,0)}body{-webkit-touch-callout:none;-webkit-user-select:none;-khtml-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;outline:0}");
})(),
  (window.mobileCheck = (function () {
    let a = !1;
    return (
      (function (b) {
        (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(
          b
        ) ||
          /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
            b.substr(0, 4)
          )) &&
          (a = !0);
      })(navigator.userAgent || navigator.vendor || window.opera),
      a
    );
  })());
const canvas = document.getElementById("game-canvas"),
  ctx = canvas.getContext("2d"),
  AudioContext = window.AudioContext || window.webkitAudioContext,
  audioCtx = new AudioContext();
document.body.style.backgroundColor = "black";
let innerWidthMemo, innerHeightMemo;
(canvas.width = window.innerWidth),
  (canvas.height = window.innerHeight),
  (canvas.style.width = window.innerWidth + "px"),
  (canvas.style.height = window.innerHeight + "px"),
  (canvas.style.objectFit = "cover"),
  (canvas.style.display = "block");
let dimensions = getObjectFitSize(
    !1,
    canvas.clientWidth,
    canvas.clientHeight,
    canvas.width,
    canvas.height
  ),
  dpr = window.devicePixelRatio || 1;
(canvas.width = dimensions.width * dpr),
  (canvas.height = dimensions.height * dpr);
let ratio = Math.min(
  canvas.clientWidth / innerWidth,
  canvas.clientHeight / innerHeight
);
ctx.scale(ratio * dpr, ratio * dpr);
let prevTime,
  dt,
  prevBoxSize,
  width = canvas.width / (dpr * ratio),
  height = canvas.height / (dpr * ratio),
  runOnce = !1;
function gameLoop(b) {
  window.requestAnimationFrame(gameLoop),
    prevTime || (prevTime = b),
    (dt = b - prevTime),
    (prevTime = b),
    game.pause && (dt = 0),
    ctx.clearRect(0, 0, width, height),
    game.resizing ||
      (gameLogic(dt),
      positionalLogic(dt),
      detectResolveCollisions(dt),
      render(dt));
}
(window.addInputListeners = addInputListeners), (window.gameLoop = gameLoop);
class Game {
  constructor() {
    (this.start = !1),
      (this.pause = !1),
      (this.canRestart = false),
      (this.fail = !1),
      (this.score = 0),
      (this.mapCreateWidthDimension = 1),
      (this.touchDevice = !1),
      (this.reviveCount = 1),
      (this.watchingRewarded = !1),
      width > height
        ? ((this.boxSize = height / 15),
          (this.topLine = height / 6 - (6 / 5) * this.boxSize),
          (this.bottomLine = (5 * height) / 6 + this.boxSize))
        : 1.5 * width > height
        ? ((this.boxSize = height / 20),
          (this.topLine = (1.5 * height) / 6 - (6 / 5) * this.boxSize),
          (this.bottomLine = (4.5 * height) / 6 + this.boxSize))
        : ((this.boxSize = height / 30),
          (this.topLine =
            (2 * height) / 6 - (6 / 5) * this.boxSize + height / 30),
          (this.bottomLine = (4 * height) / 6 + this.boxSize + height / 30)),
      (this.mute = playerData.mute),
      (this.speed = 0),
      (this.speedMemo = 0),
      (this.restartClicked = false),
      (this.fallSpeed = 0.007 * this.boxSize),
      (this.feverFallSpeed = 0.005 * this.boxSize),
      (this.lineWidth = 5),
      (this.resizing = !1),
      (this.jumpInterval = void 0),
      this.createObsInterval,
      (this.particles = []),
      (this.firstHighScorePassed = !1),
      (this.firstMap = !0),
      (this.lastMap = {}),
      (this.lastSpeed = 0.007 * this.boxSize),
      (this.startTime = Date.now()),
      (this.prevTime = this.startTime),
      (this.chaneDifficulty = !1),
      (this.visible = !0),
      (this.chaneDifficultyTime = 7),
      (this.difficulty = [0, 0]),
      (this.spawnBoxAudioArray = []),
      (this.shootAudioArray = []),
      (this.collectableAudioArray = []),
      (this.collectable2AudioArray = []),
      (this.difficultyTimer = 0),
      (this.hasRewarded = window.famobi.hasFeature("rewarded")),
      window.famobi.onRequest("enableAudio", function () {
        window.dirtyMute = false;
        game.mute = false;
      }),
      window.famobi.onRequest("disableAudio", function () {
        window.dirtyMute = true;
        game.mute = true;
      }),
      window.famobi.onRequest("pauseGameplay", function () {
        window.dirtyPause = true;
        game.pause = true;
      }),
      window.famobi.onRequest("resumeGameplay", function () {
        window.dirtyPause = false;
        game.pause = false;
      }),
      getAudioBuffer("sounds/spawnBox.mp3").then((b) => {
        this.spawnBoxBuffer = b;
      }),
      getAudioBuffer("sounds/playerFail.mp3").then((b) => {
        this.playerFailBuffer = b;
      }),
      getAudioBuffer("sounds/collectable.mp3").then((b) => {
        this.collectableBuffer = b;
      }),
      getAudioBuffer("sounds/collectable2.mp3").then((b) => {
        this.collectable2Buffer = b;
      }),
      getAudioBuffer("sounds/pop.mp3").then((b) => {
        this.popBuffer = b;
      });
  }
  playAudio(b) {
    if (window.dirtyMute) return;
    this.mute ||
      ("pop" === b
        ? ((this.source = audioCtx.createBufferSource()),
          (this.source.buffer = this.popBuffer),
          this.source.connect(audioCtx.destination),
          this.source.start(0))
        : "spawnBox" === b
        ? ((this.source = audioCtx.createBufferSource()),
          (this.source.buffer = this.spawnBoxBuffer),
          this.source.connect(audioCtx.destination),
          this.source.start(0))
        : "collectable" === b
        ? ((this.source = audioCtx.createBufferSource()),
          (this.source.buffer = this.collectableBuffer),
          this.source.connect(audioCtx.destination),
          this.source.start(0))
        : "collectable2" === b
        ? ((this.source = audioCtx.createBufferSource()),
          (this.source.buffer = this.collectable2Buffer),
          this.source.connect(audioCtx.destination),
          this.source.start(0))
        : "playerFail" === b
        ? ((this.spawnBoxSource = audioCtx.createBufferSource()),
          (this.spawnBoxSource.buffer = this.playerFailBuffer),
          this.spawnBoxSource.connect(audioCtx.destination),
          this.spawnBoxSource.start(0))
        : void 0);
  }
  restart() {
    (game.lastMap = {}),
      clearInterval(game.jumpInterval),
      (game.jumpInterval = void 0),
      (player.ammo = 0),
      player.boxes.forEach((b) => {
        objectPool.resetBox(b);
      }),
      (player.boxes = []),
      (player.position.y = 0),
      (player.feverModeCount = 0),
      (player.feverModeBool = !1),
      player.projectiles.forEach((b) => {
        objectPool.resetProjectile(b);
      }),
      (player.projectiles = []),
      (obsManager.obstacles = []),
      (obsManager.triangleObstacles = []),
      (obsManager.pointObstacles = []),
      (obsManager.utilityObs = []),
      (obsManager.holes = []),
      collectableManager.collectables.forEach((b) => {
        objectPool.resetCollectable(b);
      }),
      (collectableManager.collectables = []),
      collectableManager.feverCollectables.forEach((b) => {
        objectPool.resetFeverCollectable(b);
      }),
      (collectableManager.feverCollectables = []),
      (scoreManager.score = 0),
      (game.score = 0),
      (game.fail = !1),
      (game.start = !1),
      (game.firstMap = !0),
      (game.speed = 0),
      (game.restartClicked = false),
      (game.lastSpeed = 0.007 * this.boxSize),
      (game.difficulty = [0, 0]),
      (game.firstHighScorePassed = !1),
      (ui.highScoreTweenState = "hold"),
      (obsManager.randomIndex = 7),
      (ui.restartCount = 4),
      (ui.drawGameOver = !1),
      (player.bulletRadius = game.boxSize / 10),
      (this.difficultyTimer = 0),
      (this.mapCreateWidthDimension = 1),
      (this.reviveCount = 1),
      (game.watchingRewarded = !1);
    game.canRestart = false;
  }
  revive() {
    clearInterval(game.jumpInterval),
      (game.jumpInterval = void 0),
      player.boxes.forEach((b) => {
        objectPool.resetBox(b);
      }),
      (player.boxes = []),
      (player.position.y = 0),
      (player.feverModeBool = !1),
      player.projectiles.forEach((b) => {
        objectPool.resetProjectile(b);
      }),
      (player.projectiles = []),
      (obsManager.obstacles = []),
      (obsManager.triangleObstacles = []),
      (obsManager.pointObstacles = []),
      (obsManager.utilityObs = []),
      (obsManager.holes = []),
      collectableManager.collectables.forEach((b) => {
        objectPool.resetCollectable(b);
      }),
      (collectableManager.collectables = []),
      collectableManager.feverCollectables.forEach((b) => {
        objectPool.resetFeverCollectable(b);
      }),
      (collectableManager.feverCollectables = []),
      (game.fail = !1),
      (game.start = !1),
      (game.speed = 0),
      (game.restartClicked = false),
      (ui.restartCount = 4),
      (ui.drawGameOver = !1),
      (game.firstMap = !1),
      (game.mapCreateWidthDimension = 1),
      this.setReviveMap(),
      (this.reviveCount -= 1),
      (game.watchingRewarded = !1);
    game.canRestart = false;
  }
  setReviveMap() {
    1 === game.lastMap.difficulty
      ? obsManager.createEasyMaps(game.lastMap.mapIndex, game.lastMap.color)
      : 2 === game.lastMap.difficulty
      ? obsManager.createMidMaps(game.lastMap.mapIndex, game.lastMap.color)
      : obsManager.createHardMaps(game.lastMap.mapIndex, game.lastMap.color),
      (game.mapCreateWidthDimension = 1);
  }
  setResizeMap() {
    game.fail ||
      !game.lastMap.mapIndex ||
      (clearInterval(game.jumpInterval),
      (obsManager.obstacles = []),
      (obsManager.triangleObstacles = []),
      (obsManager.pointObstacles = []),
      (obsManager.utilityObs = []),
      (obsManager.holes = []),
      player.projectiles.forEach((b) => {
        objectPool.resetProjectile(b);
      }),
      (player.projectiles = []),
      collectableManager.collectables.forEach((b) => {
        objectPool.resetCollectable(b);
      }),
      (collectableManager.collectables = []),
      collectableManager.feverCollectables.forEach((b) => {
        objectPool.resetFeverCollectable(b);
      }),
      (collectableManager.feverCollectables = []),
      (game.mapCreateWidthDimension = 1),
      this.setReviveMap());
  }
  difficultyChanger() {
    return (
      0 != ((Date.now() - game.startTime) / 1e3).toFixed(0) &&
      0 ==
        ((Date.now() - game.startTime) / 1e3).toFixed(0) %
          this.chaneDifficultyTime
    );
  }
  update(b) {
    !this.start ||
      this.fail ||
      ((this.difficultyTimer += b),
      this.difficultyTimer >= 1e3 * this.chaneDifficultyTime &&
        (this.speed <= 0.013 * this.boxSize &&
          ((this.speed += 0.0015 * this.boxSize),
          (this.lastSpeed = game.speed),
          13 > this.chaneDifficultyTime && (this.chaneDifficultyTime += 3)),
        0.4 > this.difficulty[0] &&
          0.8 > this.difficulty[1] &&
          (0.4 === this.difficulty[1]
            ? ((this.difficulty[0] = this.difficulty[1]),
              (this.difficulty[1] += 0.4))
            : ((this.difficulty[0] = this.difficulty[1]),
              (this.difficulty[1] += 0.2))),
        (this.difficultyTimer = 0)));
  }
}
canvas.addEventListener(
  "contextmenu",
  function (b) {
    b.preventDefault();
  },
  !1
),
  window.addEventListener("resize", function () {
    clearTimeout(window.id),
      (game.resizing = !0),
      window.mobileCheck
        ? ((innerWidthMemo = document.body.clientWidth),
          (innerHeightMemo = document.body.clientHeight),
          (canvas.width = innerWidthMemo),
          (canvas.height = innerHeightMemo),
          (canvas.style.width = innerWidthMemo + "px"),
          (canvas.style.height = innerHeightMemo + "px"),
          (dimensions = getObjectFitSize(
            !1,
            canvas.clientWidth,
            canvas.clientHeight,
            canvas.width,
            canvas.height
          )),
          (canvas.width = dimensions.width * dpr),
          (canvas.height = dimensions.height * dpr),
          (ratio = Math.min(
            canvas.clientWidth / innerWidthMemo,
            canvas.clientHeight / innerHeightMemo
          )),
          ctx.scale(ratio * dpr, ratio * dpr),
          (width = canvas.width / (dpr * ratio)),
          (height = canvas.height / (dpr * ratio)))
        : ((canvas.width = window.innerWidth),
          (canvas.height = window.innerHeight),
          (canvas.style.width = window.innerWidth + "px"),
          (canvas.style.height = window.innerHeight + "px"),
          (dimensions = getObjectFitSize(
            !1,
            canvas.clientWidth,
            canvas.clientHeight,
            canvas.width,
            canvas.height
          )),
          (canvas.width = dimensions.width * dpr),
          (canvas.height = dimensions.height * dpr),
          (ratio = Math.min(
            canvas.clientWidth / innerWidth,
            canvas.clientHeight / innerHeight
          )),
          ctx.scale(ratio * dpr, ratio * dpr),
          (width = canvas.width / (dpr * ratio)),
          (height = canvas.height / (dpr * ratio))),
      (prevBoxSize = game.boxSize),
      width > height
        ? ((game.boxSize = height / 15),
          (game.topLine = height / 6 - (6 / 5) * game.boxSize),
          (game.bottomLine = (5 * height) / 6 + game.boxSize))
        : 1.5 * width > height
        ? ((game.boxSize = height / 20),
          (game.topLine = (1.5 * height) / 6 - (6 / 5) * game.boxSize),
          (game.bottomLine = (4.5 * height) / 6 + game.boxSize))
        : ((game.boxSize = height / 30),
          (game.topLine =
            (2 * height) / 6 - (6 / 5) * game.boxSize + height / 30),
          (game.bottomLine = (4 * height) / 6 + game.boxSize + height / 30)),
      (player.bulletRadius =
        (game.boxSize / prevBoxSize) * player.bulletRadius),
      obsManager.obstacles.forEach((b) => {
        (b.position.x += ((6 * (game.boxSize - prevBoxSize)) / 5) * b.x),
          (b.position.y = -(
            b.y * (game.boxSize + game.boxSize / 5) +
            game.boxSize / 5
          )),
          (b.lineWidth = game.boxSize / 15);
      }),
      collectableManager.collectables.forEach((b) => {
        (b.position.x += ((6 * (game.boxSize - prevBoxSize)) / 5) * b.x),
          (b.position.y = -(
            b.y * (game.boxSize + game.boxSize / 5) +
            game.boxSize / 5
          )),
          (b.lineWidth = game.boxSize / 15),
          (b.scale = game.boxSize),
          (b.scaleLimits = {
            up: game.boxSize,
            down: game.boxSize - game.boxSize / 5,
          }),
          (b.scaleSpeed = 0.01 * game.boxSize),
          (b.glitters = []);
      }),
      collectableManager.feverCollectables.forEach((b) => {
        (b.position.x += ((6 * (game.boxSize - prevBoxSize)) / 5) * b.x),
          (b.position.y = -(
            b.y * (game.boxSize + game.boxSize / 5) +
            game.boxSize / 5
          )),
          (b.lineWidth = game.boxSize / 15),
          (b.tweenPoints = {
            y1: b.position.y + game.boxSize / 20,
            y2: b.position.y - game.boxSize / 20,
          });
      }),
      (player.position.x = width / 6),
      (player.position.y = -(
        game.boxSize / 5 +
        player.boxes.length * (game.boxSize + game.boxSize / 5)
      )),
      (player.boxes = player.boxes.filter(
        (b) => !b.garbage || (objectPool.resetBox(b), !1)
      )),
      player.boxes.forEach((c, a) => {
        (c.position.x = width / 6),
          (c.position.y = -(
            game.boxSize / 5 +
            a * (game.boxSize + game.boxSize / 5)
          ));
      }),
      (game.fallSpeed = 0.007 * game.boxSize),
      (game.feverFallSpeed = 0.005 * game.boxSize),
      (game.speed = +(game.speed / prevBoxSize).toFixed(4) * game.boxSize),
      (game.lastSpeed = game.speed || 0.007 * game.boxSize),
      (background.backgroundNoise.position = { x: 0, y: 0 }),
      (background.noiseArray = []);
    for (let b = 0; 3 > b; b++) background.noiseArray.push(1920 * b);
    game.setResizeMap();
    window.id = setTimeout(() => {
      game.resizing = !1;
    }, 250);
  }),
  document.addEventListener("visibilitychange", () => {
    game.visible
      ? ((game.pause = !0), (game.visible = !1))
      : ((game.visible = !0),
        setTimeout(() => {
          game.pause = !1;
        }, 100));
  }),
  (window.onfocus = () => {
    setTimeout(() => {
      if (window.dirtyPause) game.pause = window.dirtyPause;
      else game.pause = !1;
    }, 100);
  }),
  (window.onblur = () => {
    game.pause = !0;
  });
let game = new Game(),
  player = new Player(),
  obsManager = new ObsManager(),
  background = new Background(),
  ui = new Ui(),
  scoreManager = new Score(),
  collectableManager = new CollectableManager(),
  objectPool = new ObjectPool();
ui.setSources();
function positionalLogic(c) {
  obsManager.holes.forEach((a) => {
    a.update(c);
  }),
    obsManager.obstacles.forEach((a) => {
      a.update(c);
    }),
    obsManager.triangleObstacles.forEach((a) => {
      a.update(c);
    }),
    obsManager.utilityObs.forEach((a) => {
      a.update(c);
    }),
    player.update(c),
    player.boxes.forEach((a) => {
      a.update(c);
    }),
    player.projectiles.forEach((a) => {
      a.update(c);
    }),
    player.trail.forEach((a) => {
      a.update(c);
    }),
    game.particles.forEach((a) => {
      a.update(c);
    }),
    scoreManager.update(c),
    collectableManager.update(c),
    ui.update(c);
}
function render(c) {
  background.draw(c),
    obsManager.holes.forEach((a) => {
      a.draw(c);
    }),
    obsManager.obstacles.forEach((a) => {
      a.draw(c);
    }),
    obsManager.triangleObstacles.forEach((a) => {
      a.draw(c);
    }),
    obsManager.utilityObs.forEach((a) => {
      a.draw(c);
    }),
    player.boxes.forEach((a) => {
      a.draw(c);
    }),
    player.projectiles.forEach((a) => {
      a.draw(c);
    }),
    player.draw(),
    player.trail.forEach((b) => {
      b.draw();
    }),
    game.particles.forEach((b) => {
      b.draw();
    }),
    collectableManager.draw(),
    ui.drawUi(),
    ui.tapToStartAnimation(c);
}
function detectResolveCollisions() {
  if (!game.fail) {
    if (
      (player.projectiles.forEach((b) => {
        b.collisionCheckAndResolve();
      }),
      player.failCheck())
    ) {
      clearInterval(game.jumpInterval),
        game.playAudio("playerFail"),
        !window.famobi.hasRewardedAd() ? (game.reviveCount = 0) : null,
        (game.jumpInterval = void 0),
        (player.projectiles = []),
        (player.feverModeBool = !1),
        (game.fail = !0),
        (game.speed = 0);
      for (let b = 0; 50 > b; b++)
        game.particles.push(objectPool.getParticle(player.position, "#00ffff"));
      player.boxes.forEach((c, a) => {
        setTimeout(() => c.destroy(), 125 * (player.boxes.length - a));
      });
      if (game.reviveCount === 0) {
        window.famobi_analytics
          .trackEvent("EVENT_CUSTOM", {
            eventName: "LEVELEND",
            result: "fail",
            score: game.score,
          })
          .then(function () {
            ui.drawGameOver = true;
            setTimeout(() => {
              Promise.all([
                window.famobi_analytics.trackEvent("EVENT_LEVELFAIL", {
                  levelName: "",
                  reason: "dead",
                }),
                window.famobi_analytics.trackEvent("EVENT_TOTALSCORE", {
                  totalScore: game.score,
                }),
              ]).then(() => {
                game.canRestart = true;
              });
            }, 2000);
          });
      } else {
        setTimeout(() => {
          ui.drawGameOver = true;

          const RESTART_CHECK_INTERVAL = 1e3;
          let intervalId = setInterval(() => {
            if (
              !game.fail ||
              game.watchingRewarded ||
              !game.reviveCount ||
              game.restartClicked
            ) {
              clearInterval(intervalId);
            } else {
              ui.restartCount--;
            }
          }, RESTART_CHECK_INTERVAL);
        }, 1e3);
      }
    }
    player.fallCheck()
      ? ((player.velocity.y = game.fallSpeed),
        player.feverModeBool && (player.velocity.y = game.feverFallSpeed))
      : (player.velocity.y = 0),
      player.boxes.forEach((b) => {
        b.collisionCheckObs() &&
          ((b.velocity.x = -game.speed), (b.garbage = !0)),
          b.fallCheck()
            ? ((b.velocity.y = game.fallSpeed),
              player.feverModeBool && (b.velocity.y = game.feverFallSpeed))
            : (b.velocity.y = 0);
      });
  }
}
function gameLogic(b) {
  game.start &&
    game.firstMap &&
    (obsManager.createObstacle(), (game.firstMap = !1)),
    game.update(b);
}
export {
  canvas,
  ctx,
  width,
  height,
  game,
  obsManager,
  player,
  scoreManager,
  ui,
  dt,
  runOnce,
  collectableManager,
  objectPool,
  dimensions,
  dpr,
};
function getObjectFitSize(k, a, b, c, d) {
  var e = c / d,
    f = a / b,
    g = 0,
    l = 0,
    m = k ? e > f : e < f;
  return (
    m ? ((g = a), (l = g / e)) : ((l = b), (g = l * e)),
    { width: g, height: l, x: (a - g) / 2, y: (b - l) / 2 }
  );
}
function getAudioBuffer(e) {
  return new Promise((f, b) => {
    const a = new XMLHttpRequest();
    a.open("GET", e, !0),
      (a.responseType = "arraybuffer"),
      (a.onload = () => {
        audioCtx.decodeAudioData(a.response, (b) => {
          f(b);
        });
      }),
      (a.onerror = (c) => {
        b(c);
      }),
      a.send();
  });
}
window.game = game;
