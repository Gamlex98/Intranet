import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DocumentModel } from 'src/app/models/document.model';
import { FileService } from 'src/app/services/file.service';
import { HttpClient, HttpEventType, HttpHeaders, HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent {

  documento: DocumentModel = new DocumentModel ();

  direccion = {url: ""};
  rutaRelativa = "";

  message = '';

  fileToUpload !: File;
  authenticated = false;
  sid = '';

  constructor ( private service:FileService, private http:HttpClient ) { }
 
  /* ngOnInit(): void {
    this.fileInfos = this.service.getFiles();
  } */

  authenticate() {
    const usuario = 'Intranet';
    const pass = 'MW50cjQxMjMrLSo=';

    this.service.authenticate(usuario, pass).subscribe(
      authSid => {
        this.authenticated = true;
        this.sid = authSid;
        console.log("SID generado: " + this.sid);
      },
      error => {
        console.error('Authentication failed', error);
      }
    );
  }

  selectedFile(event: any) {
    this.fileToUpload = event.target.files[0];
  }

  onUpload() {
    
    const uploadUrl = `http://172.16.1.24:8095/cgi-bin/filemanager/utilRequest.cgi?func=upload&type=standard&sid=${this.sid}&dest_path=/Web&overwrite=1&progress=-Web`;
    
    const formData = new FormData();
    formData.append('file', this.fileToUpload, this.fileToUpload.name);
    console.log("nombre archivo : " + this.fileToUpload.name);
    // console.log(" Form data : " + formData);

    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    headers.append('Accept', 'application/json');

    this.http.post(uploadUrl, formData, { headers }).subscribe(
      response => {
        console.log('Upload successful', response);
      },
      error => {
        console.error('Upload failed', error);
      }
    );
  }
  
  enviarInfo(form: NgForm){
    if(form.valid) {
      const documento: DocumentModel = {
        // id: form.value.id,
        nombre: form.value.nombre,
        fecha: form.value.fecha,
        area: form.value.area,
        url: form.value.url
      };
      this.service.addDocumentos(documento).subscribe({
        next: (data:any)=>{
          console.log("informacion guardada en la base de datos");
        },
        error:(e)=> console.log(e)
      });
    }
  }

  onFolderSelected(event: any) {
    const value = event.target.value;
    this.rutaRelativa = value;
  }

  onFileSelected(event: any) {
    const file: File = event.target?.files?.[0];
    const reader = new FileReader();

    const rutaBase = "http://172.16.1.24:88/";

    reader.onload = (e: any) => {
      this.direccion.url = rutaBase + this.rutaRelativa + file?.name;
      console.log("url completa : " + this.direccion.url);
    };
  
    reader.readAsDataURL(file);
  }
  
  ajustarAnchoInput(event: any) {
    const input = event.target;
    input.style.width = input.value.length + 'ch';
  }

}
