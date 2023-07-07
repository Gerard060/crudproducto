import { Component } from '@angular/core';
import { Producto } from 'src/app/clases/producto';
import { ProductoService } from 'src/app/servicios/producto.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent {


  

  public productos:any;
  
  id_producto:number=0;
  nombre:String="";
  descripcion:String="";
  stock:number=0;
  precio:number=0.0;
  busqueda:String="";
  p: number = 1;
  pageSize: number = 2;

  

  constructor(private prod:ProductoService,private router:Router){
    this.mostrar();

  }

  
  
  mostrar(){
    this.prod.listar_productos().subscribe((response:any)=>{
      this.productos = response;
    });
  }
    

  filtrado(){
    console.log(this.busqueda);
    this.prod.filtrado_productos(this.busqueda).subscribe((response:any)=>{
      this.productos = response;
    });
  }

  agregar(){

    let productos = {'nombre':this.nombre,'descripcion':this.descripcion,
        'stock':this.stock,'precio':this.precio};
    this.prod.registrar_producto(productos).subscribe((response)=>
                                  {console.log(response);
                                  this.mostrar();
                                }
                                );

  }

  nuevo(){
    this.id_producto=0;
    this.nombre="";
    this.descripcion="";
    this.stock=0;
    this.precio=0.0;
  }


  modificar(){
    if(this.id_producto==0 || this.nombre=="" || this.descripcion=="" || this.stock==0 || this.precio==0.0){
      alert("Verificar Datos");
    }else{
      let p = new Producto(this.id_producto,this.nombre,this.descripcion,this.stock,this.precio);
      this.prod.modificar_producto(p).subscribe((response)=>
      {
        this.nuevo();
        this.mostrar();
      }
      );
    }
    
  }

  eliminar(){
    if(this.id_producto==0){
      alert("Verificar producto a eliminar");
    }else{
      this.prod.eliminar_producto(this.id_producto).subscribe(
        (response)=>
        {console.log(response);
        this.nuevo();
      this.mostrar();
    }
      );
    }
  }


  seleccionar(p:Producto){
    this.id_producto = p.id_producto;
    this.nombre = p.nombre;
    this.descripcion = p.descripcion;
    this.stock = p.stock;
    this.precio = p.precio;
  }


  // listarProductosPaginado(page: number = 0, size: number = 10): void {
  //   this.prod.listarProductosPaginado(page, size).subscribe((response:any) => {
  //       this.productos = response; 
  //     });
  // }
}