import { ProductVariant } from "../global.types";

export default function removeVariantsWithIMEIs(
  imeis: string[],
  variants?: ProductVariant[]
) {
  if (!variants) return {};
  let newVariants: any = [];

  for (const v of variants) {
    const newVariant: any = {};
    Object.entries(v.imeis || {}).forEach(([key, value]) => {
      const filteredImeis = value.filter((imei) => !imeis.includes(imei));
      newVariant[key] = filteredImeis;
    });
    newVariants.push({ ...v, imeis: newVariant });
  }

  return newVariants;
}
