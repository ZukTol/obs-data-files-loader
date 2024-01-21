import { ExtSettings, LineNumbersSetting } from "../setting-data";
import { ViewSettings } from "../view-settings";
import { Vault } from "obsidian";

function ConvertToViewSetting(pluginViewSetting: ExtSettings, vault: Vault): ViewSettings {
	return {
		showLineNumbers: GetLineNumbers(pluginViewSetting.lineNumbers, vault)
	};
}

function GetLineNumbers(lineNumbersSetting: LineNumbersSetting, vault: Vault): boolean {
	switch (lineNumbersSetting) {
		case LineNumbersSetting.System:
			const vaultConfigValue = (this.app.vault as any).getConfig("showLineNumber");
			return vaultConfigValue.toLowerCase() == "true";
		case LineNumbersSetting.Yes:
			return true;
		default:
			return false;
	}
}

export { ConvertToViewSetting }
