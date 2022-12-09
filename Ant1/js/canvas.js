var DrawingApp = /** @class */ (function () {
    //parameters of the main canvas
    function DrawingApp() {
        var _this = this;
        this.clickX = new Array();
        this.clickY = new Array();
        this.clickDrag = [];
        this.clearEventHandler = function () {
            _this.clearCanvas();
        };
        this.releaseEventHandler = function () {
            _this.paint = false;
            _this.redraw();
        };
        this.cancelEventHandler = function () {
            _this.paint = false;
        };
        //when pressed
        this.pressEventHandler = function (e) {
            if (draw) {
                var mouseX = e.changedTouches ?
                    e.changedTouches[0].pageX :
                    e.pageX;
                var mouseY = e.changedTouches ?
                    e.changedTouches[0].pageY :
                    e.pageY;
                mouseX -= _this.canvas.offsetLeft;
                mouseY -= _this.canvas.offsetTop;
                _this.paint = true;
                _this.addClick(mouseX, mouseY, false);
                _this.redraw();
            }
        };
        //when dragged
        this.dragEventHandler = function (e) {
            if (draw) {
                var mouseX = e.changedTouches ?
                    e.changedTouches[0].pageX :
                    e.pageX;
                var mouseY = e.changedTouches ?
                    e.changedTouches[0].pageY :
                    e.pageY;
                mouseX -= _this.canvas.offsetLeft;
                mouseY -= _this.canvas.offsetTop;
                if (_this.paint) {
                    _this.addClick(mouseX, mouseY, true);
                    _this.redraw();
                }
                e.preventDefault();
            }
        };
        var canvas = document.getElementById('canvas');
        canvas.width = window.innerWidth * 0.75;
        canvas.height = window.innerHeight * 0.9;
        canvas.style.width = "auto";
        canvas.style.height = "auto";
        canvas.style.margin = '0px';
        canvas.style.position = 'absolute';
        var context = canvas.getContext("2d");
        context.lineCap = 'round';
        context.lineJoin = 'round';
        context.strokeStyle = '#EE5A24';
        context.lineWidth = 4;
        // context.fillStyle = '#009432';
        // context.fillRect(0,0,canvas.width,canvas.height);
        // let img = new Image();
        // img.onload = function() {
        //     context.drawImage(img,0,0,img.width,img.height);
        // }
        // img.src ='./assets/green.jpg';
        this.canvas = canvas;
        this.context = context;
        this.redraw();
        this.createUserEvents();
    }
    //create events
    DrawingApp.prototype.createUserEvents = function () {
        var canvas = this.canvas;
        canvas.addEventListener("mousedown", this.pressEventHandler);
        canvas.addEventListener("mousemove", this.dragEventHandler);
        canvas.addEventListener("mouseup", this.releaseEventHandler);
        //canvas.addEventListener("mouseout", this.cancelEventHandler);
        canvas.addEventListener("touchstart", this.pressEventHandler);
        canvas.addEventListener("touchmove", this.dragEventHandler);
        canvas.addEventListener("touchend", this.releaseEventHandler);
        canvas.addEventListener("touchcancel", this.cancelEventHandler);
        //  document.body.addEventListener("click", this.clearEventHandler);
    };
    //refresh
    DrawingApp.prototype.redraw = function () {
        var clickX = this.clickX;
        var context = this.context;
        var clickDrag = this.clickDrag;
        var clickY = this.clickY;
        for (var i_1 = 0; i_1 < clickX.length; ++i_1) {
            context.beginPath();
            if (clickDrag[i_1] && i_1) {
                context.moveTo(clickX[i_1 - 1], clickY[i_1 - 1]);
            }
            else {
                context.moveTo(clickX[i_1] - 1, clickY[i_1]);
            }
            context.lineTo(clickX[i_1], clickY[i_1]);
            context.stroke();
        }
        context.closePath();
    };
    //add a point
    DrawingApp.prototype.addClick = function (x, y, dragging) {
        this.clickX.push(x);
        this.clickY.push(y);
        this.clickDrag.push(dragging);
    };
    DrawingApp.prototype.clearCanvas = function () {
        this.context
            .clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.clickX = [];
        this.clickY = [];
        this.clickDrag = [];
    };
    //remove the current first point of the draw
    DrawingApp.prototype.removeFirstOne = function () {
        if (this.clickX.length > 1) {
            this.clickX = this.clickX.slice(1);
            this.clickY = this.clickY.slice(1);
        }
        else {
            this.clickX = new Array();
            this.clickY = new Array();
        }
    };
    return DrawingApp;
}());
