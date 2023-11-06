import { TextFileView, WorkspaceLeaf } from "obsidian";
import { VIEW_TYPE_JSON } from './constants'
import LoaderPlugin from "./main";
import * as CodeMirror from "codemirror";

export default class JsonView extends TextFileView {

	public plugin: LoaderPlugin;
	private readonly cmEditorFactory: (place: ParentNode | ((host: HTMLElement)=>void), options?: CodeMirror.EditorConfiguration )=> CodeMirror.Editor; 
	private cmEditor: CodeMirror.Editor;
	private editorEl: any;

	constructor(leaf: WorkspaceLeaf, plugin: LoaderPlugin) {
		super(leaf);
		this.plugin = plugin;
		this.cmEditorFactory = window.CodeMirror;
	}

	onload(): void {
		super.onload();
		this.editorEl = this.contentEl.createDiv("mod-cm5");
		this.cmEditor = this.cmEditorFactory(this.editorEl, {
			mode: "application/json", 
			theme: "default",
			lineWrapping: false,
			lineNumbers: true
		});
		this.app.workspace.trigger("codemirror", this.cmEditor);
	}

	// gets the title of the document
	getDisplayText(): string {
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

	onClose(): Promise<void> {
		return super.onClose();
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
