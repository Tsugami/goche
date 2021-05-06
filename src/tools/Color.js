

module.exports = class Color {
    constructor(...args) {
        this.args = args
    }


    hexToNumber(hex) {
        if (typeof hex === 'string') {
            try {
                const color = `0x${hex.replace(/(\#|0\x)/g, '')}`
                return {
                    error: false,
                    color: Number(color),
                    hex: hex
                }
            } catch(e) {
                return {
                    type: 'color/hextToNumber',
                    error: false,
                    errorInfo: {
                        message: 'Conversion failed'
                    }
                }
            }
        } else {
            Error('You entered an invalid argument')
        }
        return {
            type: 'color/hextToNumber',
            error: false,
            errorInfo: {
                message: 'Conversion failed'
            }
        }
    }
    
}