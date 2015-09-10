placeApp.service('locationService', [
function (){
  this.location = "Vancouver, BC";
}]);

placeApp.service('locationObjStorageService', [
'$window', '$localStorage',
function ($window, $localStorage) {
  var
    self = this,
    storage = $localStorage.locationStorage;

  self.locationArr = typeof storage === "undefined" || storage === "" ?
    [] : JSON.parse(storage);


  self.getRecordString = function (type) {
    var
      arr = self.locationArr,
      stringArr = [];

    if (type === "location") {
      for(var i = 0; i < arr.length; i++) {
        stringArr.push(arr[i].address);
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

  self.isAreaNotOnRecord = function (type, name) {
    var string = self.getRecordString(type);

    return string.indexOf(name) === -1 ? true : false;
  }

  self.getLocation = function (address) {
    var
      self = this,
      arr = self.locationArr;
    for(var i = 0; i < arr.length; i++) {
      var location = arr[i];
      if (address === location.address) {
        return location;
      }
    }
    return false;
  }
}]);
