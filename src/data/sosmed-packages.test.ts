import { describe, expect, it } from "vitest";
import { SOSMED_BUNDLES, SOSMED_ITEMS, bundleSaving, rupiah } from "./sosmed-packages";

const price = (id: string) => SOSMED_ITEMS.find((i) => i.id === id)?.price;

describe("sosmed packages", () => {
  it("keeps per-item prices from the price list", () => {
    expect(price("ig-ads")).toBe(300_000);
    expect(price("ig-feed")).toBe(1_250_000);
    expect(price("ig-story")).toBe(250_000);
    expect(price("ig-reels")).toBe(650_000);
    expect(price("ig-highlight")).toBe(500_000);
    expect(price("tt-photo")).toBe(400_000);
    expect(price("tt-video")).toBe(500_000);
  });

  it("Paket Social Media is Rp4.000.000 (normal Rp5.000.000), saving Rp1.000.000", () => {
    const b = SOSMED_BUNDLES.find((x) => x.id === "social-media")!;
    expect(b.price).toBe(4_000_000);
    expect(b.normalPrice).toBe(5_000_000);
    expect(bundleSaving(b)).toBe(1_000_000);
  });

  it("All Promotion is Rp7.500.000 (normal Rp10.000.000), saving Rp2.500.000", () => {
    const b = SOSMED_BUNDLES.find((x) => x.id === "all-promotion")!;
    expect(b.price).toBe(7_500_000);
    expect(bundleSaving(b)).toBe(2_500_000);
  });

  it("formats rupiah with dots", () => {
    expect(rupiah(1_250_000)).toBe("Rp1.250.000");
  });
});
