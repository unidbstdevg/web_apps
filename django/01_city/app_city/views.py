from django.shortcuts import render
from .models import City


def index(request):
    cities = City.objects.all()

    context = {
        'cities': cities,
    }

    return render(request, 'app_city/index.html', context)
