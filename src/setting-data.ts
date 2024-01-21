export enum LineNumbersSetting {
	System = 0,
	No = 1,
	Yes = -1
}

export interface PluginViewSettings {
	doCreate: boolean,
	doLoad: boolean,
	lineNumbers: LineNumbersSetting
}

export interface PluginSettings {
	txtSetting: PluginViewSettings
	doLoadXml: boolean;
	doCreateXml: boolean;
	doLoadJson: boolean;
	doCreateJson: boolean;
}

export const DEFAULT_SETTINGS: PluginSettings = {
	txtSetting: {
		doCreate: true,
		doLoad: true,
		lineNumbers: LineNumbersSetting.System
	},
	doLoadXml: true,
	doCreateXml: true,
	doLoadJson: true,
	doCreateJson: true
}
