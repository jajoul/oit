from django.urls import path
from .views import Index,PostTermView
urlpatterns = [
    path('',Index.as_view(),name='index'),
    path('post-term/',PostTermView.as_view(),name='post_term'),
]
