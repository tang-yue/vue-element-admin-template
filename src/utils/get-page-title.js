const title = 'vue-element-admin-template'

export default function getPageTitle(pageTitle) {
    if(pageTitle) {
        return `${pageTitle} - ${title}`
    }
    return title;
}