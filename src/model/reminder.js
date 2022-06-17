export class Student {
  id;
  bookmarkId;
  date;
  time;

  constructor(id, bookmarkId, date, time) {
    this.id = id == null ? 0 : id;
    this.bookmarkId = bookmarkId == null ? "" : bookmarkId;
    this.date = date == null ? "" : date;
    this.time = time == null ? "" : time;
  }
}