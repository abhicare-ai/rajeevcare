// lib/tools/wallnessTool.ts
import puppeteer from "puppeteer";

/**
 * wallnessTool
 * - call(input: string) => Promise<string>
 * - Returns a JSON-stringified array: [{ name: string, link: string }, ...]
 *
 * Notes:
 * - Keep this file server-only (do not bundle to client).
 * - Use environment var WALLNESS_TOOL_DEBUG=true to log debugging info (like page HTML slice).
 * - Use WALLNESS_TOOL_HEADLESS=false to run visible browser locally for debug.
 */

const BASE_URL = "https://www.drrajeevswellness.com/";
const DEFAULT_TIMEOUT = 30000;
const DEBUG = process.env.WALLNESS_TOOL_DEBUG === "true";
const HEADLESS =
  process.env.NODE_ENV === "production"
    ? true // Production me hamesha headless
    : process.env.WALLNESS_TOOL_HEADLESS !== "false"; // Local me env se control


function safeJsonString(arr: any) {
  try {
    return JSON.stringify(arr);
  } catch {
    return "[]";
  }
}

export const wallnessTool = {
  name: "wallness_product_search",
  description:
    "Search drrajeevswellness.com for wellness products related to a disease. Input: disease name (string). Output: JSON stringified array of {name,link}.",
  async call(input: string): Promise<string> {
    const diseaseName = String(input || "").trim();
    if (!diseaseName) return "[]";

    let browser: any = null;
    try {
      browser = await puppeteer.launch({
        headless: HEADLESS,
        args: ["--no-sandbox", "--disable-setuid-sandbox"],
      });

      const page: any = await browser.newPage();

      // polite user agent
      await page.setUserAgent(
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36",
      );
      await page.setViewport({ width: 1280, height: 800 });

      // Try direct search URL patterns (fast)
      const q = encodeURIComponent(diseaseName);
      const searchUrls = [
        `${BASE_URL}?s=${q}`,
        `${BASE_URL}search?q=${q}`,
        `${BASE_URL}?search=${q}`,
      ];

      let landedUrl = "";
      for (const u of searchUrls) {
        try {
          await page.goto(u, {
            waitUntil: "networkidle2",
            timeout: DEFAULT_TIMEOUT,
          });
          const bodyText = await page.evaluate(
            () => document.body.innerText || "",
          );
          if (bodyText.toLowerCase().includes(diseaseName.toLowerCase())) {
            landedUrl = u;
            break;
          }
        } catch (e: any) {
          // try next
          if (DEBUG) console.warn("searchUrl failed:", u, e?.message || e);
        }
      }

      // If not landed on search results, try homepage + search input (best-effort)
      if (!landedUrl) {
        try {
          await page.goto(BASE_URL, {
            waitUntil: "networkidle2",
            timeout: DEFAULT_TIMEOUT,
          });

          // attempt to find a search box and submit query
          const searchSelectors = [
            'input[type="search"]',
            'input[name*="search"]',
            'input[placeholder*="Search"]',
            ".search-field",
            ".search-input",
            "#search",
          ];
          for (const sel of searchSelectors) {
            try {
              const el = await page.$(sel);
              if (el) {
                await page.focus(sel);
                await page.click(sel, { clickCount: 3 });
                await page.keyboard.type(diseaseName, { delay: 40 });
                await page.keyboard.press("Enter");
                try {
                  await page.waitForNavigation({
                    waitUntil: "networkidle2",
                    timeout: 15000,
                  });
                } catch {
                  // sometimes search updates without full navigation
                }
                landedUrl = await page.url();
                break;
              }
            } catch (e: any) {
              if (DEBUG)
                console.warn(
                  "search selector attempt failed:",
                  sel,
                  e?.message || e,
                );
            }
          }
        } catch (e: any) {
          if (DEBUG) console.warn("homepage visit failed", e?.message || e);
        }
      }

      // small wait for JS-rendered content
      await new Promise((res) => setTimeout(res, 900));

      // Optional debug: log snippet of HTML if requested
      if (DEBUG) {
        try {
          const html = await page.content();
          console.log("wallnessTool: page HTML snippet:", html.slice(0, 2000));
        } catch (e) {
          console.warn("wallnessTool debug: failed to get page content", e);
        }
      }

      // Evaluate page: extract product titles and links
  const products = await page.evaluate((diseaseLower: string) => {
  const out: { name: string; link: string }[] = [];
  const push = (n: string, h: string) => {
    if (!h) return;
    const cleanName = (n || "")
      .replace(/\s+/g, " ")
      .replace(/0 Comments/gi, "")
      .replace(/^https?:\/\/[^\s]+$/gi, "")
      .trim();
    if (!cleanName) return;
    const link = h.startsWith("http")
      ? h
      : new URL(h, location.origin).toString();
    out.push({ name: cleanName, link });
  };

  const selectors = [
    ".woocommerce-loop-product__title",
    ".product-title",
    ".product-name",
    ".product-item a",
    ".product a",
    ".prod-title",
    ".item-title",
    ".entry-title a",
  ];

  selectors.forEach((sel) => {
    document.querySelectorAll(sel).forEach((el: Element) => {
      const text = (el.textContent || "").trim();
      let href = "";
      try {
        const a = (el as HTMLElement).closest("a[href]");
        if (a) href = (a as HTMLAnchorElement).href;
      } catch {}
      if (!href && (el as HTMLAnchorElement).tagName === "A") {
        href = (el as unknown as HTMLAnchorElement).href || "";
      }
      if (text && text.toLowerCase().includes(diseaseLower))
        push(text, href);
    });
  });

  // Fallback: agar direct match kam ho to similar products bhi le aao
  if (out.length === 0) {
    document.querySelectorAll(".woocommerce-loop-product__title, .product-title, .product-name").forEach((el: Element) => {
      const text = (el.textContent || "").trim();
      const a = (el as HTMLElement).closest("a[href]");
      const href = a ? (a as HTMLAnchorElement).href : "";
      if (text && href) {
        push(text, href);
      }
    });
  }

  // Deduplicate by link
  const map = new Map<string, { name: string; link: string }>();
  out.forEach((p) => {
    if (p.link && !map.has(p.link)) map.set(p.link, p);
  });

  return Array.from(map.values()).slice(0, 50);
}, diseaseName.toLowerCase());


      // Return JSON string
      return safeJsonString(products || []);
    } catch (err) {
      if (DEBUG) console.error("wallnessTool error:", err);
      return "[]";
    } finally {
      if (browser) {
        try {
          await browser.close();
        } catch {}
      }
    }
  },
};

export default wallnessTool;

/* -------------------------
USAGE:

import wallnessTool from "@/lib/tools/wallnessTool";

const jsonString = await wallnessTool.call("fever");
const products = JSON.parse(jsonString); // [{name, link}, ...]

If you want to register as a LangChain Tool, wrap accordingly depending on your langchain version.
-------------------------- */
