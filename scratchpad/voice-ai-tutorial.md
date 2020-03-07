# Building a simple voice AI using python

This is a tutorial for building a voice AI, like amazon's alexa,
apple's siri, or the google home platform. It's my hope that you can follow
along even if this is your first

It's going to be using python and a number of third party tools.

 * [Picovoice's Porcupine](https://github.com/Picovoice/Porcupine#python-demo-application)
     for wake word detection

 * [Mozzila's DeepSpeech](https://github.com/mozilla/DeepSpeech) for out
     speech-to-text engine

 * [VebalExpressions](https://github.com/VerbalExpressions/PythonVerbalExpressions)
     for intent parsing (these are basically just easier to read regexes,
     despite the confusing name)

# Getting started

If you're not familar with python, well not would be a good time to start. It's
important that you do development in a *virtualenv*, so that you don't
accidently mix package versions with other projects, or with system packages.

Let's create a new project root and get started

## Porcupine

Porcupine isn't in a convenient pip package, so we need to manually install it.
From your project root, run the following.

```bash
git clone --depth=1 https://github.com/Picovoice/Porcupine.git
#We use depth=1 because if we don't it's 4.6GB of data
```

We're going to use python's asyncio framework as a crude 
cooperative-multiprocessing alternative. This let's us pretend we're running multiple
different processes (tasks) without nearly us much overhead or having to worry
about inter-process communication or locks. Of course we are still running
single threaded, at no point are we running more than one piece of code at a
time. What happens is that whenever we call a function using the `await`
function, that gives other tasks a chance to run.

This makes some things a lot clearer, for example we can have one task that's
listening to a microphone, while another can "listen" to a command line
application, while another checks to see if anything is scheduled to run, checks
your email, or anything else.

Create a `main.py` file in your project, and start by setting up all your
imports.

```python
import asyncio
import struct
import pyaudio
import deepspeech
from Porcupine.binding.python.porcupine import Porcupine
```

Notice the long import path? That's because `Porcupine` doesn't have a pip
installable package.

Next we can start setting up `Porcupine`, porcupine ships with binaries for
multiple platforms, we're developing on linux so we'll use the
"Porcupine/lib/*linux*/x86_64/libpv_porcupine.so" path. If you're on a different
operating system you will need to change that. Please note the the
`keyword_file_paths` is also dependent on operating system. We're going to use
the wakeword `computer`. 

```python
porcupine = Porcupine(                                                   
            library_path="Porcupine/lib/linux/x86_64/libpv_porcupine.so",
            model_file_path="Porcupine/lib/common/porcupine_params.pv",                        
            keyword_file_paths=["Porcupine/resources/keyword_files/linux/computer_linux.ppn",],
            sensitivities=[0.9,])
```

One "gotcha" of this code is that `keyword_file_paths` and `sensitivities`
accepts a list of keywords/sensitivies. You can use this to support multiple
wakewords later on.

You can train custom wakewords fairly easily. From the porcupine directory you
can run something like this:

```bash
tools/optimizer/${SYSTEM}/${MACHINE}/pv_porcupine_optimizer -r resources/optimizer_data -w ${WAKE_WORD} \
-p ${TARGET_SYSTEM} -o ${OUTPUT_DIRECTORY}
```

Now that we have porcupine instantiated we can start dealing with audio streams.

TODO: Explain how to find `input_device_index`

```python3
pa = pyaudio.PyAudio()
audio_stream = pa.open(
    rate=porcupine.sample_rate,
    channels=1,
    format=pyaudio.paInt16,
    input=True,
    frames_per_buffer=porcupine.frame_length,
    input_device_index=7)
```

Finally, we pass the audio data into porcupine.

```python3
async def waitForWakeword():
    while True:
        pcm = audio_stream.read(porcupine.frame_length)
        pcm = struct.unpack_from("h" * porcupine.frame_length, pcm)

        result = porcupine.process(pcm)
        #print("Waiting for wakeword...", result)
        if result:
            return result
        await asyncio.sleep(0)
```

and wait for the wakeword to be recognized

```python3
loop = asyncio.get_event_loop()                        
#This blocks until we hear the wakeword
loop.run_until_complete(waitForWakeword())
print("I heard the wakeword! Shutting down now")
```

If everything is working correctly you should be able to say "computer" and the
program will complete.

# Passing input to Mozilla's deepSpeech

Now that wakeword detection is working, we can get started on actual speech
recognition. Speech recognition requires a lot more electricity then wakeword
detection, so even though we don't need to send audio over the internet to do
recognition we're still going to use the wakeword/recognizer system like is used
by google/siri/alexa/etc.

DeepSpeech can be a bit difficult to configure properly, so to save time I'm
just going to provide an example of initializing the deepspeech api. For the
most part these parameters aren't tunable unless you're training your own speech
recognition.

First, download and untar the models file and install the python deepspeech
library.

```bash
wget https://github.com/mozilla/DeepSpeech/releases/download/v0.5.1/deepspeech-0.5.1-models.tar.gz
tar -xvf deepspeech-0.5.1-models.tar.gz
pip install deepspeech
```

Then you can initialize your model.

```python3
def setupDsModel(): 
    MODEL_DIR = "deepspeech-0.5.1-models/"
    BEAM_WIDTH = 500
    LM_WEIGHT = 1.50
    VALID_WORD_COUNT_WEIGHT = 2.25
    N_FEATURES = 26
    N_CONTEXT = 9
    MODEL_FILE = MODEL_DIR+'output_graph.pbmm'
    ALPHABET_FILE = MODEL_DIR+'alphabet.txt'
    LANGUAGE_MODEL = MODEL_DIR+'lm.binary'
    TRIE_FILE = MODEL_DIR+'trie'

    ds = deepspeech.Model(MODEL_FILE, N_FEATURES, N_CONTEXT, ALPHABET_FILE, BEAM_WIDTH)
    ds.enableDecoderWithLM(ALPHABET_FILE, LANGUAGE_MODEL, TRIE_FILE, LM_WEIGHT,
    VALID_WORD_COUNT_WEIGHT)
    return ds
```


