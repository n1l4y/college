from django.core.management.base import BaseCommand
from news.models import Country, Category

class Command(BaseCommand):
    help = 'Populate the Country model with predefined country codes and names'

    def handle(self, *args, **kwargs):
        countries = [
            ('AE', 'United Arab Emirates'),
            ('AR', 'Argentina'),
            ('AT', 'Austria'),
            ('AU', 'Australia'),
            ('BE', 'Belgium'),
            ('BG', 'Bulgaria'),
            ('BR', 'Brazil'),
            ('CA', 'Canada'),
            ('CH', 'Switzerland'),
            ('CN', 'China'),
            ('CO', 'Colombia'),
            ('CU', 'Cuba'),
            ('CZ', 'Czech Republic'),
            ('DE', 'Germany'),
            ('EG', 'Egypt'),
            ('FR', 'France'),
            ('GB', 'United Kingdom'),
            ('GR', 'Greece'),
            ('HK', 'Hong Kong'),
            ('HU', 'Hungary'),
            ('ID', 'Indonesia'),
            ('IE', 'Ireland'),
            ('IL', 'Israel'),
            ('IN', 'India'),
            ('IT', 'Italy'),
            ('JP', 'Japan'),
            ('KR', 'South Korea'),
            ('LT', 'Lithuania'),
            ('LV', 'Latvia'),
            ('MA', 'Morocco'),
            ('MX', 'Mexico'),
            ('MY', 'Malaysia'),
            ('NG', 'Nigeria'),
            ('NL', 'Netherlands'),
            ('NO', 'Norway'),
            ('NZ', 'New Zealand'),
            ('PH', 'Philippines'),
            ('PL', 'Poland'),
            ('PT', 'Portugal'),
            ('RO', 'Romania'),
            ('RS', 'Serbia'),
            ('RU', 'Russia'),
            ('SA', 'Saudi Arabia'),
            ('SE', 'Sweden'),
            ('SG', 'Singapore'),
            ('SI', 'Slovenia'),
            ('SK', 'Slovakia'),
            ('TH', 'Thailand'),
            ('TR', 'Turkey'),
            ('TW', 'Taiwan'),
            ('UA', 'Ukraine'),
            ('US', 'United States'),
            ('VE', 'Venezuela'),
            ('ZA', 'South Africa')
        ]

        categories = [
            'business',
            'entertainment',
            'general',
            'health',
            'science',
            'sports',
            'technology'
        ]
        
        for code, name in countries:
            Country.objects.get_or_create(code=code, name=name)
        
        for category in categories:
            Category.objects.get_or_create(name=category)
        
        self.stdout.write(self.style.SUCCESS('Successfully populated countries'))