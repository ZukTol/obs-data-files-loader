import { TextFileView, WorkspaceLeaf } from "obsidian";
import { VIEW_TYPE_JSON } from './constants'
import LoaderPlugin from "./main";
import * as CodeMirror from "codemirror";

export default class JsonView extends TextFileView {

	public plugin: LoaderPlugin;
	private cmEditorFactory: any; 
	private cmEditor: any | CodeMirror.Editor;
	private editorEl: any;

	constructor(leaf: WorkspaceLeaf, plugin: LoaderPlugin) {
		super(leaf);
		this.plugin = plugin;
		this.cmEditorFactory = window.CodeMirror;
	}

	onload() {
		super.onload();
		this.editorEl = super.contentEl.createDiv("markdown-source-view mod-cm5");
		this.cmEditor = this.cmEditorFactory(this.editorEl, {
			mode: "hypermd",
			theme: "obsidian",
			lineWrapping: !0,
			styleActiveLine: !0,
		});
	}

	// gets the title of the document
	getDisplayText() {
		if (this.file) {
			return this.file.basename;
		}
		return "NOFILE";
	}
	
	clear(): void {
	}

	getViewData(): string {
		return this.cmEditor.getValue();
	}

	getViewType(): string {
		return VIEW_TYPE_JSON;
	}

	setViewData(data: string, clear: boolean): void {
		const n = this.cmEditor;
		// if (clear)
		// {
			n.setValue(data);
			// n.clearHistory();
			// this.lastCursor = null;
		// }
		// else {
		// 	for (let i = n.getScrollInfo(), r = data.split(/\r?\n/g), o = n.lineCount(), a = 0; a < r.length && a < o && r[a] === n.getLine(a); )
		// 		a++;
		// 	if (a === r.length && a === o)
		// 		return;
		// 	for (var s = o - 1, l = r.length - 1; s > a && l > a && n.getLine(s) === r[l]; )
		// 		s--,
		// 			l--;
		// 	var c = {
		// 		line: a,
		// 		ch: 0
		// 	}
		// 		, u = {
		// 		line: s,
		// 		ch: n.getLine(s).length
		// 	}
		// 		, h = r.slice(a, l + 1).join("\n");
		// 	a === Math.min(o, r.length) && (c = {
		// 		line: a - 1,
		// 		ch: n.getLine(a - 1).length
		// 	},
		// 	r.length > o && (h = "\n" + h)),
		// 		n.replaceRange(h, c, u, "setValue"),
		// 		this.scrolling = !0,
		// 		n.scrollTo(i.left, i.top)
		// }
	}

}
