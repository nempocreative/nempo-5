import { describe, expect, it } from "vitest";
import { BUDDY_SERVICES, getBuddyReply, matchBuddyService } from "./nempo-buddy";

describe("Buddy Organizer service routing", () => {
  it("covers all eight Organizer services", () => {
    expect(BUDDY_SERVICES.map(s => s.href)).toEqual(["/event-organizer", "/wedding-organizer", "/wedding-invitation", "/sosmed-management", "/web-development", "/design-creative", "/talent", "/business-system"]);
  });
  it.each([ ["undangan wedding", "invitation"], ["model untuk acara", "talent"], ["band wedding", "talent"], ["poster event", "design"], ["sistem reservasi", "business"], ["website usaha", "web"], ["harga sosmed", "sosmed"], ["paket WO", "wo"], ["paket EO", "eo"] ])("directs %s to the appropriate service", (query, id) => {
    expect(matchBuddyService(query)?.id).toBe(id);
  });
  it("offers Organizer services rather than tourism recommendations", () => {
    expect(getBuddyReply("wisata dekat sini").catalogue).toBe(true);
    expect(matchBuddyService("wisata dekat sini")).toBeUndefined();
  });
});