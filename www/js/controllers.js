angular.module('starter.controllers', [])

.controller('NotesCtrl', function($scope, Notes) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.notes = Notes.all();
  $scope.remove = function(note) {
    Notes.remove(note);
  };
})

.controller('NoteDetailCtrl', function($scope, $stateParams, Notes, $state) {
  $scope.note = Notes.clone(Notes.get($stateParams.noteId));

  $scope.saveChanges = function() {
    Notes.update($scope.note).then(function(res) {
      if (res.success) {
        $state.transitionTo("tab.notes");
      }
    });
  }
})

.controller("AddNoteCtrl", function($scope, Notes, $state) {
  $scope.note = {
    title: "",
    desc: ""
  };

  $scope.addNote = function(addNoteForm) {
    if(addNoteForm.$invalid){
      return;
    }
    Notes.add($scope.note)
      .then(function(res) {
        if (res.success) {
          $state.transitionTo("tab.notes");
        }
      });
  }
});
