import * as fal from "@fal-ai/client";

fal.config({
  proxyUrl: "/api/fal/proxy",
});

export async function getRender(imageUrl, prompt) {
  return await fal.subscribe("fal-ai/fast-sdxl-controlnet-canny", {
    input: {
      control_image_url: imageUrl,
      prompt: prompt,
      image_size: "landscape_16_9",
    }
  });
}
