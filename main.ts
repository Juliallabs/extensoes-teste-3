
/**
* Functions are mapped to blocks using various macros
* in comments starting with %. The most important macro
* is "block", and it specifies that a block should be
* generated for an **exported** function.
*/
enum TIPOS {
    //% block="potenciometro"
    MicroSeconds,
    //% block="ldr"
    Centimeters,
    //% block="infra vermelho"
    Inches
}
//% color="#AA278D" weight=100
namespace EletroBlocks {
    //% block
    export function leituraAnalogica(porta: AnalogPin, sensor: TIPOS): number {
        let x = pins.analogReadPin(porta)
        
        if (pins.analogReadPin(porta) > 980) {

            x = 1023
        }
        if (pins.analogReadPin(porta) < 50) {

            x = 0

        } else {

            let mediamovel = 0

            for (let i = 0 ;i <11; i++) {
            
                mediamovel = mediamovel + pins.analogReadPin(porta)

            }
            x = mediamovel / 10

        }
        return Math.round(x)
    }
}