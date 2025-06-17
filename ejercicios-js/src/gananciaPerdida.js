//====================================================================================
// scrypt con alta tasa de acierto

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

