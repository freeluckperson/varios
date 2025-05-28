/////===============================================================================================

// "NO BORRAR" Codigo que genera muchas señales al dia facil de operar "NO BORRAR"



/////===============================================================================================

//@version=5
indicator("Estrategia Mejorada con Señales Alcistas", overlay=true)

// Parámetros
rsiLength = input.int(14, title="Longitud RSI")
rsi = ta.rsi(close, rsiLength)
smaLength = input.int(50, title="Longitud SMA")
sma = ta.sma(close, smaLength)

// Parámetros para Take Profit y Stop Loss
takeProfitPercent = input.float(0.71, title="Take-Profit (%)", minval=0.0)  // Ajustado a 0.7%
stopLossPercent = input.float(2, title="Stop-Loss (%)", minval=0.0)  // Puedes ajustar este valor si es necesario

// Variables para seguimiento
var float entryPrice = na
var bool inPosition = false
var float takeProfitPrice = na
var float stopLossPrice = na

// Condiciones para entrada (ajustadas para más señales)
longCondition = (close > sma and rsi > 50 and ta.crossover(rsi, 50)) or (close < sma and rsi < 40 and ta.crossunder(rsi, 40))

if (longCondition and not inPosition)
    entryPrice := close
    takeProfitPrice := entryPrice * (1 + takeProfitPercent / 100)
    stopLossPrice := entryPrice * (1 - stopLossPercent / 100)
    inPosition := true
    label.new(bar_index, low, "Compra - Precio: " + str.tostring(entryPrice, "#.##"), color=color.green, textcolor=color.white)

// Lógica para salida
if (inPosition)
    // Si se alcanza el Take Profit con la mecha
    if (ta.highest(high, 1) >= takeProfitPrice)  
        label.new(bar_index, high, "Venta - Take Profit: " + str.tostring(takeProfitPrice, "#.##"), color=color.green, textcolor=color.white)
        inPosition := false

    // Si se alcanza el Stop Loss
    if (close <= stopLossPrice)  
        label.new(bar_index, high, "Venta - Stop Loss: " + str.tostring(stopLossPrice, "#.##"), color=color.red, textcolor=color.white)
        inPosition := false

// Visualización de niveles de TP y SL en blanco
plot(inPosition ? takeProfitPrice : na, color=color.white, style=plot.style_stepline, title="Take Profit")
plot(inPosition ? stopLossPrice : na, color=color.white, style=plot.style_stepline, title="Stop Loss")

/////===============================================================================================

// UT_BOT_ALERTS  https://youtu.be/B3OTAcLDfLw?si=NuTomy1j_0mH_5Jw

//@version=4
study(title="UT Bot Alerts", overlay = true)

// Inputs
a = input(1,     title = "Key Vaule. 'This changes the sensitivity'")
c = input(10,    title = "ATR Period")
h = input(false, title = "Signals from Heikin Ashi Candles")

xATR  = atr(c)
nLoss = a * xATR

src = h ? security(heikinashi(syminfo.tickerid), timeframe.period, close, lookahead = false) : close

xATRTrailingStop = 0.0
xATRTrailingStop := iff(src > nz(xATRTrailingStop[1], 0) and src[1] > nz(xATRTrailingStop[1], 0), max(nz(xATRTrailingStop[1]), src - nLoss),
   iff(src < nz(xATRTrailingStop[1], 0) and src[1] < nz(xATRTrailingStop[1], 0), min(nz(xATRTrailingStop[1]), src + nLoss), 
   iff(src > nz(xATRTrailingStop[1], 0), src - nLoss, src + nLoss)))
 
pos = 0   
pos :=  iff(src[1] < nz(xATRTrailingStop[1], 0) and src > nz(xATRTrailingStop[1], 0), 1,
   iff(src[1] > nz(xATRTrailingStop[1], 0) and src < nz(xATRTrailingStop[1], 0), -1, nz(pos[1], 0))) 
   
xcolor = pos == -1 ? color.red: pos == 1 ? color.green : color.blue 

ema   = ema(src,1)
above = crossover(ema, xATRTrailingStop)
below = crossover(xATRTrailingStop, ema)

buy  = src > xATRTrailingStop and above 
sell = src < xATRTrailingStop and below

barbuy  = src > xATRTrailingStop 
barsell = src < xATRTrailingStop 

plotshape(buy,  title = "Buy",  text = 'Buy',  style = shape.labelup,   location = location.belowbar, color= color.green, textcolor = color.white, transp = 0, size = size.tiny)
plotshape(sell, title = "Sell", text = 'Sell', style = shape.labeldown, location = location.abovebar, color= color.red,   textcolor = color.white, transp = 0, size = size.tiny)

barcolor(barbuy  ? color.green : na)
barcolor(barsell ? color.red   : na)

alertcondition(buy,  "UT Long",  "UT Long")
alertcondition(sell, "UT Short", "UT Short")

//================================================================================================================================================================================
// Estrategia con tasa de acierto del 85%

//@version=5
strategy("MACD + EMA 200 Multitemporal 5M con TP fijo 0.45%", overlay=true)

// Función para obtener estado precio vs EMA 200 en un timeframe dado
getPriceVsEMA(tf) =>
    ema200 = request.security(syminfo.tickerid, tf, ta.ema(close, 200))
    price = request.security(syminfo.tickerid, tf, close)
    price > ema200

// Temporalidades a evaluar para alineación
tf_main = "5"    // Temporalidad principal para operar
tf_15m = "15"    // Temporalidad superior inmediata
tf_1h = "60"     // Temporalidad superior media

// Estados booleanos para cada timeframe
above5M = getPriceVsEMA(tf_main)
above15M = getPriceVsEMA(tf_15m)
above1H = getPriceVsEMA(tf_1h)

// EMA 200 en timeframe principal para referencia visual
ema200_main = ta.ema(close, 200)
plot(ema200_main, color=color.yellow, linewidth=2, title="EMA 200 5M")

// Cálculo MACD en timeframe principal (5M)
[macdLine, signalLine, _] = ta.macd(close, 12, 26, 9)

// Condiciones para operar
tendenciaAlcista = above5M and (above15M or above1H)
tendenciaBajista = not above5M and (not above15M or not above1H)

// Señal de compra: tendencia alcista + cruce MACD al alza
longCondition = tendenciaAlcista and ta.crossover(macdLine, signalLine)

// Señal de venta: tendencia bajista + cruce MACD a la baja
shortCondition = tendenciaBajista and ta.crossunder(macdLine, signalLine)

// Definir porcentaje TP fijo
tp_perc = 0.0045  // 0.45% expresado en decimal

// Ejecutar órdenes con TP fijo
if (longCondition)
    strategy.entry("Long", strategy.long)
    // Take Profit para posición larga
    strategy.exit("Exit Long", "Long", profit=tp_perc * strategy.position_avg_price)

if (shortCondition)
    strategy.entry("Short", strategy.short)
    // Take Profit para posición corta
    strategy.exit("Exit Short", "Short", profit=tp_perc * strategy.position_avg_price)

// Mostrar etiquetas para estado EMA 200 multitemporal
var label lbl5M = na
var label lbl15M = na
var label lbl1H = na

if barstate.islast
    label.delete(lbl5M)
    label.delete(lbl15M)
    label.delete(lbl1H)
    lbl5M := label.new(bar_index, high, "5M EMA200: " + (above5M ? "Arriba" : "Abajo"), xloc.bar_index, yloc.price, color=above5M ? color.green : color.red, style=label.style_label_down, textcolor=color.white, size=size.small)
    lbl15M := label.new(bar_index, high * 0.995, "15M EMA200: " + (above15M ? "Arriba" : "Abajo"), xloc.bar_index, yloc.price, color=above15M ? color.green : color.red, style=label.style_label_down, textcolor=color.white, size=size.small)
    lbl1H := label.new(bar_index, high * 0.99, "1H EMA200: " + (above1H ? "Arriba" : "Abajo"), xloc.bar_index, yloc.price, color=above1H ? color.green : color.red, style=label.style_label_down, textcolor=color.white, size=size.small)
