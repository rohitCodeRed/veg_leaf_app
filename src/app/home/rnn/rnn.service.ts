import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable,of} from 'rxjs';
import { delay,first, take ,filter,map, tap,switchMap} from 'rxjs/operators';
import { environment } from 'src/environments/environment';

import { AuthService } from '../../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class RnnService {
  // private _wheat_price_data = new BehaviorSubject<any>({});
  // priceData={}
  constructor(private authService: AuthService,private http:HttpClient) { }

  wheatPriceData(){
    let dataUrl = "/predict_wheat_price" //'/predict_wheat_price' //'/get_csv_data'
    let url = environment.serverUrl + dataUrl
    const httpOptions = {headers: new HttpHeaders({'Content-Type':'application/json','Authorization':`JWT ${this.authService.getToken()}`})};

    return this.http.get<any>(url);
    
  }



  predict_wheat_price(bodyParams):Observable<any>{
    let predictUrl = '/predict_wheat_price';
    let url = environment.serverUrl + predictUrl
    const httpOptions = {headers: new HttpHeaders({'Content-Type':'application/json','Authorization':`JWT ${this.authService.getToken()}`})};

   
    return this.http.post<any>(url,bodyParams,httpOptions).pipe(tap(res=>{
      //console.log(res);
    }));

  }


}
