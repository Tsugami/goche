module.exports = class MethodAction {
    constructor() {
        this.data = {}
        this.error = false
    }
 

    onError(data) {
        return data;
    }


    onData(data) {
        return data;
    }
}