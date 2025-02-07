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

