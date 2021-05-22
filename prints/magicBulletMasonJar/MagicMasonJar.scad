use <round_threads.scad>;

translate([0,0,13])difference(){
    union(){
        linear_extrude(height=2.2){
            circle(d=88.5);
            //tab
            for (i = [1:3]){
                rotate(360/3*i)translate([0,88.5/2+2,0])square([5.5,5],center=true);
            }
        }
        round_threads(diam=80,thread_diam=1.6, pitch=2.5,thread_length=12);
    }
    round_threads(diam=71,thread_diam=3, pitch= 0.25 * 25.4,thread_length=16,groove=true);
}

linear_extrude(height=10)difference(){
    union(){
        circle(d=88.5);
        for (i = [1:6]){
            rotate(360/6*i)translate([0,88.5/2,0])circle(d=20);
        }
    }
    circle(d=80);
}

difference(){
    cylinder(d=88.5,h=13);
    cylinder(d=80,h=13);
}