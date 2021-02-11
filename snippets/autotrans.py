import time, psutil, googletrans
import pyperclip
from googletrans import Translator
translator = Translator()

clip = ""
while True:
    time.sleep(0.1)
    newclip = pyperclip.paste()
    if newclip != clip:
        trans = translator.translate(newclip).text
#        trans = trans.replace("\"","")
        pyperclip.copy(trans)
        print(trans)
        clip = trans

