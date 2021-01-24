wget --spider -r -nd -nv  http://localhost:8000 -o /dev/stdout  | grep -B1 'broken link!'
