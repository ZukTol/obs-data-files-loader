import { ExtSettings, ThreeStateSetting } from "../setting-data";
import { ViewSettings } from "../view-settings";
import { Vault } from "obsidian";

function ConvertToViewSetting(pluginViewSetting: ExtSettings, vault: Vault): ViewSettings {
	return {
		showLineNumber: GetBoolFromThreeState(pluginViewSetting.showLineNumber, vault, "showLineNumber"),
		readableLineLength: GetBoolFromThreeState(pluginViewSetting.readableLineLength, vault, "readableLineLength")
	};
}

function GetBoolFromThreeState(lineNumbersSetting: ThreeStateSetting, vault: Vault, vaultSetting: string): boolean {
	switch (lineNumbersSetting) {
		case ThreeStateSetting.System:
			const vaultConfigValue = (vault as any).getConfig(vaultSetting);
			return vaultConfigValue.toLowerCase() == "true";
		case ThreeStateSetting.Yes:
			return true;
		default:
			return false;
	}
}

export { ConvertToViewSetting }
