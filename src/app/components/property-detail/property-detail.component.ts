import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-property-detail',
  standalone: true,
  imports: [],
  templateUrl: './property-detail.component.html',
  styleUrl: './property-detail.component.css'
})
export class PropertyDetailComponent {

  constructor(private route: ActivatedRoute) { }


  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    debugger
    console.log(id)
  }


}
