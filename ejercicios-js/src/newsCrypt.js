//@version=5
strategy("Estrategia Long con EMAs", overlay=true)

// Definir los periodos de las EMAs
ema_50 = ta.ema(close, 50)
ema_100 = ta.ema(close, 100)
ema_150 = ta.ema(close, 150)

// Dibujar las EMAs en el gráfico
plot(ema_50, color=color.gray, title="EMA 50", linewidth=2)
plot(ema_100, color=color.gray, title="EMA 100", linewidth=1)
plot(ema_150, color=color.red, title="EMA 150", linewidth=1)

// Condición para entrada en largo
longCondition = ta.crossover(ema_50, ema_100) and close > ema_150

if (longCondition)
    // Calcular niveles de TP y SL
    takeProfit = close * 1.003 // TP del 0.3%
    stopLoss = close * 0.99     // SL del 1%
    
    // Ejecutar orden de compra
    strategy.entry("Long", strategy.long)
    
    // Establecer niveles de TP y SL
    strategy.exit("Take Profit/Stop Loss", "Long", limit=takeProfit, stop=stopLoss)

//======================================================================================

//@version=6
indicator(title="Moving Average Exponential", shorttitle="EMA", overlay=true, timeframe="", timeframe_gaps=true)
len = input.int(9, minval=1, title="Length")
src = input(close, title="Source")
offset = input.int(title="Offset", defval=0, minval=-500, maxval=500, display = display.data_window)
out = ta.ema(src, len)
plot(out, title="EMA", color=color.blue, offset=offset)

// Smoothing MA inputs
GRP = "Moving Average"
TT_BB = "Only applies when 'SMA + Bollinger Bands' is selected. Determines the distance between the SMA and the bands."
maTypeInput = input.string("None", "Type", options = ["None", "SMA", "SMA + Bollinger Bands", "EMA", "SMMA (RMA)", "WMA", "VWMA"], group = GRP, display = display.data_window)
maLengthInput = input.int(14, "Length", group = GRP, display = display.data_window)
bbMultInput = input.float(2.0, "BB StdDev", minval = 0.001, maxval = 50, step = 0.5, tooltip = TT_BB, group = GRP, display = display.data_window)
var enableMA = maTypeInput != "None"
var isBB = maTypeInput == "SMA + Bollinger Bands"

// Smoothing MA Calculation
ma(source, length, MAtype) =>
    switch MAtype
        "SMA"                   => ta.sma(source, length)
        "SMA + Bollinger Bands" => ta.sma(source, length)
        "EMA"                   => ta.ema(source, length)
        "SMMA (RMA)"            => ta.rma(source, length)
        "WMA"                   => ta.wma(source, length)
        "VWMA"                  => ta.vwma(source, length)

// Smoothing MA plots
smoothingMA = enableMA ? ma(out, maLengthInput, maTypeInput) : na
smoothingStDev = isBB ? ta.stdev(out, maLengthInput) * bbMultInput : na
plot(smoothingMA, "EMA-based MA", color=color.yellow, display = enableMA ? display.all : display.none)
bbUpperBand = plot(smoothingMA + smoothingStDev, title = "Upper Bollinger Band", color=color.green, display = isBB ? display.all : display.none)
bbLowerBand = plot(smoothingMA - smoothingStDev, title = "Lower Bollinger Band", color=color.green, display = isBB ? display.all : display.none)
fill(bbUpperBand, bbLowerBand, color= isBB ? color.new(color.green, 90) : na, title="Bollinger Bands Background Fill", display = isBB ? display.all : display.none)

//======================================================================================
//CODIGO PARA OPERAR EN LONG

//@version=5
indicator("Estrategia Mejorada con Señales Alcistas", overlay=true)

// Parámetros
rsiLength = input.int(14, title="Longitud RSI")
rsi = ta.rsi(close, rsiLength)
smaLength = input.int(50, title="Longitud SMA")
sma = ta.sma(close, smaLength)

// Parámetros para las EMAs
ema1Length = input.int(50, title="Longitud EMA 1")
ema2Length = input.int(100, title="Longitud EMA 2")
ema3Length = input.int(150, title="Longitud EMA 3")

// Cálculo de las EMAs
ema1 = ta.ema(close, ema1Length)
ema2 = ta.ema(close, ema2Length)
ema3 = ta.ema(close, ema3Length)

// Parámetros para Take Profit y Stop Loss
takeProfitPercent = input.float(0.7, title="Take-Profit (%)", minval=0.0)
stopLossPercent = input.float(2, title="Stop-Loss (%)", minval=0.0)

// Variables para seguimiento
var float entryPrice = na
var bool inPosition = false
var float takeProfitPrice = na
var float stopLossPrice = na

// Condiciones para entrada
longCondition = close > ema1 and close > ema2 and close > ema3 and ema1 > ema2 and ema2 > ema3 and rsi > 55 and ta.crossover(rsi, 55)

if (longCondition and not inPosition)
    entryPrice := close
    takeProfitPrice := entryPrice * (1 + takeProfitPercent / 100)
    stopLossPrice := entryPrice * (1 - stopLossPercent / 100)
    inPosition := true
    label.new(bar_index, low, "Compra - Precio: " + str.tostring(entryPrice, "#.##"), color=color.green, textcolor=color.white)

// Lógica para salida
if (inPosition)
    // Si se alcanza el Take Profit
    if (close >= takeProfitPrice)  
        label.new(bar_index, high, "Venta - Take Profit: " + str.tostring(takeProfitPrice, "#.##"), color=color.green, textcolor=color.white)
        inPosition := false

    // Si se alcanza el Stop Loss
    if (close <= stopLossPrice)  
        label.new(bar_index, high, "Venta - Stop Loss: " + str.tostring(stopLossPrice, "#.##"), color=color.red, textcolor=color.white)
        inPosition := false

// Visualización de niveles de TP y SL
plot(inPosition ? takeProfitPrice : na, color=color.green, style=plot.style_stepline, title="Take Profit")
plot(inPosition ? stopLossPrice : na, color=color.red, style=plot.style_stepline, title="Stop Loss")

// Dibujar las EMAs en el gráfico con los colores deseados
plot(ema1, color=color.yellow, title="EMA 50", linewidth=2)
plot(ema2, color=color.blue, title="EMA 100", linewidth=2)
plot(ema3, color=color.red, title="EMA 150", linewidth=2)

//======================================================================================
// CODIGO PARA OPERAR EN SHORT

//@version=5
indicator("Estrategia Mejorada con Señales Bajistas", overlay=true)

// Parámetros
rsiLength = input.int(14, title="Longitud RSI")
rsi = ta.rsi(close, rsiLength)
smaLength = input.int(50, title="Longitud SMA")
sma = ta.sma(close, smaLength)

// Parámetros para las EMAs
ema1Length = input.int(50, title="Longitud EMA 1")
ema2Length = input.int(100, title="Longitud EMA 2")
ema3Length = input.int(150, title="Longitud EMA 3")

// Cálculo de las EMAs
ema1 = ta.ema(close, ema1Length)
ema2 = ta.ema(close, ema2Length)
ema3 = ta.ema(close, ema3Length)

// Parámetros para Take Profit y Stop Loss
takeProfitPercent = input.float(0.7, title="Take-Profit (%)", minval=0.0)
stopLossPercent = input.float(2, title="Stop-Loss (%)", minval=0.0)

// Variables para seguimiento
var float entryPrice = na
var bool inPosition = false
var float takeProfitPrice = na
var float stopLossPrice = na

// Condiciones para entrada en corto
shortCondition = close < ema1 and close < ema2 and close < ema3 and ema1 < ema2 and ema2 < ema3 and rsi < 45 and ta.crossunder(rsi, 45)

if (shortCondition and not inPosition)
    entryPrice := close
    takeProfitPrice := entryPrice * (1 - takeProfitPercent / 100) // TP para corto
    stopLossPrice := entryPrice * (1 + stopLossPercent / 100) // SL para corto
    inPosition := true
    label.new(bar_index, high, "Venta - Precio: " + str.tostring(entryPrice, "#.##"), color=color.red, textcolor=color.white)

// Lógica para salida en corto
if (inPosition)
    // Si se alcanza el Take Profit
    if (close <= takeProfitPrice)  
        label.new(bar_index, low, "Cierre - Take Profit: " + str.tostring(takeProfitPrice, "#.##"), color=color.green, textcolor=color.white)
        inPosition := false

    // Si se alcanza el Stop Loss
    if (close >= stopLossPrice)  
        label.new(bar_index, low, "Cierre - Stop Loss: " + str.tostring(stopLossPrice, "#.##"), color=color.red, textcolor=color.white)
        inPosition := false

// Visualización de niveles de TP y SL
plot(inPosition ? takeProfitPrice : na, color=color.green, style=plot.style_stepline, title="Take Profit")
plot(inPosition ? stopLossPrice : na, color=color.red, style=plot.style_stepline, title="Stop Loss")

// Dibujar las EMAs en el gráfico con los colores deseados
plot(ema1, color=color.yellow, title="EMA 50", linewidth=2)
plot(ema2, color=color.blue, title="EMA 100", linewidth=2)
plot(ema3, color=color.red, title="EMA 150", linewidth=2)


//======================================================================================
//@version=5
strategy("EMA Cross 7-21 con Alineación 1H y 15M, entrada en 5M", overlay=true, default_qty_type=strategy.percent_of_equity, default_qty_value=2)

// Parámetros EMAs
emaFastLen = 7
emaSlowLen = 21

// Función para obtener EMA en timeframe dado
getEMA(tf, length) =>
    request.security(syminfo.tickerid, tf, ta.ema(close, length))

// Obtener EMAs en 1H y 15M para definir tendencia
emaFast_1H = getEMA("60", emaFastLen)
emaSlow_1H = getEMA("60", emaSlowLen)
emaFast_15M = getEMA("15", emaFastLen)
emaSlow_15M = getEMA("15", emaSlowLen)

// Definir tendencia en 1H y 15M
trendUp_1H = emaFast_1H > emaSlow_1H
trendDown_1H = emaFast_1H < emaSlow_1H
trendUp_15M = emaFast_15M > emaSlow_15M
trendDown_15M = emaFast_15M < emaSlow_15M

// Confirmar que tendencia en 1H y 15M coinciden
trendUp = trendUp_1H and trendUp_15M
trendDown = trendDown_1H and trendDown_15M

// EMAs en 5M para detectar cruce de entrada
emaFast_5M = ta.ema(close, emaFastLen)
emaSlow_5M = ta.ema(close, emaSlowLen)

// Condiciones de entrada en 5M con cruce EMA 7-21 y alineación de tendencia
longCondition = trendUp and ta.crossover(emaFast_5M, emaSlow_5M)
shortCondition = trendDown and ta.crossunder(emaFast_5M, emaSlow_5M)

// Parámetros SL y TP fijos (%)
stopLossPerc = 0.004  // 0.4%
takeProfitPerc = 0.008  // 0.8%

// Variables para almacenar precio de entrada
var float entryPriceLong = na
var float entryPriceShort = na

// Entradas
if (longCondition)
    entryPriceLong := close
    strategy.entry("Long", strategy.long)

if (shortCondition)
    entryPriceShort := close
    strategy.entry("Short", strategy.short)

// Salidas con SL y TP fijos
if (strategy.position_size > 0 and not na(entryPriceLong))
    stopLossLong = entryPriceLong * (1 - stopLossPerc)
    takeProfitLong = entryPriceLong * (1 + takeProfitPerc)
    strategy.exit("Exit Long", "Long", stop=stopLossLong, limit=takeProfitLong)

if (strategy.position_size < 0 and not na(entryPriceShort))
    stopLossShort = entryPriceShort * (1 + stopLossPerc)
    takeProfitShort = entryPriceShort * (1 - takeProfitPerc)
    strategy.exit("Exit Short", "Short", stop=stopLossShort, limit=takeProfitShort)

// Visualización EMAs para análisis
plot(emaFast_1H, color=color.blue, title="EMA 7 (1H)", linewidth=2)
plot(emaSlow_1H, color=color.orange, title="EMA 21 (1H)", linewidth=2)
plot(emaFast_15M, color=color.purple, title="EMA 7 (15M)")
plot(emaSlow_15M, color=color.maroon, title="EMA 21 (15M)")
plot(emaFast_5M, color=color.green, title="EMA 7 (5M)")
plot(emaSlow_5M, color=color.red, title="EMA 21 (5M)")

//======================================================================================

//@version=6
strategy("MACD + EMA200 MultiTF con Gestión Profesional", overlay=true, default_qty_type=strategy.percent_of_equity, default_qty_value=2, initial_capital=10000)

// Parámetros
emaLen = 200
macd_fast = 12
macd_slow = 26
macd_signal = 9
atrLen = 14
atrMultSL = 0.5
tp1_mult = 1.0
tp2_mult = 2.0
swingLookback = 7

// Funciones auxiliares para detectar posición abierta
estrategia_posicion_larga() =>
    strategy.position_size > 0

estrategia_posicion_corta() =>
    strategy.position_size < 0

// EMA 200 en 1H y 15M para confirmar tendencia
ema200_1h = request.security(syminfo.tickerid, "60", ta.ema(close, emaLen))
ema200_15m = request.security(syminfo.tickerid, "15", ta.ema(close, emaLen))

// Tendencia alineada
tendencia_alcista = (close > ema200_1h) and (close > ema200_15m)
tendencia_bajista = (close < ema200_1h) and (close < ema200_15m)

// MACD en M5
[macdLine, signalLine, _] = ta.macd(close, macd_fast, macd_slow, macd_signal)

// ATR para stops
atr = ta.atr(atrLen)

// Variables para controlar señales y gestión
var bool inTrade = false
var float entryPrice = na
var float stopLoss = na
var float takeProfit1 = na
var float takeProfit2 = na
var string posID = ""

// Función para obtener swing high y low recientes
swingHigh = ta.highest(high, swingLookback)
swingLow = ta.lowest(low, swingLookback)

// Condiciones de entrada
longSignal = tendencia_alcista and ta.crossover(macdLine, signalLine) and not inTrade
shortSignal = tendencia_bajista and ta.crossunder(macdLine, signalLine) and not inTrade

// Entradas
if (longSignal)
    entryPrice := close
    stopLoss := swingLow - atrMultSL * atr
    takeProfit1 := entryPrice + tp1_mult * (entryPrice - stopLoss)
    takeProfit2 := entryPrice + tp2_mult * (entryPrice - stopLoss)
    posID := "Long"
    strategy.entry(posID, strategy.long)
    inTrade := true
    label.new(bar_index, low, "LONG ENTRY", color=color.green, style=label.style_label_up, textcolor=color.white, size=size.small)

if (shortSignal)
    entryPrice := close
    stopLoss := swingHigh + atrMultSL * atr
    takeProfit1 := entryPrice - tp1_mult * (stopLoss - entryPrice)
    takeProfit2 := entryPrice - tp2_mult * (stopLoss - entryPrice)
    posID := "Short"
    strategy.entry(posID, strategy.short)
    inTrade := true
    label.new(bar_index, high, "SHORT ENTRY", color=color.red, style=label.style_label_down, textcolor=color.white, size=size.small)

// Gestión de salidas parciales y totales
if inTrade
    // Salida parcial TP1 al alcanzar primer objetivo
    if strategy.position_size > 0 and close >= takeProfit1
        strategy.close(posID, qty_percent=25)
        label.new(bar_index, takeProfit1, "TP1", color=color.lime, style=label.style_label_down, textcolor=color.black, size=size.tiny)
    if strategy.position_size < 0 and close <= takeProfit1
        strategy.close(posID, qty_percent=25)
        label.new(bar_index, takeProfit1, "TP1", color=color.lime, style=label.style_label_up, textcolor=color.black, size=size.tiny)

    // Salida total TP2 al alcanzar segundo objetivo
    if strategy.position_size > 0 and close >= takeProfit2
        strategy.close(posID)
        label.new(bar_index, takeProfit2, "TP2", color=color.green, style=label.style_label_down, textcolor=color.white, size=size.small)
        inTrade := false
    if strategy.position_size < 0 and close <= takeProfit2
        strategy.close(posID)
        label.new(bar_index, takeProfit2, "TP2", color=color.red, style=label.style_label_up, textcolor=color.white, size=size.small)
        inTrade := false

    // Stop Loss
    if strategy.position_size > 0 and close <= stopLoss
        strategy.close(posID)
        label.new(bar_index, stopLoss, "SL", color=color.red, style=label.style_label_down, textcolor=color.white, size=size.small)
        inTrade := false
    if strategy.position_size < 0 and close >= stopLoss
        strategy.close(posID)
        label.new(bar_index, stopLoss, "SL", color=color.red, style=label.style_label_up, textcolor=color.white, size=size.small)
        inTrade := false

// Salida por cruce inverso MACD o cambio de tendencia
longExitCond = estrategia_posicion_larga() and (ta.crossunder(macdLine, signalLine) or not tendencia_alcista)
shortExitCond = estrategia_posicion_corta() and (ta.crossover(macdLine, signalLine) or not tendencia_bajista)

if longExitCond
    strategy.close("Long")
    label.new(bar_index, high, "LONG EXIT", color=color.orange, style=label.style_label_down, textcolor=color.white, size=size.tiny)
    inTrade := false

if shortExitCond
    strategy.close("Short")
    label.new(bar_index, low, "SHORT EXIT", color=color.orange, style=label.style_label_up, textcolor=color.white, size=size.tiny)
    inTrade := false

// Plots para visualización
plot(ema200_1h, color=color.blue, title="EMA 200 1H")
plot(ema200_15m, color=color.purple, title="EMA 200 15M")
plot(macdLine - signalLine, color=(macdLine - signalLine) >= 0 ? color.green : color.red, style=plot.style_histogram, title="MACD Histograma")

// Plotshapes para entradas y salidas (tamaños pequeños)
plotshape(longSignal, title="Señal Long", location=location.belowbar, color=color.green, style=shape.triangleup, size=size.small)
plotshape(shortSignal, title="Señal Short", location=location.abovebar, color=color.red, style=shape.triangledown, size=size.small)
plotshape(longExitCond and strategy.position_size > 0, title="Salida Long", location=location.abovebar, color=color.orange, style=shape.xcross, size=size.tiny)
plotshape(shortExitCond and strategy.position_size < 0, title="Salida Short", location=location.belowbar, color=color.orange, style=shape.xcross, size=size.tiny)


// Alertas para señales
alertcondition(longSignal, title="Entrada Long", message="Señal de entrada LONG con MACD + EMA200 multiTF")
alertcondition(shortSignal, title="Entrada Short", message="Señal de entrada SHORT con MACD + EMA200 multiTF")
alertcondition(longExitCond, title="Salida Long", message="Señal de salida LONG")
alertcondition(shortExitCond, title="Salida Short", message="Señal de salida SHORT")
