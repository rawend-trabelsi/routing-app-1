import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Cat } from '../cat';
import { CatsService } from '../cats.service';



@Component({
  selector: 'app-edit-cat',
  templateUrl: './edit-cat.component.html',
  styleUrls: ['./edit-cat.component.css']
})
export class EditCatComponent implements OnInit {
  cat: Cat = { id: 0, name: '', breed: '', country: '' };

  constructor(
    private route: ActivatedRoute,
    private catsService: CatsService,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const idFromRoute = params.get('id');

      if (idFromRoute !== null) {
        const id = +idFromRoute;

        if (!isNaN(id)) {
          this.catsService.getSelectedCatDetails().subscribe(selectedCat => {
            if (selectedCat) {
              this.cat = { ...selectedCat }; // Copy cat details to avoid two-way binding issues
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

  saveCat() {
    // Mettez en œuvre la logique pour sauvegarder les modifications du chat
    this.catsService.updateCatDetails(this.cat);

    // Redirigez l'utilisateur vers la page de détails du chat après l'édition
    this.router.navigate(['/details', this.cat.id]);
  }
}

