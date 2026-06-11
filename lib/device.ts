export type Platform = "ios" | "android" | "desktop"

export function detectPlatform(userAgent: string): Platform {
    const ua = userAgent.toLowerCase()
    if (/iphone|ipad|ipod/.test(ua)) return "ios"
    if (/android/.test(ua)) return "android"
    return "desktop"
}