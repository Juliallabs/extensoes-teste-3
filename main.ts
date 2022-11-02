/**
 * Functions are mapped to blocks using various macros
 * in comments starting with %. The most important macro
 * is "block", and it specifies that a block should be
 * generated for an **exported** function.
 */
//% color="#AA278D" weight=100
namespace EletroBlocks {
  //% block
  export function analogReads(port: AnalogPin): Number {
    let sum1 = 0
    let sum2 = 0
    let topLimit = 930
    let bottomLimit = 50
    let samples = 20

    for (let sample2 = 1; sample2 <= samples; sample2++) {
      for (let sample1 = 1; sample1 <= samples / 2; sample1++) {
        sum1 += pins.analogReadPin(port)
      }
      let arithmeticMovingAverage1 = sum1 / (samples / 2)
      sum2 += arithmeticMovingAverage1
    }

    let arithmeticMovingAverage = sum2 / samples

    if (arithmeticMovingAverage > topLimit) arithmeticMovingAverage = 1023
    if (arithmeticMovingAverage < bottomLimit) arithmeticMovingAverage = 0

    return Math.round(arithmeticMovingAverage)
  }
}
