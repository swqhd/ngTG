import { Component, ElementRef, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent {
//@ViewChild('search') input: ElementRef;
  constructor(private router: Router) { }

  onSubmit(form: NgForm) {
    this.router.navigate(['search', form.value.search]);
    //this.input.nativeElement.value = '';

  }

}
