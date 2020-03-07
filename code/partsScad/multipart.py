import tempfile, subprocess, sys
from pathlib import Path

partDefinition = 'ECHO: "Defined new part ---",'
tmpf = tempfile.NamedTemporaryFile(suffix=".ast")



out = subprocess.check_output(["openscad", "-o",
                               tmpf.name, sys.argv[1],
                               "-D","multiPartOutput=true",
                               "-D","multiPartFirstRun=true",
                               ])
print(out)
