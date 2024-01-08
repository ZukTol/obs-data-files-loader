import { TextFileView, WorkspaceLeaf } from "obsidian";
import { basicSetup, EditorView } from "codemirror";
import { EditorState } from "@codemirror/state";
import { VIEW_TYPE_XML } from '../constants'
import LoaderPlugin from "../main";
import { xml } from "@codemirror/lang-xml";

export default class XmlView extends TextFileView {

	public plugin: LoaderPlugin;
	private cmEditor: EditorView;
	private editorEl: any;

	constructor(leaf: WorkspaceLeaf, plugin: LoaderPlugin) {
		super(leaf);
		this.plugin = plugin;
	}

	onload(): void {
		super.onload();
		this.editorEl = this.contentEl.createDiv("mod-cm5");
		this.cmEditor = new EditorView({
			state: EditorState.create({
				extensions: [
					basicSetup,
					// xml() 
				],
			}),
			parent: this.editorEl,
		})
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
		return this.cmEditor.state.doc.toString();
	}

	getViewType(): string {
		return VIEW_TYPE_XML;
	}

	onClose(): Promise<void> {
		return super.onClose();
	}

	setViewData(data: string, clear: boolean): void {
		this.cmEditor.dispatch({ changes: { from: 0, to: this.cmEditor.state.doc.length, insert: data } })
	}
}
