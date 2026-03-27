import shutil
import os

brain_dir = r"C:\Users\HP\.gemini\antigravity\brain\8ee433e3-1c7d-4783-828e-44a1ed535fc9"
assets_dir = r"C:\Users\HP\Desktop\sneha-portfolio\assets"

if not os.path.exists(assets_dir):
    os.makedirs(assets_dir)

# Mapping generated files to deployment names
image_map = {
    "project_farmer_mockup_1773755636769.png": "project-farmer.png",
    "project_career_mockup_1773755853103.png": "project-career.png",
    "project_youtube_sentiment_mockup_1773755874432.png": "project-youtube.png"
}

for src_name, dst_name in image_map.items():
    src_path = os.path.join(brain_dir, src_name)
    dst_path = os.path.join(assets_dir, dst_name)
    
    if os.path.exists(src_path):
        shutil.copy2(src_path, dst_path)
        print(f"Copied {src_name} to {dst_name}")
    else:
        print(f"File not found: {src_path}")
