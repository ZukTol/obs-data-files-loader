import { TextFileView, View, WorkspaceLeaf } from "obsidian";
import { basicSetup, EditorView, minimalSetup } from "codemirror";
import { EditorState, Extension } from "@codemirror/state";
import { VIEW_TYPE_TXT } from '../constants'
import LoaderPlugin from "../main";
import { LineNumbersSetting } from "../setting-data";
import { lineNumbers } from "@codemirror/view";

export default class TxtView extends TextFileView {

	public plugin: LoaderPlugin;
	private cmEditor: EditorView;
	private editorEl: any;

	constructor(leaf: WorkspaceLeaf, plugin: LoaderPlugin) {
		super(leaf);
		this.plugin = plugin;
	}

	onload(): void {
		super.onload();
		const basicExtensions = this.getExtensions();
		this.editorEl = this.contentEl.createDiv("mod-cm5");
		this.cmEditor = new EditorView({
			state: EditorState.create({
				extensions: [
					minimalSetup,
					...basicExtensions
				],
			}),
			parent: this.editorEl,
		})
		this.app.workspace.trigger("codemirror", this.cmEditor);
	}

	getExtensions(): Extension[] {
		const settings = this.plugin.settings;
		if(settings.txtSetting.lineNumbers == LineNumbersSetting.No)
			return [];
		else
			return [lineNumbers()]
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
		return this.cmEditor.state.doc.toString();
	}

	getViewType(): string {
		return VIEW_TYPE_TXT;
	}

	onClose(): Promise<void> {
		return super.onClose();
	}

	setViewData(data: string, clear: boolean): void {
		this.cmEditor.dispatch({ changes: { from: 0, to: this.cmEditor.state.doc.length, insert: data } })
	}
}
