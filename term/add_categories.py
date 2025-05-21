import os
import sys
import django

# Add the project root to sys.path
PROJECT_ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
if PROJECT_ROOT not in sys.path:
    sys.path.insert(0, PROJECT_ROOT)

# Set up Django environment
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'openinterminal.settings')
django.setup()

from term.models import Category

def create_categories():
    # List of categories to create
    categories = [
        "Programming",
        'social',
        'gaming',
        'health',
        'finance',
        'travel',
        'food',
        'music',
        'sports',
        'beauty',
        'fitness',
        'lifestyle',
        'education',
        'entertainment',
        'health',
        'lifestyle',
        'music',
        'news',
        'politics',
        'science',
        'sports',
        'technology',
        'travel',
        'weather',
        'world',
        'gaming',
        'health',

    ]
    
    # Create categories
    created_categories = []
    for category_name in categories:
        cats=Category.objects.all()
        if category_name in cats:
            continue

        category, created = Category.objects.get_or_create(name=category_name)
        if created:
            created_categories.append(category_name)
    
    return created_categories

if __name__ == "__main__":
    create_categories()
    print("Categories created successfully.")
