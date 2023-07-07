export class Producto{
    id_producto:number=0;
    nombre:String="";
    descripcion:String="";
    stock:number=0;
    precio:number=0.0;
    constructor(id_producto:number,nombre:String,descripcion:String,stock:number,precio:number){
        this.id_producto = id_producto;
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.stock = stock;
        this.precio = precio;
    }
}