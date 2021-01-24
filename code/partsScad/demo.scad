include <partsScad.scad>;

part("rube.stl",c="red"){
    cube([10,10,10]);
}

translate([5,5,10])
part("blegg.stl",c="blue"){
    resize([10,10,20])sphere(r=10);
}
