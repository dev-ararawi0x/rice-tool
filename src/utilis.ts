import path from 'node:path'
import { readFile } from 'node:fs/promises'
import { getPaths } from './helpers'

async function loadTheme(name: string) {
    try {
        const { themesDir } = getPaths()
        const themePath = path.join(themesDir, name, 'theme.json')
        const data = await readFile(themePath, "utf8")
        return JSON.parse(data)
    } catch (error) {
        console.error(`Error loading theme ${name}: ${error}`)
        return null
    }
}

export { loadTheme }