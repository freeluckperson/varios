const precioDeCompra = 0.3074;
const precioDeVenta = 0.3183;
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

// entre 8am y 12pm
//ganancia ///
//perdidas ///

// //@version=5
// indicator("RSI y RSI MA con Órdenes y Ganancias", overlay=true)

// // Parámetros del RSI
// rsiLength = input.int(14, title="Longitud RSI")
// rsiSource = input.source(close, title="Fuente RSI")
// rsi = ta.rsi(rsiSource, rsiLength)

// // Parámetros para el RSI basado en Media Móvil (RSI MA)
// maLength = input.int(9, title="Longitud MA de RSI")
// rsiMa = ta.sma(rsi, maLength)

// // Plot RSI en azul
// plot(rsi, color=color.blue, title="RSI", linewidth=2)

// // Plot RSI MA en amarillo
// plot(rsiMa, color=color.yellow, title="RSI MA", linewidth=2)

// // Condiciones de las órdenes de compra y venta
// longCondition = ta.crossover(rsi, rsiMa)
// shortCondition = ta.crossunder(rsi, rsiMa)

// // Variables para el seguimiento de la orden
// var float entryPrice = na
// var bool inPosition = false

// // Lógica de compra y venta
// if (longCondition and not inPosition)
//     entryPrice := close
//     inPosition := true
//     label.new(bar_index, low, "Compra", color=color.white, textcolor=color.black, style=label.style_label_up, size=size.small)

// if (shortCondition and inPosition)
//     if (close > entryPrice)
//         label.new(bar_index, high, "Venta - Ganancia", color=color.white, textcolor=color.green, style=label.style_label_down, size=size.small)
//     else
//         label.new(bar_index, high, "Venta - Pérdida", color=color.white, textcolor=color.red, style=label.style_label_down, size=size.small)
//     inPosition := false

// // Si hay una venta, restablecer la posición de compra
// if (shortCondition)
//     entryPrice := na

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
// stopLossMultiplier = input.float(1.5, title="Multiplicador de ATR para Stop-Loss")
// // Cambié el Take-Profit a 0.17% como pediste
// takeProfitPercent = 0.17

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
//     // Stop-Loss basado en ATR
//     stopLossPrice = entryPrice - (atrValue * stopLossMultiplier)
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

// // Cálculo de porcentaje de ganancia/pérdida cada 12 horas
// var float lastTime = na
// if (not na(entryPrice) and na(lastTime))
//     lastTime := time

// // Verificar si ha pasado 12 horas (720 minutos) desde la última transacción
// if (not na(lastTime) and (time - lastTime) >= 12 * 60 * 60 * 1000) // 12 horas en milisegundos
//     // Mostrar el porcentaje de ganancia/pérdida cada 12 horas
//     if (inPosition)
//         gainLossPercent := (close - entryPrice) / entryPrice * 100
//         label.new(bar_index, high + atrValue, "Ganancia/Pérdida en 12h: " + str.tostring(gainLossPercent, "#.##") + "%", color=color.blue, textcolor=color.white, style=label.style_label_down, size=size.normal, yloc=yloc.abovebar)
//     lastTime := time
