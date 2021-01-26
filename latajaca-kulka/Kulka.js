// TODO: http://dbp-consulting.com/tutorials/canvas/CanvasArrow.html albo zastanowić się, czy tak chcę
class Kulka{
    constructor(x, y, r, color, name){
        this.x = x;
        this.y = y;
        this.prev = { x: null, y: null };
        this.r = r;
        this.color = color;
        this.vel = { x: 0.9, y: 0.9 };
        this.name = name;
    };

    update(){
        this.x += this.vel.x;
        this.y += this.vel.y;

        if (this.x <= this.r){
            this.x = this.r + 10; // move the object
            this.vel.x *= -1;
            angle = 90;
        }
        if (this.x >= gCanvas.width - this.r){
            this.x = gCanvas.width - this.r - 10; // move the object
            this.vel.x *= -1;
            angle = 90;
        }
        if (this.y <= this.r){
            this.y = this.r + 10; // move the object
            this.vel.y *= -1;
            angle = 90;
        }
        if (this.y >= gCanvas.height - this.r){
            this.y = gCanvas.height - this.r - 10; // move the object
            this.vel.y *= -1;
            angle = 90;
        }
    };

    draw(){
        /* circle */
        gDrawingContext.beginPath();
        gDrawingContext.arc(this.x, this.y, this.r, 0, Math.PI * 2, false);
        gDrawingContext.strokeStyle = this.color;
        gDrawingContext.stroke();
        /* text */
        gDrawingContext.font = 'bold 15px sans-serif';
        gDrawingContext.fillStyle = this.color;
        gDrawingContext.fillText(this.name, this.x - this.r / 2, this.y + this.r / 4);

        let x = this.x;
        let y = this.y;
    };

    collision(actors){
        let dist = (a, b) => {
            return Math.sqrt((b.x - a.x) * (b.x - a.x) + (b.y - a.y) * (b.y - a.y));
        }
        actors.forEach(actor => {
            if(actor !== this){
                let self = this;
                let d = dist(actor, this);
                if(d < (this.r + actor.r)){
                    // console.log({ d, actor, self });
                    actor.vel.x *= -1;
                    actor.vel.y *= -1;
                }
            }
        });
    };
};
