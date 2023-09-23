import { Plugin } from 'obsidian';
import LoaderSettingTab from './loader-settings-tab';

// Remember to rename these classes and interfaces!

interface LoaderPluginSettings {
	doLoadTxt: boolean;
	doLoadXml: boolean;
	doLoadJson: boolean;
}

const DEFAULT_SETTINGS: LoaderPluginSettings = {
	doLoadTxt: true,
	doLoadXml: true,
	doLoadJson: true
}

export default class LoaderPlugin extends Plugin {
	settings: LoaderPluginSettings;

	async onload() {
		await this.loadSettings();

		if (this.settings.doLoadTxt)
			this.registerExtensions(["txt"], "markdown");

		if(this.settings.doLoadTxt)
			this.registerExtensions(["json"], "markdown");

		if (this.settings.doLoadXml)
			this.registerExtensions(["xml"], "markdown");

		// This adds a status bar item to the bottom of the app. Does not work on mobile apps.
		const statusBarItemEl = this.addStatusBarItem();
		statusBarItemEl.setText('Status Bar Text');

		// This adds a settings tab so the user can configure various aspects of the plugin
		this.addSettingTab(new LoaderSettingTab(this.app, this));

		// If the plugin hooks up any global DOM events (on parts of the app that doesn't belong to this plugin)
		// Using this function will automatically remove the event listener when this plugin is disabled.
		this.registerDomEvent(document, 'click', (evt: MouseEvent) => {
			console.log('click', evt);
		});

		// When registering intervals, this function will automatically clear the interval when the plugin is disabled.
		this.registerInterval(window.setInterval(() => console.log('setInterval'), 5 * 60 * 1000));
	}

	onunload() {

	}

	async loadSettings() {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}
}


