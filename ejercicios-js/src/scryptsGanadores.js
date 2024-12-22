
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


//======================================================================================================

//@version=5
strategy("TP 0.3% SL 1% - Solo Long con MA 200", overlay=true, default_qty_type=strategy.percent_of_equity, default_qty_value=10)

// Parámetros de entrada
tp_percent = input.float(1.0, title="Take Profit (%)", minval=0.1, step=0.1)  // 0.3% TP
sl_percent = input.float(1.0, title="Stop Loss (%)", minval=0.1, step=0.1)    // 1% SL

// Condiciones de entrada basadas en cruce de precio con la media móvil de 200 periodos
ma_200 = ta.sma(close, 200)

long_condition = close > ma_200  // Entrada en largo cuando el precio esté por encima de la MA de 200

// Convertir los porcentajes en valores absolutos para el TP y SL
long_tp = close * (1 + tp_percent / 100)
long_sl = close * (1 - sl_percent / 100)

// Ejecutar las operaciones solo en largo
if long_condition
    strategy.entry("Long", strategy.long)
    strategy.exit("Exit Long", from_entry="Long", limit=long_tp, stop=long_sl)

// Mostrar la media móvil de 200 periodos en el gráfico
plot(ma_200, color=color.orange, linewidth=2)


//================================================================================================================================================


// Definir los periodos de las EMAs
ema_50 = ta.ema(close, 50)
ema_100 = ta.ema(close, 100)
ema_150 = ta.ema(close, 150)

// Dibujar las EMAs en el gráfico con los colores deseados
plot(ema_50, color=color.gray, title="EMA 50", linewidth=2)
plot(ema_100, color=color.gray, title="EMA 100", linewidth=1)
plot(ema_150, color=color.red, title="EMA 150", linewidth=1)

