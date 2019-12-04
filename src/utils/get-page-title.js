const title = '增长运营后台'

export default function getPageTitle(pageTitle) {
    if(pageTitle) {
        return `${pageTitle} - ${title}`
    }
    return title;
}