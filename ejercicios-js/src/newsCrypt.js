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
