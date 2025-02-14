from pdf2image import convert_from_path
import os

pdf_dir = "./static/certificates/"
output_dir = "./static/certificate_thumbnails/"
os.makedirs(output_dir, exist_ok=True)

for pdf_file in os.listdir(pdf_dir):
    if pdf_file.endswith(".pdf"):
        pdf_path = os.path.join(pdf_dir, pdf_file)
        images = convert_from_path(pdf_path, first_page=1, last_page=1, dpi=150)  # Convert first page
        if images:
            image_path = os.path.join(output_dir, pdf_file.replace(".pdf", ".png"))
            images[0].save(image_path, "PNG")
            print(f"Thumbnail saved: {image_path}")
