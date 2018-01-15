import moment from 'moment';

export const validations = {
  checkMinLength: function(text, minlength) {
    if (text.length >= minlength) {
      return '';
    } else {
      return `length should be at least ${minlength} characters`;
    }
  },

  timeShouldBeInTheFuture: function(t) {
    if (moment(t).isValid() && moment(t).isAfter()) {
      return '';
    } else {
      return `can't be in the past`;
    }
  }
}
