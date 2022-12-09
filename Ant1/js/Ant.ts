class Ant{
    //image, speed, pos, distance
    img = document.createElement('img');
    x:number;
    y:number;
    speedX:number = 0;
    speedY:number = 0;
    distance:number = 0;

    //ant constructor
    constructor(link: string, x:number, y:number){
        this.img.src = link;
        this.img.style.position = 'absolute';
        this.img.style.transform = 'translateX('+-50+'%) translateY('+-50+'%)';
        this.img.style.width = x+'px';
        this.img.style.height = y+'px';
    }

    //teleport the ant to x and y, update distance and coordonates
    moove(x:number, y:number){
        this.img.style.left = x + 'px';
        this.img.style.top = y + 'px';
        this.x = x;
        this.y = y;
        this.distance += Math.sqrt(this.speedX*this.speedX + this.speedY*this.speedY);
    }

    //follow the given ant at with gap as distance
    follow(Ant:Ant){
        
        // let dx:number = Ant.x - this.x;
        // let dy:number = Ant.y - this.y;

        // let angl:number = Math.atan(dy/dx)  * 180/Math.PI;
        // if(dx < 0){
        //     this.img.style.transform = 'translateX('+-50+'%) translateY('+-50+'%) rotate(' + (-90+angl) + 'deg) '; 
        // } else {
        //     this.img.style.transform = 'translateX('+-50+'%) translateY('+-50+'%) rotate(' + ((-90-angl) * (-1)) + 'deg) '; 
        // }

        // if(Math.abs(dx) < 30 && Math.abs(dy) < 30) {
        //     this.speedX = 0;
        //     this.speedY = 0;
        // } else {
        //     this.speedX = dx / gap;
        //     this.speedY = dy / gap;
        //     this.moove(this.x + this.speedX, this.y + this.speedY);
        // } 


        let dx:number = Ant.x - this.x;
        let dy:number = Ant.y - this.y;

        if(Math.abs(dx) < gap && Math.abs(dy) < gap) {
            this.speedX = 0;
            this.speedY = 0;
        } else if(Math.max(Math.abs(dx),Math.abs(dy)) >= speedAnt) {
            this.speedX = dx / Math.max(Math.abs(dx),Math.abs(dy)) * speedAnt;
            this.speedY = dy / Math.max(Math.abs(dx),Math.abs(dy)) * speedAnt;
        } else {
            this.speedX = dx;
            this.speedY = dy;
        }
        
        let angl:number = Math.atan(dy/dx)  * 180/Math.PI;
        if(dx < 0){
            this.img.style.transform = 'translateX('+-50+'%) translateY('+-50+'%) rotate(' + (-90+angl) + 'deg) '; 
        } else {
            this.img.style.transform = 'translateX('+-50+'%) translateY('+-50+'%) rotate(' + ((-90-angl) * (-1)) + 'deg) '; 
        }
        this.moove(this.x + this.speedX, this.y + this.speedY);
    }

    //follow the path by giving points one by one
    followN(x:number, y:number){
        let dx:number = x - this.x;
        let dy:number = y - this.y;

        if(Math.max(Math.abs(dx),Math.abs(dy)) >= speedAnt) {
            this.speedX = dx / Math.max(Math.abs(dx),Math.abs(dy)) * speedAnt;
            this.speedY = dy / Math.max(Math.abs(dx),Math.abs(dy)) * speedAnt;
        } else {
            this.speedX = dx;
            this.speedY = dy;
        }
        
        let angl:number = Math.atan(dy/dx)  * 180/Math.PI;
        if(dx < 0){
            this.img.style.transform = 'translateX('+-50+'%) translateY('+-50+'%) rotate(' + (-90+angl) + 'deg) '; 
        } else {
            this.img.style.transform = 'translateX('+-50+'%) translateY('+-50+'%) rotate(' + ((-90-angl) * (-1)) + 'deg) '; 
        }
        this.moove(this.x + this.speedX, this.y + this.speedY);
    }

    //follow the end of the path (for the first ant only)
    followEnd(Ant:Ant) {
        let dx:number = Ant.x - this.x;
        let dy:number = Ant.y - this.y;

        if(Math.max(Math.abs(dx),Math.abs(dy)) >= speedAnt) {
            this.speedX = dx / Math.max(Math.abs(dx),Math.abs(dy)) * speedAnt;
            this.speedY = dy / Math.max(Math.abs(dx),Math.abs(dy)) * speedAnt;
        } else {
            this.speedX = dx;
            this.speedY = dy;
        }

        let angl:number = Math.atan(dy/dx)  * 180/Math.PI;
        if(dx < 0){
            this.img.style.transform = 'translateX('+-50+'%) translateY('+-50+'%) rotate(' + (-90+angl) + 'deg) '; 
        } else {
            this.img.style.transform = 'translateX('+-50+'%) translateY('+-50+'%) rotate(' + ((-90-angl) * (-1)) + 'deg) '; 
        }
        
        if(dx < 5 && dx > -5 && dy < 5 && dy > -5) {
            this.moove(Ant.x,Ant.y);
        } else {
            this.moove(this.x + this.speedX, this.y + this.speedY);
        }
    }
}