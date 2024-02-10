import { App, PluginSettingTab, Setting } from 'obsidian';
import LoaderPlugin from './main'
import { ThreeStateSetting } from "./setting-data";

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
			.setName("Show line number")
			.setDesc("Show line number in the gutter.")
			.addDropdown(cb=>cb
				.addOption(ThreeStateSetting[ThreeStateSetting.System], "System value")
				.addOption(ThreeStateSetting[ThreeStateSetting.No], "Disable")
				.addOption(ThreeStateSetting[ThreeStateSetting.Yes], "Enable")
				.setValue(ThreeStateSetting[this.plugin.settings.txtSetting.showLineNumber])
				.onChange(async (value: string)=>{
					this.plugin.settings.txtSetting.showLineNumber = ThreeStateSetting[value as keyof typeof ThreeStateSetting];
					await this.plugin.saveSettings();
				})
			);

		new Setting(containerEl)
			.setName("Readable line length")
			.setDesc("Limin maximum line length.")
			.addDropdown(cb=>cb
				.addOption(ThreeStateSetting[ThreeStateSetting.System], "System value")
				.addOption(ThreeStateSetting[ThreeStateSetting.No], "Disable")
				.addOption(ThreeStateSetting[ThreeStateSetting.Yes], "Enable")
				.setValue(ThreeStateSetting[this.plugin.settings.txtSetting.readableLineLength])
				.onChange(async (value: string)=>{
					this.plugin.settings.txtSetting.readableLineLength = ThreeStateSetting[value as keyof typeof ThreeStateSetting];
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
