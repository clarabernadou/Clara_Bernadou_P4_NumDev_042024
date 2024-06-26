import { TestBed } from '@angular/core/testing';
import { expect } from '@jest/globals';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UserService } from './user.service';
import { FIX_USER_INFORMATIONS_ARR } from './user.fixtures';

describe('UserService', () => {
  let service: UserService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule],
      providers: [UserService]
    });

    service = TestBed.inject(UserService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get a user by id', () => {
    service.getById('1').subscribe(user => {
      expect(user).toEqual(FIX_USER_INFORMATIONS_ARR[0]);
    });

    const req = httpMock.expectOne(`api/user/1`);
    expect(req.request.method).toBe('GET');
    req.flush(FIX_USER_INFORMATIONS_ARR[0]);
  });

  it('should not get a user by id', () => {
    service.getById('null').subscribe(user => {
      expect(user).toEqual({});
    });

    const req = httpMock.expectOne(`api/user/null`);
    expect(req.request.method).toBe('GET');
    req.flush('Error', {status: 404, statusText: 'Not Found'});
  });

  it('should delete a user', () => {
    service.delete('1').subscribe(user => {
      expect(user).toEqual({});
    });

    const req = httpMock.expectOne('api/user/1');
    expect(req.request.method).toBe('DELETE');
    req.flush({});
  });

  it('should not delete a user', () => {
    service.delete('null').subscribe(user => {
      expect(user).toEqual({});
    });

    const req = httpMock.expectOne('api/user/null');
    expect(req.request.method).toBe('DELETE');
    req.flush({});
  });
});