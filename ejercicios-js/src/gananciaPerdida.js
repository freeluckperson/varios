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




    //==============================================================================================================================
    //@version=5
indicator(title="Silver Bullet PRO 5M 10-11am (NY)", overlay=true)

// --- Parámetros ---
lookbackFVG = input.int(defval=5, title="Velas para buscar FVG", minval=1)
lengthSwing = input.int(defval=5, title="Longitud para Swing High/Low", minval=1)

// --- Filtro de Horario (10:00 a 11:00 AM hora NY) ---
currentHourNY() => hour(time, "America/New_York")
inSession = (currentHourNY() >= 10) and (currentHourNY() < 11)

// --- Funciones de Detección de FVG ---
bullishFVG() => low[lookbackFVG] > high[1]
bearishFVG() => high[lookbackFVG] < low[1]

// --- Detección de Swing High/Low ---
swh = ta.pivothigh(high, lengthSwing, lengthSwing)
swl = ta.pivotlow(low, lengthSwing, lengthSwing)

// --- Detección Básica de BoS (Ejemplo Alcista) ---
var bool isBullishBoS = false
if high > swh[1] and not na(swh[1])
    isBullishBoS := true

var bool isBearishBoS = false
if low < swl[1] and not na(swl[1])
    isBearishBoS := true

// --- Detección Básica de Posible CHoCH (Ejemplo Alcista) ---
var bool isBullishCHoCH = false
if low < swl[1] and not na(swl[1]) and high > swh[2] and not na(swh[2]) // Ruptura de un LH previo tras formar un LL
    isBullishCHoCH := true

var bool isBearishCHoCH = false
if high > swh[1] and not na(swh[1]) and low < swl[2] and not na(swl[2]) // Ruptura de un HL previo tras formar un HH
    isBearishCHoCH := true

// --- Detección Muy Simplificada de Posible Zona de Demanda (Última vela bajista antes de movimiento alcista) ---
isPotentialDemand() => close[1] < open[1] and close > open and high - low > ta.atr(14)

// --- Detección Muy Simplificada de Posible Zona de Oferta (Última vela alcista antes de movimiento bajista) ---
isPotentialSupply() => close[1] > open[1] and close < open and high - low > ta.atr(14)

// --- Lógica de Señal de Compra (CONFLUENCIA - Requiere AJUSTE y REFINAMIENTO significativo) ---
buyCondition = bullishFVG() and inSession and (isBullishBoS or isBullishCHoCH) and isPotentialDemand()

buySignal = buyCondition

// --- Lógica de Señal de Venta (CONFLUENCIA - Requiere AJUSTE y REFINAMIENTO significativo) ---
sellCondition = bearishFVG() and inSession and (isBearishBoS or isBearishCHoCH) and isPotentialSupply()

sellSignal = sellCondition

// --- Dibujar Señales ---
plotshape(buySignal, style=shape.labelup, location=location.belowbar, color=color.green, size=size.small, title="Buy Signal PRO")
plotshape(sellSignal, style=shape.labeldown, location=location.abovebar, color=color.red, size=size.small, title="Sell Signal PRO")

// --- Dibujar Líneas FVG ---
if buySignal
    line.new(bar_index - lookbackFVG, high[1], bar_index, low, color=color.green, width=2, extend=extend.right)
if sellSignal
    line.new(bar_index - lookbackFVG, low[1], bar_index, high, color=color.red, width=2, extend=extend.right)

// --- Tabla de Mensajes (PRO) ---
var table t = table.new(position.top_right, 1, 1)

if buySignal
    table.cell(t, 0, 0, "Buy Signal PRO Detected", bgcolor=color.new(color.green, 70), text_color=color.white)
else if sellSignal
    table.cell(t, 0, 0, "Sell Signal PRO Detected", bgcolor=color.new(color.red, 70), text_color=color.white)
else
    table.cell(t, 0, 0, "No Signal PRO", bgcolor=color.new(color.gray, 70), text_color=color.white)

