package com.example.demo.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.model.Producto;
import com.example.demo.repository.ProductoRepository;

@CrossOrigin(origins = "*")
@RestController
public class ProductoController {
	@Autowired private ProductoRepository data;
	
	@GetMapping("/listar_productos")
	public List<Producto> listado(){
		return data.findAll();
	}
	
	
	@GetMapping("/filtrado_productos/{id_producto}")
	public List <Producto> filtrado(@PathVariable CharSequence id_producto){ //Cambiar el String a int por si da error
		List<Producto> lista = data.findAll();
		List<Producto> lista2 = new ArrayList<>();
		for (Producto prod : lista) {
			if(prod.getNombre().contains(id_producto) || prod.getDescripcion().contains(id_producto)) {
				lista2.add(prod);
			}
		}
		return lista2;
	}
	
	
	@PostMapping("/nuevo_producto")
	public Producto registrar(@RequestBody Producto p) {
			return data.save(p);
	}
	
	
	@PutMapping("/modificar_producto")
	public Producto modificar(@RequestBody Producto p) {
		//Si existe el codigo del producto lo actualizamos
		if(data.existsById(p.getId_producto()))
			return data.save(p);
		else
			return null;
	}

	
	@DeleteMapping("/eliminar_producto/{id_producto}")
	public Map<String,Boolean> eliminar(@PathVariable int id_producto){
		Map<String,Boolean> rpta = new HashMap<>();
		if(data.existsById(id_producto)) {
			data.deleteById(id_producto);
			rpta.put("delete", true);
		}
		else
			rpta.put("delete", false);
		return rpta;
	}

}
