
from PIL import Image
import os
import sys

def resize_banner():
    source_path = os.path.join(os.getcwd(), 'public', 'dream_banner.png')
    target_path = os.path.join(os.getcwd(), 'public', 'banner_234x60.png')

    try:
        # Check if source exists
        if not os.path.exists(source_path):
            print(f"Error: Source file not found at {source_path}")
            sys.exit(1)

        print(f"Opening image: {source_path}")
        with Image.open(source_path) as img:
            # Resize image
            # Use LANCZOS for high quality downsampling
            resized_img = img.resize((234, 60), Image.Resampling.LANCZOS)
            
            # Save the resized image
            print(f"Saving resized image to: {target_path}")
            resized_img.save(target_path, optimize=True)
            print("Successfully resized image!")

    except Exception as e:
        print(f"An error occurred: {e}")
        sys.exit(1)

if __name__ == "__main__":
    resize_banner()
