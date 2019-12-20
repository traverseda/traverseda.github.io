cutpoints = [-80: 40: 80];
preview=1;//set to 1 for preview, 0 for build
buildoffset = 100;

//Not user editable
npreview=1-preview;
cutpointlist = [ for (i = cutpoints) i ];

module turbine() {
    linear_extrude(height = 180, center = true, convexity = 10, twist=-180,slices=90)
    translate([0,0,0])import (file = "turbineBladeProfile.dxf");
}

for(idx = [0:len(cutpointlist)-1]){
    cutpoint = cutpointlist[idx];
    translate([idx*buildoffset*npreview,0,cutpoint*preview])
    rotate([0,45*preview,0])
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
    import (file = "turbineBladeProfile.dxf");
    difference(){
        circle(d=20);
        circle(d=8,$fn=6);
    }
}

translate([0,buildoffset*npreview,90*preview])spar_profile();
mirror([0,0,1])%turbine();
translate([0,-buildoffset*npreview,-90*preview])spar_profile();
