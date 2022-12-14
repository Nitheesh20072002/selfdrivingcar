class Road{
    constructor(x,width,laneCount=3){
        this.x=x;
        this.width=width;
        this.laneCount=laneCount;

        this.left=x-width/2;
        this.right=x+width/2;

        const infinity=1000000;
        this.top=-infinity;
        this.bottom=infinity;

        // Change the borders to curved if possible......................
        const topLeft={x:this.left,y:this.top};
        const topRight={x:this.right,y:this.top};
        const bottomRight={x:this.right,y:this.bottom};
        const bottomLeft={x:this.left,y:this.bottom};
        this.borders=[
            [topLeft,bottomLeft],
            [topRight,bottomRight]
        ];
    }

    // methods
    getLaneCenter(laneIndex){
        const laneWidth=this.width/this.laneCount;
        return this.left+laneWidth/2+Math.min(laneIndex,this.laneCount-1)*laneWidth;
    }
    draw(ctx){
        ctx.lineWidth=5;
        ctx.strokeStyle="white";

        for(let i=0;i<=this.laneCount-1;i++){
            // linear interpolation
            const x=lerp(
                this.left,
                this.right,
                i/this.laneCount
            );// x is some position between left and right at i/this.laneCount percentage
            ctx.setLineDash([20,20]);// dash will have 20px and a break of 20px
            ctx.beginPath();
            ctx.moveTo(x,this.top);
            ctx.lineTo(x,this.bottom);
            ctx.stroke();
        }

        ctx.setLineDash([]);
        this.borders.forEach(border=>{
            ctx.beginPath();
            ctx.moveTo(border[0].x,border[0].y);
            ctx.lineTo(border[1].x,border[1].y);
            ctx.stroke();
        });
    }
}


