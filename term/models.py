
from os import name
from django.db import models


# Create your models here.
class Category(models.Model):
    name=models.CharField(max_length=100)
class Tag(models.Model):
    name=models.CharField(max_length=100)
class Author(models.Model):
    name=models.CharField(max_length=100)

class Reply(models.Model):
    author=models.ForeignKey(Author,on_delete=models.CASCADE,related_name='replies')
    term=models.TextField()
    created_at=models.DateTimeField(auto_now_add=True)
class Term(models.Model):
    author=models.ForeignKey(Author,on_delete=models.CASCADE,related_name='terms')
    term=models.TextField()
    created_at=models.DateTimeField(auto_now_add=True)
    replies=models.ManyToManyField('Reply',related_name='terms',blank=True)
    category=models.ForeignKey(Category,on_delete=models.CASCADE,related_name='terms',null=True,blank=True)
    tags=models.ManyToManyField(Tag,related_name='terms',null=True,blank=True)

    def __str__(self):
        return f'{self.id} - {self.author}'
