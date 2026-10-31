import { describe, expect, it } from "vitest";
import { DESIGN_RELATED } from "./design-creative";

const related = (id: string) => DESIGN_RELATED.find((r) => r.id === id)!;

describe("design creative related prices", () => {
  it("sosmed starts at Rp250.000 per content", () => {
    expect(related("sosmed").price).toBe(250_000);
  });
  it("wedding invitation is Rp199.000", () => {
    expect(related("invitation").price).toBe(199_000);
  });
  it("company website is Rp1.500.000, built once", () => {
    expect(related("company").price).toBe(1_500_000);
    expect(related("company").unit).toBe("sekali buat");
  });
});
