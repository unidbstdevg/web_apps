from django.db import models


class TasksList(models.Model):
    title = models.CharField(max_length=50)
    desc = models.CharField(max_length=50)


# Create your models here.
