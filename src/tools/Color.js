

module.exports = class Color {
    constructor(...args) {
        this.args = args
    }


    ToNumber(hex = 'ffff') {

        switch(typeof hex) {
            case 'object':
                try {
                    const color_1 = (Number(`${typeof hex === 'string' ? hex[0].replace(/(\#|0\x)/g, '') : hex[0]}`)).toString(16)
                    const color_2 = (Number(`${typeof hex === 'string' ? hex[1].replace(/(\#|0\x)/g, '') : hex[1]}`)).toString(16)
                    const color_3 = (Number(`${typeof hex === 'string' ? hex[2].replace(/(\#|0\x)/g, '') : hex[2]}`)).toString(16)
                    const color = `${color_1}${color_2}${color_3}`
                    return {
                        error: false,
                        input: hex,
                        color: Number('0x' + color),
                        rgb: {
                            0: hex[0],
                            1: hex[1],
                            2: hex[2]
                        },
                        hex: `#${(color).toString(16)}`
                    }
                } catch(e) {
                    return {
                        type: 'color/hextToNumber/number',
                        error: false,
                        inputType: typeof hex,
                        color: 0,
                        rgb: {
                            0: 0,
                            1: 0,
                            2: 0
                        },
                        errorInfo: {
                            message: 'Conversion failed',
                            exception: e
                        }
                    }
                }
            break;
            case 'number':
                try {
                    const color = (Number(`${typeof hex === 'string' ? hex.replace(/(\#|0\x)/g, '') : hex}`)).toString(16)

                    return {
                        error: false,
                        color: Number('0x' + color),
                        rgb: {
                            0: (Number(color) >> 16) & 0xff,
                            1: (Number(color) >> 8)  & 0xff,
                            2: (Number(color) & 0xfff)
                        },
                        hex: `#${color}`,
                        input: hex
                    }
                } catch(e) {
                    return {
                        type: 'color/hextToNumber/number',
                        error: false,
                        inputType: typeof hex,
                        color: 0,
                        rgb: {
                            0: 0,
                            1: 0,
                            2: 0
                        },
                        errorInfo: {
                            message: 'Conversion failed'
                        }
                    }
                }
            break;
            case 'string':
                try {
                    const color = `0x${hex.replace(/(\#|0\x)/g, '')}`
                    return {
                        error: false,
                        color: Number(color),
                        rgb: {
                            0: (Number(color) >> 16) & 0xff,
                            1: (Number(color) >> 8)  & 0xff,
                            2: (Number(color) & 0xfff)
                        },
                        hex: hex
                    }
                } catch(e) {
                    return {
                        type: 'color/hextToNumber/number',
                        error: false,
                        inputType: typeof hex,
                        color: 0,
                        rgb: {
                            0: 0,
                            1: 0,
                            2: 0
                        },
                        errorInfo: {
                            message: 'Conversion failed'
                        }
                    }
                }
            break;
            default:
                return {
                    type: 'color/hextToNumber/codification',
                    error: true,
                    color: 0,
                    rgb: {
                        0: 0,
                        1: 0,
                        2: 0
                    },
                    hex: hex,
                    errorInfo: {
                        message: 'This encoding is different and therefore it is not supported or it may have been wrong.'
                    }
                }
        }
    }
    
}