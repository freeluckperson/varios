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

//@version=5
indicator("Sin Pérdidas", overlay=true)

// --- Parámetros ----
rsiLength = input.int(14, title="Longitud RSI")
rsiSource = input.source(close, title="Fuente RSI")
maLength = input.int(9, title="Longitud MA de RSI")
priceMaLength = input.int(50, title="Longitud Media Móvil de Precio")
takeProfitPercent = input.float(0.3, title="Take-Profit (%)", minval=0.0)
trailingStopPercent = input.float(0.5, title="Trailing Stop Loss (%)", minval=0.0)
overboughtLevel = input.int(70, title="Nivel de Sobrecompra")
oversoldLevel = input.int(30, title="Nivel de Sobreventa")
atrLength = input.int(14, title="ATR Length for Trailing Stop") // No usado actualmente

// --- Cálculos ---
rsi = ta.rsi(rsiSource, rsiLength)
rsiMa = ta.sma(rsi, maLength)
priceMa = ta.sma(close, priceMaLength)
atrValue = ta.atr(atrLength) // No usado actualmente

// --- Condiciones ---
longCondition = ta.crossover(rsi, rsiMa) and rsi < overboughtLevel and close > priceMa

// --- Variables de Estado ---
var float entryPrice = na
var bool inPosition = false
var float takeProfitPrice = na
var float profitPercent = na
var float trailingStopPrice = na
var float highestHighSinceEntry = na

// --- Lógica ---

// Reinicio en la primera barra
if barstate.isfirst
    entryPrice := na
    inPosition := false
    takeProfitPrice := na
    profitPercent := na
    trailingStopPrice := na
    highestHighSinceEntry := na

// Entrada en Long
if longCondition and not inPosition
    entryPrice := close
    takeProfitPrice := entryPrice * (1 + takeProfitPercent / 100)
    trailingStopPrice := entryPrice * (1 - trailingStopPercent / 100)
    highestHighSinceEntry := high // Inicializa con el high actual
    inPosition := true

    label.new(bar_index, low, "Compra\nPrecio: " + str.tostring(entryPrice, "#.##"), color=color.green, textcolor=color.white, style=label.style_label_up, size=size.small, yloc=yloc.belowbar)

// Actualización del Trailing Stop y el precio más alto (SOLO si inPosition)
if inPosition
    highestHighSinceEntry := math.max(highestHighSinceEntry, high)
    trailingStopPrice := highestHighSinceEntry * (1 - trailingStopPercent / 100)


// Salida por Take Profit (SOLO si inPosition)
if inPosition and close >= takeProfitPrice
    profitPercent := ((close - entryPrice) / entryPrice) * 100
    label.new(bar_index, high, "Venta (TP)\n" + str.tostring(profitPercent, "#.##") + "%", color=color.green, textcolor=color.white, style=label.style_label_down, size=size.small, yloc=yloc.abovebar)
    inPosition := false
    entryPrice := na
    takeProfitPrice := na
    trailingStopPrice := na
    highestHighSinceEntry := na

// Salida por Trailing Stop Loss (SOLO si inPosition)
if inPosition and close <= trailingStopPrice
    profitPercent := ((close - entryPrice) / entryPrice) * 100
    label.new(bar_index, high, "Venta (TSL)\n" + str.tostring(profitPercent, "#.##") + "%", color=color.red, textcolor=color.white, style=label.style_label_down, size=size.small, yloc=yloc.abovebar)
    inPosition := false
    entryPrice := na
    takeProfitPrice := na
    trailingStopPrice := na
    highestHighSinceEntry := na

// --- Plots (opcional) ---
// plot(takeProfitPrice, color=color.green, style=plot.style_linebr, title="Take Profit", linewidth=2)
// plot(trailingStopPrice, color=color.red, style=plot.style_linebr, title="Trailing Stop", linewidth=2)
// plot(inPosition ? highestHighSinceEntry : na, color=color.orange, style=plot.style_line, title="Highest High", linewidth=2) // Plot solo cuando en posición


///=================================================================================================

//Scryp 2

//@version=5
indicator("Estrategia Mejorada con Señales Combinadas y Porcentaje de Ganancia", overlay=true)

// Parámetros
rsiLength = input.int(14, title="Longitud RSI")
rsi = ta.rsi(close, rsiLength)
smaLength = input.int(50, title="Longitud SMA")
sma = ta.sma(close, smaLength)

// Parámetros para Take Profit y Stop Loss
takeProfitPercent = input.float(0.3, title="Take-Profit (%)", minval=0.0)
stopLossPercent = input.float(0.2, title="Stop-Loss (%)", minval=0.0)

// Variables para seguimiento
var float entryPrice = na
var bool inPosition = false
var float takeProfitPrice = na
var float stopLossPrice = na
var float profitPercent = na  // Variable para almacenar el porcentaje de ganancia

// Condiciones para entrada
longCondition = close > sma and ta.crossover(rsi, 50) // Precio por encima de SMA y RSI cruza 50

if (longCondition and not inPosition)
    entryPrice := close
    takeProfitPrice := entryPrice * (1 + takeProfitPercent / 100)
    stopLossPrice := entryPrice * (1 - stopLossPercent / 100)
    inPosition := true
    label.new(bar_index, low, "Compra - Precio: " + str.tostring(entryPrice, "#.##"), color=color.green, textcolor=color.white)

// Lógica para salida
if (inPosition)
    if (close >= takeProfitPrice)  // Si se alcanza el Take Profit
        profitPercent := (takeProfitPrice - entryPrice) / entryPrice * 100
        label.new(bar_index, high, "Venta - Take Profit: " + str.tostring(takeProfitPrice, "#.##") + "\nGanancia: " + str.tostring(profitPercent, "#.##") + "%", color=color.green, textcolor=color.white)
        inPosition := false

    if (close <= stopLossPrice)  // Si se alcanza el Stop Loss
        profitPercent := (stopLossPrice - entryPrice) / entryPrice * 100
        label.new(bar_index, high, "Venta - Stop Loss: " + str.tostring(stopLossPrice, "#.##") + "\nPérdida: " + str.tostring(profitPercent, "#.##") + "%", color=color.red, textcolor=color.white)
        inPosition := false



///=================================================================================================
// SEÑALES Bitsgap