import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DocumentModel } from 'src/app/models/document.model';
import { FileService } from 'src/app/services/file.service';
import { HttpClient, HttpEventType, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent {

  documento: DocumentModel = new DocumentModel ();

  direccion = {url: ""};
  rutaRelativa = "";

  selectedFiles?: FileList;
  currentFile?: File;
  progress = 0;
  message = '';

  fileInfos?: Observable<any>;
  

  constructor(private service: FileService, private http:HttpClient) { }
 
  /* ngOnInit(): void {
    this.fileInfos = this.service.getFiles();
  } */

  selectFile(event: any): void {
    this.selectedFiles = event.target.files;
  }

  upload(): void {
    this.progress = 0;

    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);

      if (file) {
        this.currentFile = file;

        this.service.upload(this.currentFile).subscribe({
          next: (event: any) => {
            if (event.type === HttpEventType.UploadProgress) {
              this.progress = Math.round(100 * event.loaded / event.total);
            } else if (event instanceof HttpResponse) {
              this.message = event.body.message;
              // this.fileInfos = this.service.getFiles();
            }
          },
          error: (err: any) => {
            console.log(err);
            this.progress = 0;

            if (err.error && err.error.message) {
              this.message = err.error.message;
            } else {
              this.message = 'Could not upload the file!';
            }

            this.currentFile = undefined;
          }
        });
      }

      this.selectedFiles = undefined;
    }
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
