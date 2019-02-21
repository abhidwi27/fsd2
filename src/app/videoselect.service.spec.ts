import { TestBed } from '@angular/core/testing';

import { VideoselectService } from './videoselect.service';

describe('VideoselectService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: VideoselectService = TestBed.get(VideoselectService);
    expect(service).toBeTruthy();
  });
});
