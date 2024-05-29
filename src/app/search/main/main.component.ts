import { Component } from '@angular/core';
import { Input } from '@angular/core';
import { RepoData } from '../../model';
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent {
  @Input() reposData: RepoData[] = [];
  @Input() language: boolean = true;

  openRepo(val: number) {
    window.open(this.reposData[val].svn_url);
  }
}
