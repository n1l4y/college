from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Bookmark(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='bookmarks')
    article_id = models.CharField(max_length=255)
    title = models.CharField(max_length=255)
    link = models.URLField()
    pub_date = models.CharField(max_length=100)
    image_link = models.URLField()

    def __str__(self):
        return self.title