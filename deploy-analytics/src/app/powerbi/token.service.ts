import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient} from '@angular/common/http';
import { Baseurl, Port } from "src/config";
import { catchError } from 'rxjs/operators';


@Injectable()
export class TokenService{
    constructor(private http:HttpClient){

    }
     getAccessToken() : Observable<any>{
        let url = Baseurl+Port+"/token"
        return this.http.get(url)
        // .pipe(
        //     console.log("error in get token call")
        // )
    }

}


