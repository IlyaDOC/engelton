import Inputmask from "inputmask";

export default function initMask() {
    Inputmask({
        mask: "+7 (999) 999-99-99",
        showMaskOnHover: false,
        showMaskOnFocus: false,

        onBeforePaste: (pastedValue, opts) => {
            return pastedValue.replace(/^([78])/, "");
        }
    }).mask("[data-phone-number]");
}
