function authServiceFake() {
    return {
        storage: null,
        parseJwt : function(token) {
            return null;
        },
        isAuthed : function(returnValue) {
            return returnValue;
        },
        logout :function() {
            this.storage = null;
        },

        saveToken : function(token) {
            this.storage = token;
        },

        getToken : function() {
            return this.storage;
        }
    }
}

