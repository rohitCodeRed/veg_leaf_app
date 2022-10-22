import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { BehaviorSubject ,Observable,of} from 'rxjs';
import { delay,first, take ,filter,map, tap,switchMap} from 'rxjs/operators';
import { environment } from 'src/environments/environment';

import { AuthService } from '../../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class CnnService {

//const httpOptions = {headers: new HttpHeaders({'Content-Type':'application/json'})};

 private leafs=[
  {
    "title":"Tomato Leaf",
    "imageUrl":"assets/tomato.jpeg"
  },
  {
    "title":"Chilli Leaf",
    "imageUrl":"assets/chilli.jpg"
   },
   {
    "title":"Potato Leaf",
    "imageUrl":"assets/potato.jpg"
   }];

  private _vegetables_leaf = new BehaviorSubject<any>([]);

  constructor(private authService: AuthService,private http:HttpClient) { }

  vegetableLeafs(){
    this._vegetables_leaf.next(this.leafs)
    return this._vegetables_leaf.asObservable();
  }

  predict_Leaf_photo(fileObj):Observable<any>{
    let classifyUrl ='/leaf/upload_and_classify'
    let url = environment.serverUrl + classifyUrl
    const httpOptions = {headers: new HttpHeaders({'Authorization':`JWT ${this.authService.getToken()}`})};

    let formData = new FormData(); 
    formData.append('file', fileObj, fileObj.name);

    return this.http.post<any>(url,formData,httpOptions);

  }
}
