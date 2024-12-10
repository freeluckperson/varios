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

//===================================================================================================

//ESTE CODIGO FUNCIONA CORRECTAMENTE DA PRECIOS DE ENTRADA Y SALIDA (RSI)

//@version=5
// indicator("RSI y RSI MA con Órdenes y Ganancias Mejorado - Sin Pérdidas", overlay=true)

// // Parámetros del RSI
// rsiLength = input.int(14, title="Longitud RSI")
// rsiSource = input.source(close, title="Fuente RSI")
// rsi = ta.rsi(rsiSource, rsiLength)

// // Parámetros del RSI MA
// maLength = input.int(9, title="Longitud MA de RSI")
// rsiMa = ta.sma(rsi, maLength)

// // Parámetros de la Media Móvil de Precio
// priceMaLength = input.int(50, title="Longitud Media Móvil de Precio")
// priceMa = ta.sma(close, priceMaLength)

// // Parámetros de Take Profit y Stop Loss
// takeProfitPercent = input.float(0.3, title="Take-Profit (%)", minval=0.0)
// trailingStopPercent = input.float(0.5, title="Trailing Stop Loss (%)", minval=0.0)

// // Niveles de sobrecompra y sobreventa
// overbought = 70
// oversold = 30

// // ATR para Trailing Stop
// atrLength = input.int(14, title="ATR Length for Trailing Stop")
// atrValue = ta.atr(atrLength)

// // Condición de entrada (Compra)
// longCondition = ta.crossover(rsi, rsiMa) and rsi < overbought and close > priceMa

// // Variables para el seguimiento de la orden
// var float entryPrice = na
// var bool inPosition = false
// var float takeProfitPrice = na
// var float profitPercent = na

// // Lógica de entrada
// if (longCondition and not inPosition)
//     entryPrice := close
//     takeProfitPrice := entryPrice * (1 + takeProfitPercent / 100)
//     inPosition := true
//     label.new(bar_index, low, "Compra - Precio: " + str.tostring(entryPrice, "#.##"), color=color.green, textcolor=color.white, style=label.style_label_up, size=size.normal, yloc=yloc.belowbar)

// // Lógica de salida (en la misma vela de entrada si se alcanza el Take Profit)
// if (inPosition)
//     if (close >= takeProfitPrice)  // Si el precio de cierre es mayor o igual al Take Profit
//         profitPercent := (close - entryPrice) / entryPrice * 100
//         exitReason = "Take Profit"

//         // Cambiar el color según si es ganancia o pérdida
//         exitColor = profitPercent >= 0 ? color.green : color.red

//         label.new(bar_index, high, "Venta - " + exitReason + ": " + str.tostring(profitPercent, "#.##") + "% - Precio: " + str.tostring(close, "#.##"),
//                   color=exitColor, textcolor=color.white, style=label.style_label_down, size=size.normal, yloc=yloc.abovebar)
//         inPosition := false
//         entryPrice := na
//         takeProfitPrice := na

///===============================================================================================================

// ESTE CODIGO FUNCIONA DA MENOS ENTRADAS QUE EL ANTERIOR (3 EMA)

// //@version=5
// indicator("Estrategia de 3 EMAs con Entradas Alcistas - Sin Pérdidas", overlay=true)

// // Parámetros de las EMAs
// emaShortLength = input.int(50, title="Longitud EMA Corta")
// emaMediumLength = input.int(100, title="Longitud EMA Media")
// emaLongLength = input.int(150, title="Longitud EMA Larga")

// // Cálculo de las EMAs
// emaShort = ta.ema(close, emaShortLength)
// emaMedium = ta.ema(close, emaMediumLength)
// emaLong = ta.ema(close, emaLongLength)

// // Parámetros de Take Profit y Stop Loss
// takeProfitPercent = input.float(0.3, title="Take-Profit (%)", minval=0.0)
// trailingStopPercent = input.float(0.5, title="Trailing Stop Loss (%)", minval=0.0)

// // Condiciones para verificar si las EMAs están semi-paralelas y en tendencia alcista
// isUptrend = emaShort > emaMedium and emaMedium > emaLong

// // Condición de entrada (Compra) basada en el cruce del precio sobre la EMA de 50
// longCondition = close > emaShort and ta.crossover(close, emaShort) and isUptrend

// // Variables para el seguimiento de la orden
// var float entryPrice = na
// var bool inPosition = false
// var float takeProfitPrice = na
// var float profitPercent = na

// // Lógica de entrada (Compra)
// if (longCondition and not inPosition)
//     entryPrice := close
//     takeProfitPrice := entryPrice * (1 + takeProfitPercent / 100)
//     inPosition := true
//     label.new(bar_index, low, "Compra - Precio: " + str.tostring(entryPrice, "#.##"), color=color.green, textcolor=color.white, style=label.style_label_up, size=size.normal, yloc=yloc.belowbar)

// // Lógica de salida (en la misma vela de entrada si se alcanza el Take Profit)
// if (inPosition)
//     if (close >= takeProfitPrice)  // Si el precio de cierre es mayor o igual al Take Profit
//         profitPercent := (close - entryPrice) / entryPrice * 100
//         exitReason = "Take Profit"

//         // Cambiar el color según si es ganancia o pérdida
//         exitColor = profitPercent >= 0 ? color.green : color.red

//         label.new(bar_index, high, "Venta - " + exitReason + ": " + str.tostring(profitPercent, "#.##") + "% - Precio: " + str.tostring(close, "#.##"),
//                   color=exitColor, textcolor=color.white, style=label.style_label_down, size=size.normal, yloc=yloc.abovebar)
//         inPosition := false
//         entryPrice := na
//         takeProfitPrice := na

// // Dibujar las EMAs en el gráfico
// plot(emaShort, color=color.blue, title="EMA Corta (50)")
// plot(emaMedium, color=color.orange, title="EMA Media (100)")
// plot(emaLong, color=color.red, title="EMA Larga (150)")
