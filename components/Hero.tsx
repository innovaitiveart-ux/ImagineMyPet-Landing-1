import React, { useState, useRef, forwardRef, useImperativeHandle, useEffect } from "react";
import { ART_STYLES } from "../constants";
import { generateWithFAL } from "../services/geminiService.js";
import { uploadToCloudinary } from "../services/cloudinaryService";

const Hero = forwardRef<HTMLDivElement>((_props, ref) => {
  const internalRef = useRef<HTMLDivElement>(null);
  useImperativeHandle(ref, () => internalRef.current!);

  const [uploadedImage, setUploadedImage] = useState<File | null>(null);
  const [uploadedImagePreview, setUploadedImagePreview] = useState<string | null>(null);
  const [generatedPortrait, setGeneratedPortrait] = useState<string | null>(null);
  const [savedPortraits, setSavedPortraits] = useState<string[]>([]);
  const [selectedStyle, setSelectedStyle] = useState<string>(ART_STYLES[0].id);
  const [petName, setPetName] = useState<string>("");
  const [petGender, setPetGender] = useState<string>("Male");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // ---- Generation limits ----
  const isDevMode = false;
  const maxGenerations = 6;
  const [generationCount, setGenerationCount] = useState<number>(0);

 // ✅ Revised cookie helpers (Shopify-safe, survive refresh even in preview mode)
function setCookie(name: string, value: string, days = 365) {
  try {
    const expires = new Date(Date.now() + days * 864e5).toUTCString();
    document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/; SameSite=None; Secure`;
  } catch (e) {
    console.warn("Cookie set failed:", e);
  }
}

function getCookie(name: string) {
  try {
    const match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
    return match ? decodeURIComponent(match[2]) : null;
  } catch {
    return null;
  }
}


  // Load saved generation count + portraits
  useEffect(() => {
    if (!isDevMode) {
      try {
        const cookieCount = getCookie("generationCount");
        const storedCount = cookieCount || localStorage.getItem("generationCount");
        if (storedCount) setGenerationCount(parseInt(storedCount, 10));

        const saved = localStorage.getItem("savedPortraits");
        if (saved) setSavedPortraits(JSON.parse(saved));
      } catch (e) {
        console.warn("Failed to load saved generation data", e);
      }
    }
  }, [isDevMode]);

  // Save count + portraits to both cookie and localStorage
  useEffect(() => {
    if (!isDevMode) {
      try {
        localStorage.setItem("generationCount", generationCount.toString());
        localStorage.setItem("savedPortraits", JSON.stringify(savedPortraits));
        setCookie("generationCount", generationCount.toString(), 365);
      } catch (e) {
        console.warn("Failed to save generation data", e);
      }
    }
  }, [generationCount, savedPortraits, isDevMode]);

  const toBase64 = (file: File): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const result = reader.result as string;
        resolve(result.split(",")[1]);
      };
      reader.onerror = (error) => reject(error);
    });

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadedImage(file);
      setGeneratedPortrait(null);
      setError(null);
      const reader = new FileReader();
      reader.onloadend = () => setUploadedImagePreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleGenerateClick = async () => {
    if (!uploadedImage) {
      setError("Please upload a photo first.");
      return;
    }
    if (!isDevMode && generationCount >= maxGenerations) {
      setError("You've reached your 6 free generations. Choose your favorite to continue.");
      return;
    }

    setIsLoading(true);
    setError(null);
    setGeneratedPortrait(null);

    try {
      const base64Image = await toBase64(uploadedImage);
      const selectedArt = ART_STYLES.find((style) => style.id === selectedStyle);
      if (!selectedArt) throw new Error("Invalid art style selection.");

      let prompt = "";
      if (selectedArt.promptMale && selectedArt.promptFemale) {
        prompt =
          petGender.toLowerCase() === "female"
            ? selectedArt.promptFemale.replace(/\${petName}/g, petName)
            : selectedArt.promptMale.replace(/\${petName}/g, petName);
      } else if (selectedArt.prompt) {
        prompt = selectedArt.prompt.replace(/\${petName}/g, petName);
      } else {
        throw new Error("Selected art style has no prompt defined.");
      }

      console.log("🟢 Prompt being sent to FAL:", prompt);
      const resultUrl = await generateWithFAL(prompt, base64Image);

      let imageData = resultUrl as any;
      if (typeof resultUrl === "object" && resultUrl?.images?.[0]?.url) {
        imageData = resultUrl.images[0].url;
      } else if (typeof resultUrl === "object" && resultUrl?.images?.[0]?.b64_json) {
        imageData = `data:image/jpeg;base64,${resultUrl.images[0].b64_json}`;
      }

      console.log("🚀 Uploading to Cloudinary...");
      let finalImageUrl = imageData as string;
      try {
        const base64Data = (imageData as string).includes(",")
          ? (imageData as string).split(",")[1]
          : undefined;
        if (base64Data) {
          const cloudinaryUrl = await uploadToCloudinary(base64Data);
          console.log("☁️ Cloudinary upload successful:", cloudinaryUrl);
          finalImageUrl = cloudinaryUrl;
        }
      } catch (uploadErr) {
        console.warn("⚠️ Cloudinary upload failed, using generated image instead:", uploadErr);
      }

      setGeneratedPortrait(finalImageUrl);
      const updated = [...savedPortraits, finalImageUrl].slice(-6);
      setSavedPortraits(updated);
      if (!isDevMode) setGenerationCount((prev) => prev + 1);
    } catch (err: any) {
      console.error("❌ Error during generation:", err);
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleMainButtonClick = () => {
    if (isLoading) return;
    if (!uploadedImage) fileInputRef.current?.click();
    else handleGenerateClick();
  };

  const openDigitalProductWithPortrait = () => {
    if (!generatedPortrait) return;
    const base = "https://imaginemypet.com/products/digital-pet-portrait-download";
    const url = new URL(base);
    url.searchParams.set("note", `Chosen portrait: ${generatedPortrait}`);
    url.searchParams.set("style", selectedStyle);
    if (petName) url.searchParams.set("petName", petName);
    try {
      localStorage.setItem("chosenPortraitUrl", generatedPortrait);
    } catch {}
    window.open(url.toString(), "_blank");
  };

  return (
    <section
      ref={internalRef}
      id="upload"
      className="min-h-screen bg-stone-100 flex items-center justify-center py-20 px-4 sm:px-6 lg:px-8"
    >
      <div className="container mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-stone-900 leading-tight">
            Turn Your Pet's Photo Into a <span className="text-teal-600">Lifelike Portrait</span> – Instantly
          </h1>
          <p className="mt-4 max-w-3xl mx-auto text-lg text-stone-600">
            Upload your pet's photo, choose an exclusive art style, and see a stunning preview in seconds.
          </p>
        </div>

        {/* Main image area */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center max-w-6xl mx-auto">
          {/* Uploaded */}
          <div className="relative w-full aspect-square bg-white rounded-2xl shadow-lg flex items-center justify-center p-4">
            {uploadedImagePreview ? (
              <img src={uploadedImagePreview} alt="Your Pet" className="max-w-full max-h-full object-contain rounded-lg" />
            ) : (
              <div className="text-center text-stone-400">
                <img src="/images/placeholder-pet.jpg" alt="Placeholder Pet" className="opacity-30 rounded-lg" />
                <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-xl font-semibold text-black drop-shadow-md">
                  Your Photo Here
                </span>
              </div>
            )}
          </div>

          {/* Generated */}
          <div className="relative w-full aspect-square bg-white rounded-2xl shadow-lg flex flex-col items-center justify-start p-4">
            <div className="relative w-full flex-1 flex items-center justify-center">
              {isLoading && (
                <div className="absolute inset-0 bg-white/80 flex flex-col items-center justify-center rounded-2xl z-10">
                  <div className="w-16 h-16 border-4 border-teal-500 border-dashed rounded-full animate-spin"></div>
                  <p className="mt-4 text-stone-700 font-semibold">Creating your masterpiece...</p>
                </div>
              )}
              {error && (
                <div className="absolute inset-0 bg-red-50 flex flex-col items-center justify-center text-center p-4 rounded-2xl z-10">
                  <p className="text-red-600 font-semibold">Oops!</p>
                  <p className="text-red-500 mt-2">{error}</p>
                </div>
              )}
              {generatedPortrait ? (
                <div className="relative w-full h-full flex items-center justify-center overflow-hidden rounded-lg">
                  <img src={generatedPortrait} alt="Generated Pet Portrait" className="max-w-full max-h-full object-contain rounded-lg" />
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <span
                      className="text-white font-extrabold opacity-25 select-none"
                      style={{
                        fontSize: "clamp(1rem, 5vw, 3rem)",
                        transform: "rotate(-25deg)",
                        whiteSpace: "nowrap",
                      }}
                    >
                      ImagineMyPet.com
                    </span>
                  </div>
                </div>
              ) : (
                <div className="text-center text-stone-400">
                  <img src="/images/placeholder-art.png" alt="Placeholder Art" className="opacity-30 rounded-lg" />
                  <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-xl font-semibold text-black drop-shadow-md">
                    Your Portrait Here
                  </span>
                </div>
              )}
            </div>

            {/* Thumbnails */}
            {savedPortraits.length > 0 && (
              <div className="mt-4 flex flex-wrap justify-center gap-2">
                {savedPortraits.map((url, idx) => (
                  <img
                    key={idx}
                    src={url}
                    alt={`Saved portrait ${idx + 1}`}
                    className={`w-16 h-16 rounded-lg cursor-pointer border-2 ${
                      generatedPortrait === url ? "border-teal-600" : "border-transparent"
                    }`}
                    onClick={() => setGeneratedPortrait(url)}
                  />
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Buttons */}
        {generatedPortrait && !isLoading && (
          <div className="mt-10 text-center max-w-3xl mx-auto p-6 bg-teal-50/50 rounded-2xl">
            <h3 className="text-2xl font-bold text-stone-800">Your Portrait Is Ready!</h3>
            <p className="mt-2 text-stone-600">
              You can download your high-resolution digital copy or print it on premium products.
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-6 mt-6">
              {/* LEFT: Download */}
              <div className="flex-1 text-center">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    if (!generatedPortrait) return;
                    openDigitalProductWithPortrait();
                  }}
                  className="w-full text-white font-bold py-4 px-8 rounded-lg text-lg
                    bg-gradient-to-r from-[#00c853] to-[#00bfa5]
                    shadow-[0_6px_15px_rgba(0,191,165,0.3)]
                    transition-all duration-200 ease-in-out
                    hover:-translate-y-[2px] hover:shadow-[0_8px_20px_rgba(0,191,165,0.5)]"
                >
                  Download High-Resolution Digital Copy
                </button>
                <p className="mt-2 text-sm text-stone-600 max-w-xs mx-auto">
                  Your finished portrait will be emailed to you shortly after purchase.
                </p>
              </div>

              {/* RIGHT: Print */}
              <div className="flex-1 text-center">
                <button
                  onClick={() => {
                    const styleLinks: Record<string, string> = {
                      Royalty: "https://imaginemypet.com/collections/custom-royal-pet-portrait",
                      Watercolor: "https://imaginemypet.com/collections/watercolor-1",
                      "Stained Glass": "https://imaginemypet.com/collections/stained-glass",
                      "jedi-warrior": "https://imaginemypet.com/collections/jedi-warrior",
                      "Ghibli-inspired": "https://imaginemypet.com/collections/whimsical-ghibli-inspired-portrait",
                    };
                    const redirectUrl = styleLinks[selectedStyle] || "https://imaginemypet.com/collections";
                    window.open(redirectUrl, "_blank");
                  }}
                  className="w-full text-white font-bold py-4 px-8 rounded-lg text-lg
                    bg-gradient-to-r from-[#00c853] to-[#00bfa5]
                    shadow-[0_6px_15px_rgba(0,191,165,0.3)]
                    transition-all duration-200 ease-in-out
                    hover:-translate-y-[2px] hover:shadow-[0_8px_20px_rgba(0,191,165,0.5)]"
                >
                  Print Your Portrait on Wall Art, Mugs, Tees & More
                </button>
                <p className="mt-2 text-sm font-semibold text-[#e65100] max-w-xs mx-auto">
                  Please re-upload your pet’s photo, name, and gender on the next page at checkout.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Form */}
        <div className="mt-12 max-w-4xl mx-auto bg-white p-6 rounded-2xl shadow-lg">
          <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/*" className="hidden" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center mb-6">
            <div>
              <label htmlFor="petName" className="block text-sm font-medium text-stone-700 mb-2">
                1. Pet's Name
              </label>
              <input
                type="text"
                id="petName"
                value={petName}
                onChange={(e) => setPetName(e.target.value)}
                placeholder="e.g. Buddy"
                className="w-full p-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 bg-white text-stone-800"
              />
            </div>

            <div>
              <label htmlFor="petGender" className="block text-sm font-medium text-stone-700 mb-2">
                2. Pet's Gender
              </label>
              <select
                id="petGender"
                value={petGender}
                onChange={(e) => setPetGender(e.target.value)}
                className="w-full p-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 bg-white text-stone-800"
              >
                <option>Male</option>
                <option>Female</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center mb-6">
            <div>
              <label htmlFor="artStyle" className="block text-sm font-medium text-stone-700 mb-2">
                3. Choose an Art Style
              </label>
              <select
                id="artStyle"
                value={selectedStyle}
                onChange={(e) => setSelectedStyle(e.target.value)}
                className="w-full p-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 bg-white text-stone-800"
              >
                {ART_STYLES.map((style) => (
                  <option key={style.id} value={style.id}>
                    {style.name} - {style.description}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-stone-700 mb-2">
                4. Upload a Photo
              </label>
              {uploadedImage ? (
                <div className="flex items-center justify-between p-3 border border-stone-300 rounded-lg bg-stone-50">
                  <span className="text-stone-700 truncate text-sm font-medium">{uploadedImage.name}</span>
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="ml-4 text-sm text-teal-600 hover:underline flex-shrink-0 font-semibold"
                  >
                    Change
                  </button>
                </div>
              ) : (
                <div className="p-3 border-2 border-dashed border-stone-300 rounded-lg text-center text-sm text-stone-500">
                  Click the button below to upload
                </div>
              )}
            </div>
          </div>

          <button
            onClick={handleMainButtonClick}
            disabled={isLoading}
            className="w-full bg-teal-600 text-white font-bold py-4 px-6 rounded-xl text-xl
  hover:bg-teal-700 transition-transform transform hover:scale-105 shadow-md hover:shadow-lg
  disabled:bg-stone-400 disabled:cursor-not-allowed disabled:scale-100"
          >
            {isLoading
              ? "Generating..."
              : uploadedImage
              ? "See My Pet's Portrait Now"
              : "Upload Photo & Get Started"}
          </button>

          <div className="mt-4 text-center text-stone-600 text-sm leading-relaxed">
            <p>
              Every pet parent gets 6 free portraits. Try out each art style and see which one captures your furry friend best — then pick your favorite masterpiece to keep.
            </p>
            {!isDevMode && (
              <p className="mt-1 text-stone-500">
                You have {Math.max(0, maxGenerations - generationCount)} of {maxGenerations} free portraits remaining.
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
});

export default Hero;
