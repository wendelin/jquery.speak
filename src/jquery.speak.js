/**
 * @copyright Copyright 2016 Wendelin Thomas. All rights reserved
 * Licensed under the MIT License.
 * @see https://github.com/wendelin/jquery.speak/blob/master/LICENSE
 * @author Wendelin Thomas <wendelin.thomas@gmail.com>
 * @requires jquery
 * @module "jquery.speak"
 */
(function (factory) {
if (typeof define === "function" && define.amd) {
	// AMD. Register as a module depending on jQuery.
	define("jquery.speak",["jquery"], factory);
} else {
	// No AMD. Register plugin with global jQuery object.
	factory(jQuery);
}
}(function ($) {
	"use strict";
	var synth = window.speechSynthesis;
	
	var SpeechSynthesisVoice = window.SpeechSynthesisVoice || null;
	
	if (!synth) {
		// throw new Error("'speechSynthesis' not supported by browser");
		if (console && console.warn) console.warn("'speechSynthesis' not supported by browser");
		return false;
	}
	
	/**
	 * @example $.speak("I'm sorry Dave, I'm afraid I can't do that", "en");
	 * @example $.speak("I'm sorry Dave, I'm afraid I can't do that", {voice:{name:"Hysterical", lang:"en"}, pitch:0.6,rate:1.5});
	 * 
	 * @global
	 * @function "jquery.speak"
	 * @param {String}  text              - Text to be spoken by the browser
	 * @param {Object}  [o]               - Optional parameters
	 * @param {Object}  [o.voice.name]    - Name of the voice to be used (e.g. "Bruce")
	 * @param {String}  [o.voice.lang=en] - Language of the voice
	 * @param {Number}  [o.pitch=1]       - Speaking pitch
	 * @param {Number}  [o.rate=1]        - Speaking rate/speed
	 * @param {Number}  [o.volume=1]      - Speaking volume
	 * @param {String}  [o.lang=en]       - Shorthand for o.voice.lang.
	 * @param {Boolean} [interrupt=true]  - Interrupt if something is already being said.
	 */
	var FN =  $.speak = function (text, o, interrupt) {
		o = o || {};
		if (!$.isPlainObject(o)) {
			o = {lang:o};
		}
		o = $.extend({}, $.speak.DEFAULTS, o);
		
		if (arguments.length === 2) {
			interrupt = true;
		}
		
		if (o.lang) {
			o.voice.lang = o.lang;
			delete o.lang;
		}
		
		// if (SpeechSynthesisVoice && o.voice && !(o.voice instanceof SpeechSynthesisVoice)) {		// Safari does not have window.SpeechSynthesisVoice but it has window.speechSynthesis.getVoices()
		if (o.voice) {
			var voice = FN.getVoice(o.voice);
			
			// If no voice with that name and lang exists fallback to first voices with that lang.
			if (!voice && o.voice.name && o.voice.lang) {
				voice = FN.getVoice(o.voice.lang);
			}
			
			o.voice = voice || null;
		}
		
		var utter = new SpeechSynthesisUtterance(text),
			$utter = $(utter);
		
		// Is this worth the extra overhead?
		// utter.onboundary = function(e) {
		// 	var target = e.target;
		// 	e.word = e.target.text.substr(e.charIndex).match(/^.\w*/)[0] || '';
		// 	$utter.trigger("word",word);
		// };
		
		if (o.on) {
			/*
			$.each(o.on, function(name, fn){
				o["on" + name] = fn;
			});
			*/
			
			$utter.on(o.on);
			delete o.on;
		}
		$.extend(utter, o);
		
		if (interrupt) {
			FN.cancel();
		}
		
		synth.speak(utter);
		
		return $utter;
	};
	
	/**
	 * @function getVoices
	 * @param {Object|String=} o - Filter options
	 * @returns {Array}
	 */
	FN.getVoices = function (o) {
		var name, lang;
		if (!$.isPlainObject(o)) {
			lang = o;
		} else {
			name = o.name;
			lang = o.lang;
		}
		var voices = $.grep(synth.getVoices()||[], function(voice){
			return (
				(!name || voice.name.indexOf(name) !== -1)
				&& (!lang || voice.lang.indexOf(lang) !== -1)
			);
		});
		return voices;
	};
	
	/**
	 * @function getVoice
	 * @param {Object|String} [o] - Filter options
	 * @returns {SpeechSynthesisVoice|Null}
	 */
	FN.getVoice = function (o) {
		return this.getVoices(o)[0] || null;
	};
	
	FN.parseSSML = function (data) {
		var root = data,
			node = root,
			depth = 0,
			lang,
			langs = ["en"],
			params = [{
				lang: "en"
			}],
			out = [];
		
		// @see http://codereview.stackexchange.com/questions/28307/implementing-an-algorithm-that-walks-the-dom-without-recursion
		while (node) {
			//if node has children, get the first child
			if (node.childNodes && node.childNodes.length > 0) {
				
				// support changing the language
				depth++;
				
				params[depth] = $.extend({}, params[depth - 1]);
				
				if (node.nodeType === root.ELEMENT_NODE && node.hasAttribute("xml:lang")) {
					params[depth].lang = node.getAttribute("xml:lang");
				}
				
				if (node.nodeName.toLowerCase() === 'voice') {
					params[depth].voice = $.extend({},params[depth].voice||{});
					
					$.each(['gender','age','variant','name'], function(k,v){
						params[depth].voice[v] = node.getAttribute(v);
					});
				}
				if (node.nodeName.toLowerCase() === 'prosody') {
					params[depth].prosody = $.extend({},params[depth].prosody||{});
					
					$.each(['pitch','contor','rate','range','duration','volumne'], function(k,v){
						params[depth].prosody[v] = node.getAttribute(v);
						params[depth][v] = node.getAttribute(v);
					});
				}
				
				langs[depth] = lang = (
					(node.nodeType === root.ELEMENT_NODE) && node.hasAttribute("xml:lang")
					? node.getAttribute("xml:lang")
					: langs[depth - 1]
				);
				
				
				node = node.firstChild;
			
			//if node has sibling, get the sibling
			} else if (node.nextSibling) {
				node = node.nextSibling;
			
			//if it has neither, crawl up the dom until you find a node that has a sibling and get that sibling
			} else {
				do {
					node = node.parentNode;
					depth--;
					//if we are back at root, return!
					if (node === root) {
						return out;
					}
				} while (!node.nextSibling)
				node = node.nextSibling;
			}
			
			// console.log(depth, langs, node, node.nodeType !== root.TEXT_NODE);
			
			if (node.nodeType === root.TEXT_NODE) {
				
				/**
				 * Ignore empty textNodes
				 */
				if (node.textContent.trim()) {
					out.push({
						node: node,
						params: params[depth]
					});
				}
			}
		}
		
		return out;
	};
	
	FN.ssml = function (domItem) {
		var data = this.parseSSML(domItem);
		
		$.each(data, function(k,v) {
			var text = v.node.textContent,
				params = v.params,
				node = v.node;
				
			console.log({
				text: text,
				params: params,
				node: node,
				speak: (
					FN(text, $.extend(params||{},{
						on: {
							start: function(){
								console.log(this.voice&&this.voice.lang, this.voice&&this.voice.name, this.text);
							},
							boundary: function (e) {
								if (e.charIndex) {
									var target = e.target,
										word = e.target.text.substr(e.charIndex).match(/^.\w*/)[0] || '';
									console.log(word, e.charIndex, e.target.text.substr(e.charIndex));
								}
							}
						}
					}), false)		// false => do not interrupt
				)
			});
		});
	};
	
	//Passthrough access to speechSynthesis functions and properties.
	/* 
	 * @function pause
	 */
	 /**
	 * @function paused
	 */
	 /**
	 * @function resume
	 */
	 /**
	 * @function cancel
	 */
	 /**
	 * @function speaking
	 */
	$.each(["pause", "paused", "resume", "cancel", "speaking"], function(i, v) {
		FN[v] = (
			$.isFunction(synth[v])
			? function () { return synth[v](); }
			: function () { return synth[v]; }
		)
	});
	
	// $.isFunction(window.speechSynthesis.speaking);

	/**
	 * @constant {Object} DEFAULTS
	 */
	FN.DEFAULTS = {
		pitch: 1,
		rate: 1,
		voice: {
			name: null,
			lang: $("html").attr("lang") || 'en'	// 
		},
		volume: 1,
		on: {
			/*
			end: function (e) {console.log("speech end", e);},
			error: function (e) {console.log("speech error", e);},
			mark: function (e) {console.log("speech mark", e);},		// @todo Find out what this is: SpeechSynthesisUtterance.onmark
			pause: function (e) {console.log("speech pause", e);},
			start: function (e) {console.log("speech start", e);},
			boundary: function (e) {console.log("speech boundary", e);}
			*/
		}
	};
	
	
	return $;
}));