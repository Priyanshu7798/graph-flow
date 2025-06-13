import chromium from "@sparticuz/chromium";
import puppeteer from "puppeteer-core";
import { NextResponse } from "next/server";

export async function GET() {
  let browser = null;

  try {
    const executablePath = await chromium.executablePath();

    browser = await puppeteer.launch({
      args: chromium.args,
      defaultViewport: chromium.defaultViewport,
      executablePath,
      headless: chromium.headless,
    });

    const page = await browser.newPage();
    await page.goto("https://example.com", { waitUntil: "networkidle0" });

    const screenshot = await page.screenshot({ type: "png" });

    return new NextResponse(screenshot, {
      status: 200,
      headers: {
        "Content-Type": "image/png",
      },
    });
  } catch (error) {
    console.error("Screenshot error:", error);
    return new NextResponse("Error generating screenshot", { status: 500 });
  } finally {
    if (browser) await browser.close();
  }
}
