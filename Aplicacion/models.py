from django.db import models

# Create your models here.
class Fruta(models.Model):
    nombre = models.CharField(max_length=50)
    precio = models.DecimalField(max_digits=10, decimal_places=2)
    
    def serialize(self):
        return {
            'id' : self.id,
            'nombre' : self.nombre,
            'precio' : self.precio
        }
        
    def  __str__(self) -> str:
        return self.nombre
    