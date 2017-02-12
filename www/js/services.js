angular.module('starter.services', [])

.factory('Notes', function($http) {
  var noteApiBaseUrl = "http://localhost:3000";
  var notes = [];

  $http.get(noteApiBaseUrl + "/notes/")
    .then(function(res) {
      if (!res.data || res.data.length === 0){
        return;
      }
      for (var i = 0; i < res.data.length; i++) {
        notes.push(res.data[i]);
      }
    });


  return {
    clone: function(item) {
      return JSON.parse(JSON.stringify(item))
    },
    all: function() {
      return notes;
    },
    remove: function(note) {
      $http({
        url: noteApiBaseUrl + "/notes/delete/" + note.id,
        method: "DELETE"
      }).then(function(res) {
        if (!res.data.success) {
          return res;
        }
        notes.splice(notes.indexOf(note), 1);
      });
    },
    get: function(noteId) {
      for (var i = 0; i < notes.length; i++) {
        if (notes[i].id === parseInt(noteId)) {
          return notes[i];
        }
      }
      return null;
    },
    update: function(note) {
      var self = this;
      return $http({
        url: noteApiBaseUrl + "/notes/update",
        method: "POST",
        data: note
      }).then(function (res) {
        if (!res.data.success) {
          return res.data;
        }
        var souceNote = self.get(note.id);
        souceNote.title = note.title;
        souceNote.desc = note.desc;
        return res.data;
      })
    },
    add: function(note) {
      if (!note) {
        return;
      }

      return $http({
        url: noteApiBaseUrl + "/notes/add",
        method: "POST",
        data: note
      }).then(function success(res) {
        var newNote = {
          id: res.data.id,
          title: res.data.title,
          desc: res.data.desc
        };
        notes.push(newNote);
        return {
          success: true
        }
      }, function error(err) {
        return {
          success: false,
          err: err
        }
      });
    }
  };
});
