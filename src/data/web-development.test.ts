import { describe, expect, it } from "vitest";
import { WEB_PLANS, WEB_PROJECTS, firstMonthTotal, monthlySaving, webRupiah } from "./web-development";

const plan = (id: string) => WEB_PLANS.find((p) => p.id === id)!;
const project = (id: string) => WEB_PROJECTS.find((p) => p.id === id)!;

describe("web development prices", () => {
  it("Company Website is Rp1.500.000, built once", () => {
    expect(project("company").price).toBe(1_500_000);
    expect(project("company").billing).toBe("sekali buat");
  });

  it("Link Bio is Rp49.000 per month and Event Ticketing Rp499.000 per event", () => {
    expect(project("link-bio").price).toBe(49_000);
    expect(project("ticketing").price).toBe(499_000);
  });

  it("first month = monthly price + setup, matching the price list", () => {
    expect(firstMonthTotal(plan("mulai-online"))).toBe(179_000);
    expect(firstMonthTotal(plan("operasional-rapi"))).toBe(499_000);
    expect(firstMonthTotal(plan("usaha-bertumbuh"))).toBe(749_000);
    expect(firstMonthTotal(plan("super-app"))).toBe(1_449_000);
  });

  it("monthly savings match the promo labels", () => {
    expect(monthlySaving(plan("mulai-online"))).toBe(20_000);
    expect(monthlySaving(plan("operasional-rapi"))).toBe(150_000);
    expect(monthlySaving(plan("usaha-bertumbuh"))).toBe(250_000);
    expect(monthlySaving(plan("super-app"))).toBe(400_000);
  });

  it("formats rupiah", () => {
    expect(webRupiah(1_449_000)).toBe("Rp1.449.000");
  });
});
