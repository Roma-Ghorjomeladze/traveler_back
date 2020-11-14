import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';

@Injectable()
export class BaseRepository<T> extends Repository<T> {
  getPaginationParams(params: any, total: number, perPage: number = 30) {
    let page = 1;
    if (params.hasOwnProperty('page') && parseInt(params.page, 10) > 0) {
      page = parseInt(params.page, 10);
    }
    const maxPages = Math.ceil(total / perPage);
    const skip = perPage * (page - 1);
    return {
      page,
      perPage,
      maxPages,
      skip,
    };
  }

  getListBody(result, page, perPage, maxPages, total) {
    return {
      total,
      maxPages,
      perPage,
      currentPage: page,
      data: result,
    };
  }
}
