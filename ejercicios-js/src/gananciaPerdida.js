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

///=================================================================================================

//Scryp 1

// //@version=5
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

///=================================================================================================

//Scryp 2

// //@version=5
// indicator("Estrategia Mejorada con Señales Combinadas y Porcentaje de Ganancia", overlay=true)

// // Parámetros
// rsiLength = input.int(14, title="Longitud RSI")
// rsi = ta.rsi(close, rsiLength)
// smaLength = input.int(50, title="Longitud SMA")
// sma = ta.sma(close, smaLength)

// // Parámetros para Take Profit y Stop Loss
// takeProfitPercent = input.float(0.3, title="Take-Profit (%)", minval=0.0)
// stopLossPercent = input.float(0.2, title="Stop-Loss (%)", minval=0.0)

// // Variables para seguimiento
// var float entryPrice = na
// var bool inPosition = false
// var float takeProfitPrice = na
// var float stopLossPrice = na
// var float profitPercent = na  // Variable para almacenar el porcentaje de ganancia

// // Condiciones para entrada
// longCondition = close > sma and ta.crossover(rsi, 50) // Precio por encima de SMA y RSI cruza 50

// if (longCondition and not inPosition)
//     entryPrice := close
//     takeProfitPrice := entryPrice * (1 + takeProfitPercent / 100)
//     stopLossPrice := entryPrice * (1 - stopLossPercent / 100)
//     inPosition := true
//     label.new(bar_index, low, "Compra - Precio: " + str.tostring(entryPrice, "#.##"), color=color.green, textcolor=color.white)

// // Lógica para salida
// if (inPosition)
//     if (close >= takeProfitPrice)  // Si se alcanza el Take Profit
//         profitPercent := (takeProfitPrice - entryPrice) / entryPrice * 100
//         label.new(bar_index, high, "Venta - Take Profit: " + str.tostring(takeProfitPrice, "#.##") + "\nGanancia: " + str.tostring(profitPercent, "#.##") + "%", color=color.green, textcolor=color.white)
//         inPosition := false

//     if (close <= stopLossPrice)  // Si se alcanza el Stop Loss
//         profitPercent := (stopLossPrice - entryPrice) / entryPrice * 100
//         label.new(bar_index, high, "Venta - Stop Loss: " + str.tostring(stopLossPrice, "#.##") + "\nPérdida: " + str.tostring(profitPercent, "#.##") + "%", color=color.red, textcolor=color.white)
//         inPosition := false
