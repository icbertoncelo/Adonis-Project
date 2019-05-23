'use strict'

class Task {
  get validateAll () {
    return true
  }

  get rules () {
    return {
      titel: 'required'
    }
  }
}

module.exports = Task
