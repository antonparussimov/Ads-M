const ifError = (value, defaultValue, decimalPlaces) => {
  try {
    var result = eval(value)
    // NaNの場合
    if (Number.isNaN(result)) {
      return defaultValue
    }

    // Infinityの場合
    if (!Number.isFinite(result)) {
      return defaultValue
    }

    // toFixed()を使用して指定された桁数に丸める
    var roundedResult = result.toFixed(decimalPlaces)

    // 文字列として返す
    return roundedResult.toString()
  } catch (error) {
    // エラーが発生した場合はdefaultValueを返す
    return defaultValue
  }
}

export default ifError
