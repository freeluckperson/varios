const precioDeCompra = 14.296;
const precioDeVenta = 14.31;
const diferencia = precioDeVenta - precioDeCompra;

const porcentajeGananciaOperdida =
  (Math.abs(diferencia) / precioDeCompra) * 100;

if (precioDeVenta > precioDeCompra) {
  console.log(`Ganancias ${porcentajeGananciaOperdida}%`);
} else if (precioDeVenta < precioDeCompra) {
  console.log(`Perdidas ${porcentajeGananciaOperdida}%`);
} else {
  console.log("No hay ganancias ni perdidas");
}

// Cálculos para TP y SL
// 1. Take Profit (TP) para 0.7%
// TP=100×1.007=100.70

// 2. Stop Loss (SL) para 0.5%
// SL=100×0.995=99.50
// Resultados

//     TP: 100.70
//     SL: 99.50

////////----------------------------------------------------------

// //@version=5
// indicator("RSI y RSI MA con Órdenes y Ganancias Mejorado", overlay=true)

// // Parámetros del RSI
// rsiLength = input.int(14, title="Longitud RSI")
// rsiSource = input.source(close, title="Fuente RSI")
// rsi = ta.rsi(rsiSource, rsiLength)

// // Parámetros para el RSI basado en Media Móvil (RSI MA)
// maLength = input.int(9, title="Longitud MA de RSI")
// rsiMa = ta.sma(rsi, maLength)

// // Indicador adicional: Media Móvil de Precio
// priceMaLength = input.int(50, title="Longitud Media Móvil de Precio")
// priceMa = ta.sma(close, priceMaLength)

// // Parámetros de stop loss y take profit (en porcentaje)
// stopLossPercent = 0.5  // Stop-Loss al 0.5%
// takeProfitPercent = 0.3  // Take-Profit al 0.3%

// // Indicadores adicionales: Sobrecompra y sobreventa del RSI
// overbought = 70
// oversold = 30

// // Calcular ATR solo una vez
// atrValue = ta.atr(14)

// // Condiciones para las órdenes de compra y venta
// longCondition = ta.crossover(rsi, rsiMa) and rsi < overbought and close > priceMa  // Filtro de tendencia alcista
// shortCondition = ta.crossunder(rsi, rsiMa) and rsi > oversold and close < priceMa  // Filtro de tendencia bajista

// // Variables para el seguimiento de la orden
// var float entryPrice = na
// var bool inPosition = false
// var float gainLossPercent = na

// // Lógica de compra y venta con condiciones adicionales
// if (longCondition and not inPosition)
//     entryPrice := close
//     inPosition := true
//     label.new(bar_index, low - atrValue, "Compra", color=color.green, textcolor=color.white, style=label.style_label_up, size=size.normal, yloc=yloc.belowbar)

// if (shortCondition and inPosition)
//     // Calcular la ganancia o pérdida en porcentaje
//     gainLossPercent := (close - entryPrice) / entryPrice * 100
//     if (gainLossPercent > 0)
//         label.new(bar_index, high + atrValue, "Venta - Ganancia: " + str.tostring(gainLossPercent, "#.##") + "%", color=color.green, textcolor=color.white, style=label.style_label_down, size=size.normal, yloc=yloc.abovebar)
//     else
//         label.new(bar_index, high + atrValue, "Venta - Pérdida: " + str.tostring(gainLossPercent, "#.##") + "%", color=color.red, textcolor=color.white, style=label.style_label_down, size=size.normal, yloc=yloc.abovebar)
//     inPosition := false
//     entryPrice := na

// // Añadir Stop-Loss y Take-Profit
// if (inPosition)
//     // Stop-Loss fijo en porcentaje
//     stopLossPrice = entryPrice * (1 - stopLossPercent / 100)
//     takeProfitPrice = entryPrice * (1 + takeProfitPercent / 100)

//     // Verificar si el precio alcanza el Stop-Loss o el Take-Profit
//     if (close <= stopLossPrice or close >= takeProfitPrice)
//         gainLossPercent := (close - entryPrice) / entryPrice * 100
//         if (gainLossPercent > 0)
//             label.new(bar_index, high + atrValue, "Venta - Ganancia: " + str.tostring(gainLossPercent, "#.##") + "%", color=color.green, textcolor=color.white, style=label.style_label_down, size=size.normal, yloc=yloc.abovebar)
//         else
//             label.new(bar_index, high + atrValue, "Venta - Pérdida: " + str.tostring(gainLossPercent, "#.##") + "%", color=color.red, textcolor=color.white, style=label.style_label_down, size=size.normal, yloc=yloc.abovebar)
//         inPosition := false
//         entryPrice := na

//======================================================================================================================================================================================

// Mejora del codigo de arriba para la deteccion temprana de velas alcistas

// //@version=5
// indicator("RSI y RSI MA con Órdenes y Ganancias Mejorado", overlay=true)

// // Parámetros del RSI
// rsiLength = input.int(14, title="Longitud RSI")
// rsiSource = input.source(close, title="Fuente RSI")
// rsi = ta.rsi(rsiSource, rsiLength)

// // Parámetros para el RSI basado en Media Móvil (RSI MA)
// maLength = input.int(9, title="Longitud MA de RSI")
// rsiMa = ta.sma(rsi, maLength)

// // Indicador adicional: Media Móvil de Precio
// priceMaLength = input.int(50, title="Longitud Media Móvil de Precio")
// priceMa = ta.sma(close, priceMaLength)

// // Parámetros de stop loss y take profit (en porcentaje)
// stopLossPercent = 0.5  // Stop-Loss al 0.5%
// takeProfitPercent = 0.3  // Take-Profit al 0.3%

// // Indicadores adicionales: Sobrecompra y sobreventa del RSI
// overbought = 70
// oversold = 30

// // Calcular ATR solo una vez
// atrValue = ta.atr(14)

// // Condiciones para las órdenes de compra y venta
// longCondition = ta.crossover(rsi, rsiMa) and rsi < overbought and close > priceMa  // Filtro de tendencia alcista
// shortCondition = ta.crossunder(rsi, rsiMa) and rsi > oversold and close < priceMa  // Filtro de tendencia bajista

// // Variables para el seguimiento de la orden
// var float entryPrice = na
// var bool inPosition = false
// var float gainLossPercent = na
// var float highOfBullishCandle = na
// var float lowOfBullishCandle = na

// // Lógica para identificar una vela alcista y registrar precios
// if (longCondition and not inPosition)
//     lowOfBullishCandle := low  // Precio mínimo de la vela actual
//     highOfBullishCandle := high  // Precio máximo de la vela actual
//     entryPrice := lowOfBullishCandle
//     inPosition := true
//     label.new(bar_index, lowOfBullishCandle - atrValue, "Compra", color=color.green, textcolor=color.white, style=label.style_label_up, size=size.normal, yloc=yloc.belowbar)

// // Lógica de venta cuando se alcanza el precio más alto de la vela alcista
// if (inPosition and close >= highOfBullishCandle)
//     gainLossPercent := (close - entryPrice) / entryPrice * 100
//     label.new(bar_index, highOfBullishCandle + atrValue, "Venta - Ganancia: " + str.tostring(gainLossPercent, "#.##") + "%", color=color.green, textcolor=color.white, style=label.style_label_down, size=size.normal, yloc=yloc.abovebar)
//     inPosition := false
//     entryPrice := na

// // Añadir Stop-Loss y Take-Profit
// if (inPosition)
//     // Stop-Loss fijo en porcentaje
//     stopLossPrice = entryPrice * (1 - stopLossPercent / 100)
//     takeProfitPrice = entryPrice * (1 + takeProfitPercent / 100)

//     // Verificar si el precio alcanza el Stop-Loss o el Take-Profit
//     if (close <= stopLossPrice or close >= takeProfitPrice)
//         gainLossPercent := (close - entryPrice) / entryPrice * 100
//         if (gainLossPercent > 0)
//             label.new(bar_index, highOfBullishCandle + atrValue, "Venta - Ganancia: " + str.tostring(gainLossPercent, "#.##") + "%", color=color.green, textcolor=color.white, style=label.style_label_down, size=size.normal, yloc=yloc.abovebar)
//         else
//             label.new(bar_index, highOfBullishCandle + atrValue, "Venta - Pérdida: " + str.tostring(gainLossPercent, "#.##") + "%", color=color.red, textcolor=color.white, style=label.style_label_down, size=size.normal, yloc=yloc.abovebar)
//         inPosition := false
//         entryPrice := na
