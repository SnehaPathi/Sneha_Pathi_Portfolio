import shutil
import os
import glob

# Search for resume files in Downloads
download_path = "C:/Users/HP/Downloads"
resume_files = glob.glob(os.path.join(download_path, "*RESUME*.pdf"))
resume_files.sort(key=os.path.getmtime, reverse=True)

if resume_files:
    latest_resume = resume_files[0]
    target_dir = "C:/Users/HP/Desktop/sneha-portfolio/assets"
    os.makedirs(target_dir, exist_ok=True)
    target_path = os.path.join(target_dir, "SNEHA_RESUME_PORTFOLIO.pdf")
    shutil.copy2(latest_resume, target_path)
    print(f"Successfully copied {os.path.basename(latest_resume)} to {target_path}")
else:
    print("No resume file found in Downloads.")
