
module.exports = class DataBytes {
    constructor(data) {
        this.bytes = 0;
        this.string = 0;
        this.objects = 0;
        this.numbers = 0;
        this.array = 0;
        this.boolean = 0;
        this.returnNull = 0;
        this.map = 0;
        this.failedTry = 0;
        this.data = data;
        this.time = Date.now();
    }

    start() {
        const calculate = (dataInf) => {
            switch (typeof dataInf) {
                case 'boolean':
                    this.boolean++
                    this.bytes += 4
                break;
                case 'string':
                    this.string++;
                    this.bytes += dataInf.length * 3
                break;
                case 'number':
                    this.numbers++;
                    this.bytes += 8
                break;
                case 'object':
                 
                    if (dataInf === null) {
                        this.returnNull++
                    } else {
                        try {
                            this.map++
                            dataInf.map(e => {
                                calculate(e)
                            })
                            
                        } catch (e_1) {
                            this.failedTry++
                            try {
                                this.map++
                                dataInf.forEach(e => {
                                    calculate(e)
                                })
                            } catch (e_2) {
                                this.failedTry++
                                try {
                                    this.array++
                                    for (let y in dataInf) {
                                        calculate(dataInf[y])
                                    }
                                } catch(e_3) {
                                    this.failedTry++
                                }
                            }
                        }
                    }
                   
                break;
            }
        }

        for (let d in this.data) {
  
            switch (typeof this.data[d]) {
                case 'undefined':
                    calculate(data)
                break;
                default:
                    calculate(this.data[d])
            }
           
        }

        return this;
    }
}