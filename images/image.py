import os
import zipfile
from icrawler.builtin import BingImageCrawler

# Bike and color mapping
bikes = {
    "Royal Enfield Hunter 350": ["London Red", "Factory Black", "Rio White"],
    "Royal Enfield Classic 350": ["Gunmetal Grey", "Desert Storm", "Chrome Silver"],
    "KTM Duke 160": ["Orange", "Black", "White"],
    "Bajaj Pulsar NS400Z": ["Racing Red", "Metallic Black", "Pearl White"],
    "Royal Enfield Bullet 350": ["Tokyo Black", "Rebel Blue", "Rio White"],
    "Yamaha MT-15 V2": ["Metallic Black", "Racing Blue", "Pearl White"],
    "TVS Apache RTR 160": ["Racing Red", "Pearl White", "Metallic Black"],
    "Yamaha R15 V4": ["Racing Blue", "Metallic Black", "Pearl White"],
    "Bajaj Pulsar N160": ["Racing Red", "Metallic Black", "Pearl White"],
    "Bajaj Pulsar NS200": ["Racing Red", "Metallic Black", "Pearl White"],
    "Honda CB200X": ["Pearl Shining Black", "Pearl Shining White", "Pearl Shining Red"],
    "TVS Apache RTR 200 4V": ["Racing Red", "Pearl White", "Metallic Black"],
    "Hero XPulse 200 4V": ["Black", "Red", "Blue"],
    "Yamaha FZ-S FI Hybrid": ["Metallic Black", "Racing Blue", "Pearl White"],
    "Hero Xtreme 250R": ["Black", "Red", "Blue"],
    "Bajaj Pulsar F250": ["Racing Red", "Metallic Black", "Pearl White"],
    "Bajaj Pulsar N250": ["Racing Red", "Metallic Black", "Pearl White"],
    "TVS iQube (EV)": ["Pearl White", "Metallic Black", "Racing Red"],
    "Pure EV eTryst 350 (EV)": ["Jet Black", "Porcelain White", "Electric Blue"],
    "Hero Glamour": ["Black", "Red", "Blue"],
}

# Output directory
output_dir = "bikes_real_images"
os.makedirs(output_dir, exist_ok=True)

def download_images(query, save_dir, num_images=5):
    """Download images from Bing using icrawler."""
    os.makedirs(save_dir, exist_ok=True)
    crawler = BingImageCrawler(storage={'root_dir': save_dir})
    crawler.crawl(
        keyword=query,
        max_num=num_images,
        filters={'size': 'large'}  # avoid logos/thumbnails
    )

# Download images for each bike + color
for bike, colors in bikes.items():
    for color in colors:
        query = f"{bike} {color} motorcycle photo"
        save_dir = os.path.join(output_dir, bike, color)
        print(f"🔎 Downloading: {query}")
        download_images(query, save_dir, num_images=5)  # get 5, keep best 3 later

# Rename first 3 images in each folder to img1.jpg, img2.jpg, img3.jpg
for bike, colors in bikes.items():
    for color in colors:
        folder = os.path.join(output_dir, bike, color)
        files = [f for f in os.listdir(folder) if os.path.isfile(os.path.join(folder, f))]
        files = files[:3]  # take first 3
        for i, file in enumerate(files, 1):
            old_path = os.path.join(folder, file)
            new_path = os.path.join(folder, f"img{i}.jpg")
            os.rename(old_path, new_path)

# Zip the results
zip_path = "bikes_real_images.zip"
with zipfile.ZipFile(zip_path, "w", zipfile.ZIP_DEFLATED) as zipf:
    for root, _, files in os.walk(output_dir):
        for file in files:
            file_path = os.path.join(root, file)
            arcname = os.path.relpath(file_path, output_dir)
            zipf.write(file_path, arcname)

print(f"\n✅ All done! Images saved and zipped at {zip_path}")
