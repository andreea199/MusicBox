function View(canvas) {
    this.canvas = canvas;
    this.clicks = [];
    this.frameRate = 1000 / 30;
    this.maxRadius=100;
    this.loopRate = 4000; //4 sec delay. how often do we reset each circle radius back to 0
}

View.prototype.handleClick = function(event) {
    var view = this;
    var x = event.offsetX;
    var y = event.offsetY;
    //this is where we push the circle obj to the circle array
    var pos = view.clicks.push({x: x, y: y, radius: 0}); //initial circle won't be seen
    console.log("circle add at ",x,", ", y);
    Audio.play(x%10); //

    setInterval(function(){ //make the circles animation to repeat
        view.clicks[pos-1].radius = 0;//each 4 seconds will reset circle radius to 0
        Audio.play(x%10); //sound plays whenever the circle appears at the canvas
    }, view.loopRate);
};

View.prototype.updateDisplay = function() {
    var view = this;
    var context = view.canvas.getContext("2d");
    context.clearRect(0, 0, view.canvas.width, view.canvas.height);
    context.fillStyle = 'black'; //background of the canvas
    context.fillRect(0, 0, view.canvas.width, view.canvas.height);

    for (var i = 0; i < view.clicks.length; i++) {
        var circle = view.clicks[i];
        if(circle.radius > view.maxRadius) continue; //if any circle has radius > 80 it won't be drawn (disappears)
        circle.radius += 1; //else radius +1 every time i call update display, it will grow by 1
        var alpha = .7;
        if(circle.radius > (view.maxRadius - 90)){ //when the circles get close to max size
            alpha = (view.maxRadius - circle.radius) / 40; //change the opacity, get more opac
        }
        view.drawCircle(context, circle.x, circle.y, circle.radius, alpha);
    }
};

View.prototype.drawCircle = function(context, x, y, radius, alpha) { //alpha = opacitate
    context.beginPath();
    context.arc(x, y, radius, 0, 2*Math.PI);
    context.fillStyle = "rgba(" + x%256 + ", " + y%256  + ", " + (x * y % 256)+ " ," + alpha + ")";// how the colors of the circles will change
    context.fill();
};