import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreateProduct, IProduct, UpdateProduct } from '../../Interface/Product.interface';
import { BASE_API_URL } from '../../Const';


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private readonly http: HttpClient) { }


  //Obtener todos los productos
  getAllProducts(): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(`${BASE_API_URL}Productos`);
  }

  //Obtener un producto por id
  getProductById(id: number): Observable<IProduct> {
    return this.http.get<IProduct>(`${BASE_API_URL}Productos/${id}`);
  }

  //Crear un producto
  createProduct(paylod: CreateProduct): Observable<IProduct> {
    return this.http.post<IProduct>(
      `${BASE_API_URL}Productos`,
      paylod
    )
  }

  //Actualizar un producto
  updateProduct(
    id: string,
    paylod: UpdateProduct
  ): Observable<IProduct> {
    return this.http.put<IProduct>(
      `${BASE_API_URL}Productos/${id}`,
      paylod
    )
  }

  //Borrar un producto
  deleteProduct(id: number) {
    return this.http.delete(`${BASE_API_URL}Productos/${id}`)
  }

}
