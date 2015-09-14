var el_player, self;
$(document).ready(function () {
    window.app = new FBApp();
    el_player = $("#add");
    $("#various1").fancybox({
        'titlePosition': 'inside',
        'transitionIn': 'none',
        'transitionOut': 'none'
    });
});

$(window).load(function () {
    window.app.onLoad();
});

function FBApp() {
    // console.log( 'FootballApp::initialize' );
}

FBApp.prototype.onLoad = function () {
    self = this;
    var canvas = document.getElementById("FootballCanvas");
    //Create a stage by getting a reference to the canvas
    this.stage = new createjs.Stage(canvas);

    createjs.Touch.enable(this.stage);
    // enabled mouse over / out events
    this.stage.enableMouseOver(10);
    this.stage.mouseMoveOutside = true; // keep tracking the mouse even when it leaves the canvas

    el_player.click(function () {
        var el_name = $("#name");
        var name = el_name.val();
        el_name.val("");
        self.createPlayer(name);
    });
};

FBApp.prototype.createPlayer = function (name) {
    var circle = new createjs.Shape();
    circle.graphics.beginFill("red").drawCircle(0, 0, 50);

    var label = new createjs.Text(name, "bold 14px Arial", "#FFFFFF");
    label.textAlign = "center";
    label.y = -7;

    var dragger = new createjs.Container();
    dragger.x = dragger.y = 100;
    dragger.addChild(circle, label);
    this.stage.addChild(dragger);

    dragger.on("pressmove", function (evt) {
        // currentTarget will be the container that the event listener was added to:
        evt.currentTarget.x = evt.stageX;
        evt.currentTarget.y = evt.stageY;
        // make sure to redraw the stage to show the change:
        this.stage.update();
    });

    this.stage.update();

    $.fancybox.close();
};
