import path from 'node:path'
import { readFile, writeFile } from 'node:fs/promises'
import { loadTheme } from '../utilis'
import { getPaths } from '../helpers'

function getValueByPath(obj: any, pathStr: string) {
    return pathStr.split('.').reduce((acc, part) => {
        if (acc == null) return undefined;

        return acc[part];
    }, obj);
}

async function loadRofiTemplate() {
    try {
        const { templatesDir } = getPaths()
        const templatePath = path.join(templatesDir, 'rofi', 'colors.rasi.tpl')
        const data = await readFile(templatePath, "utf8")
        return data
    } catch (error) {
        console.error(`Error loading rofi template: ${error}`)
        return null
    }
}

async function generateRofiColors(theme: string) {
    try {
        const themeData = await loadTheme(theme)
        if (!themeData) {
            throw new Error(`Theme data not found for: ${theme}`)
        }

        const template = await loadRofiTemplate()
        if (!template) {
            throw new Error(`Template not found`)
        }

        const regex = /\{\{([^}]+)\}\}/g;

        const newRofiConfig = template.replace(regex, (fullMatch, pathStr) => {
            const cleanPath = pathStr.trim();
            const value = getValueByPath(themeData, cleanPath);
            return value !== undefined ? value : fullMatch;
        });

        const { configDir } = getPaths()
        const newPath = path.join(configDir, "rofi", 'colors.rasi')
        await writeFile(newPath, newRofiConfig, "utf8")

        const statePath = path.join(configDir, "state.json")
        await writeFile(statePath, JSON.stringify({ current: theme }, null, 2), "utf8")

        console.log(`Rofi colors generated successfully in: ${newPath}`);
        return true
    } catch (error) {
        console.error(`Error generating rofi colors: ${error}`)
        return false
    }
}

export { generateRofiColors }