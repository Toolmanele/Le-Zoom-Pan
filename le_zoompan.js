;(function () {
  window.leZoomPan = {
    pan,
    zoom,
  }

  function pan(value, equation) {
    if (!equation) {
      return map(value)
    } else {
      let z = map(value)
      let k = equation.k * z.k
      let b = z.k * equation.b + z.b
      return equationLineKB(k, b)
    }

    function map(v) {
      let k = 1,
        b = v
      return equationLineKB(k, b, '-')
    }
  }

  function zoom(scale, value, equation) {
    // origin 就是映射关系 translate scale
    if (!equation) {
      return map(scale, value)
    } else {
      let z = map(scale, value)
      let k = equation.k * z.k
      let b = z.k * equation.b + z.b
      return equationLineKB(k, b)
    }

    function map(s, p) {
      let k = s,
        b = p * (1 - s)
      return equationLineKB(k, b, '-')
    }
  }

  function equationLineKB(k, b, type) {
    let k1, b1
    if (type === '-') {
      k1 = k
      b1 = b
      k = 1 / k1
      b = -b1 / k1
    } else {
      k1 = 1 / k
      b1 = -b / k
    }

    return {
      k,
      b,
      k1: 1 / k,
      b1: -b / k,
      f: function (v) {
        // 已知 x 求 x1
        return v * k + b
      },

      f_: function (v) {
        // 已知 x1 求 x
        return v * k1 + b1
      },
    }
  }
})()
