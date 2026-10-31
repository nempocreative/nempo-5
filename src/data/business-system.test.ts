import { describe, expect, it } from "vitest";
import { BIZ_MODULES, modulesMonthlyTotal, superAppPlan, superAppSuggestion } from "./business-system";

const price = (id: string) => BIZ_MODULES.find((m) => m.id === id)?.price;

describe("business system", () => {
  it("keeps module prices from the price list", () => {
    expect(price("kasir")).toBe(149_000);
    expect(price("qr-menu")).toBe(49_000);
    expect(price("marketing")).toBe(249_000);
    expect(price("hpp")).toBe(79_000);
    expect(price("hr")).toBe(129_000);
  });

  it("Super App is Rp699.000/month with Rp750.000 setup", () => {
    expect(superAppPlan().price).toBe(699_000);
    expect(superAppPlan().setup).toBe(750_000);
  });

  it("sums chosen modules per month", () => {
    expect(modulesMonthlyTotal(["kasir", "qr-menu"])).toBe(198_000);
  });

  it("suggests Super App only when it is cheaper than the chosen modules", () => {
    expect(superAppSuggestion(["kasir", "qr-menu"]).suggest).toBe(false);
    // kasir 149 + crm 149 + booking 149 + marketing 249 + loyalty 129 = 825k > 699k
    const s = superAppSuggestion(["kasir", "crm", "booking", "marketing", "loyalty"]);
    expect(s.suggest).toBe(true);
    expect(s.saving).toBe(126_000);
  });

  it("does not suggest Super App for more than 10 modules", () => {
    const eleven = BIZ_MODULES.slice(0, 11).map((m) => m.id);
    expect(superAppSuggestion(eleven).suggest).toBe(false);
  });
});
