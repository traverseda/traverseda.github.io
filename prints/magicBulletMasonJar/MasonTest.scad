use <round_threads.scad>;

difference(){
    cylinder(h=16,d=75);
    round_threads(diam=71,thread_diam=3, pitch= 0.25 * 25.4,thread_length=16,groove=true);
}
