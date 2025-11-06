import type { ArtStyle, Testimonial, UspItem, FaqItem } from './types';
import { PaletteIcon, EyeIcon, LightningBoltIcon, CheckCircleIcon, StarIcon as QualityIcon } from './components/icons/UspIcons';

export const ART_STYLES: ArtStyle[] = [
{
  id: 'Royalty',
  name: 'Royalty',
  description: 'Regal throne-room portrait (King or Queen).',

  // Masculine (King)
  promptMale: `{
  "task": "edit_image",
  "inputs": [
    {
      "type": "image",
      "data": "<base64-or-url-of-pet-photo>",
      "role": "reference_subject"
    }
  ],
  "subject": {
    "type": "animal",
    "role": "main_subject",
    "instructions": "Recreate the uploaded pet entirely from scratch. Use the image only as reference for color, markings, and facial features. Slightly vary the pose and composition from the original photo — do NOT composite or reuse any part of the original image."
  },
  "style": {
    "primary": "Hyper-realistic royal photographic portrait",
    "rendering_quality": "ultra-high",
    "art_direction": "majestic, cinematic royal portrait with masculine gravitas",
    "avoid": [
      "photo compositing",
      "pose duplication",
      "flat lighting",
      "external environments or rooms unrelated to the royal setting",
      "borders or outlines",
      "frames or framing elements",
      "white or empty margins",
      "canvas texture or painted surfaces"
    ]
  },
  "environment": {
    "setting": "royal throne room with polished marble floor, candle-lit ambience, ivory Corinthian columns, and burgundy velvet drapes",
    "lighting": "ambient candlelight with soft golden reflections gliding across marble and gilt surfaces",
    "background": "dim but luminous royal chamber with subtle reflections and depth, never shadow-heavy"
  },
  "composition": {
    "layout": "close-up, low-angle royal composition capturing chest and head only; fills the entire image area",
    "pose": "pet seated upright on a marble pedestal, chest proud, head slightly tilted upward, gazing off into the distance",
    "camera": {
      "angle": "low-angle for grandeur",
      "focus": "pet’s face, crown, and upper robe",
      "depth_of_field": "shallow for soft background separation"
    }
  },
  "outfit": {
    "description": "deep crimson velvet royal robe trimmed with white ermine, draped naturally over shoulders and cascading onto the pedestal",
    "accessories": "golden crown with bold angular design, heavy gemstone inlays, weighty and masculine in construction"
  },
  "engraving": {
    "surface": "front face of the marble pedestal",
    "text": "\${petName}",
    "style": "elegant gold serif lettering, shallowly carved and softly illuminated by candlelight"
  },
  "technical": {
    "resolution": "4K",
    "aspect_ratio": "3:2",
    "output_format": "image/png"
  },
  "quality": {
    "include": [
      "lifelike fur strands",
      "crown facets",
      "robe folds",
      "reflective marble texture"
    ],
    "avoid": [
      "composited head or body",
      "overexposed lighting",
      "cartoonish rendering",
      "external environments or rooms unrelated to the royal setting",
      "borders or outlines",
      "frames or framing elements",
      "white or empty margins",
      "canvas texture or painted surfaces"
    ]
  },
  "metadata": {
    "instructions_version": "1.1"
  }
}`,

  // Feminine (Queen)
  promptFemale: `{
  "task": "edit_image",
  "inputs": [
    {
      "type": "image",
      "data": "<base64-or-url-of-pet-photo>",
      "role": "reference_subject"
    }
  ],
  "subject": {
    "type": "animal",
    "role": "main_subject",
    "instructions": "Recreate the uploaded pet entirely from scratch using only the image as reference for identity, color, and markings. Slightly vary the pose and composition for a natural new portrait. Do NOT composite or reuse the original photo or any part of it."
  },
  "style": {
    "primary": "Hyper-realistic royal photographic portrait (female queen version)",
    "rendering_quality": "ultra-high",
    "art_direction": "regal, feminine, luminous royal imagery with cinematic realism",
    "avoid": [
      "photo compositing",
      "pose duplication",
      "flat lighting",
      "cartoon rendering",
      "external environments or rooms unrelated to the royal setting",
      "borders or outlines",
      "frames or framing elements",
      "white or empty margins",
      "canvas texture or painted surfaces"
    ]
  },
  "environment": {
    "setting": "royal throne room with candle-lit ambience, polished marble floor, ivory Corinthian columns, and burgundy velvet drapes",
    "lighting": "warm ambient candlelight softly reflecting across marble and gilt ornamentation",
    "background": "rich, luminous, and refined royal interior with subtle highlights and realistic depth"
  },
  "composition": {
    "layout": "close-up, low-angle royal composition capturing chest and head; fills the entire image area",
    "pose": "pet seated upright on marble pedestal, chest gracefully lifted, head slightly tilted upward, gaze distant and serene",
    "camera": {
      "angle": "low-angle for elegance and majesty",
      "focus": "face, crown, and upper robe",
      "depth_of_field": "shallow, soft background separation",
      "lighting_focus": "candlelight reflections on fur, robe, and jewels"
    }
  },
  "outfit": {
    "description": "flowing crimson and gold-embroidered royal robe lined with white ermine, draped elegantly over shoulders and cascading naturally onto the pedestal",
    "accessories": "feminine jewel-encrusted queen’s crown with ornate floral filigree, rose-gold accents, and delicate gemstone clusters"
  },
  "engraving": {
    "surface": "front face of marble pedestal",
    "text": "\${petName}",
    "style": "delicate gold cursive script, finely carved and softly illuminated by candlelight"
  },
  "technical": {
    "resolution": "4K",
    "aspect_ratio": "3:2",
    "output_format": "image/png"
  },
  "quality": {
    "include": [
      "lifelike fur strands",
      "sharp crown detail",
      "crisp robe embroidery",
      "realistic lighting depth"
    ],
    "avoid": [
      "composited or reused photo parts",
      "flat or dull lighting",
      "cartoonish filters",
      "borders or extra environment",
      "external environments or rooms unrelated to the royal setting",
      "frames or framing elements",
      "white or empty margins",
      "canvas texture or painted surfaces"
    ]
  },
  "metadata": {
    "instructions_version": "1.1"
  }
}`
},
{
  id: 'Ghibli-inspired',
  name: 'Ghibli',
  description: 'Hand-painted fantasy portrait in the Studio Ghibli style.',
  prompt: `{
  "task": "edit_image",
  "inputs": [
    {
      "type": "image",
      "data": "<base64-or-url-of-pet-photo>",
      "role": "reference_subject"
    }
  ],
  "subject": {
    "type": "animal",
    "role": "main_subject",
    "instructions": "Use the uploaded image only as reference for the pet’s identity, colors, and features. Recreate the pet completely from scratch with a slightly varied pose and new composition. Do NOT composite or reuse the original photo. Depict the pet as a unique Studio Ghibli-universe character rendered entirely in painterly style."
  },
  "style": {
    "primary": "Studio Ghibli hand-painted fantasy portrait",
    "rendering_quality": "ultra-high",
    "art_direction": "lush enchanted-forest setting with whimsical, cinematic color palette and painterly textures",
    "avoid": [
      "photo compositing",
      "pose duplication",
      "photographic realism",
      "flat digital shading",
      "external environments or rooms unrelated to the forest setting",
      "borders or outlines",
      "frames or framing elements",
      "white or empty margins",
      "canvas texture or printed surfaces"
    ]
  },
  "environment": {
    "setting": "enchanted forest glade with moss-covered stone pedestal, ancient trees, dangling vines, and dappled sunlight",
    "lighting": "soft, atmospheric daylight with warm highlights and gentle mist depth",
    "background": "misty painterly forest fading into muted greens and golds with dreamy bokeh effect"
  },
  "composition": {
    "layout": "centered full-portrait composition of the pet on a pedestal filling the image area",
    "pose": "natural yet slightly altered from the reference image for freshness and harmony within the scene",
    "camera": {
      "angle": "eye-level, cinematic composition",
      "focus": "pet on pedestal, glowing ambient surroundings",
      "depth_of_field": "soft painterly depth, blurred distant forest"
    }
  },
  "art_elements": {
    "brushwork": "soft expressive strokes with gentle color variation, luminous highlights, and stylized fur texture",
    "details": "tiny glowing fireflies, pastel wildflowers, and subtle luminous mushrooms to evoke wonder and femininity"
  },
  "text_overlay": {
    "content": "\${petName}",
    "style": "warm gold calligraphic brush-stroke lettering integrated into the artwork along the bottom edge",
    "position": "inside the painted scene, not below or outside the composition"
  },
  "technical": {
    "resolution": "4K",
    "aspect_ratio": "3:2",
    "output_format": "image/png"
  },
  "quality": {
    "include": [
      "hand-painted textures",
      "cinematic color grading",
      "soft atmospheric lighting",
      "warm whimsical tone"
    ],
    "avoid": [
      "photo compositing",
      "copied pose",
      "external environments or rooms unrelated to the forest setting",
      "borders or outlines",
      "frames or framing elements",
      "white or empty margins",
      "canvas texture or printed surfaces",
      "hard-edged realism"
    ]
  },
  "metadata": {
    "instructions_version": "1.1"
  }
}`
},
{
  id: 'Stained Glass',
  name: 'Stained Glass',
  description: 'Vibrant glass-mosaic portrait in either bold or feminine tones.',

  promptMale: `{
  "task": "edit_image",
  "inputs": [
    {
      "type": "image",
      "data": "<base64-or-url-of-pet-photo>",
      "role": "reference_subject"
    }
  ],
  "subject": {
    "type": "animal",
    "role": "main_subject",
    "instructions": "Use the uploaded image only as a visual reference for the pet’s identity, coat colors, and features. Recreate the pet entirely from scratch with a slightly varied pose and composition—do NOT composite or reuse the uploaded photo. Depict the pet’s noble head or upper-body profile rendered in luminous stained-glass tesserae as part of the overall artwork."
  },
  "style": {
    "primary": "hyper-detailed stained-glass artwork",
    "rendering_quality": "ultra-high",
    "art_direction": "edge-to-edge stained-glass composition filling the entire image area; handcrafted glass texture with glowing internal light and no visible surroundings",
    "avoid": [
      "photo compositing",
      "pose duplication",
      "visible frames or borders",
      "architectural or interior environments",
      "plain white margins or empty areas",
      "photographic realism",
      "canvas texture or painted surface"
    ]
  },
  "composition": {
    "layout": "square composition occupying the entire image area edge-to-edge, filled solely with the stained-glass portrait",
    "pose": "slightly altered from the reference photo for natural variation while maintaining accurate likeness and a noble presence",
    "camera": {
      "angle": "straight-on orthographic view of the glass surface",
      "focus": "pet portrait and surrounding decorative glass motifs all in uniform sharp focus",
      "depth_of_field": "flat optical plane to preserve clarity of glass details"
    }
  },
  "environment": {
    "lighting": "bright natural backlight shining through the colored glass, enhancing jewel-tone glow, reflections, and depth without showing any external environment",
    "background": "none beyond the stained glass itself; the entire image area is occupied by the glass design"
  },
  "art_elements": {
    "structure": "raised metallic lead cames dividing each glass segment in harmonious geometric layout",
    "color_palette": "bold masculine hues derived from the pet’s natural tones, with accents of deep amber, bronze, slate-gray, smoky-blue, rust-red, and muted gold",
    "motifs": "flanking geometric or dog-bone shapes outlined with lead cames integrated into the stained-glass design",
    "accent_panes": "upper band of small shield- or bone-shaped panes in softly luminous tones to balance composition",
    "lettering": {
      "content": "\${petName}",
      "style": "bold glass lettering integrated into the lower portion of the stained-glass design, outlined in lead and seamlessly embedded—never placed on a separate border or plaque"
    }
  },
  "technical": {
    "resolution": "4K",
    "aspect_ratio": "1:1",
    "output_format": "image/png"
  },
  "quality": {
    "include": [
      "luminous transparency",
      "textured stained-glass surface",
      "raised lead line definition",
      "balanced geometric composition",
      "harmonious and vivid color blending"
    ],
    "avoid": [
      "external environments or rooms",
      "borders or outlines",
      "frames or framing elements",
      "white or empty margins",
      "flat photographic lighting",
      "reused portions of the source photo"
    ]
  },
  "metadata": {
    "instructions_version": "1.2"
  }
}`,

  promptFemale: `{
  "task": "edit_image",
  "inputs": [
    {
      "type": "image",
      "data": "<base64-or-url-of-pet-photo>",
      "role": "reference_subject"
    }
  ],
  "subject": {
    "type": "animal",
    "role": "main_subject",
    "instructions": "Use the uploaded image only as a visual reference for the pet’s identity, colors, and features. Recreate the pet completely from scratch with a naturally varied pose and composition—not an exact copy or filtered version of the source. Depict the pet’s full body rendered in stained-glass tesserae with lifelike color accuracy and natural expression."
  },
  "style": {
    "primary": "Hyper-detailed luminous stained-glass artwork (feminine version)",
    "rendering_quality": "ultra-high",
    "art_direction": "edge-to-edge stained-glass composition filling the entire image area; luminous, handcrafted, and richly textured",
    "avoid": [
      "photo compositing",
      "pose duplication",
      "frames or outer borders",
      "wall or room context",
      "flat digital shading",
      "photographic realism",
      "external environments or rooms",
      "borders or outlines",
      "frames or framing elements",
      "white or empty margins",
      "canvas texture or painted surfaces"
    ]
  },
  "composition": {
    "layout": "square composition occupying the entire image area; stained-glass surface only, no borders or outer context",
    "pose": "full-body depiction of the pet, slightly altered from the original photo for a fresh, natural composition",
    "camera": {
      "angle": "straight-on view of the stained-glass surface",
      "focus": "pet figure and surrounding decorative elements",
      "depth_of_field": "uniform, flat illumination across the glass surface"
    }
  },
  "environment": {
    "lighting": "illuminated by natural daylight shining through the glass to make jewel-tone colors glow and cast subtle reflections",
    "background": "none; the entire image area is filled with stained glass"
  },
  "art_elements": {
    "structure": "raised metallic lead borders dividing each glass segment",
    "color_palette": "harmonious feminine hues derived from the pet’s natural tones, enhanced with rose, blush, coral, gold, lilac, and soft teal",
    "motifs": "stylized hearts and paw-print motifs separated by gleaming lead cames",
    "decoration": "wreath of trailing ivy in translucent greens accented with tiny faceted clear-glass highlights for sparkle",
    "accent_panes": "arched row of heart-shaped panes above the portrait",
    "lettering": {
      "content": "\${petName}",
      "style": "bold glass lettering integrated seamlessly into the lower design, outlined in lead—not on a border or plaque"
    }
  },
  "technical": {
    "resolution": "4K",
    "aspect_ratio": "1:1",
    "output_format": "image/png"
  },
  "quality": {
    "include": [
      "luminous stained-glass texture",
      "raised lead detail",
      "balanced feminine composition",
      "glowing transparency under daylight",
      "crisp handcrafted detail"
    ],
    "avoid": [
      "composited photo elements",
      "outer frame or wall context",
      "flat color fields",
      "copied pose from source image",
      "external environments or rooms",
      "borders or outlines",
      "frames or framing elements",
      "white or empty margins",
      "canvas texture or painted surfaces"
    ]
  },
  "metadata": {
    "instructions_version": "1.1"
  }
}`,
},
{ id: "jedi-warrior", name: "Jedi Warrior", description: "Cinematic sci-fi portrait with glowing lightsaber and moody atmosphere.",
    prompt: `{
  "task": "edit_image",
  "inputs": [
    {
      "type": "image",
      "data": "<base64-or-url-of-pet-photo>",
      "role": "reference_subject"
    }
  ],
  "subject": {
    "type": "animal",
    "role": "main_subject",
    "instructions": "Recreate the uploaded pet entirely from scratch — do NOT composite or reuse the exact head or body from the photo. Slightly vary the pose and angles to form a new, natural composition matching the description below. Ensure the pet has paws, not human hands. Depict the pet’s face as intense and determined, embodying the focus and resolve of a Jedi warrior."
  },
  "style": {
    "primary": "Hyper-realistic cinematic Jedi portrait",
    "rendering_quality": "ultra-high",
    "art_direction": "dark sci-fi setting with strong cinematic lighting and heroic energy",
    "avoid": [
      "head compositing",
      "pose duplication",
      "human-like hands",
      "external environments or rooms unrelated to the sci-fi setting",
      "borders or outlines",
      "frames or framing elements",
      "white or empty margins",
      "canvas texture or printed surfaces"
    ]
  },
  "environment": {
    "setting": "dark sci-fi corridor illuminated by blue lightsaber glow and faint ambient backlights",
    "lighting": "cinematic three-quarter lighting with cool blue key light and faint warm back fill",
    "background": "softly blurred shallow depth-of-field metallic corridor fading into darkness"
  },
  "composition": {
    "layout": "three-quarter close-up from waist up filling the image area",
    "pose": "slightly new stance similar to the uploaded pet photo but redrawn naturally for balance and power",
    "camera": {
      "angle": "eye-level, cinematic close-up",
      "focus": "pet’s determined face, eyes, and upper body",
      "depth_of_field": "shallow",
      "lighting_focus": "lightsaber glow softly illuminating the face and robes"
    }
  },
  "outfit": {
    "description": "traditional, weathered dark-brown Jedi robes with realistic texture, stitching, and natural folds",
    "accessories": "bronze-hilted blue lightsaber held in paw, blade vertical, casting blue glow across face and robe"
  },
  "text_overlay": {
    "content": "\${petName}",
    "style": "bold, gold-outlined Star Wars–style typography with subtle mirrored floor reflection",
    "position": "bottom center"
  },
  "technical": {
    "resolution": "4K",
    "aspect_ratio": "3:2",
    "output_format": "image/png"
  },
  "quality": {
    "include": [
      "sharp fur texture",
      "crisp robe fabric detail",
      "cinematic lighting realism",
      "focused, determined facial expression"
    ],
    "avoid": [
      "composited photo parts",
      "pasted head",
      "flat lighting",
      "borders",
      "external environments or rooms unrelated to the sci-fi setting",
      "frames or framing elements",
      "white or empty margins",
      "canvas texture or printed surfaces"
    ]
  },
  "metadata": {
    "instructions_version": "1.1"
  }
}`
  },
{
  id: 'Watercolor',
  name: 'Watercolor',
  description: 'Soft and expressive watercolor-style pet portrait.',
  prompt: `{
  "task": "edit_image",
  "inputs": [
    {
      "type": "image",
      "data": "<base64-or-url-of-pet-photo>",
      "role": "reference_subject"
    }
  ],
  "subject": {
    "type": "animal",
    "role": "main_subject",
    "instructions": "Use the uploaded image only as a visual reference for the pet’s identity, colors, and features. Recreate the pet entirely from scratch with a slightly varied pose and composition—do NOT composite or reuse the original photo. The portrait should appear as a freshly hand-painted watercolor rendering, not a filtered photograph."
  },
  "style": {
    "primary": "Watercolor portrait",
    "rendering_quality": "ultra-high",
    "art_direction": "soft, expressive, hand-painted watercolor style with luminous layered brushwork",
    "avoid": [
      "photo compositing",
      "copied pose",
      "hard outlines",
      "digital filter appearance",
      "flat or airbrushed color blocks",
      "external environments or rooms",
      "borders or outlines",
      "frames or framing elements",
      "white or empty margins",
      "canvas texture or printed surfaces"
    ]
  },
  "composition": {
    "layout": "headshot portrait focused on face and upper chest filling the image area",
    "pose": "naturally reimagined pose distinct from the source photo, maintaining likeness and expression",
    "camera": {
      "angle": "eye-level, intimate composition",
      "focus": "eyes, muzzle, and facial structure rendered with soft brushwork",
      "depth_of_field": "flat watercolor plane maintaining natural paper texture"
    }
  },
  "environment": {
    "background": "clean white paper with soft watercolor washes and splashes harmonizing with the pet’s coat tones",
    "lighting": "even diffuse light for natural watercolor look"
  },
  "art_elements": {
    "brushwork": "layered, translucent strokes creating natural depth and tone variation",
    "accent_colors": "gentle complementary hues enhancing warmth and balance",
    "edges": "organic, irregular brush edges with visible paper grain"
  },
  "text_overlay": {
    "content": "\${petName}",
    "style": "large, graceful cursive lettering echoing tones from the portrait palette",
    "position": "beneath the pet’s head within the composition"
  },
  "technical": {
    "resolution": "4K",
    "aspect_ratio": "1:1",
    "output_format": "image/png"
  },
  "quality": {
    "include": [
      "translucent watercolor layering",
      "soft tonal blending",
      "expressive texture and warmth",
      "authentic brushwork depth"
    ],
    "avoid": [
      "photo compositing",
      "flat digital effects",
      "identical pose to reference",
      "harsh outlines or digital sharpness",
      "external environments or rooms",
      "borders or outlines",
      "frames or framing elements",
      "white or empty margins",
      "canvas texture or printed surfaces"
    ]
  },
  "metadata": {
    "instructions_version": "1.1"
  }
}`
},
];

export const TESTIMONIALS: Testimonial[] = [
  {
    quote: "Great gift piece to honor my friends dog, communicative seller.",
    name: 'Roth',
    location: 'Denver, CO',
    image: 'https://picsum.photos/id/1025/100/100'
  },
  {
    quote: "The art piece is identical to the photo of my dog I sent. The entire transaction from my first text to receiving my item was fast! Within five days! Thank you.",
    name: 'Linda',
    location: 'Austin, TX',
    image: 'https://picsum.photos/id/1084/100/100'
  },
  {
  quote: "I received exactly what was ordered, great quality, and speedy turnaround. Would definitely recommend ordering a unique rendition of your pet!!",
  name: "Cynthia Quillin",
  location: "Chicago, IL",
  image: "https://res.cloudinary.com/dwuuelank/image/upload/v1762458070/1761014266__1761014261692-img_2745__original_wluexz.avif"
}

];

export const USP_ITEMS: UspItem[] = [
    {
        icon: PaletteIcon,
        title: "True Artistic Styles, Not Generic Filters",
        description: "Our art styles are one-of-a-kind, created by artists exclusively for ImagineMyPet. This means your pet's portrait will look authentically artful and unique."
    },
    {
        icon: EyeIcon,
        title: "Lifelike Likeness & Emotional Depth",
        description: "We pride ourselves on capturing every lovable detail. Our proprietary approach ensures your pet's essence shines through in the portrait."
    },
    {
        icon: LightningBoltIcon,
        title: "Instant Preview, Zero Guesswork",
        description: "ImagineMyPet is the only service of its kind with a truly instant preview. Try out different styles on the spot and be confident in your choice."
    },
    {
        icon: CheckCircleIcon,
        title: "Effortless Preview & Order",
        description: "Preview your art in 3 simple steps right here. When you love it, we seamlessly connect you to our store to choose from high-quality prints and products."
    },
    {
        icon: QualityIcon,
        title: "Premium Products & Quality Guarantee",
        description: "We offer professionally printed canvases, framed posters, and more, all with a quality guarantee. If something isn't perfect, we'll make it right."
    }
];


export const FAQ_ITEMS: FaqItem[] = [
  {
    question: 'How does ImagineMyPet turn my photo into a portrait? Is this done by an artist or a filter?',
    answer: "We use a proprietary digital art process that combines your photo with an artistic style. It's not a preset filter – it's more sophisticated, ensuring the result looks hand-crafted, because it's built from artistic principles and your pet's unique features."
  },
  {
    question: 'Will the portrait really look like my pet?',
    answer: "Yes! Because the portrait is generated from your actual photo, it retains your pet's true likeness. We designed our styles to preserve facial details. If your photo is clear and high-quality, the portrait will be extremely accurate."
  },
  {
    question: 'Is the preview really free? Do I have to pay anything to try this out?',
    answer: "It's completely free to preview. You can upload a photo, try different art styles, and see watermarked previews without paying a cent. We only ask for payment if you decide you love it. There's truly no risk."
  },
  {
    question: 'What products can I order with my pet\'s portrait?',
    answer: 'We offer both digital and physical products. You can get a high-resolution digital download, or have us print your portrait on a beautiful canvas, framed poster, sweatshirt, coffee mug, and more. You\'ll see all options after you click "Order".'
  },
  {
    question: 'How long does it take to get my order?',
    answer: 'The digital file is available immediately after purchase. Physical products typically take 2-4 business days for production, plus 3-7 business days for shipping in the US. You\'ll get a tracking number via email.'
  }
];