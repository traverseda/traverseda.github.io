import sys
argv = sys.argv
infile, outfile = argv[argv.index("--") + 1:]

import bpy
bpy.ops.wm.read_factory_settings(use_empty=True)
bpy.ops.import_mesh.stl(filepath=infile)
material = bpy.data.materials.new(name="base")
material.use_nodes = True
principled_bsdf = material.node_tree.nodes['Principled BSDF']
principled_bsdf.inputs[0].default_value = (0.01, 0.2, 0.0, 0.01)
for o in bpy.context.editable_objects:
    o.data.materials.append(material)
    print(o.data)
bpy.ops.export_scene.gltf(filepath=outfile)
