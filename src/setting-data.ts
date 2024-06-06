export enum ThreeStateSetting {
	System = 0,
	No = 1,
	Yes = -1
}

export interface ExtSettings {
	doCreate: boolean,
	doLoad: boolean,
	showLineNumber: ThreeStateSetting,
	readableLineLength: ThreeStateSetting
}

export interface PluginSettings {
	txtSetting: ExtSettings
	doLoadXml: boolean;
	doCreateXml: boolean;
	doLoadJson: boolean;
	doCreateJson: boolean;
}

export const DEFAULT_SETTINGS: PluginSettings = {
	txtSetting: {
		doCreate: true,
		doLoad: true,
		showLineNumber: ThreeStateSetting.System,
		readableLineLength: ThreeStateSetting.System
	},
	doLoadXml: true,
	doCreateXml: true,
	doLoadJson: true,
	doCreateJson: true
}
