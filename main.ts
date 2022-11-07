
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
    //% block="ENTRADA1"
    E1,
    //% block="ENTRADA2"
    E2,
    //% block="ENTRADA3"
    E3
}
enum PORTASSA {
    //% block="SAIDA_A"
    SA,
    //% block="SAIDA_B"
    SB,
    //% block="SAIDA_C"
    SC
}
//% color="#AA278D" weight=100
//% groups=['ENTRTADAS', 'SAIDAS', 'FUNCOES']
namespace EletroBlocks {
    export function insere_valor(vetamostras:number[],novo: number, tamanho: number) {
        for (let i = 1; i < tamanho; i++) {
            vetamostras[i - 1] = vetamostras[i]
        }
        vetamostras[tamanho-1] = novo
    }
    let amostras = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    let amostras2 = [0,0,0,0,0]
    //% block
    export function leituraAnalogica(porta: AnalogPin, sensor: TIPOS): number {
        let media = 0
        let media2 = 0

        insere_valor(amostras, pins.analogReadPin(porta), 20)

        for (let i = 0; i < 20; i++) {
          media = media + amostras[i]
        }

        insere_valor(amostras2,Math.round(media / 20),5)

        for (let i = 0; i < 5; i++) {
            media2 = media2 + amostras2[i]
        }

        return Math.round(media2 / 5)
    }
    //% block
    export function leituraTESTE(porta: DigitalPin, sensor: TIPOS):  number{ 
        let duty
            pins.onPulsed(porta, PulseValue.High, () => {
                duty = pins.pulseDuration() / 1000
            })
        return duty
       
    }


    //% block
    export function leituraDigital(porta_entrada: PORTASIN, sensor: TIPOS): number {
        let porta = port_selec_en(porta_entrada)
        let x = leituraAnalogica(porta, sensor)
        if (x > 1024 / 2) {
            return 1
        } else return 0
    }
    //% block
    export function saida(porta_saida: PORTASSA): AnalogPin {
        switch (porta_saida) {
            case PORTASSA.SA: return AnalogPin.P13;
            case PORTASSA.SB: return AnalogPin.P4;
            case PORTASSA.SC: return AnalogPin.P5;
        }
    }
    // funcoes 



    export function port_selec_en(porta_entrada: PORTASIN): AnalogPin {
        switch (porta_entrada) {
            case PORTASIN.E1: return AnalogPin.P0;
            case PORTASIN.E2: return AnalogPin.P1;
            case PORTASIN.E3: return AnalogPin.P2;
        }
    }
}