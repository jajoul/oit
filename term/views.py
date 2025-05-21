from django.shortcuts import render, redirect
from django.views.generic import ListView, View
from .models import Term, Category, Tag, Author
from .dependencies import RandomData
# Create your views here.
class Index(ListView):
    model = Term
    template_name = 'term/index.html'
    context_object_name = 'terms'
    ordering = ['-created_at']  # Show newest first
    paginate_by = 10  # Show 10 terms per page

class PostTermView(View):
    def get(self, request):
        author = RandomData().get_random_data()
        categories = Category.objects.all()
        tags = Tag.objects.all()
        return render(request, 'term/post_term.html', {'author': author, 'categories': categories, 'tags': tags})

    def post(self, request):
        term_text = request.POST.get('term')
        author_name = request.POST.get('author')
        category_name = request.POST.get('category')
        tags_input = request.POST.get('tags', '')
        
        if not term_text or not author_name:
            return redirect('index')
            
        # Get or create author
        author, created = Author.objects.get_or_create(name=author_name)
        
        # Get category
        category = Category.objects.get(name=category_name) if category_name else None
        
        # Create the term (without tags first)
        term = Term.objects.create(
            term=term_text,
            author=author,
            category=category
        )
        # Parse and add tags
        tag_names = [t.strip() for t in tags_input.split(',') if t.strip()]
        tag_objs = []
        for tag_name in tag_names:
            tag_obj, _ = Tag.objects.get_or_create(name=tag_name)
            tag_objs.append(tag_obj)
        if tag_objs:
            term.tags.set(tag_objs)
        
        return redirect('index')