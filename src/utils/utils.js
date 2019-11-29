export const uploadOssConfig = {
  accessid: "LTAIfphe8v0Vfydh",
  accesskey: "RFOOQWWngUvKRaIkyMlt69izpR04vW",
  host: "https://hetao-console.oss-cn-beijing.aliyuncs.com",
  policyText: {
    expiration: "2021-01-01T12:00:00.000Z", //设置该Policy的失效时间，超过这个失效时间之后，就没有办法通过这个policy上传文件了
    conditions: [
      ["content-length-range", 0, 1048576000] // 设置上传文件的大小限制
    ]
  },
  uploadUrl: "//cdn.console.pipacoding.com"
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
    if (window.location.origin.indexOf("console.pipacoding.com") !== -1) {
      return "https://api.hetao101.com";
    }
    return "https://api.testing.hetao101.com";
  }
    
  export const commonConfig = {
    apiUrl: domainConfig(),
    devApiUrl: "https://zt.dev.pipacoding.com"
  };