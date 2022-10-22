import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
//import { stringify } from 'querystring';
import { BehaviorSubject ,Observable,of} from 'rxjs';
import { delay,first, take ,filter,map, tap,switchMap} from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  private _userUsAuthenticated = false;
  private _userId ='';
  private _token='';
  //private currentUser = new BehaviorSubject<any>({"username":"","token":""});
  
  constructor(private http:HttpClient) { }

  getUserId(){
    return this._userId;
  }

  getToken(){
    return this._token;
  }

  get userIsAuthenticated(){
    return this._userUsAuthenticated;
  }


  userLogin(username: string,password: string):Observable<any>{
    let authUrl ='/auth'
    let url = environment.serverUrl + authUrl
    const httpOptions = {headers: new HttpHeaders({'Content-Type':'application/json'})};


    return this.http.post<any>(url,{"username":username,"password":password},httpOptions)
            .pipe(tap (resData =>{
                this._token = resData.access_token
                this._userId = username
                this._userUsAuthenticated = true;
            }));
  }

  userRegistered(username: string,password: string):Observable<any>{
    const httpOptions = {headers: new HttpHeaders({'Content-Type':'application/json'})};

    let authUrl ='/register'
    let url = environment.serverUrl + authUrl

    return this.http.post<any>(url,{"username":username,"password":password},httpOptions);
  }

  logout(){
    this._userUsAuthenticated=false;
    this._token = ""
    this._userId = ""
  }
}
