    var world = (window.innerWidth < 360 ? window.innerWidth : 360);
    var scl = (world / 5) || 70;
    var ready = 0;
    var done = false;
    var score = 0;
    var colr, colg, colb= 0;
    var scrollx = 0;
    var lock = [
    [1,1,1,1,1],
    [1,1,1,1,1],
    [1,1,1,1,1],
    [1,1,1,1,1],
    [1,1,1,1,1]
    ];
    var keys = [
    [0,0,0,0,0],
    [0,0,0,0,0],
    [0,0,0,0,0],
    [0,0,0,0,0],
    [0,0,0,0,0]
    ];
    var temp = {x: 5, y: 5};
    
function setup() {
    createCanvas(world, world);
    colorMode(RGB);
    fill(0,0,0);
    rect(0,0,world,world);
    $("#reset").css({"top": (world)+10, "left": (world)/5.5});
    if (window.innerWidth >= 360) {
        $("#reset").css("width", 180);
        $("#peek").css("right", (window.innerWidth-360));
    }
    $("#solved").css({"top": (world)+60, "left": (world)/55});
    $("#colorcode").css({"top": (world)+90, "left": (world)/65});
    $("#hint").css({"width": (world)+"px", "height": (world)+"px", "font-size": (world*0.17)+"px"});
}

function draw() {
    window.onresize = function () {
        world = (window.innerWidth < 360 ? window.innerWidth : 360);
        scl = (world / 5) || 70;
				$("#peek").css("float", "left");
    };
    
    if (ready === 0){
    fill(255,255,255);
    textSize(26);
    textFont("monospace");
    text("Pattern Tiles",75, 170);
    textSize(18);
    fill(127,127,127);
    text("tap to play",115,210);
    } else if (ready == 1) {
       fill(0,0,0);
       rect(0,0,world,world);
       fill(255,255,255);
       text("memorize & repeat the pattern",20,170);
       fill(127,127,127);
       text("tap to continue",100,210);
    } else if (ready == 2 && !done) {
    lock = [
    [1,1,1,1,1],
    [1,1,1,1,1],
    [1,1,1,1,1],
    [1,1,1,1,1],
    [1,1,1,1,1]
    ];
    colr = Math.round(200*Math.random());
    colg = Math.round(200*Math.random());
    colb = Math.round(200*Math.random());
    
    $("#colorcode").html("RGB COLOR: " + colr + ", " + colg + ", " + colb);
    $("#hint").css("color", "rgb("+ (colr+51) + ", " + (colg+51) + ", " + (colb+51) + ")");
    
    for (i = 0; i < lock.length; i++){
        for (j = 0; j < lock[i].length; j++){
        var r = Math.round(Math.random());
        if (r) {
           lock[i][j] = 0;
           fill(255,255,255);
           stroke(colr, colg, colb);
        } else {
           fill(colr, colg, colb);
           stroke(255,255,255);
        }
           rect(i*scl,j*scl,scl,scl);
        }
       }
       keys = [
        [0,0,0,0,0],
        [0,0,0,0,0],
        [0,0,0,0,0],
        [0,0,0,0,0],
        [0,0,0,0,0]
        ];
       done = true;
    } else if (ready == 2 && done){
        fill(255,255,255);
        rect(0,0,world,world);
        for (i = 0; i < lock.length; i++){
        for (j = 0; j < lock[i].length; j++){
        if (lock[i][j] === 0) {
           fill(255,255,255);
           stroke(colr, colg, colb);
        } else {
           fill(colr, colg, colb);
           stroke(255,255,255);
        }
           rect(i*scl,j*scl,scl,scl);
        }
       }
        fill(0,0,0);
        noStroke();
        textSize(20);
        text("tap to continue", scrollx, world-40);
        ++scrollx;
        if(scrollx >= world) {
            scrollx = -150;
        }
    } else if (ready == 3){
        fill(255,255,255);
        rect(0,0,world,world);
        for (k = 0; k < keys.length; k++){
        for (l = 0; l < keys[k].length; l++){
        if (keys[k][l] === 0) {
            fill(255,255,255);
            stroke(colr, colg, colb);
        } else {
            fill(colr, colg, colb);
            stroke(255,255,255);
        }
           rect(k*scl,l*scl,scl,scl);
        }
        }
    } else if (ready == 4) {
       fill(0,0,0);
       rect(0,0,world,world);
       textSize(36);
       fill(255,255,255);
       noStroke();
       text("well done :)", 45, 180);
       textSize(18);
       fill(127,127,127);
       text("tap to play again", 85, 230);
       fill(255,255,255);
    }
}
    
    function mouseClicked() {
    if (mouseX < world && mouseY < world) {
       if (ready === 0) {
          $("#solved").html("");
          $("#colorcode").html("");
          $("#hint").html("");
          $("#hint").css("opacity", "0");
          ready = 1; 
       } else if (ready == 1){
          $("#solved").html("");
          $("#colorcode").html("");
          $("#hint").html("");
          $("#hint").css("opacity", "0");
          ready = 2; 
       } else if (ready == 2){
          ready = 3;
          scrollx = 100;
       } else if (ready == 3){
         var pick = {x: mouseX, y: mouseY};
         for (i = 0; i < world; i++){
         if (pick.x == i && pick.x <world) {
         temp.x = Math.floor(i/scl);
         for (j = 0; j < world; j++){
         if (pick.y == j && pick.y <world){
         temp.y = Math.floor(j/scl);
         }
         }
         }
         }
             if (keys[temp.x][temp.y] == 1 && !null) {
                keys[temp.x][temp.y] = 0; 
           } else if (keys[temp.x][temp.y] == 0 && !null) {
                keys[temp.x][temp.y] = 1;
        }
        temp.x = 5;
        temp.y = 5;
        if (JSON.stringify(keys) == JSON.stringify(lock)) {
           $("#hint").html("");
           if ($("#hint").css("opacity") == 0) {
           ++score;
           }
           $("#hint").css("opacity", "0"); 
           solved();
           ready = 4;
        }
      } else if (ready == 4) {
         done = false;
         ready = 2;
         fill(0,0,0);
         rect(0,0,world,world);
      }
      }
      if (mouseX < world-40 && mouseY > world+10 && mouseY < (world+50)) {
      $("#hint").html("");
      $("#hint").css("opacity", "0");
      $("#reset").stop();
      $("#reset").clearQueue();
         done = false;
         ready = 2;
         fill(0,0,0);
         rect(0,0,world,world);
      }
      
      if (mouseX > world-40 && mouseY > world+10 && mouseY < (world+50) && ready == 3) {
      $("#hint").html(lock.join(" ").replace(/,/g , " ") .replace(/1/g , "X") .replace(/0/g , "O") );
      if ($("#hint").css("opacity") != 1) {
      $("#hint").css("opacity", "1");
      } /*else {
           $("#hint").css("opacity", "0");
      }*/
      }
    
      }
      
      function solved() {
          if (score == 1) {
              $("#solved").html("YOU SOLVED <b>" + score + "</b> PATTERN");
         } else {
              $("#solved").html("YOU SOLVED <b>" + score + "</b> PATTERNS");
         }
      }