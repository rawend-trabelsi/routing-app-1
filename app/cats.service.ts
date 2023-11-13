import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Cat } from './cat';
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class CatsService {
  private cats: Cat[] = [];
  private selectedCatSubject = new BehaviorSubject<Cat | null>(null);

  constructor() {
    // Assuming you have a method to get cats; you can replace it with your actual method
    this.cats = [
      { id: 1, name: 'sousou', breed: 'Breed 1', country: 'spain' },
      { id: 2, name: 'mimi', breed: 'Breed 2', country: 'tunisia' },
      { id: 3, name: 'lolo', breed: 'Breed 2', country: 'india' },
      { id: 4, name: 'toto', breed: 'Breed 2', country: 'turkey' },
    ];
  }

  getCats(): Observable<Cat[]> {
    return new Observable(observer => {
      observer.next(this.cats);
      observer.complete();
    });
  }

  updateSelectedCatDetails(catId: number) {
    const index = _.findIndex(this.cats, (c: Cat) => c.id === catId);
    const selectedCat = index !== -1 ? this.cats[index] : null;
    this.selectedCatSubject.next(selectedCat);
  }

  getSelectedCatDetails(): Observable<Cat | null> {
    return this.selectedCatSubject.asObservable();
  }

  // Add this method to update cat details
  updateCatDetails(updatedCat: Cat) {
    const index = _.findIndex(this.cats, (c: Cat) => c.id === updatedCat.id);
    if (index !== -1) {
      this.cats[index] = updatedCat;
      this.updateSelectedCatDetails(updatedCat.id); // Update the selected cat details after editing
    } else {
      console.error('Cat not found in the array.');
    }
  }
}
