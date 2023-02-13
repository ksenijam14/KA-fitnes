import i18n from "@/i18n";
import { setCookie } from "@/scripts/cookies";
import { getCookie } from "@/scripts/cookies";

function getTitle(vm) {
    const { title } = vm.$options
    if (title) {
        return typeof title === 'function'
            ? title.call(vm)
            : title
    }
}

function saveTitleKey(vm) {
    let titleKey = getTitle(vm);
    if (titleKey) {
        setCookie("titleKey", titleKey);
    }
}

function updateTitle() {
    let titleKey = getCookie("titleKey");
    let title = "KA fitnes";
    if (titleKey) {
        title += " | " + i18n.t(titleKey);
    }
    document.title = title;
}

export default {
    created() {
        saveTitleKey(this);
        updateTitle();
    }
}