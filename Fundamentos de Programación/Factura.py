#elabore un programa que lea el nombre, precio unitario, cantidad de tres productos y calcule e imprima en pantalla el valor total a pagar de la factura tomando como base de IVA una tasa del 19%
class Producto:
  precioTotal = 0
  def __init__(self,nombre,precioUnitario,cantidad):
    self.nombre = nombre
    self.precioUnitario = precioUnitario
    self.cantidad = cantidad
    self.precioTotal = precioUnitario * cantidad

class Factura:
  iva = 0.19
  def __init__(self,productos):
    self.productos = productos
    self.precioNeto = 0
    for producto in productos:
      self.precioNeto += producto.precioTotal
    self.precioIva = self.precioNeto + self.precioNeto*self.iva
  def imprimirFactura(self):
    string = "{:^15}"
    print("Factura:\n",string.format("Producto"),   string.format("Precio"),  string.format("Cantidad"),string.format("Total "))
    for producto in self.productos:
      print(string.format(producto.nombre),string.format(producto.precioUnitario),string.format(producto.cantidad),string.format(producto.precioTotal))
      print("--------------------------------------------------------------------------")
    print("\nPrecio Total: ", self.precioNeto)
    print("Precio + Iva 19% ",self.precioIva)

cantidadProductos = 3
productos = []
for i in range(0,cantidadProductos):
  nombre = input("Inserte el Nombre del producto: ")
  precioUnitario = int(input("Inserte el precio Unitario: "))
  cantidad = int(input("Inserte la cantidad: "))
  p = Producto(nombre,precioUnitario,cantidad)
  productos.append(p)
print("\n\n")
factura = Factura(productos)
factura.imprimirFactura()