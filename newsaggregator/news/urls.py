from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name='home'),
    path('category/<str:category_name>/', views.category, name='category'),
    path('country/', views.country, name='search_country'),
    path('article/<str:id>', views.article, name='article'),
    path('bookmarks/', views.bookmarks, name='bookmarks'),
    path('bookmarks/<str:id>', views.bookmarked_article, name='bookmarked_article'),
]
