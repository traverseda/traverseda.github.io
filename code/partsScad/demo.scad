include <partsScad.scad>;

part("rube.stl",c="red",buildmode="default"){
    cube([10,10,10]);
}

translate([5,5,10])
part("blegg.stl",c="blue",buildmode="default"){
    resize([10,10,20])sphere(r=10);
}

