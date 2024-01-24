import { ProductVariant } from "../global.types";

export default function returnVariant(
  prev_variants: ProductVariant[],
  properties: {
    ram: string;
    rom: string;
    processor: string;
    imei: string;
    color: any;
  }
) {
  if (!properties?.imei || prev_variants?.length < 1) return prev_variants;

  const new_variants = prev_variants.map((variant) => {
    if (
      variant.processor === properties.processor &&
      variant.ram === properties.ram &&
      variant.rom === properties.rom
    ) {
      // @ts-ignore
      variant.imeis[properties.color].push(properties.imei);
      return variant;
    } else return variant;
  });

  return new_variants;
}
