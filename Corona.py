import sys
# Takes first name and last name via command
# line arguments and then display them
from PIL import Image
import PIL
# creating a image object (main image)
print(sys.argv)
im1 = Image.open(sys.argv[1])
print(im1)
# save a image using extension
im1 = im1.save("geeks.png")
print("Output from Python")
