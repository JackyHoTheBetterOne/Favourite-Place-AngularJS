placeApp.service('locationService', [
function (){
  this.location = "Vancouver, BC";
}]);

placeApp.service('locationObjStorageService', [
'$window',
function ($window) {
  var
    self = this,
    storage = $window.localStorage.locationStorage;

  self.locationArr = storage instanceof Array ?
    JSON.parse(storage) : [];


  self.getRecordString = function (type) {
    var
      arr = self.locationArr,
      stringArr = [];

    if (type === "location") {
      for(var i = 0; i < arr.length; i++) {
        stringArr.push(arr[i].name);
      }
    } else if (type === "place") {
      for(var i = 0; i < arr.length; i++) {
        var placeArr = arr[i].places;
        for(var index = 0; index < placeArr.length; index++){
          stringArr.push(placeArr[i].name);
        }
      }
    }

    return stringArr.join(" ");
  }

  self.getLocation = function (address) {
    var
      self = this,
      arr = self.locationArr;
    for(var i = 0; i < arr.length; i++) {
      var location = arr[i];
      if (address === location.formatted_address) {
        return location;
      }
    }
  }
}]);
