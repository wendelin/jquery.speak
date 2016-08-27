# jQuery.speak

## Constants

<dl>
<dt><a href="#$.speak.DEFAULTS">$.speak.DEFAULTS</a> : <code>Object</code></dt>
<dd></dd>
</dl>

## Functions

<dl>
<dt><a href="#$.speak">$.speak(text, [o], [interrupt])</a></dt>
<dd></dd>
<dt><a href="#$.speak.getVoices">$.speak.getVoices(o)</a> ⇒ <code>Array</code></dt>
<dd></dd>
<dt><a href="#$.speak.getVoice">$.speak.getVoice([o])</a> ⇒ <code>SpeechSynthesisVoice</code> | <code>Null</code></dt>
<dd></dd>
<dt><a href="#$.speak.paused">$.speak.paused()</a></dt>
<dd></dd>
<dt><a href="#$.speak.resume">$.speak.resume()</a></dt>
<dd></dd>
<dt><a href="#$.speak.cancel">$.speak.cancel()</a></dt>
<dd></dd>
<dt><a href="#$.speak.speaking">$.speak.speaking()</a></dt>
<dd></dd>
</dl>

<a name="$.speak.DEFAULTS"></a>

## $.speak.DEFAULTS : <code>Object</code>
**Kind**: global constant  
<a name="$.speak"></a>

## $.speak(text, [o], [interrupt])
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
<a name="$.speak.getVoices"></a>

## $.speak.getVoices(o) ⇒ <code>Array</code>
**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| o | <code>Object</code> &#124; <code>String</code> | Filter options |

<a name="$.speak.getVoice"></a>

## $.speak.getVoice([o]) ⇒ <code>SpeechSynthesisVoice</code> &#124; <code>Null</code>
**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| [o] | <code>Object</code> &#124; <code>String</code> | Filter options |

<a name="$.speak.paused"></a>

## $.speak.paused()
**Kind**: global function  
<a name="$.speak.resume"></a>

## $.speak.resume()
**Kind**: global function  
<a name="$.speak.cancel"></a>

## $.speak.cancel()
**Kind**: global function  
<a name="$.speak.speaking"></a>

## $.speak.speaking()
**Kind**: global function  
