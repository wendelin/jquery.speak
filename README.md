## Modules

<dl>
<dt><a href="#module_jquery.speak">jquery.speak</a></dt>
<dd></dd>
</dl>

## Functions

<dl>
<dt><a href="#jquery.speak">jquery.speak(text, [o], [interrupt])</a></dt>
<dd></dd>
</dl>

<a name="module_jquery.speak"></a>

## jquery.speak
**Requires**: <code>module:jquery</code>  
**See**: https://github.com/wendelin/jquery.speak/blob/master/LICENSE  
**Author:** Wendelin Thomas <wendelin.thomas@gmail.com>  
**Copyright**: Copyright 2016 Wendelin Thomas. All rights reserved
Licensed under the MIT License.  

* [jquery.speak](#module_jquery.speak)
    * [~DEFAULTS](#module_jquery.speak..DEFAULTS) : <code>Object</code>
    * [~getVoices(o)](#module_jquery.speak..getVoices) ⇒ <code>Array</code>
    * [~getVoice([o])](#module_jquery.speak..getVoice) ⇒ <code>SpeechSynthesisVoice</code> &#124; <code>Null</code>
    * [~paused()](#module_jquery.speak..paused)
    * [~resume()](#module_jquery.speak..resume)
    * [~cancel()](#module_jquery.speak..cancel)
    * [~speaking()](#module_jquery.speak..speaking)

<a name="module_jquery.speak..DEFAULTS"></a>

### jquery.speak~DEFAULTS : <code>Object</code>
**Kind**: inner constant of <code>[jquery.speak](#module_jquery.speak)</code>  
<a name="module_jquery.speak..getVoices"></a>

### jquery.speak~getVoices(o) ⇒ <code>Array</code>
**Kind**: inner method of <code>[jquery.speak](#module_jquery.speak)</code>  

| Param | Type | Description |
| --- | --- | --- |
| o | <code>Object</code> &#124; <code>String</code> | Filter options |

<a name="module_jquery.speak..getVoice"></a>

### jquery.speak~getVoice([o]) ⇒ <code>SpeechSynthesisVoice</code> &#124; <code>Null</code>
**Kind**: inner method of <code>[jquery.speak](#module_jquery.speak)</code>  

| Param | Type | Description |
| --- | --- | --- |
| [o] | <code>Object</code> &#124; <code>String</code> | Filter options |

<a name="module_jquery.speak..paused"></a>

### jquery.speak~paused()
**Kind**: inner method of <code>[jquery.speak](#module_jquery.speak)</code>  
<a name="module_jquery.speak..resume"></a>

### jquery.speak~resume()
**Kind**: inner method of <code>[jquery.speak](#module_jquery.speak)</code>  
<a name="module_jquery.speak..cancel"></a>

### jquery.speak~cancel()
**Kind**: inner method of <code>[jquery.speak](#module_jquery.speak)</code>  
<a name="module_jquery.speak..speaking"></a>

### jquery.speak~speaking()
**Kind**: inner method of <code>[jquery.speak](#module_jquery.speak)</code>  
<a name="jquery.speak"></a>

## jquery.speak(text, [o], [interrupt])
**Kind**: global function  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| text | <code>String</code> |  | Text to be spoken by the browser |
| [o] | <code>Object</code> |  | Optional parameters |
| [o.voice.name] | <code>Object</code> |  | Name of the voice to be used (e.g. "Bruce") |
| [o.voice.lang] | <code>String</code> | <code>en</code> | Language of the voice |
| [o.pitch] | <code>Number</code> | <code>1</code> | Speaking pitch |
| [o.rate] | <code>Number</code> | <code>1</code> | Speaking rate/speed |
| [o.volume] | <code>Number</code> | <code>1</code> | Speaking volume |
| [o.lang] | <code>String</code> | <code>en</code> | Shorthand for o.voice.lang. |
| [interrupt] | <code>Boolean</code> | <code>true</code> | Interrupt if something is already being said. |

**Example**  
```js
$.speak("I'm sorry Dave, I'm afraid I can't do that", "en");
```
**Example**  
```js
$.speak("I'm sorry Dave, I'm afraid I can't do that", {voice:{name:"Hysterical", lang:"en"}, pitch:0.6,rate:1.5});
```
