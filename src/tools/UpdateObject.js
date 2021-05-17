
module.exports = class UpdateObject {
    constructor(newObject, toUpdate, limitNames) {
        this.object = newObject;
        this.toUpdate = toUpdate;
        this.getNames = limitNames || [];
    }

    letGo() {
        for (let obj in this.toUpdate) {

            if (typeof this.getNames[this.getNames.indexOf(obj)] === 'string') {
                this.toUpdate[obj] = this.object[obj];
            } else {
                // :^(
            }
        
        }
    }
}