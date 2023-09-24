import { normalizePath } from 'obsidian';

export const path = {
	/**
	 * Joins multiple strings into a path using Obsidian's preferred format.
	 * The resulting path is normalized with Obsidian's `normalizePath` func.
	 * - Converts path separators to '/' on all platforms
	 * - Removes duplicate separators
	 * - Removes trailing slash
	 */
	join(...strings: string[]): string {
		const parts = strings.map((s) => String(s).trim()).filter((s) => s != null);
		return normalizePath(parts.join('/'));
	},
};
