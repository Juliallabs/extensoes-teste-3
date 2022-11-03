
/**
* Functions are mapped to blocks using various macros
* in comments starting with %. The most important macro
* is "block", and it specifies that a block should be
* generated for an **exported** function.
*/
enum TIPOS {
    //% block="POTENCIOMETRO"
    Resistencia,
    //% block="SENSOR DE LUZ"
    Luminosidade,
    //% block="INFRA VERMELHO"
    Reflexao
}

enum PORTASIN {
    //% block="ENTRADA 1"
    E1,
    //% block="ENTRADA 2"
    E2,
    //% block="ENTRADA 3"
    E3
}
//% color="#AA278D" weight=100
//% groups=['ENTRTADAS', 'SAIDAS', 'FUNCOES']
namespace EletroBlocks {
    //% block
    export function leituraAnalogica(porta: AnalogPin, sensor: TIPOS): number {
        let x = 0
        let mediamovel1 = 0
        let mediamovel2 = 0

        for (let j = 0; j < 19; j++) {

            for (let i = 0 ;i <19; i++) {
            
                mediamovel1 = mediamovel1 + pins.analogReadPin(porta)

            }

            mediamovel1 = mediamovel1 /20
            mediamovel2 = mediamovel2+mediamovel1

            }
        x = mediamovel2 / 20


        if (x > 930) {

            x = 1023
        }

        if (x < 60) {

            x = 0

        }
        
        return Math.round(x)
    }
    //% block
    export function leituraDigital(porta_entrada: PORTASIN, sensor: TIPOS): number {
        let porta
        switch (porta_entrada) {
            case PORTASIN.E1: porta=AnalogPin.P0;
            case PORTASIN.E2: porta=AnalogPin.P1;
            case PORTASIN.E3: porta = AnalogPin.P2;
        }
        let x = leituraAnalogica(porta, sensor)

        if (x > 1024 / 2) {
            return 1
        }else return 0

    }

}