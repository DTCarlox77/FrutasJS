from django.urls import path
from .views import main, frutas, actualizar_fruta

urlpatterns = [
    path('', main, name='main'),
    path('frutas/', frutas, name='frutas'),
    path('frutas/<int:id>/', actualizar_fruta, name='actualizar')
]
