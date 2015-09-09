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
  }
}

function Place (name, address, placeObj) {
  var self = this;
  self.name = name;
  self.placeObj = placeObj;
  self.memories = [];
}

Place.prototype = {
  addMemory: function(memory) {
    var self = this;
    self.memories.push(memory);
  }
}
