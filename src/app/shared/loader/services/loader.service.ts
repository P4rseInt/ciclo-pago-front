import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  private readonly loading = new BehaviorSubject<boolean>(false);

  setLoading(isLoading: boolean) {
    console.log('isLoading', isLoading);
    this.loading.next(isLoading);
  }

  get isLoading(): Observable<boolean> {
    return this.loading.asObservable();
  }
}
