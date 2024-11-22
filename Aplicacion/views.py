from django.shortcuts import render
from django.http import JsonResponse
import json
from .models import Fruta
from django.views.decorators.csrf import csrf_exempt

# Create your views here.
def main(request):
    
    
    return render(request, 'main.html')

@csrf_exempt
def frutas(request):
    
    if request.method == 'POST':
        
        data = json.loads(request.body)
        try:
            fruta = Fruta.objects.create(nombre=data['nombre'], precio=data['precio'])
            return JsonResponse({'message' : 'Fruta agregada exitosamente'}, status=201)
        except:
            return JsonResponse({'message' : 'Error al almacenar la fruta' }, status=402)
        
    if request.method == 'GET':
        
        frutas = Fruta.objects.all()
        
        # # Versión 1: Sin listas de comprensión
        # serialized_data = []
        # for fruta in frutas:
        #     serialized_data.append(fruta.serialize())
        
        # Versión 2: Usando listas de comprensión
        serialized_data = [ fruta.serialize() for fruta in frutas ]
        return JsonResponse({
            'frutas' : serialized_data 
        }, status=200)
        
@csrf_exempt
def actualizar_fruta(request, id):
    
    fruta = Fruta.objects.get(id=id)
    
    if request.method == 'PUT':
        data = json.loads(request.body)
        fruta.nombre = data['nombre']
        fruta.precio = data['precio']
        fruta.save()
        return JsonResponse({'message': 'Fruta encontrada'}, status=200)
    
    return JsonResponse({'message' : 'Error al almacenar la fruta' }, status=402)