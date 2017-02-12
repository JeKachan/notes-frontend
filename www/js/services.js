angular.module('starter.services', [])

.factory('Notes', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var notes = [
  {
    id: 0,
    title: 'Learn Ionic',
    desc: 'The top open source framework for building amazing mobile apps.',
  },
  {
    id: 1,
    title: 'Learn Cordova',
    desc: 'Mobile apps with HTML, CSS & JS target multiple platforms with one code base free and open source',
  },
  {
    id: 2,
    title: 'Learn JavaScript',
    desc: 'JavaScript is the programming language of HTML and the Web.',
  }];

  function clone(obj) {
    if (null == obj || "object" != typeof obj) return obj;
    var copy = obj.constructor();
    for (var attr in obj) {
      if (obj.hasOwnProperty(attr)) copy[attr] = obj[attr];
    }
    return copy;
  }

  function getNote(noteId) {
    for (var i = 0; i < notes.length; i++) {
      if (notes[i].id === parseInt(noteId)) {
        return notes[i];
      }
    }
    return null;
  }

  return {
    all: function() {
      return notes.map(function(note) {
        return clone(note);
      });
    },
    remove: function(note) {
      notes.splice(notes.indexOf(note), 1);
    },
    get: function(noteId) {
      return clone(getNote(noteId))
    },
    update: function(_note) {
      var note = getNote(_note.id);
      if(!note) {
        return;
      }
      note.title = _note.title;
      note.desc = _note.desc;
    }

  };
});
