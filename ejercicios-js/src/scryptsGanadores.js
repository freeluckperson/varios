/////===============================================================================================

// "NO BORRAR" Codigo que genera muchas señales al dia facil de operar "NO BORRAR"

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/

//@version=5
indicator('Swing Points & FVG', overlay=true, max_labels_count=500)

var inputHighlightIntermediates = input(true, 'Highlight Intermediate Swing Highs and Lows')
var inputIntermediateSize = input.string('Tiny', 'Intermediate Swing Label Size', options=['Auto', 'Tiny', 'Small', 'Normal'])
var inputShowShortTermSwings = input(false, 'Short Term Swings')
var inputPivotBars = input(2, 'Pivot Candles')
var highcolor = input.color(color.red, title="High", tooltip="select a color for ST/IT Highs")
var lowcolor = input.color(color.green, title="Low", tooltip="select a color for ST/IT Lows")

var intermediateLabelSize = inputIntermediateSize == 'Auto' ? size.auto : inputIntermediateSize == 'Tiny' ? size.tiny : inputIntermediateSize == 'Small' ? size.small : size.normal

// Parallel arrays for Swing High Data
var float[] swingHighs = array.new_float()
var label[] swingHighLabels = array.new_label()
var bool[] swingHighIsHigher = array.new_bool()
var bool[] swingHighIsIntermediate = array.new_bool()

// Parallel arrays for Swing Low Data
var float[] swingLows = array.new_float()
var label[] swingLowLabels = array.new_label()
var bool[] swingLowIsLower = array.new_bool()
var bool[] swingLowIsIntermediate = array.new_bool()

// see last element pushed an an array
array_peek(arrayId) =>
    int arraySize = array.size(arrayId)
    if arraySize > 0
        array.get(arrayId, arraySize - 1)
    else
        na

// filters out swings that were not intermediate swings after all swings have been recorded.
remove_short_term_swings() =>
    if not inputShowShortTermSwings and barstate.islast
        var swingHighCount = array.size(swingHighLabels)
        var swingLowCount = array.size(swingLowLabels)

        for i = 0 to swingHighCount - 1 by 1
            if not array.get(swingHighIsIntermediate, i)
                label.delete(array.get(swingHighLabels, i))

        for i = 0 to swingLowCount - 1 by 1
            if not array.get(swingLowIsIntermediate, i)
                label.delete(array.get(swingLowLabels, i))


// detect swing highs and lows
swingHighPrice = ta.pivothigh(high, inputPivotBars, inputPivotBars)
swingLowPrice = ta.pivotlow(low, inputPivotBars, inputPivotBars)


if not na(swingHighPrice)
    lastSwingHighPrice = array_peek(swingHighs)
    isHigherHigh = swingHighPrice > lastSwingHighPrice
    isLowerHigh = swingHighPrice < lastSwingHighPrice
    swingLabel = label.new(bar_index[inputPivotBars], swingHighPrice, color=highcolor, yloc=yloc.price, style=label.style_circle, size=size.tiny)

    // check if last swing high was intermediate
    if isLowerHigh and array_peek(swingHighIsHigher)
        // lower high after a higher high means the previous swing high was intermediate
        if inputHighlightIntermediates
            label.set_size(array_peek(swingHighLabels), intermediateLabelSize)
            array.set(swingHighIsIntermediate, array.size(swingHighIsIntermediate) - 1, true)

    // save swing
    array.push(swingHighs, swingHighPrice)
    array.push(swingHighLabels, swingLabel)
    array.push(swingHighIsHigher, isHigherHigh)
    array.push(swingHighIsIntermediate, false)  // can be filled in later, if a lower high forms next

if not na(swingLowPrice)
    lastSwingLowPrice = array_peek(swingLows)
    isHigherLow = swingLowPrice > lastSwingLowPrice
    isLowerLow = swingLowPrice < lastSwingLowPrice
    swingLabel = label.new(bar_index[inputPivotBars], swingLowPrice, color=lowcolor, yloc=yloc.price, style=label.style_circle, size=size.tiny)

    // check if last swing low was intermediate
    if isHigherLow and array_peek(swingLowIsLower)
        // higher low after a lower low means the previous swing low was intermediate
        if inputHighlightIntermediates
            label.set_size(array_peek(swingLowLabels), intermediateLabelSize)
            array.set(swingLowIsIntermediate, array.size(swingLowIsIntermediate) - 1, true)

    // save swing
    array.push(swingLows, swingLowPrice)
    array.push(swingLowLabels, swingLabel)
    array.push(swingLowIsLower, isLowerLow)
    array.push(swingLowIsIntermediate, false)  // can be filled in later if a higher low forms next


remove_short_term_swings()


//IMBALANCE
show_IMB = input.bool(true, "Imbalance", group='IMBALANCE')
imbalancecolor = input.color(color.yellow, title="Imbalance Color", group='IMBALANCE')
fvgTransparency  = input(title="Transparency", defval=60, group='IMBALANCE')
fvgboxLength = input.int(title='Length', defval=0, group='IMBALANCE')

fvgisUp(index) =>
    close[index] > open[index]

fvgisDown(index) =>
    close[index] < open[index]


fvgisObUp(index) =>
    fvgisDown(index + 1) and fvgisUp(index) and close[index] > high[index + 1]


fvgisObDown(index) =>
    fvgisUp(index + 1) and fvgisDown(index) and close[index] < low[index + 1]




bullishFvg = low[0] > high[2]
bearishFvg = high[0] < low[2]
if bullishFvg and show_IMB
    box.new(left=bar_index - 1, top=low[0], right=bar_index + fvgboxLength, bottom=high[2], bgcolor=color.new(imbalancecolor, fvgTransparency), border_color=color.new(imbalancecolor, fvgTransparency))
if bearishFvg and show_IMB
    box.new(left=bar_index - 1, top=low[2], right=bar_index + fvgboxLength, bottom=high[0], bgcolor=color.new(imbalancecolor, fvgTransparency), border_color=color.new(imbalancecolor, fvgTransparency))
//////////////////// FVG //////////////////


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

