from django.shortcuts import render, redirect
from .models import Category, Country
from newsdataapi import NewsDataApiClient # type: ignore
from .helpers.text_scraper import get_text
from .helpers.summarizer import summarize_text
from django.http import JsonResponse
from accounts.models import Bookmark
from django.contrib.auth.decorators import login_required

API_KEY = 'pub_53900bf1be6129539607e3c087d2cc0b9ed0e'

# Create your views here.
def home(request):
    # Clear session data if present
    request.session.pop('category', None)
    request.session.pop('country', None)

    categories = Category.objects.all()
    
    news_service = NewsDataApiClient(API_KEY)
    news = news_service.news_api(language="en").get('results', [])
    request.session['news'] = news
    
    return render(request, 'home.html', {'AllCategories': categories, 'news': news})


def category(request, category_name):
    # Manage session for category
    if category_name == 'all':
        request.session.pop('category', None)
    else:
        request.session['category'] = category_name

    country = request.session.get('country')
    
    news_service = NewsDataApiClient(API_KEY)
    news = news_service.news_api(category=category_name, country=country, language="en").get('results', [])
    request.session['news'] = news
    
    return render(request, 'home.html', {'category': category_name, 'news': news, 'AllCategories': Category.objects.all()})


def country(request):
    country_searched = request.GET.get('country')
    if country_searched:
        country = Country.objects.filter(name__icontains=country_searched).first()
        if country:
            country_code = country.code
        else:
            country_code = 'us'  # Default to India if country not found
    else:
        country_code = 'us'
    
    request.session['country'] = country_code
    
    category = request.session.get('category')
    
    news_service = NewsDataApiClient(API_KEY)
    news = news_service.news_api(category=category, country=country_code, language="en").get('results', [])
    request.session['news'] = news

    return render(request, 'home.html', {'country': country, 'news': news, 'AllCategories': Category.objects.all()})

def article(request, id):
    news = request.session.get('news')
    if not news:
        return redirect('home') 

    article = next((item for item in news if item['article_id'] == id), None)
    
    if not article:
        return redirect('home')
    
    if request.method == 'POST' and request.user.is_authenticated:
        if not Bookmark.objects.filter(user=request.user, article_id=article['article_id']).exists():
            Bookmark.objects.create(
                user=request.user,
                article_id=article['article_id'],
                title=article['title'],
                link=article['link'],
                pub_date=article['pubDate'],
                image_link=article['image_url']
            )
        return redirect('home')
    
    if request.headers.get('x-requested-with') == 'XMLHttpRequest':
        try:
            text = get_text(article['link'])
            summarized = summarize_text(text)
            return JsonResponse({'summary': summarized})
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)
    
    return render(request, 'article.html', {'article': article})

@login_required
def bookmarks(request):
    bookmarks = Bookmark.objects.filter(user=request.user)
    bookmarks_serializable = list(bookmarks.values('id', 'article_id', 'title', 'link', 'pub_date', 'image_link'))
    request.session['bookmarks'] = bookmarks_serializable
    AllCategories = Category.objects.all()
    return render(request, 'bookmarks.html', {'bookmarks': bookmarks, 'AllCategories': AllCategories})

@login_required
def bookmarked_article(request, id):
    bookmarks = request.session.get('bookmarks')
    if not bookmarks:
        return redirect('home')
    
    article = next((item for item in bookmarks if item['article_id'] == id), None)
    
    if not article:
        return redirect('home')
    
    if request.method == 'POST':
        Bookmark.objects.filter(user=request.user, article_id=id).delete()
        return redirect('bookmarks')
    
    if request.headers.get('x-requested-with') == 'XMLHttpRequest':
        try:
            text = get_text(article['link'])
            summarized = summarize_text(text)
            return JsonResponse({'summary': summarized})
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)
    
    return render(request, 'article.html', {'article': article})