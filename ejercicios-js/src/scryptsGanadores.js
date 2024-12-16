//@version=5
indicator("Estrategia Mejorada con Señales Alcistas", overlay=true)

// Parámetros
rsiLength = input.int(14, title="Longitud RSI")
rsi = ta.rsi(close, rsiLength)
smaLength = input.int(50, title="Longitud SMA")
sma = ta.sma(close, smaLength)

// Parámetros para Take Profit y Stop Loss
takeProfitPercent = input.float(0.45, title="Take-Profit (%)", minval=0.0)  // Ajustado a 0.45%
stopLossPercent = input.float(0.5, title="Stop-Loss (%)", minval=0.0)  // Puedes ajustar este valor si es necesario

// Variables para seguimiento
var float entryPrice = na
var bool inPosition = false
var float takeProfitPrice = na
var float stopLossPrice = na

// Condiciones para entrada
longCondition = close > sma and rsi > 50 and ta.crossover(rsi, 50) // Precio por encima de SMA y RSI por encima de 50

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


////======================================================================================================

//@version=5
indicator("Estrategia Mejorada con Señales Combinadas y Porcentaje de Ganancia", overlay=true)

// Parámetros
rsiLength = input.int(14, title="Longitud RSI")
rsi = ta.rsi(close, rsiLength)
smaLength = input.int(50, title="Longitud SMA")
sma = ta.sma(close, smaLength)

// Parámetros MACD
macdLength = input.int(12, title="Longitud MACD")
macdSignalLength = input.int(9, title="Longitud Señal MACD")
[macdLine, macdSignalLine, _] = ta.macd(close, macdLength, macdSignalLength, 9)

// Parámetros para Take Profit y Stop Loss
takeProfitPercent = input.float(0.45, title="Take-Profit (%)", minval=0.0)
stopLossPercent = input.float(0.5, title="Stop-Loss (%)", minval=0.0)

// Parámetros de Volatilidad (ATR)
atrLength = input.int(14, title="Longitud ATR")
atr = ta.atr(atrLength)
multiplier = input.float(1.5, title="Multiplicador ATR", minval=0.5, maxval=3.0)

// Variables para seguimiento
var float entryPrice = na
var bool inPosition = false
var float takeProfitPrice = na
var float stopLossPrice = na

// Condiciones para entrada con confirmación de fuerza alcista
strongRsiCondition = rsi > 60  // RSI por encima de 60 indica una fuerte tendencia alcista
longCondition = close > sma and strongRsiCondition and macdLine > macdSignalLine // Confirmación con SMA y MACD

// Condición de volatilidad (atr es mayor que su promedio)
volatilityCondition = atr > ta.sma(atr, atrLength) // Solo entrar si hay suficiente volatilidad
filteredLongCondition = longCondition and volatilityCondition // Combina todas las condiciones de entrada

if (filteredLongCondition and not inPosition)
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

// Visualización de ATR para entender mejor la volatilidad
plot(atr, color=color.blue, title="ATR (Volatilidad)")

/////===============================================================================================
//@version=5
indicator("Triple EMA 50, 100, 150", overlay=true)

// Definir los periodos de las EMAs
ema_50 = ta.ema(close, 50)
ema_100 = ta.ema(close, 100)
ema_150 = ta.ema(close, 150)

// Dibujar las EMAs en el gráfico con los colores deseados
plot(ema_50, color=color.yellow, title="EMA 50", linewidth=2)
plot(ema_100, color=color.blue, title="EMA 100", linewidth=2)
plot(ema_150, color=color.red, title="EMA 150", linewidth=2)

/////===============================================================================================
//indicadoresGanadores

//@version=5
indicator("Estrategia Mejorada con Señales Alcistas", overlay=true)

// Parámetros
rsiLength = input.int(14, title="Longitud RSI")
rsi = ta.rsi(close, rsiLength)
smaLength = input.int(50, title="Longitud SMA")
sma = ta.sma(close, smaLength)

// Parámetros para Take Profit y Stop Loss
takeProfitPercent = input.float(0.45, title="Take-Profit (%)", minval=0.0)  // Ajustado a 0.45%
stopLossPercent = input.float(0.5, title="Stop-Loss (%)", minval=0.0)  // Puedes ajustar este valor si es necesario

// Variables para seguimiento
var float entryPrice = na
var bool inPosition = false
var float takeProfitPrice = na
var float stopLossPrice = na

// Condiciones para entrada
longCondition = close > sma and rsi > 55 and ta.crossover(rsi, 55) // Precio por encima de SMA y RSI por encima de 55

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


// Definir los periodos de las EMAs
ema_50 = ta.ema(close, 50)
ema_100 = ta.ema(close, 100)
ema_150 = ta.ema(close, 150)

// Dibujar las EMAs en el gráfico con los colores deseados
plot(ema_50, color=color.yellow, title="EMA 50", linewidth=2)
plot(ema_100, color=color.blue, title="EMA 100", linewidth=2)
plot(ema_150, color=color.red, title="EMA 150", linewidth=2)


//======================================================================================
//Dia operando en positivo con este codigo

//@version=5
indicator("Estrategia Mejorada con Señales Alcistas", overlay=true)

// Parámetros
rsiLength = input.int(14, title="Longitud RSI")
rsi = ta.rsi(close, rsiLength)
smaLength = input.int(50, title="Longitud SMA")
sma = ta.sma(close, smaLength)


// Parámetros para Take Profit y Stop Loss
takeProfitPercent = input.float(0.7, title="Take-Profit (%)", minval=0.0)  // Ajustado a 0.45%
stopLossPercent = input.float(0.5, title="Stop-Loss (%)", minval=0.0)  // Puedes ajustar este valor si es necesario

// Variables para seguimiento
var float entryPrice = na
var bool inPosition = false
var float takeProfitPrice = na
var float stopLossPrice = na

// Condiciones para entrada
longCondition = close > sma and rsi > 60 and ta.crossover(rsi, 60) // Precio por encima de SMA y RSI por encima de 55

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