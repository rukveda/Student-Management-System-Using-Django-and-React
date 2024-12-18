# SchoolProject/urls.py
from django.urls import re_path
from StudentApp import views

urlpatterns = [
    re_path(r'^student$', views.studentApi),
    re_path(r'^student/([0-9]+)$', views.studentApi),
    # Remove or comment out the line below if you don't need the 'home' view
    # re_path(r'^home/$', views.home, name='home'),
]
