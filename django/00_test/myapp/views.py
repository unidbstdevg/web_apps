from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt

from .models import Task


def index(request):
    todoList = Task.objects.all()

    context = {
        'todoList': todoList,
    }

    return render(request, 'myapp/index.html', context)


@csrf_exempt
def api_tasks_list(request):
    lst = []

    for x in Task.objects.all():
        item = {"id": x.id, "name": x.title}
        lst.append(item)

    return JsonResponse(lst, safe=False)


@csrf_exempt
def api_tasks_add(request):
    new_task = Task(title=request.POST["task_name"], desc="")
    Task.save(new_task)

    return HttpResponse("Ok")


@csrf_exempt
def api_tasks_delete(request):
    Task.objects.filter(id=request.POST["task_id"]).delete()

    return HttpResponse("Ok")


@csrf_exempt
def api_tasks_edit(request):
    Task.objects.filter(id=request.POST["task_id"]).update(
        title=request.POST["new_task_name"])

    return HttpResponse("Ok")
