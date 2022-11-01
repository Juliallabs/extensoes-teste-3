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
    export function leituraAnalogica(porta: AnalogPin, sensor: TIPOS):number{

        if (pins.analogReadPin(porta) > 1000) {

            porta=1023

        }
        if (pins.analogReadPin(porta) < 50) {

            porta = 0

        }
        
        return porta

    }

}