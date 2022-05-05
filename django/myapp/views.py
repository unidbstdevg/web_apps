from django.shortcuts import render
from django.http import HttpResponse

from .models import Task


def index(request):
    todoList = Task.objects.all()

    context = {
        'todoList': todoList,
    }

    return render(request, 'myapp/index.html', context)
