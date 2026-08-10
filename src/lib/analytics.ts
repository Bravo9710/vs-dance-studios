export type CtaClickPayload = {
  cta_id: string;
  cta_text: string;
  cta_location: string;
  cta_destination: string;
};

export type CtaClickEvent = CtaClickPayload & { event: "cta_click" };

declare global {
  interface Window {
    dataLayer: unknown[];
  }
}

function buildCtaClickEvent(payload: CtaClickPayload): CtaClickEvent {
  return { event: "cta_click", ...payload };
}

/** For client components: pushes the event directly at runtime. */
export function pushCtaClick(payload: CtaClickPayload): void {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(buildCtaClickEvent(payload));
}

/**
 * For zero-client-JS Server Components: a `data-cta-event` attribute value,
 * read by ctaClickDelegationScript's single delegated listener on click.
 * A literal `onclick="..."` attribute can't be used here — React detects
 * any lowercase `on*` prop as a probable typo of a camelCase event handler
 * and strips it (confirmed: "Invalid event handler property `onclick`").
 * data-* attributes have no such special casing, so this is the reliable
 * zero-hydration path.
 */
export function ctaClickDataAttr(payload: CtaClickPayload): string {
  return JSON.stringify(buildCtaClickEvent(payload));
}

/**
 * Literal inline-script body for delegated CTA tracking — render once via
 * <script dangerouslySetInnerHTML> (the root layout does this) rather than
 * once per CTA, so every zero-JS click-tracked element shares this single
 * implementation instead of duplicating push logic.
 */
export const ctaClickDelegationScript = `
document.addEventListener("click", function (event) {
  var el = event.target.closest("[data-cta-event]");
  if (!el) return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(JSON.parse(el.getAttribute("data-cta-event")));
});
`.trim();
