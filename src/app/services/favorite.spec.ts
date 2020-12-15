import { async } from '@angular/core/testing';
import { Favorite, FavoriteService } from './favorite.service';

describe('Favorite Service Unit Testing', () => {
  let service: FavoriteService;
  let mockList: Favorite[] = [
    { id: 1, date: Date.now() },
    { id: 2, date: Date.now() },
    { id: 3, date: Date.now() },
  ];

  localStorage.setItem('FAVORITES', JSON.stringify(mockList));
  beforeEach(async(() => {
    service = new FavoriteService();
  }));
  describe('getList', () => {
    it('should return an array of Favorite Object', (done: DoneFn) => {
      const result = service.getList();
      expect(result).toBeInstanceOf(Object);
      done();
    });
  });
  describe('get', () => {
    it('should return an object when found', (done: DoneFn) => {
      const result = service.get(1);
      expect(result).toBeInstanceOf(Object);
      done();
    });
    it('should return null when id not found', (done: DoneFn) => {
      const result = service.get(0);
      expect(result).toBeNull();
      done();
    });
  });
  describe('checkExist', () => {
    it('should return `true` when id exist in Array of Favorite object', (done: DoneFn) => {
      const result = service.checkExist(2);
      expect(result).toBeTrue();
      done();
    });
    it('should return `false` when id not exist in Array of Favorite object', (done: DoneFn) => {
      const result = service.checkExist(0);
      expect(result).toBeFalse();
      done();
    });
  });
  describe('add', () => {
    it('should return a Favorite Object when add successfully ', (done: DoneFn) => {
      let newData: Favorite = { id: 4, date: Date.now() };
      const result = service.add(newData);
      expect(result).toEqual(newData);
      done();
    });
  });
  describe('delete', () => {
    it('should return an array of Favorite Object ', (done: DoneFn) => {
      const result = service.delete(0);
      expect(result).toBeInstanceOf(Object);
      done();
    });
  });

  describe('move', () => {
    it('should swing object in curent index and new index  ', (done: DoneFn) => {
      const curIdx = 0;
      const newIdx = 1;
      const objNewIndex = Object.assign({}, mockList[newIdx]);
      const result = service.move(curIdx, newIdx);
      expect(result[curIdx]).toEqual(objNewIndex);
      done();
    });
  });
});
