placeApp.service('modelService', [
function () {
  var self = this;

  function Location (name, address, locationObj) {
    var self = this;
    self.name = name;
    self.address = address;
    self.locationObj = locationObj;
    self.places = [];
  }

  Location.prototype = {
    addPlace: function(place) {
      var self = this;
      self.places.push(place);
    },

    removePlace: function(place) {
      var
        self = this,
        places = self.places;
      debugger;
      places.splice(places.indexOf(place), 1);
    }
  }

  function Place (name, address, placeObj) {
    var self = this;
    self.name = name;
    self.address = address;
    self.placeObj = placeObj;
    self.memories = [];
  }

  Place.prototype = {
    addMemory: function(memory) {
      var self = this;
      self.memories.push(memory);
    }
  }

  self.newLocation = function (obj) {
    return new Location(obj['name'],
      obj['address'], obj['locationObj']);
  }


  self.newPlace = function (obj) {
    return new Place(obj['name'],
      obj['address'], obj['placeObj']);
  }

  self.processStorageLocationArr = function (arr) {
    var
      self = this,
      result = [];
    for(var i = 0; i<arr.length; i++) {
      var
        primitive_location = arr[i],
        primitive_places = primitive_location.places,
        location = self.newLocation(primitive_location);

      for(var index = 0; index<primitive_places.length; index++) {
        location.addPlace(
          self.newPlace(primitive_places[index])
        )
      }

      result.push(location);
    }

    return result;
  }
}])
