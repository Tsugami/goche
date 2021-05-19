module.exports = class ObjectManager extends Map {
    constructor() {
        super();
    }

    toArray() {
        const arrayList = []
        this.forEach(e => {
            arrayList.push(e)
        })
        return arrayList;
    }
}