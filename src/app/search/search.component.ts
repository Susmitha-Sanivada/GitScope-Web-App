import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';

import { UserData, RepoData } from '../model';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent {
  cur_username: string = '';
  userData: UserData | any;
  reposData: RepoData | any;
  error: boolean = true;
  page: number = 1;
  pagesize: number = 10;
  totalpages: number = 0;
  loading: boolean = false;
  error_msg: string = '';
  pagesarray: number[] = [];
  input: string = '';
  cacheData: any[] = [];
  language: boolean = true;

  constructor(private apiService: ApiService) {}
  onPrev() {
    if (this.page > 1) {
      this.page--;
      this.setPage(this.page);
    }
  }
  onNext() {
    if (this.page < this.totalpages) {
      this.page++;
      this.setPage(this.page);
    }
  }

  setPageNumber(val: number) {
    this.loading = true;
    this.pagesize = val;
    this.page = 1;
    this.reposData = [];
    this.pagesarray = [];
    this.cacheData = [];
    console.log('pagesize changed');
    this.getReposSubscription(this.cur_username, this.pagesize, this.page);
  }

  setPage(val: number) {
    this.page = val;
    this.reposData = [];

    const cachedPageData = this.cacheData[this.page - 1];
    if (cachedPageData) {
      this.reposData = cachedPageData;
      return;
    } else {
      this.loading = true;
      this.getReposSubscription(
        this.cur_username,
        this.pagesize,
        this.page,
        true
      );
    }
  }

  searchUser(username: string) {
    this.cur_username = username;
    this.pagesarray = [];
    this.reposData = [];
    this.userData = null;
    this.loading = true;
    this.page = 1;
    this.pagesize = 10;
    this.cacheData = [];
    this.apiService.getUser(username).subscribe((data) => {
      if (data.error) {
        this.error = true;
        this.error_msg = data.error;
        this.loading = false;
        return;
      } else {
        this.error = false;
        this.loading = false;
        this.userData = data;
      }
    });
    this.getReposSubscription(username, this.pagesize, this.page);
  }

  getReposSubscription(
    username: string,
    page_s: number,
    page_n: number,
    set_page: boolean = false
  ) {
    this.apiService.getRepos(username, page_s, page_n).subscribe((data) => {
      if (data.error) {
        this.error = true;
        this.error_msg = data.error;
        this.loading = false;

        return;
      } else {
        this.error = false;
        this.loading = false;
        this.reposData = data;
        this.cacheData[page_n - 1] = data;
        this.reposData.forEach((el: any) => {
          console.log(el.topics);
          el.topics = el.topics.slice(0, 3);
        });

        if (!set_page) {
          this.totalpages = Math.ceil(
            this.userData.public_repos / this.pagesize
          );

          for (let i = 1; i <= this.totalpages; i++) {
            this.pagesarray.push(i);
          }
        }
      }
    });
  }
}
