import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Cat } from '../cat';
import { CatsService } from '../cats.service';

@Component({
  selector: 'app-cat-details',
  templateUrl: './cat-details.component.html',
  styleUrls: ['./cat-details.component.css']
})
export class CatDetailsComponent implements OnInit {
  cat: Cat = { id: 0, name: '', breed: '', country: '' };

  constructor(
    private route: ActivatedRoute,
    private catsService: CatsService,
    private router: Router
  ) {}

  ngOnInit() {
    // Load cat details when the component is initialized
    this.route.paramMap.subscribe(params => {
      const idFromRoute = params.get('id');

      if (idFromRoute !== null) {
        const id = +idFromRoute;

        if (!isNaN(id)) {
          this.catsService.getSelectedCatDetails().subscribe(selectedCat => {
            if (selectedCat) {
              this.cat = { ...selectedCat };
            } else {
              console.error('Cat not found in the service.');
            }
          });

          this.catsService.updateSelectedCatDetails(id);
        } else {
          console.error('Invalid cat ID from route.');
        }
      } else {
        console.error('ID from route is null.');
      }
    });
  }

  // Define the editCat method to navigate to the edit page
  editCat(catId: number) {
    this.router.navigate(['/edit-cat', catId]);
  }
}
