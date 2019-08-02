//start
var givenNo =0;
var colors = [];
var generate =  function(){
	var number = parseInt($("#number").val());
	givenNo = number;
	var rows = Math.ceil(Math.sqrt(number)) % 2 == 0 ? Math.ceil(Math.sqrt(number))+1 : Math.ceil(Math.sqrt(number));
	//var columns = rows* (rows-1) >= number ? rows-1: rows;
	var columns =  rows;
	var totalWidth = rows*52;
	var totalHeight = columns*52;
	$('#chartDiv').height(totalHeight+"px");
	$('#chartDiv').width(totalWidth+"px");
	//$('#chartDiv').css({'border': '1px solid black'});
	$("#chartDiv").empty();
	var total =0;
	for(var i=0;i<rows;i++){
		for(var j=0;j<columns;j++){
			$("#chartDiv").append("<div id='"+(j+1)+"-"+(i+1)+"' class='element' style='border:1px solid gray ;line-height:50px;width:50px;height:50px;border-radius:0px;float:left;opacity:0;text-align:center;'><h7></h7><span class='tooltiptext'></span></div>");
		}
	}
	var points =[];
	var sides = getSides(number);
	for(var i=1; i<=number; i++){
		var point = getPoint(i, sides);
		points.push(point);
	}
	colors = randomColor({luminosity: 'light',count: number});
	animate(points, 0);
}


var animate = function(points	, count){
			if(count < givenNo)
			$("#"+points[count].x+"-"+points[count].y).animate({
    				opacity: 1,
	 		}, 30, function() {
	 			$("#"+points[count].x+"-"+points[count].y).css('backgroundColor', colors[count]);
				$("#"+points[count].x+"-"+points[count].y+" h7").text(points[count].value);
				$("#"+points[count].x+"-"+points[count].y+" .tooltiptext").text(points[count].noOfPaths);
				$("#"+points[count].x+"-"+points[count].y).attr("paths", points[count].noOfPaths)
				//window.scrollTo($("#"+points[count].x+"-"+points[count].y).offset().left,$("#"+points[count].x+"-"+points[count].y).offset().top );
				animate(points,count+1);

  			});
};

var getSides= function(number){
	var sides = 0;
    for (var i = 1; i <= number / 2; i += 2)
    {
    	if (number <= i * i)
        {
        	sides = i;
            break;
        }
    }
    return sides;
};

document.addEventListener('mouseover', function(event){
	if($(event.srcElement).hasClass('element') && $(event.srcElement).css('opacity') == 1){
		console.log($(event.srcElement).attr('paths'));
		showToolTip($(event.srcElement));		
	}
});

var showToolTip = function($element){

};


var getPoint= function(num, sides){
	var x = Math.ceil(sides / 2);
    var point = new Point(x, x);
	var curentleftCount = 0;
    var curentupCount = 0;
    var curentdownCount = 0;
    var curentrightCount = 0;
	var initialCount = 1;
	var leftCount = 1;
    var upCount = 1;
    var downCount = 2;
    var rightCount = 2;
    var nextOperation = "left";
            while(initialCount < num)
            {
                if(curentleftCount < leftCount && nextOperation == "left")
                {
                    point.left();
                    curentleftCount++;
                    if (curentleftCount == leftCount)
                    {
                        curentleftCount = 0;
                        leftCount += 2;
                        nextOperation = "up";
                    }
                }
                else if (curentupCount < upCount && nextOperation == "up")
                {
                    point.up();
                    curentupCount++;
                    if (curentupCount == upCount)
                    {
                        curentupCount = 0;
                        upCount += 2;
                        nextOperation = "right";
                    }
                }
                else if (curentrightCount < rightCount && nextOperation == "right")
                {
                    point.right();
                    curentrightCount++;
                    if (curentrightCount == rightCount)
                    {
                        curentrightCount = 0;
                        rightCount += 2;
                        nextOperation = "down";
                    }
                }
                
                else if (curentdownCount < downCount && nextOperation == "down")
                {
                    point.down();
                    curentdownCount++;
                    if (curentdownCount == downCount)
                    {
                        curentdownCount = 0;
                        downCount += 2;
                        nextOperation = "left";
                    }
                }
                initialCount++;
            }
            point.noOfPaths = Math.abs(point.x - x)+Math.abs(point.y - x);
            point.value =num;
            return point;
};

var Point = function(x,y){
	this.x = x;
	this.y= y;
	this.value = 0;
	this.noOfPaths = 0;
	this.left= function(){
		this.x += 1;
	};
	this.right = function(){
		this.x -= 1;
	};
	this.up = function(){
		this.y -= 1;
	};
	this.down= function(){
		this.y += 1;
	};
}

