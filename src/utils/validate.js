/**
 * Created by jiachenpan on 16/11/18.
 */

export function isvalidUsername(str) {
  const valid_map = ['admin', 'editor']
  return valid_map.indexOf(str.trim()) >= 0
}

/* 合法uri*/
export function validateURL(textval) {
  const urlregex = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/
  return urlregex.test(textval)
}

/* 小写字母*/
export function validateLowerCase(str) {
  const reg = /^[a-z]+$/
  return reg.test(str)
}

/* 大写字母*/
export function validateUpperCase(str) {
  const reg = /^[A-Z]+$/
  return reg.test(str)
}

/* 大小写字母*/
export function validateAlphabets(str) {
  const reg = /^[A-Za-z]+$/
  return reg.test(str)
}

/**
 * validate email
 * @param email
 * @returns {boolean}
 */
// export function validateEmail(email) {
//   const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
//   return re.test(email)
// }

//全局表单验证规则
export const validateName = (rule, value, callback) => { //验证用户中文姓名
  var reg = /^[\u4E00-\u9FA5]+$/;
  if (!reg.test(value)) {
    callback(new Error('错误的姓名'));
  } else if (value.length > 8) {
    callback(new Error('姓名长度过长'));
  } else {
    callback();
  }
};

export const validateChina = (rule, value, callback) => { //验证全中文
  var reg = /^[\u4E00-\u9FA5]+$/;
  if (!reg.test(value)) {
    callback(new Error('必须全中文'));
  } else if (value.length > 20) {
    callback(new Error('字数过长!'));
  } else {
    callback();
  }
};

export const validateTel = (rule, value, callback) => { //验证用户手机号
  let myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
  if (!myreg.test(value)) {
    callback(new Error('手机号格式错误'));
  } else {
    callback();
  }
};

export const validatePassword = (rule, value, callback) => { //验证用户密码 至少大于八位 数字和字母组合
  let p = /^(?!([a-zA-Z]+|\d+)$)[a-zA-Z\d]{8,20}$/;
  let contain = p.test(value); //判断是否同时包含英文和字母
  if (!value) {
    callback(new Error('密码不能为空'));
  } else if (value.length < 8) {
    callback(new Error('请输入 8 位以上的密码'));
  } else if (!contain) {
    callback(new Error('请使用数字和字母组合密码'));
  } else {
    callback();
  }
};

export const validatePassconfirm = (rule, value, callback) => { //验证用户中文姓名
  let p = /^(?!([a-zA-Z]+|\d+)$)[a-zA-Z\d]{8,20}$/;
  let contain = p.test(value); //判断是否同时包含英文和字母
  if (!value) {
    callback(new Error('确认密码不能为空'));
  } else if (value.length < 8) {
    callback(new Error('请输入 8 位以上的密码'));
  } else if (!contain) {
    callback(new Error('请使用数字和字母组合密码'));
  } else if (value != this.form.password) {
    callback(new Error('两次输入的密码不一致'));
  } else {
    callback();
  }
};

export const validateTelcode = (rule, value, callback) => { //验证用户短信验证码
  if (!value) {
    callback(new Error('短信验证码不能为空'));
  } else if (value.length != 6) {
    callback(new Error('请输入 6 位短信验证码'));
  } else {
    callback();
  }
};

export const validateWalletaddress = (rule, value, callback) => { //验证用户短信验证码
  var reg = /^[\u4E00-\u9FA5]+$/;
  if (!value) {
    callback(new Error('钱包地址不能为空'));
  } else if (value.length != 42) {
    callback(new Error('钱包地址格式不对'));
  } else if (reg.test(value)) {
    callback(new Error('钱包地址中包含不能包含中文字符'));
  } else {
    callback();
  }
};

export const validateEmail = (rule, value, callback) => {
  var reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
  if (!value) {
    callback(new Error('邮箱地址不能为空'));
  } else if (!reg.test(value)) {
    callback(new Error('邮箱地址格式错误'));
  } else {
    callback();
  }
}

export const validateIdentity = (rule, value, callback) => {
  if (!value) {
    callback(new Error('身份证不能为空'));
  } else if (value.length < 15) {
    callback(new Error('身份证格式不对'));
  } else {
    callback();
  }
}

export const validateGraphcode = (rule, value, callback) => {
  if (!value) {
    callback(new Error('图形验证码不能为空'));
  } else if (value.length < 4) {
    callback(new Error('图形验证码长度不能低于4位')); //验证用户图形验证码
  } else {
    callback();
  }
}

export const validateSpecial = (rule, value, callback) => {
  var regEn = /[`~!@#$%^&*()_+<>?:"{},.\/;'[\]]/im,
    regCn = /[·！#￥（——）：；“”‘、，|《。》？、【】[\]]/im;
  if (!value.trim()) {
    callback(new Error('内容不能为空'));
  } else if (regEn.test(value) || regCn.test(value)) {
    callback(new Error('内容不能包含特殊字符')); //验证用户图形验证码
  } else {
    callback();
  }
}
