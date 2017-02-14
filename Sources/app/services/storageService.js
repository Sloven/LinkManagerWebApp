function storageService($window){
    var self = this;

    self.storage = $window.localStorage

    self.removeItem = function (key) {
        self.storage.removeItem(key);
    }

    self.setItem = function (key, value) {
        self.storage.setItem(key,value);
    };

    self.getItem = function (key) {
        return self.storage.getItem(key);
    }
}

app.service('storageService', storageService);