$(document).ready(function(){
	$("footer").next("div").addClass("footer_after")
	
	$(function(){
		$(".bg_shoot1>.bg_shoot2>.container").prepend('<canvas id="canvas" width="0" height="300"></canvas>')
		var canvas=$('#canvas')[0];
		var ctx=canvas.getContext('2d');
		ctx.fillRect(0,0,canvas.width,canvas.height);
		var listFire=[];
		var listFirework=[];
		var lights=[];
		var fireNumber=8;
		var center={x:canvas.width/2,y:canvas.height/2};
		var range=100;
		var fired=0;
		var onHold=0;
		var supprise=false;
		var textIndex=0;
		var actions=[
			makeCircleFirework
			,makeFullCircleFirework
			,makeDoubleCircleFirework
			,makeDoubleFullCircleFirework
			,makePlanetCircleFirework
			,makeRandomFirework
		];
		for(var i=0;i<fireNumber;i++){
			var fire={
				x:Math.random()*range/2-range/4+center.x
				,y:Math.random()*range*2.5+canvas.height
				,size:Math.random()+0.5
				,fill:'rgba(0,0,0,0)'
				,vx:Math.random()-0.5
				,vy:-(Math.random()+4)
				,ax:Math.random()*0.06-0.03
				,delay:Math.round(Math.random()*range)+range*4
				,hold:false
				,alpha:1
				,far:Math.random()*range+(center.y-range)
			};
			fire.base={x:fire.x,y:fire.y,vx:fire.vx,vy:fire.vy};
			listFire.push(fire);
		}
		function randColor(){
			var r=Math.floor(Math.random()*256);
			var g=Math.floor(Math.random()*256);
			var b=Math.floor(Math.random()*256);
			var color='rgb($r,$g,$b)';
			color=color.replace('$r',r);
			color=color.replace('$g',g);
			color=color.replace('$b',b);
			return color;
		}
		function makeCircleFirework(fire){
			var color=randColor();
			var velocity=Math.random()*2+6;
			var max=fireNumber*5;
			for(var i=0;i<max;i++){
				var rad=(i*Math.PI*2)/max;
				var firework={
					x:fire.x
					,y:fire.y
					,size:Math.random()+1.5
					,fill:color
					,vx:Math.cos(rad)*velocity+(Math.random()-0.5)*0.5
					,vy:Math.sin(rad)*velocity+(Math.random()-0.5)*0.5
					,ay:0.04
					,alpha:1
					,life:Math.round(Math.random()*range/2)+range/2
				};
				firework.base={life:firework.life,size:firework.size};
				listFirework.push(firework);
			}
			return color;
		}
		function makeFullCircleFirework(fire) {
	    var color = randColor();
	    var velocity = Math.random() * 8 + 8;
	    var max = fireNumber * 3;
	  	for (var i = 0; i < max; i++) {
	      var rad = (i * Math.PI * 2) / max;
	      var firework = {
	        x: fire.x
	        ,y: fire.y
	        ,size: Math.random() + 1.5
	        ,fill: color
	        ,vx: Math.cos(rad) * velocity + (Math.random() - 0.5) * 0.5
	        ,vy: Math.sin(rad) * velocity + (Math.random() - 0.5) * 0.5
	        ,ay: 0.06
	        ,alpha: 1
	        ,life: Math.round(Math.random() * range / 2) + range / 1.5
	      };
	      firework.base = {life: firework.life,size: firework.size};
	      listFirework.push(firework);
	  	}
	  	max = fireNumber * Math.round(Math.random() * 4 + 4);
	  	for (var i = 0; i < max; i++) {
	      var rad = (i * Math.PI * 2) / max;
	      var firework = {
	        x: fire.x
	        ,y: fire.y
	        ,size: Math.random() + 1.5
	        ,fill: color
	        ,vx: Math.cos(rad) * velocity * Math.random()
	        ,vy: Math.sin(rad) * velocity * Math.random()
	        ,ay: 0.06
	        ,alpha: 1
	        ,life: Math.round(Math.random() * range / 2) + range / 1.5
	      };
	      firework.base = {life: firework.life,size: firework.size};
	      listFirework.push(firework);
	  	}
	  	return color;
		}/**/
		function makeDoubleCircleFirework(fire){
			var color=randColor();
			var velocity=Math.random()*2+8;
			var max=fireNumber*3;
			for(var i=0;i<max;i++){
				var rad=(i*Math.PI*2)/max;
				var firework={
					x:fire.x
					,y:fire.y
					,size:Math.random()+1.5
					,fill:color
					,vx:Math.cos(rad)*velocity+(Math.random()-0.5)*0.5
					,vy:Math.sin(rad)*velocity+(Math.random()-0.5)*0.5
					,ay:0.04
					,alpha:1
					,life:Math.round(Math.random()*range/2)+range/1.5
				};
				firework.base={life:firework.life,size:firework.size};
				listFirework.push(firework);
			}
			color=randColor();
			velocity=Math.random()*3+4;
			for(var i=0;i<max;i++){
				var rad=(i*Math.PI*2)/max;
				var firework={
					x:fire.x
					,y:fire.y
					,size:Math.random()+1.5
					,fill:color
					,vx:Math.cos(rad)*velocity+(Math.random()-0.5)*0.5
					,vy:Math.sin(rad)*velocity+(Math.random()-0.5)*0.5
					,ay:0.04
					,alpha:1
					,life:Math.round(Math.random()*range/2)+range/1.5
				};
				firework.base={life:firework.life,size:firework.size};
				listFirework.push(firework);
			}
			return color;
		}/**/
		function makeDoubleFullCircleFirework(fire) {
	    var color = randColor();
	    var velocity = Math.random() * 8 + 8;
	    var max = fireNumber * 3;
	    for (var i = 0; i < max; i++) {
	      var rad = (i * Math.PI * 2) / max;
	      var firework = {
	        x: fire.x
	        ,y: fire.y
	        ,size: Math.random() + 1.5
	        ,fill: color
	        ,vx: Math.cos(rad) * velocity + (Math.random() - 0.5) * 0.5
	        ,vy: Math.sin(rad) * velocity + (Math.random() - 0.5) * 0.5
	        ,ay: 0.04
	        ,alpha: 1
	        ,life: Math.round(Math.random() * range / 2) + range / 1.5
	      };
	      firework.base = {life: firework.life,size: firework.size};
	      listFirework.push(firework);
	  	}
	  	color = randColor();
	  	velocity = Math.random() * 3 + 4;
	  	max = fireNumber * 2;
	  	for (var i = 0; i < max; i++) {
	      var rad = (i * Math.PI * 2) / max;
	      var firework = {
	        x: fire.x
	        ,y: fire.y
	        ,size: Math.random() + 1.5
	        ,fill: color
	        ,vx: Math.cos(rad) * velocity + (Math.random() - 0.5) * 0.5
	        ,vy: Math.sin(rad) * velocity + (Math.random() - 0.5) * 0.5
	        ,ay: 0.06
	        ,alpha: 1
	        ,life: Math.round(Math.random() * range / 2) + range / 1.5
	      };
	      firework.base = {life: firework.life,size: firework.size};
	      listFirework.push(firework);
	  	}
	  	max = fireNumber * 4;
	  	for (var i = 0; i < max; i++) {
	      var rad = (i * Math.PI * 2) / max;
	      var firework = {
	        x: fire.x
	        ,y: fire.y
	        ,size: Math.random() + 1.5
	        ,fill: color
	        ,vx: Math.cos(rad) * velocity * Math.random()
	        ,vy: Math.sin(rad) * velocity * Math.random()
	        ,ay: 0.06
	        ,alpha: 1
	        ,life: Math.round(Math.random() * range / 2) + range / 1.5
	      };
	      firework.base = {life: firework.life,size: firework.size};
	      listFirework.push(firework);
	    }
	    return color;
		}/**/
		function makePlanetCircleFirework(fire) {
	  	var color = '#aa0609';
	  	var velocity = Math.random() * 2 + 4;
	  	var max = fireNumber * 2;
	  	for (var i = 0; i < max; i++) {
	      var rad = (i * Math.PI * 2) / max;
	      var firework = {
	        x: fire.x
	        ,y: fire.y
	        ,size: Math.random() + 1.5
	        ,fill: color
	        ,vx: Math.cos(rad) * velocity + (Math.random() - 0.5) * 0.5
	        ,vy: Math.sin(rad) * velocity + (Math.random() - 0.5) * 0.5
	        ,ay: 0.04
	        ,alpha: 1
	        ,life: Math.round(Math.random() * range / 2) + range / 1.5
	      };
	      firework.base = {life: firework.life,size: firework.size};
	      listFirework.push(firework);
	  	}
	  	max = fireNumber * 4;
	  	for (var i = 0; i < max; i++) {
	      var rad = (i * Math.PI * 2) / max;
	      var firework = {
	        x: fire.x
	        ,y: fire.y
	        ,size: Math.random() + 1.5
	        ,fill: color
	        ,vx: Math.cos(rad) * velocity * Math.random()
	        ,vy: Math.sin(rad) * velocity * Math.random()
	        ,ay: 0.04
	        ,alpha: 1
	        ,life: Math.round(Math.random() * range / 2) + range / 1.5
	      };
	      firework.base = {life: firework.life,size: firework.size};
	      listFirework.push(firework);
	  	}
	    max = fireNumber * 3;
	    color = '#ff9';
	    var rotate = Math.random() * Math.PI * 2;
	    var vx = velocity * (Math.random() + 2);
	    var vy = velocity * 0.6;
	    for (var i = 0; i < max; i++) {
	      var rad = (i * Math.PI * 2) / max;
	      var cx = Math.cos(rad) * vx + (Math.random() - 0.5) * 0.5;
	      var cy = Math.sin(rad) * vy + (Math.random() - 0.5) * 0.5;
	      var firework = {
	        x: fire.x
	        ,y: fire.y
	        ,size: Math.random() + 1.5
	        ,fill: color
	        ,vx: cx * Math.cos(rotate) - cy * Math.sin(rotate)
	        ,vy: cx * Math.sin(rotate) + cy * Math.cos(rotate)
	        ,ay: 0.02
	        ,alpha: 1
	        ,life: Math.round(Math.random() * range / 2) + range / 1.5
	      };
	      firework.base = {life: firework.life,size: firework.size};
	      listFirework.push(firework);
	  	}
	  	return '#aa0609';
		}/**/
		function makeHeartFirework(fire) {
	    var color = randColor();
	    var velocity = Math.random() * 3 + 3;
	    var max = fireNumber * 5;
	    var rotate = Math.random() * Math.PI * 2;
	    for (var i = 0; i < max; i++) {
	      var rad = (i * Math.PI * 2) / max + rotate;
	      var v, p;
	      if (rad - rotate < Math.PI * 0.5) {
	      	p = (rad - rotate) / (Math.PI * 0.5);
	      	v = velocity + velocity * p;
	      } else if (rad - rotate > Math.PI * 0.5 && rad - rotate < Math.PI) {
	        p = (rad - rotate - Math.PI * 0.5) / (Math.PI * 0.5);
	        v = velocity * (2 - p);
	      } else if (rad - rotate > Math.PI && rad - rotate < Math.PI * 1.5) {
	        p = (rad - rotate - Math.PI) / (Math.PI * 0.5);
	        v = velocity * (1 - p);
	      } else if (rad - rotate > Math.PI * 1.5 && rad - rotate < Math.PI * 2) {
	        p = (rad - rotate - Math.PI * 1.5) / (Math.PI * 0.5);
	        v = velocity * p;
	      } else {
	        v = velocity;
	      }
	      v = v + (Math.random() - 0.5) * 0.25;
	      var firework = {
	        x: fire.x
	        ,y: fire.y
	        ,size: Math.random() + 1.5
	        ,fill: color
	        ,vx: Math.cos(rad) * v
	        ,vy: Math.sin(rad) * v
	        ,ay: 0.02
	        ,alpha: 1
	        ,life: Math.round(Math.random() * range / 2) + range / 1.5
	      };
	      firework.base = {life: firework.life,size: firework.size};
	      listFirework.push(firework);
	  	}
	  	return color;
		}/**/
		function makeRandomFirework(fire) {
	  	var color = randColor();
	  	for (var i = 0; i < fireNumber * 5; i++) {
	      var firework = {
	        x: fire.x
	        ,y: fire.y
	        ,size: Math.random() + 1.5
	        ,fill: color
	        ,vx: Math.random() * 15 - 7.5
	        ,vy: Math.random() * -15 + 5
	        ,ay: 0.05
	        ,alpha: 1
	        ,life: Math.round(Math.random() * range / 2) + range / 2
	      };
	      firework.base = {life: firework.life,size: firework.size};
	      listFirework.push(firework);
	  	}
	  	return color;
		}/**/
		var fps=0;
		(function loop(){
			requestAnimationFrame(loop);
			fps++
			if(fps%60==0){console.clear()}
			ctx.clearRect(0,0,canvas.width,canvas.height);
			update();
			draw();
		})();
		function update(){
			for(var i=0;i<listFire.length;i++){
				var fire=listFire[i];
				if(fire.y<=fire.far){
					fired++;
					var color=actions[Math.floor(Math.random()*actions.length)](fire);
					lights.push({x:fire.x,y:fire.y,color:color,radius:range*2});
					fire.y=fire.base.y;
					fire.x=fire.base.x;
					supprise=fired%100==0?true:supprise;
					if(supprise){
						fire.vx=0;
						fire.vy=0;
						fire.ax=0;
						fire.hold=true;
						onHold++;
					}else{
						fire.vx=fire.base.vx;
						fire.vy=fire.base.vy;
						fire.ax=Math.random()*0.06-0.03;
					}
				}
				if(fire.hold&&fire.delay<=0){
					onHold--;
					fire.hold=false;
					fire.delay=Math.round(Math.random()*range)+range*4;
					fire.vx=fire.base.vx;
					fire.vy=fire.base.vy;
					fire.ax=Math.random()*0.06-0.03;
					fire.alpha=1;
				}else if(fire.hold&&fire.delay>0){
					fire.delay-=100;
				}else{
					fire.x+=fire.vx;
					fire.y+=fire.vy;
					fire.vx+=fire.ax;
					fire.alpha=(fire.y-fire.far)/fire.far;
				}
			}
			if(listFirework.length>=fireNumber*2){
				listFirework.splice(0,fireNumber);
			}
			for(var i=listFirework.length-1;i>=0;i--){
				var firework=listFirework[i];
				if(firework){
					firework.vx*=0.9;
					firework.vy*=0.9;
					firework.x+=firework.vx;
					firework.y+=firework.vy;
					firework.vy+=firework.ay;
					firework.alpha=firework.life/firework.base.life;
					firework.size=firework.alpha*firework.base.size;
					firework.alpha=firework.alpha>0.6?1:firework.alpha;
					firework.life--;
					// if(firework.life<=0){
					// 	listFirework.splice(i,1);
					// }
				}
			}
		}
		function draw(){
			ctx.globalCompositeOperation='source-over';
			ctx.globalAlpha=0.2;
			ctx.globalCompositeOperation='screen';
			for(var i=0;i<listFire.length;i++){
				var fire=listFire[i];
				ctx.globalAlpha=fire.alpha;
				ctx.beginPath();
				ctx.arc(fire.x,fire.y,fire.size,0,Math.PI*2);
				ctx.closePath();
				ctx.fill();
			}
			for(var i=0;i<listFirework.length;i++){
				var firework=listFirework[i];
				ctx.globalAlpha=firework.alpha;
				ctx.beginPath();
				ctx.arc(firework.x,firework.y,firework.size,0,Math.PI*2);
				ctx.closePath();
				ctx.fill();
			}
			while(lights.length){
				var light=lights.pop();
				var gradient=ctx.createRadialGradient(light.x,light.y,0,light.x,light.y,light.radius);
				gradient.addColorStop(0,'rgba(255,255,255,1)');
				gradient.addColorStop(0.3,light.color);
				gradient.addColorStop(0.7,'rgba(255,255,255,0.3)');
				gradient.addColorStop(1,'rgba(255,255,255,0.5)');
				ctx.globalAlpha=light.alpha?light.alpha:0.5;
				ctx.fillStyle=gradient;
				// ctx.fillRect(light.x-light.radius,light.y-light.radius,light.radius*2,light.radius*2);
			}
		}
	})
})