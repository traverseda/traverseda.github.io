cutpoints = [-80: 40: 80];


module turbine() {
    linear_extrude(height = 180, center = true, convexity = 10, twist=-180,slices=90)
    translate([0,0,0])import (file = "turbine.dxf");
}

for(cutpoint = cutpoints){
    translate([0,0,cutpoint])
    rotate([0,45,0])
    projection(cut = true)
    rotate([0,45,0])
    translate([0,0,cutpoint])
    union(){
        turbine();
        difference(){
            translate([0,0,-180/2])cylinder(d=20,h=180);
            translate([0,0,-180/2])cylinder(d=8,h=180,$fn=6);
        }
    }
}

module spar_profile(){
    import (file = "turbine.dxf");
    difference(){
        circle(d=20);
        circle(d=8,$fn=6);
    }
}

translate([0,0,90])spar_profile();
mirror([0,0,1])%turbine();
translate([0,0,-90])spar_profile();
