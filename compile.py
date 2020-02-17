#!/usr/bin/env python3
import sys, os
import base64
BASE_DIR = os.path.abspath(sys.argv[1])
#Jinja2 is picky about the path format of templates, so
# we need to calculate it relative to our BASE_DIR
infile = os.path.relpath(os.getcwd()+"/"+sys.argv[2],BASE_DIR)
outfile = os.path.abspath(sys.argv[3])

from jinja2 import Environment, FileSystemLoader

import markdown2
extentions=['fenced-code-blocks','tables','toc','strike']

class ContentLoader(FileSystemLoader):
    def get_source(self, environment, template):
        contents, filename, uptodate = super().get_source(environment, template)
        if not template.startswith("templates/"):
            contents = "\n".join((
                "{% extends 'templates/base.html' %}",
                "{% block content %}",
                markdown2.markdown(contents,extras=extentions),
                "{% endblock %}"
            ))
        return contents, filename, uptodate

e = Environment(loader=ContentLoader(BASE_DIR))
e.filters['b64decode'] = base64.b64decode
e.filters['b64encode'] = base64.b64encode

template = e.get_template(infile)

import datetime
from pathlib import Path

context={
    'STATIC_ROOT':Path(sys.argv[1]),
    'now':datetime.datetime.now(),
    'files':Path.cwd(),
    'self_path':infile,
}


with open(outfile,"w+") as output:
    output.write(template.render(context))
