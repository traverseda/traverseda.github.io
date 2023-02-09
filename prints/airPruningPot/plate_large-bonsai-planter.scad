$fn=128;

difference(){
    linear_extrude(height=40,scale=[1.1,1.1]){
        circle(d=190);
        translate([-190/2+5,0,0])circle(d=40);
    }
    translate([0,0,2])linear_extrude(height=40,scale=[1.1,1.1]){
        circle(d=185);
        translate([-190/2+5,0,0])circle(d=36);
    }
}

intersection(){
    translate([0,0,2])linear_extrude(height=40,scale=[1.1,1.1])circle(d=185);
    linear_extrude(height=35,scale=[0.9,0.9]){
        circle(d=20);
        for(i = [1 : 5]){
         rotate(360/5*i)translate([208/2+15,0])circle(d=40);
        }
    }
}

*translate([0,0,15])import("large-bonsai-planter.stl");
