import { App, PluginSettingTab, Setting } from 'obsidian';
import LoaderPlugin from './main'
import { LineNumbersSetting } from "./setting-data";

export default class LoaderSettingTab extends PluginSettingTab {
	plugin: LoaderPlugin;

	constructor(app: App, plugin: LoaderPlugin) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		const {containerEl} = this;

		containerEl.empty();

		this.containerEl.createEl("h2", { text: "TXT files" });
		
		new Setting(containerEl)
			.setName('Load .txt files')
			.addToggle(toggle => toggle
				.setValue(this.plugin.settings.txtSetting.doLoad)
				.onChange(async (value) => {
					this.plugin.settings.txtSetting.doLoad = value;
					await this.plugin.saveSettings();
				}));

		new Setting(containerEl)
			.setName('Show line numbers')
			.addDropdown(cb=>cb
				.addOption(LineNumbersSetting[LineNumbersSetting.System], "System value")
				.addOption(LineNumbersSetting[LineNumbersSetting.No], "No")
				.addOption(LineNumbersSetting[LineNumbersSetting.Yes], "Yes")
				.setValue(LineNumbersSetting[this.plugin.settings.txtSetting.lineNumbers])
				.onChange(async (value: string)=>{
					this.plugin.settings.txtSetting.lineNumbers = LineNumbersSetting[value as keyof typeof LineNumbersSetting];
					await this.plugin.saveSettings();
				})
			);
		
		new Setting(containerEl)
			.setName('Create .txt files')
			.addToggle(toggle => toggle
				.setValue(this.plugin.settings.txtSetting.doCreate)
				.onChange(async (value) => {
					this.plugin.settings.txtSetting.doCreate = value;
					await this.plugin.saveSettings();
				}));

		this.containerEl.createEl("h2", { text: "JSON files" });
		
		new Setting(containerEl)
			.setName('Load .json files')
			.addToggle(toggle => toggle
				.setValue(this.plugin.settings.doLoadJson)
				.onChange(async (value) => {
					this.plugin.settings.doLoadJson = value;
					await this.plugin.saveSettings();
				}));

		new Setting(containerEl)
			.setName('Create .json files')
			.addToggle(toggle => toggle
				.setValue(this.plugin.settings.doCreateJson)
				.onChange(async (value) => {
					this.plugin.settings.doCreateJson = value;
					await this.plugin.saveSettings();
				}));

		this.containerEl.createEl("h2", { text: "XML files" });
		
		new Setting(containerEl)
			.setName('Load .xml files')
			.addToggle(toggle => toggle
				.setValue(this.plugin.settings.doLoadXml)
				.onChange(async (value) => {
					this.plugin.settings.doLoadXml = value;
					await this.plugin.saveSettings();
				}));

		new Setting(containerEl)
			.setName('Create .xml files')
			.addToggle(toggle => toggle
				.setValue(this.plugin.settings.doCreateXml)
				.onChange(async (value) => {
					this.plugin.settings.doCreateXml = value;
					await this.plugin.saveSettings();
				}));
	}
}
