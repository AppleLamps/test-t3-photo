2. [Home](https://fal.ai/)
4. [Explore](https://fal.ai/models)
6. fal-ai/minimax/image-01

[Docs](https://docs.fal.ai/) [Blog](https://blog.fal.ai/) [Pricing](https://fal.ai/pricing) [Enterprise](https://fal.ai/enterprise) [Careers](https://fal.ai/careers) [Research Grants](https://fal.ai/grants)

[Log-in](https://fal.ai/login?returnTo=/models/fal-ai/minimax/image-01/api) [Sign-up](https://fal.ai/login?returnTo=/models/fal-ai/minimax/image-01/api)

1. [Back to Gallery](https://fal.ai/models)

# MiniMax (Hailuo AI) Text to Image Text to Image

fal-ai/minimax/image-01

Text to Image

Generate high quality images from text prompts using MiniMax Image-01. Longer text prompts will result in better quality images.

Inference

Commercial use

Partner

[Schema](https://fal.ai/api/openapi/queue/openapi.json?endpoint_id=fal-ai/minimax/image-01)

[LLMs](https://fal.ai/models/fal-ai/minimax/image-01/llms.txt)

[Playground](https://fal.ai/models/fal-ai/minimax/image-01/playground) [API](https://fal.ai/models/fal-ai/minimax/image-01/api)

### Table of contents

JavaScript / Node.js

[**1\. Calling the API**](https://fal.ai/models/fal-ai/minimax/image-01/api#api-call)

- [Install the client](https://fal.ai/models/fal-ai/minimax/image-01/api#api-call-install)
- [Setup your API Key](https://fal.ai/models/fal-ai/minimax/image-01/api#api-call-setup)
- [Submit a request](https://fal.ai/models/fal-ai/minimax/image-01/api#api-call-submit-request)

[**2\. Authentication**](https://fal.ai/models/fal-ai/minimax/image-01/api#auth)

- [API Key](https://fal.ai/models/fal-ai/minimax/image-01/api#auth-api-key)

[**3\. Queue**](https://fal.ai/models/fal-ai/minimax/image-01/api#queue)

- [Submit a request](https://fal.ai/models/fal-ai/minimax/image-01/api#queue-submit)
- [Fetch request status](https://fal.ai/models/fal-ai/minimax/image-01/api#queue-status)
- [Get the result](https://fal.ai/models/fal-ai/minimax/image-01/api#queue-result)

[**4\. Files**](https://fal.ai/models/fal-ai/minimax/image-01/api#files)

- [Data URI (base64)](https://fal.ai/models/fal-ai/minimax/image-01/api#files-data-uri)
- [Hosted files (URL)](https://fal.ai/models/fal-ai/minimax/image-01/api#files-from-url)
- [Uploading files](https://fal.ai/models/fal-ai/minimax/image-01/api#files-upload)

[**5\. Schema**](https://fal.ai/models/fal-ai/minimax/image-01/api#schema)

- [Input](https://fal.ai/models/fal-ai/minimax/image-01/api#schema-input)
- [Output](https://fal.ai/models/fal-ai/minimax/image-01/api#schema-output)
- [Other](https://fal.ai/models/fal-ai/minimax/image-01/api#schema-other)

### About

Generate images from text prompt using MiniMax API.

### 1\. Calling the API [\#](https://fal.ai/models/fal-ai/minimax/image-01/api\#api-call-install)

### Install the client [\#](https://fal.ai/models/fal-ai/minimax/image-01/api\#api-call-install)

The client provides a convenient way to interact with the model API.

npmyarnpnpmbun

```
npm install --save @fal-ai/client
```

##### Migrate to @fal-ai/client

The `@fal-ai/serverless-client` package has been deprecated in favor of `@fal-ai/client`. Please check the [migration guide](https://docs.fal.ai/clients/javascript#migration-from-serverless-client-to-client) for more information.

### Setup your API Key [\#](https://fal.ai/models/fal-ai/minimax/image-01/api\#api-call-setup)

Set `FAL_KEY` as an environment variable in your runtime.

```
export FAL_KEY="YOUR_API_KEY"
```

### Submit a request [\#](https://fal.ai/models/fal-ai/minimax/image-01/api\#api-call-submit-request)

The client API handles the API submit protocol. It will handle the request status updates and return the result when the request is completed.

```
import { fal } from "@fal-ai/client";

const result = await fal.subscribe("fal-ai/minimax/image-01", {
  input: {
    prompt: "Man dressed in white t shirt, full-body stand front view image, outdoor, Venice beach sign, full-body image, Los Angeles, Fashion photography of 90s, documentary, Film grain, photorealistic"
  },
  logs: true,
  onQueueUpdate: (update) => {
    if (update.status === "IN_PROGRESS") {
      update.logs.map((log) => log.message).forEach(console.log);
    }
  },
});
console.log(result.data);
console.log(result.requestId);
```

## 2\. Authentication [\#](https://fal.ai/models/fal-ai/minimax/image-01/api\#auth)

The API uses an API Key for authentication. It is recommended you set the `FAL_KEY` environment variable in your runtime when possible.

### API Key [\#](https://fal.ai/models/fal-ai/minimax/image-01/api\#auth-api-key)

In case your app is running in an environment where you cannot set environment variables, you can set the API Key manually as a client configuration.

```
import { fal } from "@fal-ai/client";

fal.config({
  credentials: "YOUR_FAL_KEY"
});
```

##### Protect your API Key

When running code on the client-side (e.g. in a browser, mobile app or GUI applications), make sure to not expose your `FAL_KEY`. Instead, **use a server-side proxy** to make requests to the API. For more information, check out our [server-side integration guide](https://docs.fal.ai/model-endpoints/server-side).

## 3\. Queue [\#](https://fal.ai/models/fal-ai/minimax/image-01/api\#queue)

##### Long-running requests

For long-running requests, such as _training_ jobs or models with slower inference times, it is recommended to check the [Queue](https://docs.fal.ai/model-endpoints/queue) status and rely on [Webhooks](https://docs.fal.ai/model-endpoints/webhooks) instead of blocking while waiting for the result.

### Submit a request [\#](https://fal.ai/models/fal-ai/minimax/image-01/api\#queue-submit)

The client API provides a convenient way to submit requests to the model.

```
import { fal } from "@fal-ai/client";

const { request_id } = await fal.queue.submit("fal-ai/minimax/image-01", {
  input: {
    prompt: "Man dressed in white t shirt, full-body stand front view image, outdoor, Venice beach sign, full-body image, Los Angeles, Fashion photography of 90s, documentary, Film grain, photorealistic"
  },
  webhookUrl: "https://optional.webhook.url/for/results",
});
```

### Fetch request status [\#](https://fal.ai/models/fal-ai/minimax/image-01/api\#queue-status)

You can fetch the status of a request to check if it is completed or still in progress.

```
import { fal } from "@fal-ai/client";

const status = await fal.queue.status("fal-ai/minimax/image-01", {
  requestId: "764cabcf-b745-4b3e-ae38-1200304cf45b",
  logs: true,
});
```

### Get the result [\#](https://fal.ai/models/fal-ai/minimax/image-01/api\#queue-result)

Once the request is completed, you can fetch the result. See the [Output Schema](https://fal.ai/models/fal-ai/minimax/image-01/api#schema-output) for the expected result format.

```
import { fal } from "@fal-ai/client";

const result = await fal.queue.result("fal-ai/minimax/image-01", {
  requestId: "764cabcf-b745-4b3e-ae38-1200304cf45b"
});
console.log(result.data);
console.log(result.requestId);
```

## 4\. Files [\#](https://fal.ai/models/fal-ai/minimax/image-01/api\#files)

Some attributes in the API accept file URLs as input. Whenever that's the case you can pass your own URL or a Base64 data URI.

### Data URI (base64) [\#](https://fal.ai/models/fal-ai/minimax/image-01/api\#files-data-uri)

You can pass a Base64 data URI as a file input. The API will handle the file decoding for you. Keep in mind that for large files, this alternative although convenient can impact the request performance.

### Hosted files (URL) [\#](https://fal.ai/models/fal-ai/minimax/image-01/api\#files-from-url)

You can also pass your own URLs as long as they are publicly accessible. Be aware that some hosts might block cross-site requests, rate-limit, or consider the request as a bot.

### Uploading files [\#](https://fal.ai/models/fal-ai/minimax/image-01/api\#files-upload)

We provide a convenient file storage that allows you to upload files and use them in your requests. You can upload files using the client API and use the returned URL in your requests.

```
import { fal } from "@fal-ai/client";

const file = new File(["Hello, World!"], "hello.txt", { type: "text/plain" });
const url = await fal.storage.upload(file);
```

##### Auto uploads

The client will auto-upload the file for you if you pass a binary object (e.g. `File`, `Data`).

Read more about file handling in our [file upload guide](https://docs.fal.ai/model-endpoints#file-uploads).

## 5\. Schema [\#](https://fal.ai/models/fal-ai/minimax/image-01/api\#schema)

### Input [\#](https://fal.ai/models/fal-ai/minimax/image-01/api\#schema-input)

`prompt``string`\\* required

Text prompt for image generation (max 1500 characters)

`aspect_ratio``AspectRatioEnum`

Aspect ratio of the generated image Default value: `"1:1"`

Possible enum values:`1:1, 16:9, 4:3, 3:2, 2:3, 3:4, 9:16, 21:9`

`num_images``integer`

Number of images to generate (1-9) Default value: `1`

`prompt_optimizer``boolean`

Whether to enable automatic prompt optimization

```
{
  "prompt": "Man dressed in white t shirt, full-body stand front view image, outdoor, Venice beach sign, full-body image, Los Angeles, Fashion photography of 90s, documentary, Film grain, photorealistic",
  "aspect_ratio": "1:1",
  "num_images": 1
}
```

### Output [\#](https://fal.ai/models/fal-ai/minimax/image-01/api\#schema-output)

`images``list<File>`\\* required

Generated images

```
{
  "images": [\
    {\
      "file_size": 351366,\
      "file_name": "image.jpg",\
      "content_type": "image/jpeg",\
      "url": "https://v3.fal.media/files/tiger/xLcblZAbiw1kM6ZR_2D-r_image.jpg"\
    }\
  ]
}
```

### Other types [\#](https://fal.ai/models/fal-ai/minimax/image-01/api\#schema-other)

#### TextToVideoDirectorRequest [\#](https://fal.ai/models/fal-ai/minimax/image-01/api\#type-TextToVideoDirectorRequest)

`prompt``string`\\* required

Text prompt for video generation. Camera movement instructions can be added using square brackets (e.g. \[Pan left\] or \[Zoom in\]). You can use up to 3 combined movements per prompt. Supported movements: Truck left/right, Pan left/right, Push in/Pull out, Pedestal up/down, Tilt up/down, Zoom in/out, Shake, Tracking shot, Static shot. For example: \[Truck left, Pan right, Zoom in\]. For a more detailed guide, refer [https://sixth-switch-2ac.notion.site/T2V-01-Director-Model-Tutorial-with-camera-movement-1886c20a98eb80f395b8e05291ad8645](https://sixth-switch-2ac.notion.site/T2V-01-Director-Model-Tutorial-with-camera-movement-1886c20a98eb80f395b8e05291ad8645)

`prompt_optimizer``boolean`

Whether to use the model's prompt optimizer Default value: `true`

#### TextToSpeechTurbov25Request [\#](https://fal.ai/models/fal-ai/minimax/image-01/api\#type-TextToSpeechTurbov25Request)

`text``string`\\* required

Text to convert to speech (max 5000 characters, minimum 1 non-whitespace character)

`voice_setting``VoiceSetting`

Voice configuration settings

`audio_setting``AudioSetting`

Audio configuration settings

`language_boost``LanguageBoostEnum`

Enhance recognition of specified languages and dialects

Possible enum values:`Persian, Filipino, Tamil, Chinese, Chinese,Yue, English, Arabic, Russian, Spanish, French, Portuguese, German, Turkish, Dutch, Ukrainian, Vietnamese, Indonesian, Japanese, Italian, Korean, Thai, Polish, Romanian, Greek, Czech, Finnish, Hindi, Bulgarian, Danish, Hebrew, Malay, Slovak, Swedish, Croatian, Hungarian, Norwegian, Slovenian, Catalan, Nynorsk, Afrikaans, auto`

`output_format``OutputFormatEnum`

Format of the output content (non-streaming only) Default value: `"hex"`

Possible enum values:`url, hex`

`pronunciation_dict``PronunciationDict`

Custom pronunciation dictionary for text replacement

#### LoudnessNormalizationSetting [\#](https://fal.ai/models/fal-ai/minimax/image-01/api\#type-LoudnessNormalizationSetting)

`enabled``boolean`

Enable loudness normalization for the audio Default value: `true`

`target_loudness``float`

Target loudness in LUFS (default -18.0) Default value: `-18`

`target_range``float`

Target loudness range in LU (default 8.0) Default value: `8`

`target_peak``float`

Target peak level in dBTP (default -0.5). Default value: `-0.5`

#### TextToSpeechHD26Request [\#](https://fal.ai/models/fal-ai/minimax/image-01/api\#type-TextToSpeechHD26Request)

`voice_setting``VoiceSetting`

Voice configuration settings

`audio_setting``AudioSetting`

Audio configuration settings

`language_boost``LanguageBoostEnum`

Enhance recognition of specified languages and dialects

Possible enum values:`Chinese, Chinese,Yue, English, Arabic, Russian, Spanish, French, Portuguese, German, Turkish, Dutch, Ukrainian, Vietnamese, Indonesian, Japanese, Italian, Korean, Thai, Polish, Romanian, Greek, Czech, Finnish, Hindi, Bulgarian, Danish, Hebrew, Malay, Slovak, Swedish, Croatian, Hungarian, Norwegian, Slovenian, Catalan, Nynorsk, Afrikaans, auto`

`output_format``OutputFormatEnum`

Format of the output content (non-streaming only) Default value: `"hex"`

Possible enum values:`url, hex`

`pronunciation_dict``PronunciationDict`

Custom pronunciation dictionary for text replacement

`prompt``string`\\* required

Text to convert to speech. Paragraph breaks should be marked with newline characters. **NOTE**: You can customize speech pauses by adding markers in the form `<#x#>`, where `x` is the pause duration in seconds. Valid range: `[0.01, 99.99]`, up to two decimal places. Pause markers must be placed between speakable text segments and cannot be used consecutively.

`normalization_setting``LoudnessNormalizationSetting`

Loudness normalization settings for the audio

#### MiniMaxTextToImageWithReferenceRequest [\#](https://fal.ai/models/fal-ai/minimax/image-01/api\#type-MiniMaxTextToImageWithReferenceRequest)

`prompt``string`\\* required

Text prompt for image generation (max 1500 characters)

`image_url``string`\\* required

URL of the subject reference image to use for consistent character appearance

`aspect_ratio``AspectRatioEnum`

Aspect ratio of the generated image Default value: `"1:1"`

Possible enum values:`1:1, 16:9, 4:3, 3:2, 2:3, 3:4, 9:16, 21:9`

`num_images``integer`

Number of images to generate (1-9) Default value: `1`

`prompt_optimizer``boolean`

Whether to enable automatic prompt optimization

#### VoiceDesignRequest [\#](https://fal.ai/models/fal-ai/minimax/image-01/api\#type-VoiceDesignRequest)

`prompt``string`\\* required

Voice description prompt for generating a personalized voice

`preview_text``string`\\* required

Text for audio preview. Limited to 500 characters. A fee of $30 per 1M characters will be charged for the generation of the preview audio.

#### VoiceSetting [\#](https://fal.ai/models/fal-ai/minimax/image-01/api\#type-VoiceSetting)

`voice_id``string`

Predefined voice ID to use for synthesis Default value: `"Wise_Woman"`

`speed``float`

Speech speed (0.5-2.0) Default value: `1`

`vol``float`

Volume (0-10) Default value: `1`

`pitch``integer`

Voice pitch (-12 to 12)

`emotion``EmotionEnum`

Emotion of the generated speech

Possible enum values:`happy, sad, angry, fearful, disgusted, surprised, neutral`

`english_normalization``boolean`

Enables English text normalization to improve number reading performance, with a slight increase in latency

#### TextToSpeechHDv25Request [\#](https://fal.ai/models/fal-ai/minimax/image-01/api\#type-TextToSpeechHDv25Request)

`text``string`\\* required

Text to convert to speech (max 5000 characters, minimum 1 non-whitespace character)

`voice_setting``VoiceSetting`

Voice configuration settings

`audio_setting``AudioSetting`

Audio configuration settings

`language_boost``LanguageBoostEnum`

Enhance recognition of specified languages and dialects

Possible enum values:`Persian, Filipino, Tamil, Chinese, Chinese,Yue, English, Arabic, Russian, Spanish, French, Portuguese, German, Turkish, Dutch, Ukrainian, Vietnamese, Indonesian, Japanese, Italian, Korean, Thai, Polish, Romanian, Greek, Czech, Finnish, Hindi, Bulgarian, Danish, Hebrew, Malay, Slovak, Swedish, Croatian, Hungarian, Norwegian, Slovenian, Catalan, Nynorsk, Afrikaans, auto`

`output_format``OutputFormatEnum`

Format of the output content (non-streaming only) Default value: `"hex"`

Possible enum values:`url, hex`

`pronunciation_dict``PronunciationDict`

Custom pronunciation dictionary for text replacement

#### VoiceDeleteRequest [\#](https://fal.ai/models/fal-ai/minimax/image-01/api\#type-VoiceDeleteRequest)

`voice_id``string`\\* required

The voice\_id of the voice to be deleted

#### TextToVideoRequest [\#](https://fal.ai/models/fal-ai/minimax/image-01/api\#type-TextToVideoRequest)

`prompt``string`\\* required

`prompt_optimizer``boolean`

Whether to use the model's prompt optimizer Default value: `true`

#### ImageToVideoDirectorRequest [\#](https://fal.ai/models/fal-ai/minimax/image-01/api\#type-ImageToVideoDirectorRequest)

`prompt``string`\\* required

Text prompt for video generation. Camera movement instructions can be added using square brackets (e.g. \[Pan left\] or \[Zoom in\]). You can use up to 3 combined movements per prompt. Supported movements: Truck left/right, Pan left/right, Push in/Pull out, Pedestal up/down, Tilt up/down, Zoom in/out, Shake, Tracking shot, Static shot. For example: \[Truck left, Pan right, Zoom in\]. For a more detailed guide, refer [https://sixth-switch-2ac.notion.site/T2V-01-Director-Model-Tutorial-with-camera-movement-1886c20a98eb80f395b8e05291ad8645](https://sixth-switch-2ac.notion.site/T2V-01-Director-Model-Tutorial-with-camera-movement-1886c20a98eb80f395b8e05291ad8645)

`image_url``string`\\* required

URL of the image to use as the first frame

`prompt_optimizer``boolean`

Whether to use the model's prompt optimizer Default value: `true`

#### TextToSpeechHD01Request [\#](https://fal.ai/models/fal-ai/minimax/image-01/api\#type-TextToSpeechHD01Request)

`text``string`\\* required

Text to convert to speech (max 5000 characters, minimum 1 non-whitespace character)

`voice_setting``VoiceSetting`

Voice configuration settings

`audio_setting``AudioSetting`

Audio configuration settings

`language_boost``LanguageBoostEnum`

Enhance recognition of specified languages and dialects

Possible enum values:`Chinese, Chinese,Yue, English, Arabic, Russian, Spanish, French, Portuguese, German, Turkish, Dutch, Ukrainian, Vietnamese, Indonesian, Japanese, Italian, Korean, Thai, Polish, Romanian, Greek, Czech, Finnish, Hindi, Bulgarian, Danish, Hebrew, Malay, Slovak, Swedish, Croatian, Hungarian, Norwegian, Slovenian, Catalan, Nynorsk, Afrikaans, auto`

`output_format``OutputFormatEnum`

Format of the output content (non-streaming only) Default value: `"hex"`

Possible enum values:`url, hex`

`pronunciation_dict``PronunciationDict`

Custom pronunciation dictionary for text replacement

`normalization_setting``LoudnessNormalizationSetting`

Loudness normalization settings for the audio

#### TextToSpeech26StreamingRequest [\#](https://fal.ai/models/fal-ai/minimax/image-01/api\#type-TextToSpeech26StreamingRequest)

`voice_setting``VoiceSetting`

Voice configuration settings

`audio_setting``AudioSetting`

Audio configuration settings

`language_boost``LanguageBoostEnum`

Enhance recognition of specified languages and dialects

Possible enum values:`Chinese, Chinese,Yue, English, Arabic, Russian, Spanish, French, Portuguese, German, Turkish, Dutch, Ukrainian, Vietnamese, Indonesian, Japanese, Italian, Korean, Thai, Polish, Romanian, Greek, Czech, Finnish, Hindi, Bulgarian, Danish, Hebrew, Malay, Slovak, Swedish, Croatian, Hungarian, Norwegian, Slovenian, Catalan, Nynorsk, Afrikaans, auto`

`pronunciation_dict``PronunciationDict`

Custom pronunciation dictionary for text replacement

`prompt``string`\\* required

Text to convert to speech. Paragraph breaks should be marked with newline characters. **NOTE**: You can customize speech pauses by adding markers in the form `<#x#>`, where `x` is the pause duration in seconds. Valid range: `[0.01, 99.99]`, up to two decimal places. Pause markers must be placed between speakable text segments and cannot be used consecutively.

#### TextToSpeechTurboRequest [\#](https://fal.ai/models/fal-ai/minimax/image-01/api\#type-TextToSpeechTurboRequest)

`text``string`\\* required

Text to convert to speech (max 5000 characters, minimum 1 non-whitespace character)

`voice_setting``VoiceSetting`

Voice configuration settings

`audio_setting``AudioSetting`

Audio configuration settings

`language_boost``LanguageBoostEnum`

Enhance recognition of specified languages and dialects

Possible enum values:`Chinese, Chinese,Yue, English, Arabic, Russian, Spanish, French, Portuguese, German, Turkish, Dutch, Ukrainian, Vietnamese, Indonesian, Japanese, Italian, Korean, Thai, Polish, Romanian, Greek, Czech, Finnish, Hindi, Bulgarian, Danish, Hebrew, Malay, Slovak, Swedish, Croatian, Hungarian, Norwegian, Slovenian, Catalan, Nynorsk, Afrikaans, auto`

`output_format``OutputFormatEnum`

Format of the output content (non-streaming only) Default value: `"hex"`

Possible enum values:`url, hex`

`pronunciation_dict``PronunciationDict`

Custom pronunciation dictionary for text replacement

#### PronunciationDict [\#](https://fal.ai/models/fal-ai/minimax/image-01/api\#type-PronunciationDict)

`tone_list``list<string>`

List of pronunciation replacements in format \['text/(pronunciation)', ...\]. For Chinese, tones are 1-5. Example: \['燕少飞/(yan4)(shao3)(fei1)'\]

#### TextToVideoLiveRequest [\#](https://fal.ai/models/fal-ai/minimax/image-01/api\#type-TextToVideoLiveRequest)

`prompt``string`\\* required

`prompt_optimizer``boolean`

Whether to use the model's prompt optimizer Default value: `true`

#### File [\#](https://fal.ai/models/fal-ai/minimax/image-01/api\#type-File)

`url``string`\\* required

The URL where the file can be downloaded from.

`content_type``string`

The mime type of the file.

`file_name``string`

The name of the file. It will be auto-generated if not provided.

`file_size``integer`

The size of the file in bytes.

`file_data``string`

File data

#### ImageToVideoRequest [\#](https://fal.ai/models/fal-ai/minimax/image-01/api\#type-ImageToVideoRequest)

`prompt``string`\\* required

`image_url``string`\\* required

URL of the image to use as the first frame

`prompt_optimizer``boolean`

Whether to use the model's prompt optimizer Default value: `true`

#### SubjectReferenceRequest [\#](https://fal.ai/models/fal-ai/minimax/image-01/api\#type-SubjectReferenceRequest)

`prompt``string`\\* required

`subject_reference_image_url``string`\\* required

URL of the subject reference image to use for consistent subject appearance

`prompt_optimizer``boolean`

Whether to use the model's prompt optimizer Default value: `true`

#### AudioSetting [\#](https://fal.ai/models/fal-ai/minimax/image-01/api\#type-AudioSetting)

`sample_rate``SampleRateEnum`

Sample rate of generated audio Default value: `"32000"`

Possible enum values:`8000, 16000, 22050, 24000, 32000, 44100`

`bitrate``BitrateEnum`

Bitrate of generated audio Default value: `"128000"`

Possible enum values:`32000, 64000, 128000, 256000`

`format``FormatEnum`

Audio format Default value: `"mp3"`

Possible enum values:`mp3, pcm, flac`

`channel``ChannelEnum`

Number of audio channels (1=mono, 2=stereo) Default value: `"1"`

Possible enum values:`1, 2`

#### VoiceCloneRequest [\#](https://fal.ai/models/fal-ai/minimax/image-01/api\#type-VoiceCloneRequest)

`audio_url``string`\\* required

URL of the input audio file for voice cloning. Should be at least 10 seconds
long. To retain the voice permanently, use it with a TTS (text-to-speech)
endpoint at least once within 7 days. Otherwise, it will be
automatically deleted.

`noise_reduction``boolean`

Enable noise reduction for the cloned voice

`need_volume_normalization``boolean`

Enable volume normalization for the cloned voice

`accuracy``float`

Text validation accuracy threshold (0-1)

`text``string`

Text to generate a TTS preview with the cloned voice (optional) Default value: `"Hello, this is a preview of your cloned voice! I hope you like it!"`

`model``ModelEnum`

TTS model to use for preview. Options: speech-02-hd, speech-02-turbo, speech-01-hd, speech-01-turbo Default value: `"speech-02-hd"`

Possible enum values:`speech-02-hd, speech-02-turbo, speech-01-hd, speech-01-turbo`

#### TextToSpeechHDRequest [\#](https://fal.ai/models/fal-ai/minimax/image-01/api\#type-TextToSpeechHDRequest)

`text``string`\\* required

Text to convert to speech (max 5000 characters, minimum 1 non-whitespace character)

`voice_setting``VoiceSetting`

Voice configuration settings

`audio_setting``AudioSetting`

Audio configuration settings

`language_boost``LanguageBoostEnum`

Enhance recognition of specified languages and dialects

Possible enum values:`Chinese, Chinese,Yue, English, Arabic, Russian, Spanish, French, Portuguese, German, Turkish, Dutch, Ukrainian, Vietnamese, Indonesian, Japanese, Italian, Korean, Thai, Polish, Romanian, Greek, Czech, Finnish, Hindi, Bulgarian, Danish, Hebrew, Malay, Slovak, Swedish, Croatian, Hungarian, Norwegian, Slovenian, Catalan, Nynorsk, Afrikaans, auto`

`output_format``OutputFormatEnum`

Format of the output content (non-streaming only) Default value: `"hex"`

Possible enum values:`url, hex`

`pronunciation_dict``PronunciationDict`

Custom pronunciation dictionary for text replacement

#### TextToSpeechTurbo26Request [\#](https://fal.ai/models/fal-ai/minimax/image-01/api\#type-TextToSpeechTurbo26Request)

`voice_setting``VoiceSetting`

Voice configuration settings

`audio_setting``AudioSetting`

Audio configuration settings

`language_boost``LanguageBoostEnum`

Enhance recognition of specified languages and dialects

Possible enum values:`Chinese, Chinese,Yue, English, Arabic, Russian, Spanish, French, Portuguese, German, Turkish, Dutch, Ukrainian, Vietnamese, Indonesian, Japanese, Italian, Korean, Thai, Polish, Romanian, Greek, Czech, Finnish, Hindi, Bulgarian, Danish, Hebrew, Malay, Slovak, Swedish, Croatian, Hungarian, Norwegian, Slovenian, Catalan, Nynorsk, Afrikaans, auto`

`output_format``OutputFormatEnum`

Format of the output content (non-streaming only) Default value: `"hex"`

Possible enum values:`url, hex`

`pronunciation_dict``PronunciationDict`

Custom pronunciation dictionary for text replacement

`prompt``string`\\* required

Text to convert to speech. Paragraph breaks should be marked with newline characters. **NOTE**: You can customize speech pauses by adding markers in the form `<#x#>`, where `x` is the pause duration in seconds. Valid range: `[0.01, 99.99]`, up to two decimal places. Pause markers must be placed between speakable text segments and cannot be used consecutively.

`normalization_setting``LoudnessNormalizationSetting`

Loudness normalization settings for the audio

## Related Models

#### Learn More

[Status](https://status.fal.ai/) [Documentation](https://docs.fal.ai/) [Pricing](https://fal.ai/pricing) [Enterprise](https://fal.ai/enterprise) [Grants](https://fal.ai/grants) [Learn](https://fal.ai/learn) [About Us](https://fal.ai/about) [Careers](https://fal.ai/careers) [Blog](https://blog.fal.ai/) [Get in touch](mailto:support@fal.ai)

Models [AuraFlow](https://fal.ai/models/fal-ai/aura-flow) [Flux.1 \[schnell\]](https://fal.ai/models/fal-ai/flux/schnell) [Flux.1 \[dev\]](https://fal.ai/models/fal-ai/flux/dev) [Flux Realism LoRA](https://fal.ai/models/fal-ai/flux-realism) [Flux LoRA](https://fal.ai/models/fal-ai/flux-lora) [Explore More](https://fal.ai/models)

#### Playgrounds

[Training](https://fal.ai/models/fal-ai/flux-lora-fast-training) [Workflows](https://fal.ai/workflows) [Demos](https://fal.ai/demos)

#### Socials

[Discord](https://discord.gg/fal-ai) [GitHub](https://github.com/fal-ai) [Reddit](https://www.reddit.com/r/fal/) [Twitter](https://twitter.com/fal) [Linkedin](https://www.linkedin.com/company/features-and-labels/)

features and labels, 2025. All Rights Reserved. [Terms of Service](https://fal.ai/terms.html) and [Privacy Policy](https://fal.ai/privacy.html)