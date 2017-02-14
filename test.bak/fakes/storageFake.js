module.exports = function storageFake(){
    return {
        storage: {},
        removeItem: function (key) {
            if(this.storage[key] && this.storage[key].length > 0)
                delete this.storage[key];
        },
        setItem:function (key, value) {
            return this.storage[key] = value;
        },
        getItem:function (key) {
            if(this.storage[key] && this.storage[key].length > 0)
                return this.storage[key];
        }
    };
}