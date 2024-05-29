import { Component, Output } from '@angular/core';
import { UserData } from '../../model';
import { Input } from '@angular/core';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss'],
})
export class InfoComponent {
  @Input() userData: UserData | null = null;
  @Output() setPageNumber = new EventEmitter<number>();
  @Input() input_page_size: number = 10;
}
