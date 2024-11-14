let muted,
  previousTime,
  previousTime2,
  endGameUITween,
  failPanelUI,
  adsRemainTextValue,
  restartButtonADS,
  reviveButtonADS,
  adsFailPanel,
  resultPanel,
  app = pc.Application.getApplication(),
  previousScore = 0,
  testBool = !1,
  rewardedButtonClicked = !1,
  tempVec = new pc.Vec3(),
  playerPosY = 0,
  score = 0,
  previousPlayerPosY = 0,
  posResult = -1,
  airTime = 1,
  airTimeScore = 0,
  airTimeBool = !1,
  counterBool = !1,
  airT1 = 0,
  pause = !1,
  tutorialStarted = 0,
  tutorialEnded = 0,
  tutorialBool = !1,
  tutorialUpdateBool = 0,
  adsPassCheck = !1,
  isReviveUsing = !1;
var GameOver = void 0,
  ButtonController = void 0;
function reviveFunc() {
  GameInitialize.instance.character.setPosition(
    0,
    GameOver.instance.charPosBeforeRevive.y,
    0
  ),
    GameInitialize.instance.character.setLocalEulerAngles(tempVec.set(0, 0, 0)),
    (GameInitialize.instance.character.model.enabled = !0),
    (GameInitialize.instance.secondPlayButton.enabled = !0),
    (GameInitialize.instance.startIcons.enabled = !0),
    GameInitialize.instance.startIcons.setPosition(
      0,
      GameOver.instance.charPosBeforeRevive.y - 7,
      0
    ),
    (Character.instance.characterLine.enabled = !1),
    obstacles
      .filter(
        (e) =>
          e.getPosition().distance(GameOver.instance.charPosBeforeRevive) <= 20
      )
      .forEach((e) => {
        e.enabled = !1;
      }),
    (obstacles = obstacles.filter(
      (e) =>
        e.getPosition().distance(GameOver.instance.charPosBeforeRevive) >= 20
    ));
}
let playerDataValue = "TwistyLines:playerData.v1.2.9";
class PlayerData {
  constructor() {
    (this.highScore = 0),
      (this.firstPlayed = !1),
      (this.totalScore = 0),
      (this.tutorialShowed = !1),
      (this.soundOn = 1);
  }
}
function getPlayerData() {
  window.famobi
    ? window.famobi.localStorage.getItem(playerDataValue)
      ? ((playerData = JSON.parse(
          window.famobi.localStorage.getItem(playerDataValue)
        )),
        window.famobi.localStorage.getItem("muted")
          ? (playerData.soundOn = 0)
          : (playerData.soundOn = 1))
      : ((playerData = new PlayerData()), updatePlayerData())
    : localStorage.getItem(playerDataValue)
    ? ((playerData = JSON.parse(localStorage.getItem(playerDataValue))),
      localStorage.getItem("muted")
        ? (playerData.soundOn = 0)
        : (playerData.soundOn = 1))
    : ((playerData = new PlayerData()), updatePlayerData());
}
function updatePlayerData() {
  window.famobi
    ? window.famobi.localStorage.setItem(
        playerDataValue,
        JSON.stringify(playerData)
      )
    : localStorage.setItem(playerDataValue, JSON.stringify(playerData));
}
var ScreenResizer = pc.createScript("screenResizer");
let inGameUI, cameraEntity;
(ScreenResizer.prototype.initialize = function () {
  (this.dividingVariable = 18),
    (this.dividingVariable2 = 10),
    (inGameUI = this.app.root.findByName("2DGameUI")),
    this.setScreen();
  let e = this;
  window.addEventListener("resize", function (t) {
    e.setScreen();
  });
}),
  (ScreenResizer.prototype.setScreen = function () {
    (cameraEntity = this.app.root.findByName("Camera")),
      (this.result =
        window.visualViewport.width / window.visualViewport.height),
      this.result < 0.45
        ? (cameraEntity.camera.orthoHeight = 41)
        : this.result > 0.45 && this.result < 0.55
        ? (cameraEntity.camera.orthoHeight = 37)
        : this.result > 0.55 && this.result < 1
        ? (cameraEntity.camera.orthoHeight = 30)
        : (cameraEntity.camera.orthoHeight = 25);
  });
var GameInitialize = pc.createScript("gameInitialize");
let obstacleTemplates = [];
function pauseFunc() {
  (airTimeBool = !1),
    (app.timeScale = 0),
    (pause = !0),
    SoundController.instance.pauseSounds(),
    (playerData.soundOn = 0),
    (app.root.findByName("BlockView").enabled = !0);
}
function resumeFunc() {
  if (window.dirtyPause) return;
  (airTimeBool = !0),
    (app.timeScale = 1),
    (pause = !1),
    window.isFullAPI
      ? window.famobi &&
        (window.famobi.localStorage.getItem("muted")
          ? (playerData.soundOn = 0)
          : (playerData.soundOn = 1))
      : window.isLiteAPI ||
        (localStorage.getItem("muted")
          ? (playerData.soundOn = 0)
          : (playerData.soundOn = 1)),
    (app.root.findByName("BlockView").enabled = !1);
}
window.famobi.onRequest("pauseGameplay", function () {
  window.dirtyPause = true;
  pauseFunc();
});
window.famobi.onRequest("resumeGameplay", function () {
  window.dirtyPause = false;
  resumeFunc();
});
(GameInitialize.prototype.initialize = function () {
  (GameInitialize.instance = this),
    getPlayerData(),
    (this.character = this.app.root.findByName("ConeCharacter")),
    (this.scoreText = this.app.root.findByName("GameUIScoreText")),
    (this.airTimeText = this.app.root.findByName("AirTimeText")),
    (this.root = this.app.root.findByGuid("Root")),
    (this.retryButton = this.app.root.findByName("RetryButton")),
    (this.reviveButton = this.app.root.findByName("ReviveButton")),
    (this.secondPlayButton = this.app.root.findByName("SecondPlayButton")),
    (this.startIcons = this.app.root.findByName("StartIcons")),
    (this.highScoreText = this.app.root.findByName("HighScoreText")),
    (this.scoreIncreaseValueText = this.app.root.findByName(
      "ScoreIncreaseValueText"
    )),
    (this.highScoreGroup = this.app.root.findByName("HighScoreGroup")),
    (this.tutorialHand = this.app.root.findByName("TutorialHand")),
    (this.tutorialCircle = this.app.root.findByName("TutorialCircle")),
    (this.obsPosy = 59),
    (this.minRandomPosYForObstacleOnScene = 20),
    (this.maxRandomPosYForObstacleOnScene = 22),
    this.setPositionsOfObstaclesOnScene(),
    this.setRandomTemplateToObstacles(0, 3),
    (adsFailPanel = this.app.root.findByName("ReviveUI")),
    (resultPanel = this.app.root.findByName("ResultPanel")),
    (adsRemainTextValue = app.root.findByName("circleRemainTimer"));
}),
  (GameInitialize.prototype.setPositionsOfObstaclesOnScene = function () {
    this.obstaclesOnScene = this.app.root.find("name", "Obstacle");
    for (let e = 1; e < this.obstaclesOnScene.length; e++)
      3 === e
        ? (this.obstaclesOnScene[e].setLocalPosition(0.1, this.obsPosy, 0),
          (this.obsPosy += this.randomObsPosY(
            this.minRandomPosYForObstacleOnScene,
            this.maxRandomPosYForObstacleOnScene
          )))
        : (this.obstaclesOnScene[e].setLocalEulerAngles(tempVec.set(0, 0, 0)),
          this.obstaclesOnScene[e].setLocalPosition(
            this.randomObsPosX(-14, 14),
            this.obsPosy,
            0
          ),
          (this.obsPosy += this.randomObsPosY(
            this.minRandomPosYForObstacleOnScene,
            this.maxRandomPosYForObstacleOnScene
          )));
  }),
  (GameInitialize.prototype.randomObsPosY = function (e, t) {
    return (
      (this.randomPosY = Math.floor(Math.random() * (t - e + 1) + e)),
      this.randomPosY
    );
  }),
  (GameInitialize.prototype.randomObsPosX = function (e, t) {
    return (
      (this.randomPosX = Math.floor(Math.random() * (t - e + 1) + e)),
      this.randomPosX
    );
  }),
  (GameInitialize.prototype.setRandomTemplateToObstacles = function (e, t) {
    obstacleTemplates.push(this.app.assets.find("Mine_01.glb")),
      obstacleTemplates.push(this.app.assets.find("Nuke_01.glb")),
      obstacleTemplates.push(this.app.assets.find("Shell_01.glb")),
      obstacleTemplates.push(this.app.assets.find("Tris_01.glb"));
    for (var a = []; a.length < 4; )
      (this.rndm = Math.floor(4 * Math.random())),
        -1 === a.indexOf(this.rndm) && a.push(this.rndm);
    for (let o = 0; o < this.obstaclesOnScene.length; o++)
      (this.randomTemplateIndex = Math.floor(Math.random() * (t - e + 1) + e)),
        o < 4
          ? ((this.obstaclesOnScene[o].findByName(
              "ObstacleModelEntity"
            ).model.asset = obstacleTemplates[a[o]]),
            this.setScaleOfObstacle(
              a[o],
              this.obstaclesOnScene[o].findByName("ObstacleModelEntity")
            ),
            (this.obstaclesOnScene[o].indexComponent = a[o]))
          : ((this.obstaclesOnScene[o].findByName(
              "ObstacleModelEntity"
            ).model.asset = obstacleTemplates[a[o - 3]]),
            this.setScaleOfObstacle(
              a[o - 3],
              this.obstaclesOnScene[o].findByName("ObstacleModelEntity")
            ),
            (this.obstaclesOnScene[o].indexComponent = a[o - 3]));
  }),
  (GameInitialize.prototype.setScaleOfObstacle = function (e, t) {
    0 === e
      ? t.setLocalScale(1.8, 1.8, 1.8)
      : 1 === e
      ? t.setLocalScale(1.7, 1.7, 1.7)
      : 2 === e
      ? t.setLocalScale(1.3, 1.3, 1.3)
      : 3 === e && t.setLocalScale(1.2, 1.2, 1.2);
  }),
  (GameInitialize.prototype.update = function () {
    (window.onfocus = function () {
      resumeFunc();
    }),
      (window.onblur = function () {
        pauseFunc();
      });
  }),
  (window.famobi_onPauseRequested = function () {
    pauseFunc();
  }),
  (window.famobi_onResumeRequested = function () {
    resumeFunc(),
      window.famobi.localStorage.getItem("muted") ||
        SoundController.instance.playFailSound2(),
      rewardedButtonClicked || (GameOver.instance.updateBool = !0);
  });
var CreateMap = pc.createScript("createMap");
(CreateMap.prototype.initialize = function () {
  (CreateMap.instance = this),
    (this.isMapCreated = !1),
    (this.characterPosY = 70),
    (this.borderPosY = 250),
    (this.obsPosy = 160),
    (this.backgorundPosY = 288),
    (this.root = this.app.root.findByName("Root"));
}),
  (CreateMap.prototype.update = function (t) {
    GameInitialize.instance.character.getPosition().y > this.characterPosY &&
      ButtonController.instance.isTapToPlayButtonClicked &&
      this.createMap(0, 3),
      GameInitialize.instance.character.getPosition().y >
        this.backgorundPosY - 200 && this.createBackground();
  }),
  (CreateMap.prototype.createMap = function (t, e) {
    this.rightBorderTemplate = this.app.assets.find("RightBorder");
    var a = this.rightBorderTemplate.resource.instantiate();
    a.setLocalPosition(16.6, this.borderPosY, -0.5),
      this.root.addChild(a),
      (this.leftBorderTemplate = this.app.assets.find("LeftBorder"));
    var o = this.leftBorderTemplate.resource.instantiate();
    o.setLocalPosition(-16.6, this.borderPosY, -0.5),
      this.root.addChild(o),
      (this.obstacleTemplate = this.app.assets.find("Obstacle")),
      (borderBoxes = this.app.root.find("name", "BorderBox")),
      Borders.instance.setMaterialOfBordersToRed(),
      this.getRandomUniqueArr();
    for (let a = 0; a < 10; a++) {
      this.randomTemplateIndex = Math.floor(Math.random() * (e - t + 1) + t);
      var s = this.obstacleTemplate.resource.instantiate();
      s.setLocalPosition(this.randomObsPosX(-14, 14), this.obsPosy, 0),
        (s.findByName("ObstacleModelEntity").model.asset =
          obstacleTemplates[this.totalArr[a]]),
        (s.indexComponent = this.totalArr[a]),
        this.setScaleOfObstacle(
          this.totalArr[a],
          s.findByName("ObstacleModelEntity")
        ),
        this.root.addChild(s),
        (this.obsPosy += this.randomObsPosY(15, 20)),
        obstacles.push(s);
    }
    (this.characterPosY += 160), (this.borderPosY += 180);
  }),
  (CreateMap.prototype.randomObsPosY = function (t, e) {
    return (
      (this.randomPosY = Math.floor(Math.random() * (e - t + 1) + t)),
      this.randomPosY
    );
  }),
  (CreateMap.prototype.randomObsPosX = function (t, e) {
    return (
      (this.randomPosX = Math.floor(Math.random() * (e - t + 1) + t)),
      this.randomPosX
    );
  }),
  (CreateMap.prototype.setScaleOfObstacle = function (t, e) {
    0 === t
      ? e.setLocalScale(1.8, 1.8, 1.8)
      : 1 === t
      ? e.setLocalScale(1.7, 1.7, 1.7)
      : 2 === t
      ? e.setLocalScale(1.3, 1.3, 1.3)
      : 3 === t && e.setLocalScale(1.2, 1.2, 1.2);
  }),
  (CreateMap.prototype.getRandomUniqueArr = function () {
    var t = [],
      e = [],
      a = [],
      o = [];
    for (this.totalArr = []; t.length < 4; )
      (this.rndm = Math.floor(4 * Math.random())),
        -1 === t.indexOf(this.rndm) && t.push(this.rndm),
        -1 === e.indexOf(this.rndm) && e.push(this.rndm),
        -1 === a.indexOf(this.rndm) && a.push(this.rndm),
        -1 === o.indexOf(this.rndm) && o.push(this.rndm);
    this.totalArr = t.concat(e.concat(a.concat(o)));
  }),
  (CreateMap.prototype.createBackground = function () {
    this.backgroundTemplate = this.app.assets.find("Background");
    var t = this.backgroundTemplate.resource.instantiate();
    t.setLocalPosition(0, this.backgorundPosY, 0),
      this.app.root.findByName("Backgrounds").addChild(t),
      (this.backgorundPosY += 144);
  });
var Character = pc.createScript("character");
let sleep = (t) => new Promise((e) => setTimeout(e, t)),
  obstacles = [];
function airTimeLoop(t) {
  void 0 === previousTime && (previousTime = t);
  const e = t - previousTime;
  void 0 === previousTime2 && (previousTime2 = t);
  const i = t - previousTime2;
  e > 420 && (counterBool = !0),
    airTimeBool
      ? (e > 400 &&
          counterBool &&
          (i > 1e3 && (airTime++, (previousTime2 = t)),
          (airTimeScore = Math.pow(airTime, 1)),
          (GameInitialize.instance.airTimeText.element.text =
            "+" + airTimeScore),
          (GameInitialize.instance.airTimeText.enabled = !0),
          airTimeScore >= 1 &&
            ((ScoreController.instance.airTimeScore += airTimeScore),
            TweenController.instance.tweenToAirTimeText(),
            TweenController.instance.tweenToScoreDistanceText()),
          (previousTime = t)),
        window.requestAnimationFrame(airTimeLoop))
      : ((GameInitialize.instance.airTimeText.enabled = !1),
        (airTime = 1),
        (airTimeScore = 0),
        (counterBool = !1),
        (previousTime = void 0),
        (previousTime2 = void 0));
}
(Character.prototype.initialize = function () {
  (Character.instance = this),
    (self = this),
    (obstacles = this.app.root.find("name", "Obstacle")),
    (this.firstTestCircleBool = !1),
    (this.characterLinearSpeed = 38),
    (this.characterRotationalSpeed = 2400),
    (this.characterLine = this.app.root
      .findByName("Root")
      .findByName("LineParent")),
    (this.airTimeStartTime = 0.42),
    (this.circularMotion = !1),
    (this.closestObstacle = void 0),
    (this.closestObstaclePosition = void 0),
    (this.closestDistance = void 0),
    (this.rotateVal = 1),
    (this.charRotZ = 0),
    (this.maxHoldLimit = 24),
    (this.distanceObsBool = !1),
    (this.characterDownboundLimit = -64.2),
    (this.divisionVariableForLineHeight = 1),
    (this.divisionVariableForLineScaleY = 10),
    (GameInitialize.instance.airTimeText.enabled = !1),
    (this.firstRotate = !1),
    (this.mouseUpTutorialBool = !1),
    (this.touchUpTutorialBool = !1),
    (this.boolForSecondTutorial = !1),
    this.inputControllerOn(),
    this.app.on("input:on", this.inputControllerOn, this),
    this.app.on("input:off", this.inputControllerOff, this),
    this.app.on(
      "destroy",
      function () {
        Character.instance.inputControllerOff();
      },
      this
    );
}),
  (Character.prototype.inputControllerOn = function () {
    this.app.touch
      ? (this.app.touch.on(pc.EVENT_TOUCHSTART, this.onTouchStart, this),
        this.app.touch.on(pc.EVENT_TOUCHEND, this.onTouchEnd, this))
      : this.app.mouse &&
        (this.app.mouse.disableContextMenu(),
        this.app.mouse.on(pc.EVENT_MOUSEDOWN, this.onMouseDown, this),
        this.app.mouse.on(pc.EVENT_MOUSEUP, this.onMouseUp, this));
  }),
  (Character.prototype.inputControllerOff = function () {
    this.app.touch
      ? (this.app.touch.off(pc.EVENT_TOUCHSTART, this.onTouchStart, this),
        this.app.touch.off(pc.EVENT_TOUCHEND, this.onTouchEnd, this))
      : this.app.mouse &&
        (this.app.mouse.off(pc.EVENT_MOUSEDOWN, this.onMouseDown, this),
        this.app.mouse.off(pc.EVENT_MOUSEUP, this.onMouseUp, this));
  }),
  (Character.prototype.update = function (t) {
    ButtonController.instance.isTapToPlayButtonClicked &&
      (Obstacle.instance.charInObstacle ||
        Borders.instance.charInBorder ||
        (ScoreController.instance.scorePosEquality(),
        GameInitialize.instance.airTimeText.setEulerAngles(
          tempVec.set(0, 0, 0)
        ),
        playerData.tutorialShowed ||
          (0 == tutorialUpdateBool &&
            this.firstRotate &&
            this.entity.right.y < -0.6 &&
            this.entity.right.y > -0.7 &&
            this.boolForSecondTutorial &&
            ((tutorialUpdateBool = 1),
            (this.circularMotion = !1),
            (this.characterLinearSpeed = 0)),
          this.entity.getPosition().y > 13 &&
            !tutorialBool &&
            ((GameInitialize.instance.tutorialHand.enabled = !0),
            (GameInitialize.instance.tutorialCircle.enabled = !0),
            TweenController.instance.tweenToTutorialHandFirst(),
            TweenController.instance.tweenToTutorialCircleFirst(),
            (this.characterLinearSpeed = 0),
            (tutorialBool = !0),
            (this.boolForSecondTutorial = !0))),
        this.circularMotion
          ? (this.closestObstacle.rotateLocal(
              tempVec.set(
                0,
                0,
                (this.characterRotationalSpeed / this.closestDistance) *
                  t *
                  this.rotateVal
              )
            ),
            this.firstRotate || (this.firstRotate = !0))
          : ((this.charaterPosY = this.entity.getPosition().y),
            this.charaterPosY < this.characterDownboundLimit &&
              this.entity.up.y < 0 &&
              this.app.fire("gameover"),
            this.entity.translateLocal(
              tempVec.set(0, t * this.characterLinearSpeed, 0)
            ),
            this.findClosestObstacle()),
        this.obstacleHoldDistanceLimitController()));
  }),
  (Character.prototype.firstGame = function () {
    playerData.tutorialShowed ||
    !tutorialBool ||
    (this.mouseUpTutorialBool && this.touchUpTutorialBool)
      ? (this.mouseUpTutorialBool || (tutorialStarted = 3),
        (tutorialEnded = 1),
        (tutorialUpdateBool = 2),
        (this.mouseUpTutorialBool = !0),
        (this.touchUpTutorialBool = !0),
        (playerData.tutorialShowed = !0),
        updatePlayerData())
      : (TweenController.instance.tweenToTutorialHandSecond(),
        TweenController.instance.tweenToTutorialCircleSecond(),
        TweenController.instance.tweenToTutorialHandThird(),
        (this.characterLinearSpeed = 38));
  }),
  (Character.prototype.obstacleHoldDistanceLimitController = function () {
    (this.obstacleDistance = this.entity
      .getPosition()
      .distance(this.closestObstacle.getPosition())),
      this.obstacleDistance < this.maxHoldLimit
        ? (this.distanceObsBool = !0)
        : (this.distanceObsBool = !1);
  }),
  (Character.prototype.createLineFromAtoB = function () {
    (this.divisionVariableForLineHeight = 2.4),
      (this.divisionVariableForLineScaleY = 12),
      (this.distanceForBetweenLine = this.entity
        .getPosition()
        .distance(this.closestObstacle.getPosition())),
      this.characterLine.setPosition(this.closestObstacle.getPosition()),
      this.characterLine.lookAt(this.entity.getPosition()),
      this.characterLine.setLocalScale(
        this.closestObstacle.getLocalScale().x /
          this.divisionVariableForLineScaleY,
        this.closestObstacle.getLocalScale().y /
          this.divisionVariableForLineScaleY,
        this.distanceForBetweenLine -
          this.distanceForBetweenLine / this.divisionVariableForLineHeight
      ),
      this.characterLine.setPosition(this.entity.getPosition());
  }),
  (Character.prototype.onMouseDown = function (t) {
    if (
      (playerData.tutorialShowed ||
        (0 != tutorialStarted && 2 != tutorialStarted)) &&
      !pause &&
      t.button == pc.MOUSEBUTTON_LEFT &&
      !GameOver.instance.isGameOver &&
      (this.firstGame(), this.distanceObsBool)
    ) {
      this.firstTestCircleBool = !0;
      let t = this.entity.getPosition();
      (this.characterLine.enabled = !0),
        this.findClosestObstacle(),
        this.charPosControl(),
        this.charRotControl();
      this.entity.getEulerAngles();
      this.entity.reparent(this.closestObstacle),
        this.entity.setPosition(t),
        (this.circularMotion = !0),
        (airTimeBool = !1),
        (GameInitialize.instance.airTimeText.element.text = 0),
        (GameInitialize.instance.airTimeText.enabled = !1),
        1 === this.rotateVal
          ? this.entity.setLocalEulerAngles(tempVec.set(0, 0, -90))
          : this.entity.setLocalEulerAngles(tempVec.set(0, 0, 90)),
        this.createLineFromAtoB(),
        Borders.instance.setMaterialOfBordersToBlue(),
        SoundController.instance.playAttachObstacle(),
        tutorialStarted < 5 && tutorialStarted++,
        tutorialStarted > 3 && (playerData.tutorialShowed = !0),
        updatePlayerData();
    }
  }),
  (Character.prototype.onMouseUp = function (t) {
    if (
      0 != tutorialEnded &&
      t.button == pc.MOUSEBUTTON_LEFT &&
      !GameOver.instance.isGameOver &&
      this.distanceObsBool
    ) {
      1 == tutorialUpdateBool &&
        this.firstRotate &&
        !this.mouseUpTutorialBool &&
        ((this.characterLinearSpeed = 38),
        (tutorialUpdateBool = 2),
        (this.mouseUpTutorialBool = !0)),
        window.requestAnimationFrame(airTimeLoop),
        (airTimeBool = !0),
        (this.circularMotion = !1),
        (this.characterLine.enabled = !1);
      let t = this.entity.getPosition(),
        e = this.entity.getEulerAngles();
      this.entity.reparent(this.app.root.children[0]),
        this.entity.setPosition(t),
        this.entity.setEulerAngles(0, 0, e.z),
        Borders.instance.setMaterialOfBordersToRed(),
        tutorialStarted < 5 && tutorialStarted++;
    }
  }),
  (Character.prototype.onTouchStart = function (t) {
    if (
      (playerData.tutorialShowed ||
        (0 != tutorialStarted && 2 != tutorialStarted)) &&
      (t.event.preventDefault(),
      !pause &&
        1 === t.touches.length &&
        !GameOver.instance.isGameOver &&
        (this.firstGame(), this.distanceObsBool))
    ) {
      this.firstTestCircleBool = !0;
      let t = this.entity.getPosition();
      (this.characterLine.enabled = !0),
        this.findClosestObstacle(),
        this.charPosControl(),
        this.charRotControl();
      this.entity.getEulerAngles();
      this.entity.reparent(this.closestObstacle),
        this.entity.setPosition(t),
        (this.circularMotion = !0),
        (airTimeBool = !1),
        (GameInitialize.instance.airTimeText.element.text = 0),
        (GameInitialize.instance.airTimeText.enabled = !1),
        1 === this.rotateVal
          ? this.entity.setLocalEulerAngles(tempVec.set(0, 0, -90))
          : this.entity.setLocalEulerAngles(tempVec.set(0, 0, 90)),
        this.createLineFromAtoB(),
        Borders.instance.setMaterialOfBordersToBlue(),
        SoundController.instance.playAttachObstacle(),
        tutorialStarted < 5 && tutorialStarted++,
        tutorialStarted > 3 && (playerData.tutorialShowed = !0),
        updatePlayerData();
    }
  }),
  (Character.prototype.onTouchEnd = function (t) {
    if (
      0 != tutorialEnded &&
      0 === t.touches.length &&
      !GameOver.instance.isGameOver &&
      this.distanceObsBool
    ) {
      1 == tutorialUpdateBool &&
        this.firstRotate &&
        !this.touchUpTutorialBool &&
        ((this.characterLinearSpeed = 38),
        (tutorialUpdateBool = 2),
        (this.touchUpTutorialBool = !0)),
        window.requestAnimationFrame(airTimeLoop),
        (airTimeBool = !0),
        (this.circularMotion = !1),
        (this.characterLine.enabled = !1);
      let t = this.entity.getPosition(),
        e = this.entity.getEulerAngles();
      this.entity.reparent(this.app.root.children[0]),
        this.entity.setPosition(t),
        this.entity.setEulerAngles(0, 0, e.z),
        Borders.instance.setMaterialOfBordersToRed(),
        tutorialStarted < 5 && tutorialStarted++;
    }
  }),
  (Character.prototype.findClosestObstacle = function () {
    let t = this.entity.getPosition(),
      e = 5e4;
    obstacles.forEach((i) => {
      let o = t.distance(i.getLocalPosition());
      (this.distanceObs = o),
        this.closestObstacle
          ? o < e &&
            ((this.closestObstacle = i), (this.closestDistance = o), (e = o))
          : ((this.closestObstacle = i), (this.closestDistance = o), (e = o));
    });
  }),
  (Character.prototype.charPosControl = function () {
    this.entity.getEulerAngles().z < 0
      ? (this.charRotZ = 360 + this.entity.getEulerAngles().z)
      : (this.charRotZ = this.entity.getEulerAngles().z),
      (this.impulseValue = 0),
      (this.tangent = new pc.Vec3()
        .cross(
          this.entity.getPosition().sub(this.closestObstacle.getPosition()),
          new pc.Vec3(0, 0, 1)
        )
        .normalize()),
      (this.impulseDirection = new pc.Vec3()
        .copy(this.entity.up)
        .project(this.tangent)
        .normalize()),
      this.impulseDirection.x > 0
        ? this.entity.getPosition().y < this.closestObstacle.getPosition().y
          ? (this.rotateVal = 1)
          : (this.rotateVal = -1)
        : this.impulseDirection.x < 0
        ? this.entity.getPosition().y < this.closestObstacle.getPosition().y
          ? (this.rotateVal = -1)
          : (this.rotateVal = 1)
        : this.impulseDirection.y > 0
        ? this.entity.getPosition().x < this.closestObstacle.getPosition().x
          ? (this.rotateVal = -1)
          : (this.rotateVal = 1)
        : this.entity.getPosition().x < this.closestObstacle.getPosition().x
        ? (this.rotateVal = 1)
        : (this.rotateVal = -1);
  }),
  (Character.prototype.charRotControl = function () {
    this.closestObstacle.setLocalEulerAngles(tempVec.set(0, 0, 0)),
      (this.relativePosition = this.entity
        .getPosition()
        .add(this.closestObstacle.getPosition().mulScalar(-1))),
      (this.charDirection =
        (180 *
          Math.acos(
            this.closestObstacle.up
              .mulScalar(-1)
              .dot(this.relativePosition.normalize())
          )) /
        Math.PI);
    let t = this.entity.getPosition(),
      e = this.closestObstacle.getPosition();
    t.x > e.x
      ? this.closestObstacle.rotateLocal(tempVec.set(0, 0, this.charDirection))
      : this.closestObstacle.rotateLocal(
          tempVec.set(0, 0, -this.charDirection)
        );
  });
var ScoreController = pc.createScript("scoreController");
(ScoreController.prototype.initialize = function () {
  (ScoreController.instance = this),
    (this.highScoreText = this.app.root.findByName("HighScoreText")),
    (this.highScoreLine = this.app.root.findByName("HighScoreLine")),
    (this.scoreIncreaseSpeed = 9),
    (this.highScoreLinePosY = playerData.highScore),
    1 == playerData.firstPlayed
      ? ((this.highScoreLine.enabled = !0),
        this.highScoreLine.setPosition(
          this.highScoreLine.getPosition().x,
          this.highScoreLinePosY * this.scoreIncreaseSpeed,
          this.highScoreLine.getPosition().z
        ))
      : ((playerData.firstPlayed = !0), updatePlayerData()),
    (this.airTimeScore = 0);
}),
  (ScoreController.prototype.scorePosEquality = function () {
    (this.charPosy =
      Math.floor(GameInitialize.instance.character.getPosition().y) /
      this.scoreIncreaseSpeed),
      this.setScoreText();
  }),
  (ScoreController.prototype.setScoreText = function () {
    playerPosY <= +this.charPosy.toFixed(0) &&
      Character.instance.firstTestCircleBool &&
      0 != posResult &&
      (previousPlayerPosY < +this.charPosy.toFixed(0) &&
        ((posResult = +this.charPosy.toFixed(0) - previousPlayerPosY),
        (previousPlayerPosY = +this.charPosy.toFixed(0)),
        (GameInitialize.instance.scoreIncreaseValueText.element.text =
          "+" + posResult.toString()),
        TweenController.instance.tweenToScoreIncreaseValueText(),
        (Character.instance.firstTestCircleBool = !1)),
      (playerPosY = +this.charPosy.toFixed(0))),
      (score = Math.floor(playerPosY) + this.airTimeScore),
      previousScore != score &&
        (window.isFullAPI
          ? window.famobi &&
            window.famobi_analytics.trackEvent("EVENT_LIVESCORE", {
              liveScore: Math.floor(score),
            })
          : window.isLiteAPI && window.h5games.sendProgress(Math.floor(score)),
        (previousScore = score)),
      (GameInitialize.instance.scoreText.element.text = Math.floor(score)),
      this.setHighScore();
  }),
  (ScoreController.prototype.setHighScore = function () {
    0 != score &&
      score >= playerData.highScore &&
      ((playerData.highScore = parseInt(score.toFixed(1))), updatePlayerData()),
      (this.highScoreText.element.text = playerData.highScore.toString());
  }),
  (ScoreController.prototype.setTotalScore = function () {
    (playerData.totalScore += score), updatePlayerData();
  });
var Camera = pc.createScript("camera");
Camera.attributes.add("player", { type: "entity", title: "Player" }),
  (Camera.prototype.initialize = function () {
    (Camera.instance = this),
      (this.pivotPoint = new pc.Vec3()),
      (this.inertia = 0.3),
      (this.offset = this.entity.getLocalPosition().clone()),
      (this.myVec = new pc.Vec3());
  }),
  (Camera.prototype.update = function (t) {
    var i = Math.min(t / this.inertia, 1),
      e = this.player.getPosition();
    this.pivotPoint.lerp(
      this.pivotPoint,
      this.myVec.set(e.x, e.y + 65, e.z),
      i
    ),
      this.entity.setPosition(this.pivotPoint),
      this.entity.translateLocal(this.offset);
  });
var ButtonController = pc.createScript("buttonController");
(ButtonController.prototype.initialize = function () {
  (ButtonController.instance = this),
    this.entity.button.on("click", this.onButtonClick, this);
  var e = this;
  (this.isTapToPlayButtonClicked = !1),
    this.app.on(
      "gamestart",
      function (t) {
        (e.isTapToPlayButtonClicked = !0),
          (e.app.root.findByName("TapToPlayButton").button.active = !1),
          (e.app.root.findByName("TapToPlayButton").enabled = !1),
          (e.app.root.findByName("TwistyLinesText").enabled = !1),
          (GameInitialize.instance.startIcons.enabled = !1),
          window.isLiteAPI
            ? ((GameInitialize.instance.highScoreGroup.enabled = !1),
              (e.app.root.findByName("muteButton").enabled = !1),
              (e.app.root.findByName("GameUIScoreText").enabled = !1))
            : ((GameInitialize.instance.highScoreGroup.enabled = !0),
              !window.famobi.hasFeature("external_mute")
                ? (e.app.root.findByName("muteButton").enabled = !0)
                : (e.app.root.findByName("muteButton").enabled = !1),
              (e.app.root.findByName("GameUIScoreText").enabled = !0));
      },
      this
    );
}),
  (ButtonController.prototype.onButtonClick = function () {
    "TapToPlayButton" == this.entity.name &&
      (window.isFullAPI &&
        window.famobi &&
        window.famobi_analytics.trackEvent("EVENT_LEVELSTART", {
          levelName: "",
        }),
      this.app.fire("gamestart")),
      "ReviveButton" == this.entity.name &&
        (endGameUITween.stop(),
        (isReviveUsing = !0),
        (rewardedButtonClicked = !0),
        window.isFullAPI
          ? window.famobi &&
            window.famobi.rewardedAd(function (e) {
              e.rewardGranted
                ? ButtonController.instance.playerReviveMethod()
                : ((isReviveUsing = !1),
                  (adsFailPanel.enabled = !1),
                  ButtonController.instance.restartButtonAction());
            })
          : ButtonController.instance.playerReviveMethod()),
      "RestartButton" == this.entity.name &&
        ((isReviveUsing = !1),
        (rewardedButtonClicked = !1),
        this.restartButtonAction()),
      "SecondPlayButton" == this.entity.name &&
        ((this.entity.enabled = !1),
        (GameInitialize.instance.startIcons.enabled = !1),
        this.app.fire("revive"));
  }),
  (ButtonController.prototype.playerReviveMethod = function () {
    GameInitialize.instance.character.setPosition(
      0,
      GameOver.instance.charPosBeforeRevive.y,
      0
    ),
      GameInitialize.instance.character.setLocalEulerAngles(
        tempVec.set(0, 0, 0)
      ),
      (GameInitialize.instance.character.model.enabled = !0),
      (GameInitialize.instance.secondPlayButton.enabled = !0),
      (GameInitialize.instance.startIcons.enabled = !0),
      GameInitialize.instance.startIcons.setPosition(
        0,
        GameOver.instance.charPosBeforeRevive.y - 7,
        0
      ),
      (Character.instance.characterLine.enabled = !1),
      (adsPassCheck = !0),
      (adsFailPanel.enabled = !1),
      obstacles
        .filter(
          (e) =>
            e.getPosition().distance(GameOver.instance.charPosBeforeRevive) <=
            20
        )
        .forEach((e) => {
          e.enabled = !1;
        }),
      (obstacles = obstacles.filter(
        (e) =>
          e.getPosition().distance(GameOver.instance.charPosBeforeRevive) >= 20
      ));
  }),
  (ButtonController.prototype.restartButtonAction = function () {
    isReviveUsing || resultPanel.enabled
      ? window.famobi.showInterstitialAd({
          eventId: "button:result:restart",
          callback: () => {
            (this.entity.enabled = !1),
              (GameInitialize.instance.reviveButton.enabled = !1),
              (GameOver.instance.updateBool = !0),
              SoundController.instance.playFailSound2(),
              (adsPassCheck = !0),
              (resultPanel.enabled = !1),
              (score = 0),
              (playerPosY = 0),
              (previousPlayerPosY = 0),
              (posResult = -1),
              (airTime = 1),
              (airTimeScore = 0),
              (counterBool = !1),
              (previousTime = void 0),
              (previousTime2 = void 0),
              this.app.off("revive"),
              this.app.fire("destroy"),
              GameOver.instance.restartGame();
          },
        })
      : (GameOver.instance.showResultPanel(), (adsFailPanel.enabled = !1));
  });
var GameOver = pc.createScript("gameOver");
(GameOver.prototype.initialize = function () {
  GameOver.instance = this;
  var e = this;
  (this.isGameOver = !1),
    (this.gameOverParticle = this.app.root.findByName(
      "GameOverExplosionEffect"
    )),
    (this.characterLine = this.app.root.findByName("LineParent")),
    (this.gameSounds = this.app.root.findByName("GameSounds")),
    (this.borderColorBool = !1),
    (this.timer = 0),
    (this.updateBool = !1),
    (this.characterSpeedForGameOver = -0.3),
    (this.characterDownboundLimitForGameOver = -65),
    this.app.on("revive", this.reviveFunction, this),
    this.app.on(
      "gameover",
      function () {
        (e.isGameOver = !0),
          (adsPassCheck = !1),
          (airTime = 0),
          (airTimeScore = 0),
          (airTimeBool = !1),
          SoundController.instance.playFailSound(),
          TweenController.instance.tweenToHighScoreLine(),
          (this.borderColorBool = !0),
          e.gameOverParticle.setPosition(
            GameInitialize.instance.character.getPosition()
          ),
          Borders.instance.setMaterialOfBordersToRed();
        let a = GameInitialize.instance.character.getPosition();
        (GameInitialize.instance.character.script.ribbon.enabled = !1),
          GameInitialize.instance.character.reparent(e.app.root.children[0]),
          GameInitialize.instance.character.setPosition(a),
          (GameInitialize.instance.character.model.enabled = !1),
          (e.gameOverParticle.enabled = !0),
          e.gameOverParticle.particlesystem.reset(),
          e.gameOverParticle.particlesystem.play(),
          (e.characterLine.enabled = !1),
          (GameInitialize.instance.airTimeText.enabled = !1),
          (Obstacle.instance.charInObstacle = !0),
          (Borders.instance.charInBorder = !0);
        let t = e.app.root.find("name", "Obstacle");
        for (let e = 0; e < t.length; e++) t[e].script.enabled = !1;
        ScoreController.instance.setTotalScore(),
          window.isLiteAPI
            ? (e.gameOverParticle.setPosition(
                GameInitialize.instance.character.getPosition()
              ),
              (GameInitialize.instance.character.model.enabled = !1),
              SoundController.instance.playFailSound(),
              (e.gameOverParticle.enabled = !0),
              e.gameOverParticle.particlesystem.reset(),
              e.gameOverParticle.particlesystem.play(),
              setTimeout(() => {
                e.gameOverParticle.particlesystem.pause(),
                  GameInitialize.instance.character.setLocalEulerAngles(
                    tempVec.set(0, 0, 0)
                  ),
                  (e.charPosBeforeRevive =
                    GameInitialize.instance.character.getPosition()),
                  (e.gameOverParticle.enabled = !1),
                  window.h5games.gameOver().then(() => {
                    window.h5games.sendScore(Math.floor(score)), reviveFunc();
                  });
              }, "1200"))
            : setTimeout(() => {
                e.gameOverParticle.particlesystem.pause(),
                  GameInitialize.instance.character.setLocalEulerAngles(
                    tempVec.set(0, 0, 0)
                  ),
                  window.isFullAPI
                    ? window.famobi.hasFeature("rewarded") &&
                      window.famobi.hasRewardedAd()
                      ? isReviveUsing
                        ? this.showResultPanel()
                        : this.askReviveFunc()
                      : this.showResultPanel()
                    : isReviveUsing
                    ? this.showResultPanel()
                    : this.askReviveFunc();
              }, "1500");
      },
      this
    );
}),
  (GameOver.prototype.update = function (e) {
    this.updateBool &&
      (Math.floor(GameInitialize.instance.character.getPosition().y) >=
      this.characterDownboundLimitForGameOver
        ? ((this.timer += e),
          this.timer >= 0.1 &&
            (0 !==
              Math.floor(GameInitialize.instance.character.getPosition().x) &&
              (GameInitialize.instance.character.setPosition(
                0,
                GameInitialize.instance.character.getPosition().y,
                GameInitialize.instance.character.getPosition().z
              ),
              (Camera.instance.inertia = 0.2)),
            this.characterSpeedForGameOver > -1
              ? (this.characterSpeedForGameOver += -0.15)
              : this.characterSpeedForGameOver > -2.4
              ? (this.characterSpeedForGameOver += -0.8)
              : (this.characterSpeedForGameOver += -4),
            (this.timer = 0)),
          GameInitialize.instance.character.translateLocal(
            tempVec.set(0, this.characterSpeedForGameOver, 0)
          ))
        : ((SoundController.instance.muteButton.enabled = !0),
          this.gameSounds.sound.stop("fail_sound2"),
          (GameInitialize.instance.scoreText.enabled = !1),
          (GameInitialize.instance.highScoreGroup.enabled = !1),
          (this.updateBool = !1),
          Borders.instance.setMaterialOfBordersToRed()));
  }),
  (GameOver.prototype.restartGame = function () {
    this.app.off("gameover"),
      this.app.off("gamestart"),
      loadScene("Game", { hierarchy: !0, settings: !0 }, () => {
        testBool = !0;
      });
  }),
  (GameOver.prototype.askReviveFunc = function () {
    (adsFailPanel.enabled = !0),
      Mask.instance.setProgress(),
      (this.charPosBeforeRevive =
        GameInitialize.instance.character.getPosition()),
      (this.gameOverParticle.enabled = !1),
      GameInitialize.instance.character.setPosition(
        -0.1,
        this.charPosBeforeRevive.y,
        0
      );
  }),
  (GameOver.prototype.showResultPanel = function () {
    var e = this;
    let a = resultPanel.findByName("scoreText"),
      t = resultPanel.findByName("highScoreText");
    if (!window.famobi.hasRewardedAd()) {
      this.charPosBeforeRevive =
        GameInitialize.instance.character.getPosition();
    }
    (a.element.text = Math.floor(score)),
      (t.element.text = playerData.highScore),
      (this.gameOverParticle.enabled = !1),
      window.isFullAPI
        ? window.famobi &&
          window.famobi_analytics
            .trackEvent("EVENT_CUSTOM", {
              eventName: "LEVELEND",
              result: "fail",
              score: Math.floor(score),
            })
            .then(function () {
              (resultPanel.enabled = !0),
                (resultPanel.children[0].children[0].enabled = !1),
                setTimeout(() => {
                  Promise.all([
                    window.famobi_analytics.trackEvent("EVENT_LEVELFAIL", {
                      levelName: "",
                      reason: "dead",
                    }),
                    window.famobi_analytics.trackEvent("EVENT_TOTALSCORE", {
                      totalScore: Math.floor(score),
                    }),
                  ]).then(() => {
                    (resultPanel.children[0].children[0].enabled = !0),
                      GameInitialize.instance.character.setPosition(
                        -0.1,
                        e.charPosBeforeRevive.y,
                        0
                      );
                  });
                }, 2e3);
            })
        : window.isLiteAPI ||
          ((resultPanel.enabled = !0),
          (this.gameOverParticle.enabled = !1),
          GameInitialize.instance.character.setPosition(
            -0.1,
            this.charPosBeforeRevive.y,
            0
          ));
  }),
  (GameOver.prototype.adsRemainTextAction = async function () {
    for (let e = 5; e >= 0; e--)
      adsPassCheck ||
        (e - 1 >= 0 && (adsRemainTextValue.element.text = e - 1),
        0 == e &&
          ((rewardedButtonClicked = !1),
          ButtonController.instance.restartButtonAction()),
        await sleep(1e3));
  }),
  (GameOver.prototype.reviveFunction = function () {
    setTimeout(() => {
      (ButtonController.instance.isTapToPlayButtonClicked = !0),
        (this.isGameOver = !1),
        Borders.instance.setMaterialOfBordersToRed(),
        (this.borderColorBool = !1),
        (Obstacle.instance.charInObstacle = !1),
        (Borders.instance.charInBorder = !1),
        (Character.instance.circularMotion = !1),
        (Character.instance.closestObstacle = void 0),
        (Character.instance.closestObstaclePosition = void 0),
        (Character.instance.closestDistance = void 0),
        GameInitialize.instance.character.setLocalEulerAngles(
          tempVec.set(0, 0, 0.01)
        );
      let e = self.app.root.find("name", "Obstacle");
      for (let a = 0; a < e.length; a++) e[a].script.enabled = !0;
      (airTimeBool = !0), window.requestAnimationFrame(airTimeLoop);
    }, "150");
  });
var TweenController = pc.createScript("tweenController");
(TweenController.prototype.initialize = function () {
  (TweenController.instance = this),
    (this.highScoreLine = this.app.root.findByName("HighScoreLine")),
    (this.highScoreLinePos = this.highScoreLine.getLocalPosition()),
    (this.scoreIncreaseSpeed = 9),
    (this.borderBoxes = this.app.root.find("name", "BorderBox")),
    (this.startHandIcon = this.app.root.findByName("StartHandIcon")),
    (this.startCircleIcon = this.app.root.findByName("StartCircleIcon")),
    this.tweenToStartHandAndCircleIcon();
}),
  (TweenController.prototype.tweenToStartHandAndCircleIcon = function () {
    this.startHandIcon
      .tween(this.startHandIcon.getLocalScale())
      .to(new pc.Vec3(1.5, 1.5, 1.5), 0.7, pc.SineOut)
      .loop(!0)
      .yoyo(!0)
      .start(),
      this.app
        .tween(this.startCircleIcon.sprite)
        .to({ opacity: 0 }, 0.7, pc.SineOut)
        .loop(!0)
        .yoyo(!0)
        .start();
  }),
  (TweenController.prototype.tweenToHighScoreLine = function () {
    GameInitialize.instance.character.getPosition().y >
      this.highScoreLinePos.y &&
      (this.highScoreLineTween = this.highScoreLine
        .tween(this.highScoreLine.getLocalPosition())
        .to(
          new pc.Vec3(
            this.highScoreLinePos.x,
            GameInitialize.instance.character.getPosition().y,
            this.highScoreLinePos.z
          ),
          1.3,
          pc.CubicOut
        )
        .loop(!1)
        .yoyo(!1)
        .start());
  }),
  (TweenController.prototype.tweenToScoreDistanceText = function () {
    GameInitialize.instance.scoreText.setLocalScale(1, 1, 1),
      GameInitialize.instance.scoreText
        .tween(GameInitialize.instance.scoreText.getLocalScale())
        .to(new pc.Vec3(1.2, 1.2, 1.2), 0.3, pc.SineInOut)
        .repeat(2)
        .yoyo(!0)
        .start();
  }),
  (TweenController.prototype.tweenToAirTimeText = function () {
    (GameInitialize.instance.airTimeText.element.opacity = 1),
      GameInitialize.instance.airTimeText.setLocalPosition(2, 0, 0),
      GameInitialize.instance.airTimeText
        .tween(GameInitialize.instance.airTimeText.getLocalPosition())
        .to(tempVec.set(2, 1, 0), 0.3, pc.SineOut)
        .repeat(1)
        .start(),
      this.app
        .tween(GameInitialize.instance.airTimeText.element)
        .to({ opacity: 0 }, 0.3, pc.Linear)
        .start();
  }),
  (TweenController.prototype.tweenToScoreIncreaseValueText = function () {
    this.scoreIncreasePosTween?.stop(),
      this.scoreIncreaseOpacityTween?.stop(),
      this.scoreIncreaseScaleTween?.stop(),
      GameInitialize.instance.scoreIncreaseValueText.setLocalPosition(
        tempVec.set(0, Character.instance.entity.getPosition().y + 23, 0)
      ),
      (GameInitialize.instance.scoreIncreaseValueText.enabled = !0),
      (GameInitialize.instance.scoreIncreaseValueText.element.opacity = 0),
      GameInitialize.instance.scoreIncreaseValueText.setLocalScale(1, 1, 1),
      (this.scoreIncreaseScaleTween =
        GameInitialize.instance.scoreIncreaseValueText
          .tween(GameInitialize.instance.scoreIncreaseValueText.getLocalScale())
          .to(new pc.Vec3(1.2, 1.2, 1.2), 0.3, pc.SineInOut)
          .repeat(2)
          .yoyo(!0)
          .start()),
      (this.scoreIncreaseOpacityTween = this.app
        .tween(GameInitialize.instance.scoreIncreaseValueText.element)
        .to({ opacity: 1 }, 0.3, pc.Linear)
        .repeat(2)
        .yoyo(!0)
        .start()),
      (this.scoreIncreasePosTween =
        GameInitialize.instance.scoreIncreaseValueText
          .tween(
            GameInitialize.instance.scoreIncreaseValueText.getLocalPosition()
          )
          .to(
            tempVec.set(
              0,
              GameInitialize.instance.scoreIncreaseValueText.getLocalPosition()
                .y + 5,
              0
            ),
            0.3,
            pc.Linear
          )
          .start());
  }),
  (TweenController.prototype.tweenToTutorialHandFirst = function () {
    GameInitialize.instance.tutorialHand
      .tween(GameInitialize.instance.tutorialHand.getLocalPosition())
      .to(new pc.Vec3(-210, -365, 0), 0.4, pc.SineInOut)
      .delay(0.4)
      .on("complete", function () {
        tutorialStarted = 1;
      })
      .start();
  }),
  (TweenController.prototype.tweenToTutorialCircleFirst = function () {
    this.app
      .tween(GameInitialize.instance.tutorialCircle.element)
      .to({ opacity: 0.5 }, 0.4, pc.Linear)
      .delay(0.4)
      .start();
  }),
  (TweenController.prototype.tweenToTutorialHandSecond = function () {
    GameInitialize.instance.tutorialHand
      .tween(GameInitialize.instance.tutorialHand.getLocalPosition())
      .to(new pc.Vec3(-210, -420, 0), 0.4, pc.SineInOut)
      .delay(0.4)
      .start();
  }),
  (TweenController.prototype.tweenToTutorialCircleSecond = function () {
    this.app
      .tween(GameInitialize.instance.tutorialCircle.element)
      .to({ opacity: 0 }, 0.3, pc.Linear)
      .delay(0.4)
      .on("complete", function () {
        tutorialEnded = 1;
      })
      .start();
  }),
  (TweenController.prototype.tweenToTutorialHandThird = function () {
    this.app
      .tween(GameInitialize.instance.tutorialHand.element)
      .to({ opacity: 0 }, 0.3, pc.Linear)
      .delay(0.6)
      .start();
  });
var Borders = pc.createScript("borders");
Borders.attributes.add("redMaterial", { type: "asset", assetType: "material" }),
  Borders.attributes.add("blueMaterial", {
    type: "asset",
    assetType: "material",
  }),
  Borders.attributes.add("purpleMaterial", {
    type: "asset",
    assetType: "material",
  }),
  Borders.attributes.add("yellowMaterial", {
    type: "asset",
    assetType: "material",
  }),
  Borders.attributes.add("greenMaterial", {
    type: "asset",
    assetType: "material",
  }),
  Borders.attributes.add("orangeMaterial", {
    type: "asset",
    assetType: "material",
  }),
  Borders.attributes.add("darkBlueMaterial", {
    type: "asset",
    assetType: "material",
  });
let obstaclePositions = [],
  borderBoxes = [],
  boxMaterials = [];
(Borders.prototype.initialize = function () {
  (Borders.instance = this),
    (this.charInBorder = !1),
    (this.dtValue = 0),
    (borderBoxes = this.app.root.find("name", "BorderBox")),
    boxMaterials.push(
      this.orangeMaterial,
      this.greenMaterial,
      this.yellowMaterial,
      this.purpleMaterial,
      this.blueMaterial,
      this.redMaterial,
      this.darkBlueMaterial
    ),
    this.setMaterialOfBordersToRed();
}),
  (Borders.prototype.update = function (e) {
    this.charInBorder || this.bordersPositionController(),
      GameOver.instance.isGameOver &&
        GameOver.instance.borderColorBool &&
        ((this.dtValue = this.dtValue + e),
        this.dtValue > 0.07 &&
          ((this.dtValue = 0), this.setMaterialOfBordersToRainbow()));
  }),
  (Borders.prototype.bordersPositionController = function () {
    ((GameInitialize.instance.character.getPosition().x > 15.5 &&
      !Character.instance.circularMotion) ||
      (GameInitialize.instance.character.getPosition().x < -15.5 &&
        !Character.instance.circularMotion)) &&
      ((this.charInBorder = !0), this.app.fire("gameover"));
  }),
  (Borders.prototype.setMaterialOfBordersToRed = function () {
    for (let e = 0; e < borderBoxes.length; e++)
      borderBoxes[e].render.meshInstances[0].material =
        this.redMaterial.resource;
  }),
  (Borders.prototype.setMaterialOfBordersToBlue = function () {
    for (let e = 0; e < borderBoxes.length; e++)
      borderBoxes[e].render.meshInstances[0].material =
        this.blueMaterial.resource;
  }),
  (Borders.prototype.setMaterialOfBordersToRainbow = function () {
    let e = Math.floor(7 * Math.random());
    for (let r = 0; r < borderBoxes.length; r++)
      borderBoxes[r].render.meshInstances[0].material =
        boxMaterials[e].resource;
  });
function loadScene(e, n, c, l) {
  var a = pc.Application.getApplication(),
    o = a.scenes.find(e);
  if (o) {
    var t = o.loaded;
    a.scenes.loadSceneData(o, function (e, o) {
      if (e) c && c.call(l, e);
      else {
        for (var i = null, s = a.root.children; s.length > 0; ) s[0].destroy();
        n.settings &&
          a.scenes.loadSceneSettings(o, function (e) {
            e && c && c.call(l, e);
          }),
          n.hierarchy &&
            a.scenes.loadSceneHierarchy(o, function (e, n) {
              e ? c && c(e) : (i = n);
            }),
          t || a.scenes.unloadSceneData(o),
          c && c.call(l, null, i);
      }
    });
  } else c && c.call(l, "Scene not found: " + e);
}
var Obstacle = pc.createScript("obstacle");
(Obstacle.prototype.initialize = function () {
  (Obstacle.instance = this), (this.charInObstacle = !1);
}),
  (Obstacle.prototype.update = function (t) {
    this.charInObstacle ||
      GameOver.instance.isGameOver ||
      !ButtonController.instance.isTapToPlayButtonClicked ||
      this.obstaclesPositionsController();
  }),
  (Obstacle.prototype.obstaclesPositionsController = function () {
    (this.distance = GameInitialize.instance.character
      .getPosition()
      .distance(this.entity.getPosition())),
      0 == this.entity.indexComponent
        ? this.distance < 2.3 &&
          ((this.charInObstacle = !0), this.app.fire("gameover"))
        : 1 == this.entity.indexComponent
        ? this.distance < 2.2 &&
          ((this.charInObstacle = !0), this.app.fire("gameover"))
        : 2 == this.entity.indexComponent
        ? this.distance < 1.8 &&
          ((this.charInObstacle = !0), this.app.fire("gameover"))
        : 3 == this.entity.indexComponent &&
          this.distance < 1.8 &&
          ((this.charInObstacle = !0), this.app.fire("gameover"));
  });
var Ribbon = pc.createScript("ribbon");
Ribbon.attributes.add("lifetime", { type: "number", default: 0.5 }),
  Ribbon.attributes.add("xoffset", { type: "number", default: -0.8 }),
  Ribbon.attributes.add("yoffset", { type: "number", default: 1 }),
  Ribbon.attributes.add("zoffset", { type: "number", default: 1 }),
  Ribbon.attributes.add("height", { type: "number", default: 0.4 });
var MAX_VERTICES = 1e5,
  VERTEX_SIZE = 4;
(Ribbon.prototype.initialize = function () {
  var t = {
      attributes: { aPositionAge: pc.SEMANTIC_POSITION },
      vshader: [
        "attribute vec4 aPositionAge;",
        "",
        "uniform mat4 matrix_viewProjection;",
        "uniform float trail_time;",
        "",
        "varying float vAge;",
        "",
        "void main(void)",
        "{",
        "    vAge = trail_time - aPositionAge.w;",
        "    gl_Position = matrix_viewProjection * vec4(aPositionAge.xyz, 1.0);",
        "}",
      ].join("\n"),
      fshader: [
        "precision mediump float;",
        "",
        "varying float vAge;",
        "",
        "uniform float r;",
        "",
        "uniform float g;",
        "",
        "uniform float b;",
        "",
        "uniform float trail_lifetime;",
        "",
        "void main(void)",
        "{",
        "    gl_FragColor = vec4(r,g,b,1.0);",
        "}",
      ].join("\n"),
    },
    e = new pc.Shader(this.app.graphicsDevice, t);
  (this.material = new pc.Material()),
    (this.material.shader = e),
    this.material.setParameter("trail_time", 0),
    this.material.setParameter("trail_lifetime", this.lifetime),
    (this.material.cull = pc.CULLFACE_FRONT),
    (this.material.blend = !0),
    (this.material.blendSrc = pc.BLENDMODE_SRC_ALPHA),
    (this.material.blendDst = pc.BLENDMODE_ONE_MINUS_SRC_ALPHA),
    (this.material.blendEquation = pc.BLENDEQUATION_ADD),
    (this.material.depthWrite = !1),
    "red" === this.entity.name &&
      (this.material.setParameter("r", 0.8),
      this.material.setParameter("g", 0.18),
      this.material.setParameter("b", 0.18)),
    "blue" === this.entity.name &&
      (this.material.setParameter("r", 0),
      this.material.setParameter("g", 0),
      this.material.setParameter("b", 1)),
    "green" === this.entity.name &&
      (this.material.setParameter("r", 0.68),
      this.material.setParameter("g", 0.8),
      this.material.setParameter("b", 0.2)),
    "yellow" === this.entity.name &&
      (this.material.setParameter("r", 1),
      this.material.setParameter("g", 1),
      this.material.setParameter("b", 0)),
    "purple" === this.entity.name &&
      (this.material.setParameter("r", 0.7),
      this.material.setParameter("g", 0.23),
      this.material.setParameter("b", 0.82)),
    (this.timer = 0),
    (this.vertices = []),
    (this.vertexData = new Float32Array(MAX_VERTICES * VERTEX_SIZE)),
    (this.vertexIndexArray = []);
  for (var i = 0; i < this.vertexData.length; ++i)
    this.vertexIndexArray.push(i);
  (this.mesh = new pc.Mesh(this.app.graphicsDevice)),
    this.mesh.clear(!0, !1),
    this.mesh.setPositions(this.vertexData, VERTEX_SIZE, MAX_VERTICES),
    this.mesh.setIndices(this.vertexIndexArray, MAX_VERTICES),
    this.mesh.update(pc.PRIMITIVE_TRISTRIP);
  var a = new pc.MeshInstance(this.mesh, this.material);
  this.entity.addComponent("render", {
    meshInstances: [a],
    layers: [this.app.scene.layers.getLayerByName("World").id],
  }),
    (this.entity.render.enabled = !1),
    (this.subpoint1 = this.entity.findByName("subPoint1")),
    (this.subPoint2 = this.entity.findByName("subPoint2"));
}),
  (Ribbon.prototype.reset = function () {
    (this.timer = 0), (this.vertices = []);
  }),
  (Ribbon.prototype.spawnNewVertices = function () {
    this.entity.getPosition();
    let t = this.subpoint1.getPosition(),
      e = this.subPoint2.getPosition();
    var i = this.timer;
    (vertexPair = [t.x, t.y, t.z, e.x, e.y, e.z]),
      this.vertices.unshift({ spawnTime: i, vertexPair: vertexPair });
  }),
  (Ribbon.prototype.clearOldVertices = function () {
    for (var t = this.vertices.length - 1; t >= 0; t--) {
      var e = this.vertices[t];
      if (!(this.timer - e.spawnTime >= this.lifetime)) break;
      this.vertices.pop();
    }
  }),
  (Ribbon.prototype.prepareVertexData = function () {
    for (var t = 0; t < this.vertices.length; t++) {
      var e = this.vertices[t];
      if (
        ((this.vertexData[8 * t + 0] = e.vertexPair[0]),
        (this.vertexData[8 * t + 1] = e.vertexPair[1]),
        (this.vertexData[8 * t + 2] = e.vertexPair[2]),
        (this.vertexData[8 * t + 3] = e.spawnTime),
        (this.vertexData[8 * t + 4] = e.vertexPair[3]),
        (this.vertexData[8 * t + 5] = e.vertexPair[4]),
        (this.vertexData[8 * t + 6] = e.vertexPair[5]),
        (this.vertexData[8 * t + 7] = e.spawnTime),
        this.vertexData.length === t)
      )
        break;
    }
  }),
  (Ribbon.prototype.update = function (t) {
    if (
      ((this.timer += t),
      this.material.setParameter("trail_time", this.timer),
      this.spawnNewVertices(),
      this.vertices.length > 1)
    ) {
      this.prepareVertexData();
      var e = 2 * this.vertices.length,
        i = MAX_VERTICES;
      e < i && (i = e),
        this.mesh.setPositions(this.vertexData, VERTEX_SIZE, i),
        this.mesh.setIndices(this.vertexIndexArray, i),
        this.mesh.update(pc.PRIMITIVE_TRISTRIP),
        (this.entity.render.enabled = !0);
    }
  });
pc.extend(
  pc,
  (function () {
    var TweenManager = function (t) {
      (this._app = t), (this._tweens = []), (this._add = []);
    };
    TweenManager.prototype = {
      add: function (t) {
        return this._add.push(t), t;
      },
      update: function (t) {
        for (var i = 0, e = this._tweens.length; i < e; )
          this._tweens[i].update(t) ? i++ : (this._tweens.splice(i, 1), e--);
        if (this._add.length) {
          for (let t = 0; t < this._add.length; t++)
            this._tweens.indexOf(this._add[t]) > -1 ||
              this._tweens.push(this._add[t]);
          this._add.length = 0;
        }
      },
    };
    var Tween = function (t, i, e) {
        pc.events.attach(this),
          (this.manager = i),
          e && (this.entity = null),
          (this.time = 0),
          (this.complete = !1),
          (this.playing = !1),
          (this.stopped = !0),
          (this.pending = !1),
          (this.target = t),
          (this.duration = 0),
          (this._currentDelay = 0),
          (this.timeScale = 1),
          (this._reverse = !1),
          (this._delay = 0),
          (this._yoyo = !1),
          (this._count = 0),
          (this._numRepeats = 0),
          (this._repeatDelay = 0),
          (this._from = !1),
          (this._slerp = !1),
          (this._fromQuat = new pc.Quat()),
          (this._toQuat = new pc.Quat()),
          (this._quat = new pc.Quat()),
          (this.easing = pc.Linear),
          (this._sv = {}),
          (this._ev = {});
      },
      _parseProperties = function (t) {
        var i;
        return (
          t instanceof pc.Vec2
            ? (i = { x: t.x, y: t.y })
            : t instanceof pc.Vec3
            ? (i = { x: t.x, y: t.y, z: t.z })
            : t instanceof pc.Vec4 || t instanceof pc.Quat
            ? (i = { x: t.x, y: t.y, z: t.z, w: t.w })
            : t instanceof pc.Color
            ? ((i = { r: t.r, g: t.g, b: t.b }), void 0 !== t.a && (i.a = t.a))
            : (i = t),
          i
        );
      };
    Tween.prototype = {
      to: function (t, i, e, s, n, r) {
        return (
          (this._properties = _parseProperties(t)),
          (this.duration = i),
          e && (this.easing = e),
          s && this.delay(s),
          n && this.repeat(n),
          r && this.yoyo(r),
          this
        );
      },
      from: function (t, i, e, s, n, r) {
        return (
          (this._properties = _parseProperties(t)),
          (this.duration = i),
          e && (this.easing = e),
          s && this.delay(s),
          n && this.repeat(n),
          r && this.yoyo(r),
          (this._from = !0),
          this
        );
      },
      rotate: function (t, i, e, s, n, r) {
        return (
          (this._properties = _parseProperties(t)),
          (this.duration = i),
          e && (this.easing = e),
          s && this.delay(s),
          n && this.repeat(n),
          r && this.yoyo(r),
          (this._slerp = !0),
          this
        );
      },
      start: function () {
        var t, i, e, s;
        if (
          ((this.playing = !0),
          (this.complete = !1),
          (this.stopped = !1),
          (this._count = 0),
          (this.pending = this._delay > 0),
          this._reverse && !this.pending
            ? (this.time = this.duration)
            : (this.time = 0),
          this._from)
        ) {
          for (t in this._properties)
            this._properties.hasOwnProperty(t) &&
              ((this._sv[t] = this._properties[t]),
              (this._ev[t] = this.target[t]));
          this._slerp &&
            (this._toQuat.setFromEulerAngles(
              this.target.x,
              this.target.y,
              this.target.z
            ),
            (i =
              void 0 !== this._properties.x
                ? this._properties.x
                : this.target.x),
            (e =
              void 0 !== this._properties.y
                ? this._properties.y
                : this.target.y),
            (s =
              void 0 !== this._properties.z
                ? this._properties.z
                : this.target.z),
            this._fromQuat.setFromEulerAngles(i, e, s));
        } else {
          for (t in this._properties)
            this._properties.hasOwnProperty(t) &&
              ((this._sv[t] = this.target[t]),
              (this._ev[t] = this._properties[t]));
          this._slerp &&
            ((i =
              void 0 !== this._properties.x
                ? this._properties.x
                : this.target.x),
            (e =
              void 0 !== this._properties.y
                ? this._properties.y
                : this.target.y),
            (s =
              void 0 !== this._properties.z
                ? this._properties.z
                : this.target.z),
            void 0 !== this._properties.w
              ? (this._fromQuat.copy(this.target),
                this._toQuat.set(i, e, s, this._properties.w))
              : (this._fromQuat.setFromEulerAngles(
                  this.target.x,
                  this.target.y,
                  this.target.z
                ),
                this._toQuat.setFromEulerAngles(i, e, s)));
        }
        return (this._currentDelay = this._delay), this.manager.add(this), this;
      },
      pause: function () {
        this.playing = !1;
      },
      resume: function () {
        this.playing = !0;
      },
      stop: function () {
        (this.playing = !1), (this.stopped = !0);
      },
      delay: function (t) {
        return (this._delay = t), (this.pending = !0), this;
      },
      repeat: function (t, i) {
        return (
          (this._count = 0),
          (this._numRepeats = t),
          (this._repeatDelay = i || 0),
          this
        );
      },
      loop: function (t) {
        return (
          t
            ? ((this._count = 0), (this._numRepeats = 1 / 0))
            : (this._numRepeats = 0),
          this
        );
      },
      yoyo: function (t) {
        return (this._yoyo = t), this;
      },
      reverse: function () {
        return (this._reverse = !this._reverse), this;
      },
      chain: function () {
        for (var t = arguments.length; t--; )
          t > 0
            ? (arguments[t - 1]._chained = arguments[t])
            : (this._chained = arguments[t]);
        return this;
      },
      update: function (t) {
        if (this.stopped) return !1;
        if (!this.playing) return !0;
        if (
          (!this._reverse || this.pending
            ? (this.time += t * this.timeScale)
            : (this.time -= t * this.timeScale),
          this.pending)
        ) {
          if (!(this.time > this._currentDelay)) return !0;
          this._reverse
            ? (this.time = this.duration - (this.time - this._currentDelay))
            : (this.time -= this._currentDelay),
            (this.pending = !1);
        }
        var i = 0;
        ((!this._reverse && this.time > this.duration) ||
          (this._reverse && this.time < 0)) &&
          (this._count++,
          (this.complete = !0),
          (this.playing = !1),
          this._reverse
            ? ((i = this.duration - this.time), (this.time = 0))
            : ((i = this.time - this.duration), (this.time = this.duration)));
        var e,
          s,
          n = 0 === this.duration ? 1 : this.time / this.duration,
          r = this.easing(n);
        for (var h in this._properties)
          this._properties.hasOwnProperty(h) &&
            ((e = this._sv[h]),
            (s = this._ev[h]),
            (this.target[h] = e + (s - e) * r));
        if (
          (this._slerp && this._quat.slerp(this._fromQuat, this._toQuat, r),
          this.entity &&
            (this.entity._dirtifyLocal(),
            this.element &&
              this.entity.element &&
              (this.entity.element[this.element] = this.target),
            this._slerp && this.entity.setLocalRotation(this._quat)),
          this.fire("update", t),
          this.complete)
        ) {
          var a = this._repeat(i);
          return (
            a
              ? this.fire("loop")
              : (this.fire("complete", i),
                this.entity && this.entity.off("destroy", this.stop, this),
                this._chained && this._chained.start()),
            a
          );
        }
        return !0;
      },
      _repeat: function (t) {
        if (this._count < this._numRepeats) {
          if (
            (this._reverse ? (this.time = this.duration - t) : (this.time = t),
            (this.complete = !1),
            (this.playing = !0),
            (this._currentDelay = this._repeatDelay),
            (this.pending = !0),
            this._yoyo)
          ) {
            for (var i in this._properties) {
              var e = this._sv[i];
              (this._sv[i] = this._ev[i]), (this._ev[i] = e);
            }
            this._slerp &&
              (this._quat.copy(this._fromQuat),
              this._fromQuat.copy(this._toQuat),
              this._toQuat.copy(this._quat));
          }
          return !0;
        }
        return !1;
      },
    };
    var BounceOut = function (t) {
        return t < 1 / 2.75
          ? 7.5625 * t * t
          : t < 2 / 2.75
          ? 7.5625 * (t -= 1.5 / 2.75) * t + 0.75
          : t < 2.5 / 2.75
          ? 7.5625 * (t -= 2.25 / 2.75) * t + 0.9375
          : 7.5625 * (t -= 2.625 / 2.75) * t + 0.984375;
      },
      BounceIn = function (t) {
        return 1 - BounceOut(1 - t);
      };
    return {
      TweenManager: TweenManager,
      Tween: Tween,
      Linear: function (t) {
        return t;
      },
      QuadraticIn: function (t) {
        return t * t;
      },
      QuadraticOut: function (t) {
        return t * (2 - t);
      },
      QuadraticInOut: function (t) {
        return (t *= 2) < 1 ? 0.5 * t * t : -0.5 * (--t * (t - 2) - 1);
      },
      CubicIn: function (t) {
        return t * t * t;
      },
      CubicOut: function (t) {
        return --t * t * t + 1;
      },
      CubicInOut: function (t) {
        return (t *= 2) < 1 ? 0.5 * t * t * t : 0.5 * ((t -= 2) * t * t + 2);
      },
      QuarticIn: function (t) {
        return t * t * t * t;
      },
      QuarticOut: function (t) {
        return 1 - --t * t * t * t;
      },
      QuarticInOut: function (t) {
        return (t *= 2) < 1
          ? 0.5 * t * t * t * t
          : -0.5 * ((t -= 2) * t * t * t - 2);
      },
      QuinticIn: function (t) {
        return t * t * t * t * t;
      },
      QuinticOut: function (t) {
        return --t * t * t * t * t + 1;
      },
      QuinticInOut: function (t) {
        return (t *= 2) < 1
          ? 0.5 * t * t * t * t * t
          : 0.5 * ((t -= 2) * t * t * t * t + 2);
      },
      SineIn: function (t) {
        return 0 === t ? 0 : 1 === t ? 1 : 1 - Math.cos((t * Math.PI) / 2);
      },
      SineOut: function (t) {
        return 0 === t ? 0 : 1 === t ? 1 : Math.sin((t * Math.PI) / 2);
      },
      SineInOut: function (t) {
        return 0 === t ? 0 : 1 === t ? 1 : 0.5 * (1 - Math.cos(Math.PI * t));
      },
      ExponentialIn: function (t) {
        return 0 === t ? 0 : Math.pow(1024, t - 1);
      },
      ExponentialOut: function (t) {
        return 1 === t ? 1 : 1 - Math.pow(2, -10 * t);
      },
      ExponentialInOut: function (t) {
        return 0 === t
          ? 0
          : 1 === t
          ? 1
          : (t *= 2) < 1
          ? 0.5 * Math.pow(1024, t - 1)
          : 0.5 * (2 - Math.pow(2, -10 * (t - 1)));
      },
      CircularIn: function (t) {
        return 1 - Math.sqrt(1 - t * t);
      },
      CircularOut: function (t) {
        return Math.sqrt(1 - --t * t);
      },
      CircularInOut: function (t) {
        return (t *= 2) < 1
          ? -0.5 * (Math.sqrt(1 - t * t) - 1)
          : 0.5 * (Math.sqrt(1 - (t -= 2) * t) + 1);
      },
      BackIn: function (t) {
        var i = 1.70158;
        return t * t * ((i + 1) * t - i);
      },
      BackOut: function (t) {
        var i = 1.70158;
        return --t * t * ((i + 1) * t + i) + 1;
      },
      BackInOut: function (t) {
        var i = 2.5949095;
        return (t *= 2) < 1
          ? t * t * ((i + 1) * t - i) * 0.5
          : 0.5 * ((t -= 2) * t * ((i + 1) * t + i) + 2);
      },
      BounceIn: BounceIn,
      BounceOut: BounceOut,
      BounceInOut: function (t) {
        return t < 0.5
          ? 0.5 * BounceIn(2 * t)
          : 0.5 * BounceOut(2 * t - 1) + 0.5;
      },
      ElasticIn: function (t) {
        var i,
          e = 0.1;
        return 0 === t
          ? 0
          : 1 === t
          ? 1
          : (!e || e < 1
              ? ((e = 1), (i = 0.1))
              : (i = (0.4 * Math.asin(1 / e)) / (2 * Math.PI)),
            -e *
              Math.pow(2, 10 * (t -= 1)) *
              Math.sin(((t - i) * (2 * Math.PI)) / 0.4));
      },
      ElasticOut: function (t) {
        var i,
          e = 0.1;
        return 0 === t
          ? 0
          : 1 === t
          ? 1
          : (!e || e < 1
              ? ((e = 1), (i = 0.1))
              : (i = (0.4 * Math.asin(1 / e)) / (2 * Math.PI)),
            e *
              Math.pow(2, -10 * t) *
              Math.sin(((t - i) * (2 * Math.PI)) / 0.4) +
              1);
      },
      ElasticInOut: function (t) {
        var i,
          e = 0.1,
          s = 0.4;
        return 0 === t
          ? 0
          : 1 === t
          ? 1
          : (!e || e < 1
              ? ((e = 1), (i = 0.1))
              : (i = (s * Math.asin(1 / e)) / (2 * Math.PI)),
            (t *= 2) < 1
              ? e *
                Math.pow(2, 10 * (t -= 1)) *
                Math.sin(((t - i) * (2 * Math.PI)) / s) *
                -0.5
              : e *
                  Math.pow(2, -10 * (t -= 1)) *
                  Math.sin(((t - i) * (2 * Math.PI)) / s) *
                  0.5 +
                1);
      },
    };
  })()
),
  (function () {
    (pc.Application.prototype.addTweenManager = function () {
      (this._tweenManager = new pc.TweenManager(this)),
        this.on("update", function (t) {
          this._tweenManager.update(t);
        });
    }),
      (pc.Application.prototype.tween = function (t) {
        return new pc.Tween(t, this._tweenManager);
      }),
      (pc.Entity.prototype.tween = function (t, i) {
        var e = this._app.tween(t);
        return (
          (e.entity = this),
          this.once("destroy", e.stop, e),
          i && i.element && (e.element = i.element),
          e
        );
      });
    var t = pc.Application.getApplication();
    t && t.addTweenManager();
  })();
var SoundController = pc.createScript("soundController");
(SoundController.prototype.initialize = function () {
  (SoundController.instance = this),
    (this.muteButton = this.app.root.findByName("muteButton"));
}),
  (SoundController.prototype.playAttachObstacle = function () {
    this.entity.sound.stop("attach_obstacle"),
      1 === playerData.soundOn && this.entity.sound.play("attach_obstacle");
  }),
  (SoundController.prototype.playFailSound = function () {
    this.entity.sound.stop("fail_sound"),
      1 === playerData.soundOn && this.entity.sound.play("fail_sound");
  }),
  (SoundController.prototype.playFailSound2 = function () {
    this.entity.sound.stop("attach_obstacle"),
      this.entity.sound.stop("fail_sound"),
      this.entity.sound.stop("fail_sound2"),
      1 === playerData.soundOn && this.entity.sound.play("fail_sound2");
  }),
  (SoundController.prototype.playFailSound3 = function () {
    this.entity.sound.stop("attach_obstacle"),
      this.entity.sound.stop("fail_sound"),
      this.entity.sound.stop("fail_sound2"),
      1 === playerData.soundOn && this.entity.sound.play("fail_sound3");
  }),
  (SoundController.prototype.pauseSounds = function () {
    this.entity.sound.pause();
  }),
  (SoundController.prototype.resumeSounds = function () {
    this.entity.sound.resume();
  });
var MuteButton = pc.createScript("muteButton");
window.famobi.onRequest("enableAudio", function () {
  window.dirtyMute = false;
  unmuteFunc();
});
window.famobi.onRequest("disableAudio", function () {
  window.dirtyMute = true;
  muteFunc();
});
function muteFunc() {
  window.famobi && window.famobi.localStorage.setItem("muted", !0);
  playerData.soundOn = 0;
  updatePlayerData();
}
function unmuteFunc() {
  if (window.dirtyMute) return;
  window.famobi && window.famobi.localStorage.removeItem("muted");
  playerData.soundOn = 1;
  updatePlayerData();
}
MuteButton.prototype.initialize = function () {
  if (window.famobi.hasFeature("external_mute")) {
    this.entity.enabled = false;
    return;
  }
  1 == playerData.soundOn
    ? ((this.entity.findByName("mute").enabled = !1),
      (this.entity.findByName("unmute").enabled = !0))
    : ((this.entity.findByName("mute").enabled = !0),
      (this.entity.findByName("unmute").enabled = !1)),
    this.entity.button.on("click", () => {
      1 == playerData.soundOn
        ? ((muted = !0),
          (this.entity.findByName("mute").enabled = !0),
          (this.entity.findByName("unmute").enabled = !1),
          muteFunc())
        : ((muted = !1),
          (this.entity.findByName("mute").enabled = !1),
          (this.entity.findByName("unmute").enabled = !0),
          unmuteFunc());
    });
}; // commentScripts.js
//Character

// if (this.entity.getPosition().x < this.closestObstacle.getPosition().x && this.entity.getPosition().y < this.closestObstacle.getPosition().y) {
//     // console.log("Area1")
//     if (this.charRotZ >= 135 && this.charRotZ <= 315) {
//         this.rotateVal = 1;
//     } else {
//         this.rotateVal = -1;
//     }
// }
// else if (this.entity.getPosition().x > this.closestObstacle.getPosition().x && this.entity.getPosition().y < this.closestObstacle.getPosition().y) {
//     // console.log("Area2")
//     if (this.charRotZ >= 45 && this.charRotZ <= 225) {
//         this.rotateVal = -1;
//     } else {
//         this.rotateVal = 1;
//     }
// }
// else if (this.entity.getPosition().x < this.closestObstacle.getPosition().x && this.entity.getPosition().y > this.closestObstacle.getPosition().y) {
//     // console.log("Area3")
//     if (this.charRotZ >= 45 && this.charRotZ <= 225) {
//         this.rotateVal = 1;
//     } else {
//         this.rotateVal = -1;
//     }
// }
// else if (this.entity.getPosition().x > this.closestObstacle.getPosition().x && this.entity.getPosition().y > this.closestObstacle.getPosition().y) {
//     // console.log("Area4")
//     if (this.charRotZ >= 135 && this.charRotZ <= 315) {
//         this.rotateVal = -1;
//     } else {
//         this.rotateVal = 1;
//     }
// }

// if (this.airTime >= 0.1) {
//     //total air time tween
//     TweenController.instance.tweenToTotalAirTime();
//
//     setTimeout(() => {
//         score += Math.round(this.airTime);
//         GameInitialize.instance.scoreText.element.text = Math.floor(score);
//         TweenController.instance.tweenToScoreDistanceText();
//         AirTimeController.instance.totalAirTime = 0.0;
//     }, "800");
// }
// //Feedback
// if (this.airTime > 0.1) {
//     AirTimeController.instance.totalAirTime += this.airTime * 10;
//     // console.log("Air Time: ", this.airTime);
//     // console.log("Air Time Pow: ", Math.pow(2, this.airTime * 2));

//     // console.log(AirTimeController.instance.totalAirTime);
//     AirTimeController.instance.setTotalAirTime();

//     this.airTime = 0.0;
//     this.counter = 0.0;
//     this.bestAirTimeInGame = 0.0;
//     GameInitialize.instance.airTimeText.enabled = false;
// }

// if (this.airTime > 0.1) {

//     this.airTime = Math.ceil(Math.pow(this.airTime, 2));
//     GameInitialize.instance.gameUIAirTimeText.element.text = this.airTime;
//     TweenController.instance.tweenToTotalAirTime();

//     setTimeout(() => {

//         TweenController.instance.tweenToTotalAirTimePos();

//     }, "500");

//     setTimeout(() => {

//         TweenController.instance.tweenToScoreDistanceText();
//         ScoreController.instance.airTimeScore += this.airTime;

//         // this.airTime = 0.0;
//         // this.counter = 0.0;
//         // this.bestAirTimeInGame = 0.0;

//     }, "550");
// }

// if (this.airTime >= 0.1) {
//     //total air time tween
//     TweenController.instance.tweenToTotalAirTime();
// }
// AirTimeController.instance.totalAirTime += this.airTime;
// console.log(AirTimeController.instance.totalAirTime);
// AirTimeController.instance.setTotalAirTime();

// this.airTime = 0.0;
// this.counter = 0.0;
// this.bestAirTimeInGame = 0.0;

//update
// this.counter += dt;

// GameInitialize.instance.airTimeText.enabled = false;
// if (this.counter > this.airTimeStartTime) {
//     if (!this.circularMotion) {
//         GameInitialize.instance.airTimeText.enabled = true;

//         this.airTime += dt;
//         // this.airTime = +this.airTime.toFixed(1);
//         // console.log(this.airTime);
//         // this.airTime = Math.ceil(Math.pow(this.airTime, 2));

//         GameInitialize.instance.airTimeText.element.text = this.airTime.toFixed(1); ///buurra
//         if (this.bestAirTimeInGame <= this.airTime) {
//             this.bestAirTimeInGame = this.airTime;
//             if (playerData.bestAirTime <= this.bestAirTimeInGame) {
//                 playerData.bestAirTime = this.bestAirTimeInGame;
//                 updatePlayerData();
//             }
//         }
//     }
// }

// // console.log(this.firstRotate);
// this.clickCount++;

// TweenController.instance.tweenToScoreBoardPos();

// if (this.clickCount > 1) {
//     TweenController.instance.tweenToScoreBoard();
// }
// // console.log(this.clickCount);

// if (!this.firstRotate) {
// } else {
//     TweenController.instance.tweenToInitialTotalAirTime();

// }
/*******************************************************************************************************************/
// Tween controller

// TweenController.prototype.tweenToTotalAirTime = function () {
//     this.uiAirTimeText.setLocalPosition(-74.05,-210,0);

//     this.uiAirTimeText.setLocalScale(1, 1, 1);
//     this.uiAirTimeText
//         .tween(this.uiAirTimeText.getLocalScale())
//         .to(new pc.Vec3(1.2, 1.2, 1.2), 0.3, pc.SineInOut)
//         .repeat(2)
//         .yoyo(true)
//         .start();
// };
// TweenController.prototype.tweenToTotalAirTimePos = function () {
//     this.uiAirTimeText.setLocalPosition(-74.05,-210,0);

//     this.uiAirTimeText
//     .tween(this.uiAirTimeText.getLocalPosition())
//     .to(new pc.Vec3(-120, -100, 0), 0.3, pc.SineOut)
//     .repeat(1)
//     .start();

//     this.uiAirTimeText
//         .tween(this.uiAirTimeText.getLocalScale())
//         .to(new pc.Vec3(0, 0, 0), 0.4, pc.SineOut)
//         .repeat(1)
//         .start();
// };

var Mask = pc.createScript("mask");
(Mask.prototype.initialize = function () {
  (Mask.instance = this),
    this.entity.on("destroy", this.onDestroy, this),
    (this.progressImageMaxHeight = 228),
    (this.progressImage = this.entity.findByName("content")),
    (this.imageRect = this.progressImage.element.rect.clone());
}),
  (Mask.prototype.setProgress = function () {
    let e = { value: 1 };
    endGameUITween = app
      .tween(e)
      .to({ value: 0 }, 5, pc.Linear)
      .on("update", () => {
        (e.value = pc.math.clamp(e.value, 0, 1)), (this.progress = e.value);
        let t = pc.math.lerp(0, this.progressImageMaxHeight, e.value);
        (this.progressImage.element.height = t),
          this.imageRect.copy(this.progressImage.element.rect),
          (this.imageRect.w = e.value),
          (this.progressImage.element.rect = this.imageRect);
      })
      .on("complete", () => {
        ButtonController.instance.restartButtonAction();
      })
      .start();
  }),
  (Mask.prototype.onDestroy = function () {
    endGameUITween.stop(), (endGameUITween = null);
  });
var FamobiApicontrol = pc.createScript("famobiApicontrol");
FamobiApicontrol.attributes.add("title", { type: "entity" }),
  FamobiApicontrol.attributes.add("score", { type: "entity" }),
  FamobiApicontrol.attributes.add("highScore", { type: "entity" }),
  FamobiApicontrol.attributes.add("muteButton", { type: "entity" }),
  (FamobiApicontrol.prototype.initialize = function () {
    window.isLiteAPI
      ? ((this.title.enabled = !1),
        (this.score.enabled = !1),
        (this.highScore.enabled = !1),
        (this.muteButton.enabled = !1))
      : ((this.title.enabled = !0),
        (this.score.enabled = !0),
        (this.highScore.enabled = !0),
        (this.muteButton.enabled = !0));
  });
