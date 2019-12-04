export const uploadOssConfig = {
  accessid: "",
  accesskey: "",
  host: "",
  policyText: {
    expiration: "2021-01-01T12:00:00.000Z", //设置该Policy的失效时间，超过这个失效时间之后，就没有办法通过这个policy上传文件了
    conditions: [
      ["content-length-range", 0, 1048576000] // 设置上传文件的大小限制
    ]
  },
  uploadUrl: ""
}

export function judgePower(arr, str) {
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] === str) {
        return true;
      }
    }
    return false;
  }

  function domainConfig() {
    if (window.location.origin.indexOf("online domain name") !== -1) {
      return "https://api.xxxx.com";
    }
    return "https://api.testing.xxxx.com";
  }
    
  export const commonConfig = {
    apiUrl: domainConfig(),
  };