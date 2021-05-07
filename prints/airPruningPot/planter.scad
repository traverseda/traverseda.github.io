//Top Diameter
base2=108;  //  [20:1:500]
// Bottom Diameter
base1=93;  //  [20:1:500]
//height
planter_height=100;  //  [20:1:1000]

//bar diameter (probably don't change this unless you're making something really big)
barD = 5; // [20]

module ring(d,barD=5){
    c = PI*d;
    bar_count=floor(c/barD);
     for(i = [0 : bar_count/2]){
         rotate(360/bar_count*i*2)translate([(d-barD)/2,0])circle(d=barD,$fn=6);
     }
}

module floorGrid(d1,barD){
      for(x = [0 : floor(d1/barD)]){
            translate([x*barD*1.5,0,barD/2-1])
            rotate([-90,0,0])
            rotate(90){
                cylinder(d=barD,h=d1,$fn=6);
            }
        }
}

module planter(d1,d2,h,barD=5){
    scale_factor = d2/d1;
    linear_extrude(height=h,twist=h,slices=h/4,scale=scale_factor)ring(d=d1,barD=barD);
    linear_extrude(height=h,twist=-h,slices=h/4,scale=scale_factor)ring(d=d1,barD=barD);
    intersection(){
        cylinder(d=d1,h=4);
        union(){
        rotate(90)        translate([-d1/2,-d1/2])floorGrid(d1,barD);
        translate([-d1/2,-d1/2]){
            floorGrid(d1,barD);
        }
    }


    }
    difference(){
        cylinder(d=d1,h=4);
        cylinder(d=d1-barD*2,h=9,center=true);

    }
    translate([0,0,h-4]){
        difference(){
            cylinder(d2=d2+4,d1=d2-barD,h=4);
            cylinder(d=d2-barD*2,h=20,center=true);
        }
    }
}


planter(base1,base2,planter_height,barD=barD);
