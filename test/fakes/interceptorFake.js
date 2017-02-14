function interceptorFake() {
    return {
        request: function (config) {
            console.log("request intercepted");
            return config;
        },

        requestError: function (config) {
            console.log("request error intercepted");
            return config;
        },

        response: function (res) {
            console.log("response intercepted");
            //hideWait($mdDialog);
            return res;
        },

        responseError: function (res) {
            console.log("response error intercepted");
            return res;
        }
    }
}