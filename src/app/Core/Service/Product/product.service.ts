import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreateProduct, IProduct, UpdateProduct } from '../../Interface/Product.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private readonly http: HttpClient) { }


  //Obtener todos los productos
  getAllProduct(): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(``);
  }

  //Obtener un producto por id
  getProductById(id: number): Observable<IProduct> {
    return this.http.get<IProduct>(``);
  }

  //Crear un producto
  createProduct(paylod: CreateProduct): Observable<IProduct> {
    return this.http.post<IProduct>(
      ``,
      paylod
    )
  }

  //Actualizar un producto
  updateProductById(
    id: number,
    paylod: UpdateProduct
  ): Observable<IProduct> {
    
    return this.http.put<IProduct>(
      ``,
      paylod
    )
  }

  //Borrar un producto
  deleteProduct(id: number) {
    return this.http.delete(``)
  }

}
