import {
  BaseService
} from "./base_service";

export class ReminderService extends BaseService {

  constructor() {
    super();
    this.tableName = "Reminders";
  }

  getReminders() {
    return this.connection.select({
      from: this.tableName,
    })
  }

  addReminder(reminder) {
    return this.connection.insert({
      into: this.tableName,
      values: [reminder],
      return: true // since id is autoincrement field and we need id, 
      // so we are making return true which will return the whole data inserted.
    })
  }

  getReminderById(id) {
    return this.connection.select({
      from: this.tableName,
      where: {
        id: id
      }
    })
  }

  removeReminder(id) {
    return this.connection.remove({
      from: this.tableName,
      where: {
        bookmarkId: id
      }
    })
  }

  updateReminderById(id, updateData) {
    return this.connection.update({
      in: this.tableName,
      set: updateData,
      where: {
        id: id
      }
    })
  }
}