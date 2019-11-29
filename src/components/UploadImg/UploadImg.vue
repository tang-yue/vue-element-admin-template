<template>
    <el-upload 
        class="avatar-uploader" 
        :action="host"
        :show-file-list="false"
        :on-success="handleSuccess"
        :before-upload="beforeUpload"
        :data="ossParams"
        style="display: inline-block"
    >
        <el-button type="primary" size="mini">
            <slot></slot>
        </el-button>
    </el-upload>
</template>


<script>
import "./lib/crypto1/crypto/crypto.js";
import "./lib/crypto1/hmac/hmac.js";
import "./lib/crypto1/sha1/sha1.js";
import { uploadOssConfig } from "../../utils/utils"
import { Base64 } from "js-base64"

const { accessid, accesskey, host, policyText, uploadUrl } = uploadOssConfig
const policyBase64 = Base64.encode(JSON.stringify(policyText));
const msg = policyBase64;
const bytes = Crypto.HMAC(Crypto.SHA1, msg, accesskey, { asBytes: true });
const signature = Crypto.util.bytesToBase64(bytes);

export default {
    name: 'UploadImg',
    props: {
        dirname: String,
        imgname: String,
    },
    data() {
        return {
            ossParams: {
                key: '',
                success_action_status: '200',
                policy: policyBase64,
                OSSAccessKeyId: accessid,
                signature: signature
            },
            suffix: '',
            host: host,
            uploadUrl: uploadUrl,
            uploadImgData: {}
        }
    },
    computed: {
        randomString() {
            return Math.round(new Date().getTime() / 1000)
        }
    },
    methods: {        
        // 上传成功的回调
        handleSuccess(res, file) {
            // this.host 或者是 this.uploadUrl
            this.uploadImgData[`${this.imgname}`] = this.uploadUrl + '/' + this.ossParams.key;
            this.$store.dispatch('addUplaodImages', this.uploadImgData)
        },
        // 上传之前的回调
        beforeUpload(file) {
            this.get_suffix(file.name);
            this.ossParams.key = 
            `${this.dirname}/${this.randomString}${this.suffix}`
        },
        // 获取后缀
        get_suffix(filename) {
            let pos = filename.lastIndexOf('.')
            if(pos !== -1) {
                this.suffix = filename.substring(pos)
            }
        }

    }
}
</script>

<style lang="less">

</style>
