import tempfile, subprocess, sys
from pathlib import Path

partDefinition = 'ECHO: "Defined new part ---",'
tmpf = tempfile.NamedTemporaryFile(suffix=".ast")


out = subprocess.run(["openscad", "-o",
                               tmpf.name, sys.argv[1],
                               "-D","multiPartOutput=true",
                               "-D","multiPartFirstRun=true",
                               ],
                     stdout=subprocess.PIPE,
                     stderr=subprocess.PIPE,
                     encoding="utf-8"
                     )

parts=set()
for line in out.stderr.splitlines():
    if line.startswith(partDefinition):
        parts.add(line.removeprefix(partDefinition).strip().strip('"'))

print(f"Found these parts: {parts}")

for part in parts:
    print(f"Generating \033[92m{part}\033[0m")
    subprocess.run(["openscad", "-o",
                    part, sys.argv[1],
                    "-D",f'multiPartOutput="{part}"'
                    ])
