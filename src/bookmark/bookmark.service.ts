import { Injectable } from '@nestjs/common';
import { CreateBookmarkDto, EditBookmarkDto } from './dto';

@Injectable()
export class BookmarkService {
  getBookmarks(userId: number) {}
  createBookmark(userId: number, dto: CreateBookmarkDto) {}
  getBookmarkById(userId: number, bookmarId: number) {}
  editBookmarkById(userId: number, bookmarId: number, dto: EditBookmarkDto) {}
  deleteBookmarkById(userId: number, bookmarkId: number) {}
}
