from django.urls import include, path

urlpatterns = [
    path('', include("allauth.account.urls"))
]