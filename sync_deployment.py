import shutil
import os

source_dir = r"C:\Users\HP\Desktop\sneha-portfolio"
target_dir = r"C:\Users\HP\.gemini\antigravity\scratch"

# Files to copy
files_to_copy = ["index.html", "script.js", "styles.css", ".gitignore"]

for file_name in files_to_copy:
    src_file = os.path.join(source_dir, file_name)
    dst_file = os.path.join(target_dir, file_name)
    if os.path.exists(src_file):
        shutil.copy2(src_file, dst_file)
        print(f"Copied {file_name}")

# Copy assets folder
src_assets = os.path.join(source_dir, "assets")
dst_assets = os.path.join(target_dir, "assets")
if os.path.exists(src_assets):
    if os.path.exists(dst_assets):
        shutil.rmtree(dst_assets)
    shutil.copytree(src_assets, dst_assets)
    print("Copied assets directory")
