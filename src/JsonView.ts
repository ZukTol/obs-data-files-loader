import { TextFileView, WorkspaceLeaf } from "obsidian";
import { VIEW_TYPE_JSON } from './constants'
import LoaderPlugin from "./main";

export default class JsonView extends TextFileView {

	public plugin: LoaderPlugin;
	private cmEditor: any; 

	constructor(leaf: WorkspaceLeaf, plugin: LoaderPlugin) {
		super(leaf);
		this.plugin = plugin;
		this.cmEditor = window.CodeMirror;
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
		return "Sample data";
	}

	getViewType(): string {
		return VIEW_TYPE_JSON;
	}

	setViewData(data: string, clear: boolean): void {
		const a = 3+5;
	}

}
