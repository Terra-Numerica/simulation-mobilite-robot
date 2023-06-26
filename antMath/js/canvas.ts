class DrawingApp{
    canvas: HTMLCanvasElement;
    context: CanvasRenderingContext2D;
    paint: boolean;

    clickX = new Array();
    clickY = new Array();

    private clickDrag: boolean[] = [];

    //parameters of the main canvas
    constructor() {

        let canvas = document.getElementById("playGround") as HTMLCanvasElement;
        canvas.width = window.innerWidth * 0.75 ;
        canvas.height = window.innerHeight * 0.9 ;
        canvas.style.width = "auto";
        canvas.style.height = "auto";
        canvas.style.margin = '0px';
        canvas.style.position = 'absolute';

        let context = canvas.getContext("2d");
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
    createUserEvents() {
        let canvas = this.canvas;
        canvas.addEventListener("mousedown", this.pressEventHandler);
        canvas.addEventListener("mousemove", this.dragEventHandler);
        canvas.addEventListener("mouseup", this.releaseEventHandler);
        //canvas.addEventListener("mouseout", this.cancelEventHandler);
    
         canvas.addEventListener("touchstart", this.pressEventHandler);
         canvas.addEventListener("touchmove", this.dragEventHandler);
         canvas.addEventListener("touchend", this.releaseEventHandler);
         canvas.addEventListener("touchcancel", this.cancelEventHandler);
    
      //  document.body.addEventListener("click", this.clearEventHandler);
    }
    
    //refresh
    redraw() {
        let clickX = this.clickX;
        let context = this.context;
        let clickDrag = this.clickDrag;
        let clickY = this.clickY;
        for (let i = 0; i < clickX.length; ++i) {
            context.beginPath();
            if (clickDrag[i] && i) {
                context.moveTo(clickX[i - 1], clickY[i - 1]);
            } else {
                context.moveTo(clickX[i] - 1, clickY[i]);
            }
    
            context.lineTo(clickX[i], clickY[i]);
            context.stroke();
        }
        context.closePath();
    }
    
    //add a point
    addClick(x: number, y: number, dragging: boolean) {
        this.clickX.push(x);
        this.clickY.push(y);
        this.clickDrag.push(dragging);
    }
    
    clearCanvas() {
        this.context
            .clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.clickX = [];
        this.clickY = [];
        this.clickDrag = [];
    }
    
    clearEventHandler = () => {
        this.clearCanvas();
    }
    
    releaseEventHandler = () => {
        this.paint = false;
        this.redraw();
    }
    
    cancelEventHandler = () => {
        this.paint = false;
    }

    //when pressed
    pressEventHandler = (e: MouseEvent | TouchEvent) => {
        if(draw){
            let mouseX = (e as TouchEvent).changedTouches ?
                        (e as TouchEvent).changedTouches[0].pageX :
                        (e as MouseEvent).pageX;
            let mouseY = (e as TouchEvent).changedTouches ?
                        (e as TouchEvent).changedTouches[0].pageY :
                        (e as MouseEvent).pageY;
            mouseX -= this.canvas.offsetLeft;
            mouseY -= this.canvas.offsetTop;
        
            this.paint = true;
            this.addClick(mouseX, mouseY, false);
            this.redraw();
        }
    }
    
    //when dragged
    dragEventHandler = (e: MouseEvent | TouchEvent) => {
        if(draw){
            let mouseX = (e as TouchEvent).changedTouches ?
                        (e as TouchEvent).changedTouches[0].pageX :
                        (e as MouseEvent).pageX;
            let mouseY = (e as TouchEvent).changedTouches ?
                        (e as TouchEvent).changedTouches[0].pageY :
                        (e as MouseEvent).pageY;
            mouseX -= this.canvas.offsetLeft;
            mouseY -= this.canvas.offsetTop;

            if (this.paint) {
                this.addClick(mouseX, mouseY, true);
                this.redraw();
            }
            
            e.preventDefault();
        }
    }

    //remove the current first point of the draw
    removeFirstOne(){
        if(this.clickX.length > 1) {
            this.clickX = this.clickX.slice(1);
            this.clickY = this.clickY.slice(1);
        } else {
            this.clickX = new Array();
            this.clickY = new Array();
        }
    }   
    
}