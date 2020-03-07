/*This is a module for openscad to be able to output multiple parts
It pairs with a python script that actually managed the multi-output.
*/
multiPartOutput=false;
multiPartFirstrun=false;
multiPartBuildmode="default";

module part(partName,c=undef,buildmode="default"){
    if (multiPartFirstrun){
        echo("Defined new part ---", partName);
        echo("Color ---", partName, c);
    }
    if (buildmode==multiPartBuildmode){
        if (!multiPartOutput) color(c=c)children();
        if (multiPartOutput==partName) color(c=c)children();
    }
}
