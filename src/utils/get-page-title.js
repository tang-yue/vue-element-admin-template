const title = 'User Growth Amdin'

export default function getPageTitle(pageTitle) {
    if(pageTitle) {
        return `${pageTitle} - ${title}`
    }
    return title;
}