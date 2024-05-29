import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { ApiService } from './api.service';

describe('ApiService', () => {
  let service: ApiService;
  let httpMock: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ApiService],
    });
    service = TestBed.inject(ApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });
  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    const service: ApiService = TestBed.inject(ApiService);
    expect(service).toBeTruthy();
  });
  it('should fetch user data', () => {
    const mockUserData = {
      avatar_url: 'avatar_url',
      name: 'name',
      bio: 'bio',
      followers: 1,
      following: 1,
      location: 'location',
      public_repos: 1,
    };

    service.getUser('testUser').subscribe((data) => {
      expect(data).toEqual(mockUserData);
    });
    const req = httpMock.expectOne(`https://api.github.com/users/testUser`);
    expect(req.request.method).toBe('GET');
    req.flush(mockUserData);
  });

  it('should fetch repos data', () => {
    const mockReposData = [
      {
        name: 'name',
        description: 'description',
        language: 'language',
        topics: [],
        svn_url: 'url',
      },
    ];

    service.getRepos('testUser', 10, 1).subscribe((data) => {
      expect(data).toEqual(mockReposData);
    });

    const req = httpMock.expectOne(
      `https://api.github.com/users/testUser/repos?per_page=10&page=1`
    );
    expect(req.request.method).toBe('GET');
    req.flush(mockReposData);
  });
});
