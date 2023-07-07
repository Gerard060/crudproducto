import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Producto } from '../clases/producto';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  api_rest:String = "http://localhost:8083/"

  constructor(private http:HttpClient) { }

  listar_productos(){
    
    const url = this.api_rest + 'listar_productos';
    return this.http.get(url);
  }
  

  filtrado_productos(dato:String){
    let url="";
    if(dato.trim()==""){
      url=this.api_rest + "listar_productos";
      return this.http.get(url);
    }
    else{
      url = this.api_rest + "filtrado_productos";
      return this.http.get(`${url}/${dato}`);
    }
  }

  registrar_producto(pro:any){
    const url = this.api_rest + 'nuevo_producto';
    return this.http.post(url, pro);
  }

  modificar_producto(pro:Producto){
    const url = this.api_rest + "modificar_producto";
    return this.http.put<Producto>(url,pro);
  }

  eliminar_producto(id_producto:number){
    const url = this.api_rest + "eliminar_producto";
    return this.http.delete(`${url}/${id_producto}`);
  }

  // listarProductosPaginado(page: number = 0, size: number = 10): void {
  //   const url = this.api_rest + "/listar_productos_paginado";
  //   this.http.get<Producto>(url).subscribe((response) => {
  //     return this.http.get(url);
  //   });
  // }
}
