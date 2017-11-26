var util = {
  /**参数说明：
* 根据长度截取先使用字符串，超长部分追加…
* str 对象字符串
* len 目标字节长度
* 返回值： 处理结果字符串
*/
  cutString: function (str, len) {
    //length属性读出来的汉字长度为1
    if (str.length <= len) {
      return str;
    }
    var s = str.substring(0, len) + "...";
    return s;
  }
}

// function formatTime(time) {
//   if (typeof time !== 'number' || time < 0) {
//     return time
//   }

//   var hour = parseInt(time / 3600)
//   time = time % 3600
//   var minute = parseInt(time / 60)
//   time = time % 60
//   var second = time

//   return ([hour, minute, second]).map(function (n) {
//     n = n.toString()
//     return n[1] ? n : '0' + n
//   }).join(':')
// }

// function formatLocation(longitude, latitude) {
//   if (typeof longitude === 'string' && typeof latitude === 'string') {
//     longitude = parseFloat(longitude)
//     latitude = parseFloat(latitude)
//   }

//   longitude = longitude.toFixed(2)
//   latitude = latitude.toFixed(2)

//   return {
//     longitude: longitude.toString().split('.'),
//     latitude: latitude.toString().split('.')
//   }
// }

module.exports = util;