// services/geminiService.ts

const FAL_KEY = import.meta.env.VITE_FAL_KEY;
console.log("FAL key detected:", !!FAL_KEY);

export async function generateWithFAL(prompt: string, imageBase64: string) {
  if (!FAL_KEY) {
    throw new Error("Missing VITE_FAL_KEY in .env.local");
  }

 console.log("Sending request to FAL with prompt:", prompt);
const response = await fetch("https://fal.run/fal-ai/nano-banana/edit", {
  method: "POST",
  headers: {
    "Authorization": `Key ${FAL_KEY}`,
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    prompt,
    image_urls: [`data:image/png;base64,${imageBase64}`], // your uploaded photo
    aspect_ratio: "3:4", // taller portrait
    sync_mode: true,
    num_images: 1,
    guidance_scale: 14
  }),
});

if (!response.ok) {
  const text = await response.text();
  throw new Error(`FAL request failed: ${text}`);
}

const data = await response.json();
console.log("FAL full response:", data);

// Try to find any possible image URL fields dynamically
const possibleImage =
  data?.image_url ||
  data?.url ||
  data?.output?.image_url ||
  data?.images?.[0]?.url ||
  data?.images?.[0]?.image ||
  null;

if (!possibleImage) {
  console.warn("⚠️ No image found in response:", JSON.stringify(data, null, 2));
}

return possibleImage;

}
