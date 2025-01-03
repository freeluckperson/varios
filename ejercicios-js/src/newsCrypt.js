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
