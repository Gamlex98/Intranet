import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { DocumentModel } from '../models/document.model';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  url = 'http://172.16.1.249:3030';

  baseUrldocumentos = "http://172.16.1.24:88/";

  baseUrl = "http://172.16.1.24:8095/cgi-bin/filemanager/utilRequest.cgi?func=upload&type=standard&sid=fmszkfyi&dest_path=/Intranet&overwrite=1&progress=-Intranet";

  constructor(private http: HttpClient) { }
  
  upload(file: File): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();

    formData.append('file', file);
    console.log("Url : " + this.baseUrl);

    const req = new HttpRequest('POST', `${this.baseUrl}`, formData, {
      reportProgress: true,
      responseType: 'blob'
    });

    return this.http.request(req);
  }

  getFiles(): Observable<any> {
    return this.http.get(`${this.baseUrldocumentos}/documentos`);
  }
    
  addDocumentos(documento: DocumentModel): Observable<any> {
    console.log("Se agrega la info del documento :")    
    console.log(documento.nombre);
    console.log(documento.fecha);
    console.log(documento.area);
    console.log(documento.url);
    
    const fechaISO = new Date(documento.fecha + 'T00:00:00Z').toISOString();

    return this.http.post(`${this.url}/comunicados`, {
      // id: documento.id,
      nombre: documento.nombre,
      fecha: fechaISO,
      area: documento.area,
      url: documento.url
    });
  }

  getDocumentosPorArea(area: string): Observable<any> {
    return this.http.get(`${this.url}/comunicados?filter[where][area]=${area}`);
  }

  getUrl(url: string): Observable<any> {
    return this.http.get(`${this.url}/comunicados?filter[where][url]=${url}`);
  }

  getNombre (nombre: string): Observable<any> {
    return this.http.get(`${this.url}/comunicados?filter[where][nombre]=${nombre}`);
  }
}