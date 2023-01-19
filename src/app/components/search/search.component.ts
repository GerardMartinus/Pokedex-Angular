import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent {
  @Output() search: EventEmitter<any> = new EventEmitter();

  searchForm = this.formBuilder.group({ pokeName: '' });

  constructor(private formBuilder: FormBuilder) {}
}
