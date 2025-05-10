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
// SILVER BULLET M5

//@version=5
indicator("Silver Bullet Strategy with FVG", overlay=true)

// Parámetros
lookback = input.int(5, title="Velas para buscar FVG", minval=1)

// Filtrar horario: 10:00 a 11:00 AM hora NY (UTC-4 o UTC-5 según horario de verano)
// Para simplificar, asumimos horario NY = UTC-4 (ajusta si es necesario)
currentHour = hour(time, "America/New_York")
currentMinute = minute(time, "America/New_York")
inSession = (currentHour == 10)  // Desde 10:00 hasta antes de 11:00

// Función para detectar FVG alcista
bullishFVG() =>
    // Gap entre low[lookback] y high[1]
    low[lookback] > high[1]

// Función para detectar FVG bajista
bearishFVG() =>
    high[lookback] < low[1]

// Detectar señales
bullFVG = bullishFVG()
bearFVG = bearishFVG()

buySignal = bullFVG and inSession
sellSignal = bearFVG and inSession

// Dibujar señales
plotshape(buySignal, style=shape.labelup, location=location.belowbar, color=color.green, size=size.small, title="Buy Signal")
plotshape(sellSignal, style=shape.labeldown, location=location.abovebar, color=color.red, size=size.small, title="Sell Signal")

// Dibujar líneas FVG
if buySignal
    line.new(bar_index - lookback, high[1], bar_index, low, color=color.green, width=2, extend=extend.right)
if sellSignal
    line.new(bar_index - lookback, low[1], bar_index, high, color=color.red, width=2, extend=extend.right)

// Tabla para mostrar mensajes
var table t = table.new(position.top_right, 1, 1)

if buySignal
    table.cell(t, 0, 0, "Buy Signal Detected", bgcolor=color.new(color.green, 90), text_color=color.white)
else if sellSignal
    table.cell(t, 0, 0, "Sell Signal Detected", bgcolor=color.new(color.red, 90), text_color=color.white)
else
    table.cell(t, 0, 0, "No Signal", bgcolor=color.new(color.gray, 90), text_color=color.white)

///=================================================================================================
// SILVER BULLET M1
//@version=5
indicator("Silver Bullet Strategy multiSS (1M)", overlay=true)

// PARÁMETROS
lookback = input.int(5, "Velas para FVG", minval=1)
maxBarsAfterFVG = input.int(5, "Barras máx. post-FVG", minval=1)

// DETECCIÓN DE HORARIO (10:00-11:00 AM NY, 3:00-4:00 AM NY, 9:30-10:00 AM NY, 4:00-5:00 PM NY)
currentHour = hour(time, "America/New_York")
currentMinute = minute(time, "America/New_York")
inSession = (currentHour == 10) or (currentHour == 3) or (currentHour == 9 and currentMinute < 30) or (currentHour == 16)

// SEGUIMIENTO DE LIQUIDEZ INTRADÍA
var float sessionHigh = na
var float sessionLow = na
var bool newDay = ta.change(time("D"))

if inSession
    if newDay or na(sessionHigh)
        sessionHigh := high
        sessionLow := low
    else
        sessionHigh := math.max(sessionHigh, high)
        sessionLow := math.min(sessionLow, low)
else
    sessionHigh := na
    sessionLow := na

// DETECCIÓN FVG MEJORADA CON LIQUIDEZ
bullishFVG() =>
    fvgCondition = low[lookback] > high[1]
    liquiditySweep = sessionLow < low[lookback]
    fvgCondition and liquiditySweep

bearishFVG() =>
    fvgCondition = high[lookback] < low[1]
    liquiditySweep = sessionHigh > high[lookback]
    fvgCondition and liquiditySweep

// ALMACENAMIENTO FVG Y NIVELES CLAVE
var float bullFvgHigh = na
var float bullFvgLow = na
var float bearFvgHigh = na
var float bearFvgLow = na
var bool bullFvgActive = false
var bool bearFvgActive = false
var int bullBarsCount = 0
var int bearBarsCount = 0

if bullishFVG() and inSession
    bullFvgHigh := high[lookback]
    bullFvgLow := low[1]
    bullFvgActive := true
    bullBarsCount := 0

if bearishFVG() and inSession
    bearFvgHigh := low[1]
    bearFvgLow := high[lookback]
    bearFvgActive := true
    bearBarsCount := 0

// ACTUALIZACIÓN CONTADORES
if bullFvgActive
    bullBarsCount += 1
    if bullBarsCount > maxBarsAfterFVG
        bullFvgActive := false

if bearFvgActive
    bearBarsCount += 1
    if bearBarsCount > maxBarsAfterFVG
        bearFvgActive := false

// NIVELES DE 50% Y CONFIRMACIÓN MSS
bullFvg50 = bullFvgActive ? (bullFvgHigh + bullFvgLow) / 2 : na
bearFvg50 = bearFvgActive ? (bearFvgHigh + bearFvgLow) / 2 : na

mssBullConfirmation = close > bullFvgHigh and low > bullFvgLow
mssBearConfirmation = close < bearFvgLow and high < bearFvgHigh

// CONDICIONES DE ENTRADA FINALES
buySignal = bullFvgActive and (low <= bullFvg50) and (close >= bullFvg50) and mssBullConfirmation
sellSignal = bearFvgActive and (high >= bearFvg50) and (close <= bearFvg50) and mssBearConfirmation

// DIBUJADO
// Zonas FVG
if bullFvgActive
    box.new(bar_index - lookback, bullFvgHigh, bar_index, bullFvgLow, border_color=color.new(color.green, 50), bgcolor=color.new(color.green, 90))
    line.new(bar_index, bullFvg50, bar_index - maxBarsAfterFVG, bullFvg50, color=color.green, style=line.style_dotted)

if bearFvgActive
    box.new(bar_index - lookback, bearFvgHigh, bar_index, bearFvgLow, border_color=color.new(color.red, 50), bgcolor=color.new(color.red, 90))
    line.new(bar_index, bearFvg50, bar_index - maxBarsAfterFVG, bearFvg50, color=color.red, style=line.style_dotted)

// Señales
plotshape(buySignal, style=shape.labelup, location=location.belowbar, color=color.green, size=size.small, title="Buy")
plotshape(sellSignal, style=shape.labeldown, location=location.abovebar, color=color.red, size=size.small, title="Sell")

// TABLA DE ESTADO
var table t = table.new(position.top_right, 1, 3)
if buySignal
    table.cell(t, 0, 0, "ENTRADA COMPRA\nNivel: " + str.tostring(bullFvg50), bgcolor=color.green)
else if sellSignal
    table.cell(t, 0, 0, "ENTRADA VENTA\nNivel: " + str.tostring(bearFvg50), bgcolor=color.red)
else
    table.cell(t, 0, 0, "ESPERANDO\nSEÑAL", bgcolor=color.gray)
