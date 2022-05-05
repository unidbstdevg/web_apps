# from django.shortcuts import render
from django.http import HttpResponse

from .models import TasksList


def hello(req):
    res = "<table>"
    res += "<tr>"
    res += "<th>title</th>"
    res += "<th>desc</th>"
    res += "</tr>"

    for x in TasksList.objects.all():
        new_tr = "<tr>"
        # new_tr += "title: {}, desc: {}<br>".format(x.title, x.desc)
        new_tr += "<td>{}</td>".format(x.title)
        new_tr += "<td>{}</td>".format(x.desc)
        new_tr += "</tr>"

        res += new_tr

    res += "</table>"

    return HttpResponse(res)
