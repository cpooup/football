$(document).ready(function () {
    window.app = new FBApp();
});

$(window).load(function () {
    window.app.onLoad();
});

function FBApp() {
    // console.log( 'FootballApp::initialize' );
}

FBApp.prototype.onLoad = function () {
    var canvas = document.getElementById("FootballCanvas");
    //Create a stage by getting a reference to the canvas
    this.stage = new createjs.Stage(canvas);

    createjs.Touch.enable(this.stage);
    // enabled mouse over / out events
    this.stage.enableMouseOver(10);
    this.stage.mouseMoveOutside = true; // keep tracking the mouse even when it leaves the canvas

    this.createPlayer();
};

FBApp.prototype.createPlayer = function () {
  //Create a Shape DisplayObject.
    this.circle = new createjs.Shape();
    this.circle.graphics.beginFill("red").drawCircle(0, 0, 40);
    //Set position of Shape instance.
    this.circle.x = this.circle.y = 50;

    this.circle.on("mousedown", function (evt) {
        this.parent.addChild(this);
        this.offset = {x: this.x - evt.stageX, y: this.y - evt.stageY};
    });

    this.circle.on("pressmove", function (evt) {
        evt.target.x = evt.stageX;
        evt.target.y = evt.stageY;
        console.log("pressmove");
        this.stage.update();
    });
    this.circle.on("pressup", function (evt) {
        console.log("pressup");
    });
        //Add Shape instance to stage display list.
    this.stage.addChild(this.circle);
    //Update stage will render next frame
    this.stage.update();
}
