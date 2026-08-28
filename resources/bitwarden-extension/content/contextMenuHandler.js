/******/ (function() { // webpackBootstrap
/******/ 	"use strict";

;// ./src/autofill/utils/event-security.ts
/**
 * Event security utilities for validating trusted events
 */
class EventSecurity {
    /**
     * Validates that an event is trusted (originated from user agent)
     * @param event - The event to validate
     * @returns true if the event is trusted, false otherwise
     */
    static isEventTrusted(event) {
        return event.isTrusted;
    }
}

;// ./src/autofill/webmapper/messaging.ts
// Shared message/response shapes for webmapper's content-script ↔ background
// selector capture. Imported by both the content script (context-menu-handler)
// and the background (context-menu-clicked-handler).
// A {@link WebmapperCommand.GetSelector} request responds with a
// `GeneratedSelector` (from ./selector) directly — no wrapper shape.
/** Tab-message command names for webmapper selector capture. */
const WebmapperCommand = Object.freeze({
    GetSelector: "webmapperGetSelector",
    GetContainerCandidates: "webmapperGetContainerCandidates",
});

;// ./src/autofill/webmapper/selector.ts
// Selector generator for webmapper.
//
// Strategy per element (within its own root):
//   1. #id (if id looks stable)
//   2. tag[name="..."]
//   3. tag[data-testid|data-test|data-qa|data-cy|...="..."]
//   4. tag[autocomplete="..."] (skipping "off")
//   5. tag[type="..."]
//   6. unstable #id as last-resort attribute
//   7. structural fallback: a > b:nth-of-type(i) > ... absolute child-chain from
//      the root element (flagged brittle; no `:scope` — see structuralFallback)
//
// Composite candidates (e.g. tag[name="x"][type="email"]) are added when no
// single attribute is unique but a pair is.
//
// Shadow DOM: walks element → root → host → root → ... and joins per-segment
// selectors with " >>> ".
const STABLE_DATA_ATTRS = [
    "data-testid",
    "data-test-id",
    "data-test",
    "data-qa",
    "data-cy",
    "data-trackid",
    "data-track-id",
    "data-automation-id",
];
// Patterns that look auto-generated. Match the value as a whole.
const UNSTABLE_VALUE_PATTERNS = [
    /^css-[a-z0-9]{4,}$/i,
    /^(jsx|emotion|mui|ant|chakra|sc)-[a-z0-9-]+$/i,
    /^_ngcontent-/i,
    /^ng-tns-/i,
    /^[a-z]{1,3}[-_]?[a-f0-9]{8,}$/i, // short prefix + hash
    /^[a-zA-Z0-9_-]{24,}$/, // very long opaque
];
// Predicate on attribute *content*. Callers handle absence (no attribute at
// all) before calling.
function looksUnstable(value) {
    return UNSTABLE_VALUE_PATTERNS.some((re) => re.test(value));
}
function quoteAttr(value) {
    return `"${String(value).replace(/\\/g, "\\\\").replace(/"/g, '\\"')}"`;
}
function attrSel(tag, attr, value) {
    return `${tag}[${attr}=${quoteAttr(value)}]`;
}
function rootOf(el) {
    const root = el.getRootNode();
    return root instanceof ShadowRoot || root instanceof Document ? root : document;
}
function countIn(root, selector) {
    try {
        return root.querySelectorAll(selector).length;
    }
    catch (_a) {
        return -1;
    }
}
function singleAttributeCandidates(el) {
    const tag = el.tagName.toLowerCase();
    // The schema requires the segment before an iframe `>>>` to include the
    // literal `iframe` tag, so skip bare `#id` candidates for iframes.
    const requireTag = tag === "iframe";
    const out = [];
    const stableId = el.id && !looksUnstable(el.id);
    if (stableId) {
        if (!requireTag) {
            out.push(`#${CSS.escape(el.id)}`);
        }
        out.push(`${tag}#${CSS.escape(el.id)}`);
    }
    const name = el.getAttribute("name");
    if (name) {
        out.push(attrSel(tag, "name", name));
    }
    for (const attr of STABLE_DATA_ATTRS) {
        const v = el.getAttribute(attr);
        if (v && !looksUnstable(v)) {
            out.push(attrSel(tag, attr, v));
        }
    }
    const autocomplete = el.getAttribute("autocomplete");
    if (autocomplete && autocomplete !== "off") {
        out.push(attrSel(tag, "autocomplete", autocomplete));
    }
    const type = el.getAttribute("type");
    if (type) {
        out.push(attrSel(tag, "type", type));
    }
    if (el.id && !stableId) {
        out.push(requireTag ? `${tag}#${CSS.escape(el.id)}` : `#${CSS.escape(el.id)}`);
    }
    return [...new Set(out)];
}
function pairCandidates(el) {
    const tag = el.tagName.toLowerCase();
    const attrs = [];
    const push = (attr) => {
        const v = el.getAttribute(attr);
        if (v) {
            attrs.push([attr, v]);
        }
    };
    push("name");
    push("type");
    push("autocomplete");
    for (const a of STABLE_DATA_ATTRS) {
        push(a);
    }
    const out = [];
    for (let i = 0; i < attrs.length; i++) {
        for (let j = i + 1; j < attrs.length; j++) {
            out.push(`${tag}[${attrs[i][0]}=${quoteAttr(attrs[i][1])}][${attrs[j][0]}=${quoteAttr(attrs[j][1])}]`);
        }
    }
    return out;
}
function structuralFallback(el) {
    const parts = [];
    let cur = el;
    while (cur && cur.nodeType === 1 && cur.parentElement) {
        const tag = cur.tagName.toLowerCase();
        const sameTagSiblings = Array.from(cur.parentElement.children).filter((c) => c.tagName === cur.tagName);
        if (sameTagSiblings.length > 1) {
            const idx = sameTagSiblings.indexOf(cur) + 1;
            parts.unshift(`${tag}:nth-of-type(${idx})`);
        }
        else {
            parts.unshift(tag);
        }
        cur = cur.parentElement;
    }
    if (cur && cur.nodeType === 1) {
        parts.unshift(cur.tagName.toLowerCase());
    }
    // Absolute child-chain from the root element (no `:scope`): when a stored
    // selector is evaluated with `document.querySelectorAll`, `:scope` resolves to
    // the documentElement (like `:root`), so `:scope > html > …` asks for an
    // `<html>` nested inside `<html>` and matches nothing. The chain already
    // includes the root element as its first segment, so it stands alone.
    return parts.join(" > ");
}
function chooseForSegment(element) {
    const root = rootOf(element);
    const warnings = [];
    const unique = [];
    const singles = singleAttributeCandidates(element);
    for (const cand of singles) {
        if (countIn(root, cand) === 1) {
            unique.push(cand);
        }
    }
    if (unique.length === 0) {
        for (const cand of pairCandidates(element)) {
            if (countIn(root, cand) === 1) {
                unique.push(cand);
            }
        }
    }
    let chosen;
    let alternates = [];
    let structural = false;
    if (unique.length > 0) {
        chosen = unique[0];
        alternates = unique.slice(1);
    }
    else {
        chosen = structuralFallback(element);
        structural = true;
        const count = countIn(root, chosen);
        warnings.push(count === 1
            ? "uses positional :nth-of-type — brittle"
            : `no unique selector found (matches ${count})`);
    }
    if (element.id && looksUnstable(element.id)) {
        warnings.push(`id "${element.id}" looks auto-generated`);
    }
    return { selector: chosen, alternates, warnings, structural };
}
// DEFERRED: closed shadow roots. composedPath() is retargeted at a closed boundary,
// so capture sees the host, not the clicked element. Descending needs
// DomQueryService.getShadowRoot plus coordinate hit-testing; walking *up* is fine.
//
// Walks up shadow boundaries, returning one element per segment from outermost
// (doc-rooted) to innermost (the target element).
function shadowSegments(element) {
    const segments = [];
    let cur = element;
    while (cur) {
        segments.unshift(cur);
        const root = cur.getRootNode();
        if (root instanceof ShadowRoot) {
            cur = root.host;
        }
        else {
            break;
        }
    }
    return segments;
}
function generateSelector(element) {
    if (!element || element.nodeType !== 1) {
        return {
            selector: null,
            matches: 0,
            alternates: [],
            warnings: ["target is not an element"],
            structural: false,
        };
    }
    const segments = shadowSegments(element);
    const parts = [];
    const warnings = [];
    let alternates = [];
    let structural = false;
    for (let i = 0; i < segments.length; i++) {
        const seg = chooseForSegment(segments[i]);
        parts.push(seg.selector);
        warnings.push(...seg.warnings);
        structural = structural || seg.structural;
        if (i === segments.length - 1) {
            alternates = seg.alternates;
        }
    }
    const selector = parts.join(" >>> ");
    const matches = countIn(rootOf(element), parts[parts.length - 1]);
    // An alternate replaces `selector` wholesale, so it needs the same shadow prefix.
    const prefix = parts.slice(0, -1);
    return {
        selector,
        matches,
        alternates: alternates.map((alternate) => [...prefix, alternate].join(" >>> ")),
        warnings,
        structural,
    };
}

;// ./src/autofill/content/webmapper-picker.ts
// webmapper selector-capture helpers, called from the context-menu-handler
// content script. Pure DOM — no Angular, no BrowserApi (per the content-script
// rules). Ported from webmapper's picker.js.
//
// Iframe / cross-frame selector composition is intentionally not present — see
// webmapper's notes. Captures inside iframes produce frame-local selectors
// only; the user hand-edits `iframe… >>>` prefixes when needed.

// The container-candidate walk caps how far up the DOM it looks beyond the
// right-clicked element, the nearest <form>, and the smallest ancestor of
// already-captured fields. Past that, ancestors are noisy and rarely useful.
const MAX_EXTRA_ANCESTORS = 4;
/** Generate a selector for the captured element; a null target yields a null selector. */
function buildSelectorCapture(target) {
    return generateSelector(target);
}
/** Propose container elements for the captured target and any captured fields. */
function buildContainerCandidates(target, fieldSelectors) {
    if (!target) {
        return { candidates: [] };
    }
    return { candidates: collectContainerCandidates(target, fieldSelectors) };
}
function collectContainerCandidates(target, fieldSelectors) {
    var _a, _b;
    const fieldElements = resolveFieldElements(fieldSelectors);
    const visited = new Set();
    const out = [];
    const consider = (el, label) => {
        if (!el || el.nodeType !== 1 || visited.has(el)) {
            return;
        }
        visited.add(el);
        const gen = generateSelector(el);
        if (!gen.selector) {
            return;
        }
        out.push({
            selector: gen.selector,
            label,
            tag: el.tagName.toLowerCase(),
            structural: gen.structural,
            warnings: gen.warnings,
        });
    };
    consider(target, "right-clicked element");
    consider(target.closest("form"), "nearest <form>");
    if (fieldElements.length > 0) {
        consider(smallestCommonAncestor(fieldElements), `smallest ancestor of ${fieldElements.length} captured field${fieldElements.length === 1 ? "" : "s"}`);
    }
    consider(target.parentElement, "parent element");
    let cur = (_b = (_a = target.parentElement) === null || _a === void 0 ? void 0 : _a.parentElement) !== null && _b !== void 0 ? _b : null;
    let extra = 0;
    while (cur && !isRoot(cur) && extra < MAX_EXTRA_ANCESTORS) {
        if (!visited.has(cur)) {
            consider(cur, `<${cur.tagName.toLowerCase()}> ancestor`);
            extra++;
        }
        cur = cur.parentElement;
    }
    return out;
}
function isRoot(el) {
    return el.tagName === "BODY" || el.tagName === "HTML";
}
function resolveFieldElements(selectors) {
    const out = [];
    for (const sel of selectors) {
        if (typeof sel !== "string") {
            continue;
        }
        try {
            const el = document.querySelector(sel);
            if (el) {
                out.push(el);
            }
        }
        catch (_a) {
            // selectors containing `>>>` won't parse via querySelector; ignore.
        }
    }
    return out;
}
function smallestCommonAncestor(elements) {
    if (elements.length === 0) {
        return null;
    }
    let candidate = elements[0];
    while (candidate) {
        const ancestor = candidate;
        if (elements.every((el) => ancestor === el || ancestor.contains(el))) {
            return ancestor;
        }
        candidate = candidate.parentElement;
    }
    return null;
}

;// ./src/autofill/content/context-menu-handler.ts



const inputTags = ["input", "textarea", "select"];
const labelTags = ["label", "span"];
const attributeKeys = ["id", "name", "label-aria", "placeholder"];
const invalidElement = chrome.i18n.getMessage("copyCustomFieldNameInvalidElement");
const noUniqueIdentifier = chrome.i18n.getMessage("copyCustomFieldNameNotUnique");
let clickedElement = null;
// webmapper needs the real innermost target for shadow-aware selectors, which
// composedPath() exposes — event.target is retargeted to the shadow host.
let webmapperTarget = null;
// Find the best attribute to be used as the Name for an element in a custom field.
function getClickedElementIdentifier() {
    var _a, _b;
    if (clickedElement == null) {
        return invalidElement;
    }
    const clickedTag = clickedElement.nodeName.toLowerCase();
    let inputElement = null;
    // Try to identify the input element (which may not be the clicked element)
    if (labelTags.includes(clickedTag)) {
        let inputId;
        if (clickedTag === "label") {
            inputId = clickedElement.getAttribute("for");
        }
        else {
            inputId = (_a = clickedElement.closest("label")) === null || _a === void 0 ? void 0 : _a.getAttribute("for");
        }
        if (inputId) {
            inputElement = document.getElementById(inputId);
        }
    }
    else {
        inputElement = clickedElement;
    }
    if (inputElement == null || !inputTags.includes(inputElement.nodeName.toLowerCase())) {
        return invalidElement;
    }
    for (const attributeKey of attributeKeys) {
        const attributeValue = inputElement.getAttribute(attributeKey);
        const selector = "[" + attributeKey + '="' + attributeValue + '"]';
        if (!isNullOrEmpty(attributeValue) && ((_b = document.querySelectorAll(selector)) === null || _b === void 0 ? void 0 : _b.length) === 1) {
            return attributeValue;
        }
    }
    return noUniqueIdentifier;
}
function isNullOrEmpty(s) {
    return s == null || s === "";
}
// We only have access to the element that's been clicked when the context menu is first opened.
// Remember it for use later.
document.addEventListener("contextmenu", (event) => {
    var _a;
    /**
     * Reject synthetic events (not originating from the user agent)
     */
    if (!EventSecurity.isEventTrusted(event)) {
        return;
    }
    clickedElement = event.target;
    webmapperTarget = (_a = event.composedPath()[0]) !== null && _a !== void 0 ? _a : event.target;
});
// Runs when a context menu item this script backs is clicked: 'Copy Custom
// Field Name', or webmapper's selector-capture items.
chrome.runtime.onMessage.addListener((event, sender, sendResponse) => {
    var _a;
    if (event.command === "getClickedElement") {
        const identifier = getClickedElementIdentifier();
        if (sendResponse) {
            sendResponse(identifier);
        }
        void chrome.runtime.sendMessage({
            command: "getClickedElementResponse",
            sender: "contextMenuHandler",
            identifier: identifier,
        });
        return;
    }
    // Only answer webmapper requests from our own background, never page script.
    if (sender.id !== chrome.runtime.id) {
        return;
    }
    if (event.command === WebmapperCommand.GetSelector) {
        sendResponse(buildSelectorCapture(webmapperTarget));
        return true;
    }
    if (event.command === WebmapperCommand.GetContainerCandidates) {
        sendResponse(buildContainerCandidates(webmapperTarget, (_a = event.fieldSelectors) !== null && _a !== void 0 ? _a : []));
        return true;
    }
});

/******/ })()
;