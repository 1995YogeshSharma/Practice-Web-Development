$(document).ready(function(){
    var canvas= $('canvas')[0];
    var ctx= canvas.getContext("2d");
    var width=canvas.width;
    var height= canvas.height;
    var cellWidth= 15;
    var dir='right';
    var food;
    var score;
    var speed=133;

    //initializing snake array
    var snake_array;


    window.addEventListener('keydown', function(event){
        switch(event.keyCode){
            case 37:
                if(dir != 'right')
                    dir='left';
                break;
            case 38:
                if(dir != 'down')
                    dir='up';
                break;
            case 39:
                if(dir != 'left')
                    dir='right';
                break;
            case 40:
                if(dir != 'up')
                    dir='down';
                break;
        }
    },false);

    function init(){
        create_snake();
        create_food();
        score=0;
        dir='right';

        if(typeof game_loop != "undefined") clearInterval(game_loop);
        game_loop=  setInterval(paint,speed);
    }
    
    function check_collision(x,y,array)
    {
        for(var i=0; i<array.length; i++)
        {
            if(array[i].x==x && array[i].y==y)
                return true;
        }
        return false;
    }
    init();
    
    function create_snake(){
        var length= 5;
        snake_array= [];
        for(var i= length-1; i>=0; i--)
        {
            snake_array.push({x:i, y:0});
        }
    }

    function create_food(){
        food= {x: Math.round(((width-cellWidth)*Math.random())/cellWidth), y: Math.round(((height-cellWidth)*Math.random())/cellWidth)};
    }

    function paint()
    {
    
        document.getElementById('overlay').style.visibility='hidden';
        ctx.fillStyle= 'black';
        ctx.fillRect(0,0,width,height);
        ctx.strokeStyle= "white";
        ctx.strokeRect(0,0,width,height);

        var nx= snake_array[0].x;
        var ny= snake_array[0].y;

        if(dir== 'right')
            nx++;
        else if(dir=='left')
            nx--;
        else if(dir=='up')
            ny--;
        else if(dir=='down')
            ny++;

        //checking collision
        if(nx==-1 || nx>= width/cellWidth || ny==-1 || ny>=height/cellWidth || check_collision(nx, ny, snake_array))
        {
            //init();
            //inserting final score
            $('#final_score').html(score);
            document.getElementById('overlay').style.visibility='visible';
            return;
        }

        if(nx== food.x && ny==food.y)
        {
            var tail={x:nx, y:ny};
            score++;
            create_food();
        }
        else
        {
            var tail= snake_array.pop();
            tail.x= nx;
            tail.y= ny;
        }

        snake_array.unshift(tail);

        for(var i = 0; i< snake_array.length; i++)
        {
            var c= snake_array[i];
            paint_cell(c.x, c.y);
        }
        
        paint_cell(food.x, food.y);
        check_score(score);

        $('#score_update').html("Score:<br>"+ score);

    }


    function paint_cell(x, y)
    {
        ctx.fillStyle= "green";
        ctx.fillRect(x*cellWidth, y*cellWidth, cellWidth, cellWidth);
        ctx.strokeStyle="white";
        ctx.strokeRect(x*cellWidth, y*cellWidth, cellWidth, cellWidth);
        return;
    }

    function check_score(score)
    {   
        if(localStorage.getItem('high_score') == null)
        {
            //if high score not created
            localStorage.setItem('high_score',score);
        }
        else
        {
            if(score > localStorage.getItem('high_score'))
            {
                localStorage.setItem('high_score', score);
            }
        }
        $('#high_score').html("High Score:<br>" + localStorage.getItem('high_score')) ;

    }
});

function reset_highscore()
{
    localStorage.setItem('high_score',0);
}

