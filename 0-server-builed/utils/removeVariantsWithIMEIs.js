"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function removeVariantsWithIMEIs(imeis, variants) {
    if (!variants)
        return {};
    let newVariants = [];
    for (const v of variants) {
        const newVariant = {};
        Object.entries(v.imeis || {}).forEach(([key, value]) => {
            const filteredImeis = value.filter((imei) => !imeis.includes(imei));
            newVariant[key] = filteredImeis;
        });
        newVariants.push({ ...v, imeis: newVariant });
    }
    return newVariants;
}
exports.default = removeVariantsWithIMEIs;
