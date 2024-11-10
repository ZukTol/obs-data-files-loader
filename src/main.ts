import { Plugin, TFile, WorkspaceLeaf } from 'obsidian';
import LoaderSettingTab from './loader-settings-tab';
import * as constants from './constants'
import { path } from "./utils";
import JsonView from "./views/json-view";
import TxtView from "./views/txt-view";

interface LoaderPluginSettings {
	doLoadTxt: boolean;
	doCreateTxt: boolean;
	doLoadXml: boolean;
	doCreateXml: boolean;
	doLoadJson: boolean;
	doCreateJson: boolean;
}

const DEFAULT_SETTINGS: LoaderPluginSettings = {
	doLoadTxt: true,
	doCreateTxt: true,
	doLoadXml: true,
	doCreateXml: true,
	doLoadJson: true,
	doCreateJson: true
}

export default class LoaderPlugin extends Plugin {
	settings: LoaderPluginSettings;

	async onload() {
		await this.loadSettings();

		this.TryRegisterTxt();

		this.tryRegisterJson();

		this.tryRegisterXml();
		
		// This adds a status bar item to the bottom of the app. Does not work on mobile apps.
		const statusBarItemEl = this.addStatusBarItem();
		statusBarItemEl.setText('Status Bar Text');

		// This adds a settings tab so the user can configure various aspects of the plugin
		this.addSettingTab(new LoaderSettingTab(this.app, this));
	}

	private TryRegisterTxt() {
		if (this.settings.doLoadTxt) {
			this.registerView(constants.VIEW_TYPE_TXT, (leaf: WorkspaceLeaf) => new TxtView(leaf, this));
			this.registerExtensions([constants.EXT_TXT], constants.VIEW_TYPE_TXT);
		}

		if (this.settings.doCreateTxt) 
			this.registerContextMenuCommand(constants.EXT_TXT);
	}

	private tryRegisterJson() {
		if (this.settings.doLoadTxt) {
			this.registerView(constants.VIEW_TYPE_JSON, (leaf: WorkspaceLeaf) => new JsonView(leaf, this));
			this.registerExtensions([constants.EXT_JSON], constants.VIEW_TYPE_JSON);
		}
		 
		if(this.settings.doCreateJson)
			this.registerContextMenuCommand(constants.EXT_JSON);
	}

	private tryRegisterXml() {
		if (this.settings.doLoadXml)
			this.registerExtensions([constants.EXT_XML], constants.VIEW_TYPE_TXT);

		if (this.settings.doCreateXml) {
			this.registerContextMenuCommand(constants.EXT_XML);
		}
	}

	onunload() {

	}

	async loadSettings() {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}
	
	private registerContextMenuCommand(fileExt: string): void {
		this.registerEvent(
			this.app.workspace.on("file-menu", (menu, file) => {
				const parent = file instanceof TFile ? file.parent : file;

				menu.addItem((item) => {
					item
						.setTitle(`Create .${fileExt} file`)
						.setIcon("document")
						.onClick(async () => {
							console.log(parent?.path);
							if(parent)
								await this.createFile(parent.path, fileExt);
						});
				});
			})
		);
	}
	
	private async createFile(dirPath: string, extension: string): Promise<void> {
		const { vault } = this.app;
		const { adapter } = vault;
		const name = "Unknown";
		const filePath = path.join(dirPath, `${name}.${extension}`);

		try {
			const fileExists = await adapter.exists(filePath);
			if (fileExists) {
				throw new Error(`${filePath} already exists`);
			}
			
			// const dirExists = await adapter.exists(dirPath);
			// if (!dirExists) {
			// 	await this.createDirectory(dirPath);
			// }
			
			const File = await vault.create(filePath, '');
			const leaf = this.app.workspace.getLeaf(true);
			await leaf.openFile(File);
		} catch (error) {
			console.log(error.toString());
		}
	}
}
