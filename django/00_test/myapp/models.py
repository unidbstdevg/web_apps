from django.db import models


class Task(models.Model):
    id = models.IntegerField(primary_key=True)
    title = models.CharField(max_length=50)
    desc = models.CharField(max_length=50)


class Category(models.Model):
    name = models.CharField(max_length=50)
