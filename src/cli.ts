import { Command } from 'commander'
import { generateRofiColors } from './adapters/rofi'
import { getPaths } from './helpers';
import { existsSync } from 'node:fs';
import { readFile } from 'node:fs/promises';
import { readdir } from 'node:fs/promises';
import path from 'node:path';
const program = new Command()

program
    .name('rice')
    .description('A tool for managing Hyprland themes')
    .version('0.0.1')

program
    .command('apply')
    .description('Apply a theme')
    .argument('<theme>', 'The theme to apply')
    .action(async (theme) => {
        await generateRofiColors(theme)
    })

program
    .command('list')
    .description('List all available themes')
    .action(async () => {
        try {
            const { themesDir } = getPaths();

            if (!existsSync(themesDir)) {
                console.log('Themes directory not found.');
                return;
            }

            const themes = await readdir(themesDir, { withFileTypes: true });
            const themeNames = themes
                .filter((dirent) => dirent.isDirectory())
                .map((dirent) => dirent.name);

            if (themeNames.length === 0) {
                console.log('No themes found.');
                return;
            }

            console.log('Available themes:');
            themeNames.forEach((name) => {
                console.log(`  - ${name}`);
            });
        } catch (error) {
            console.error(`Error listing themes: ${error}`);
        }
    });

program
    .command('current')
    .description('Show the current theme')
    .action(async () => {
        const { configDir } = getPaths();
        const statePath = path.join(configDir, 'state.json');

        if (!existsSync(statePath)) {
            console.log('No theme applied yet.');
            return;
        }

        const stateData = JSON.parse(await readFile(statePath, "utf8"));
        console.log(`Current theme: ${stateData.current}`);
    })

program.parse()
