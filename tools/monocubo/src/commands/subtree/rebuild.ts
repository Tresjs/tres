import { Command } from 'commander';
import chalk from 'chalk';
import fs from 'fs';
import path from 'path';
import inquirer from 'inquirer';
import * as utils from '../../utils';

export function rebuildCommand(program: Command): void {
  program
    .command('rebuild')
    .description('Rebuild (remove and re-add) a subtree')
    .argument('<package>', 'Package name to rebuild')
    .option('-y, --yes', 'Automatically answer yes to all prompts', false)
    .action(async (packageName: string, options?: { yes?: boolean }) => {
      try {
        // Read the manifest
        const manifest = utils.readManifest();
        
        // Filter the manifest for the specific package
        const filteredManifest = utils.filterManifestByPackage(manifest, packageName);
        
        // Validate that we have an entry to process
        utils.validateFilteredManifest(filteredManifest, packageName);
        
        // If more than one package matches, prompt user to select one
        let selectedEntry: [string, utils.ManifestEntry];
        const entries = Object.entries(filteredManifest);
        
        if (entries.length > 1) {
          if (!options?.yes) {
            const { selection } = await inquirer.prompt([{
              type: 'list',
              name: 'selection',
              message: 'Multiple packages match. Select the one to rebuild:',
              choices: entries.map(([name]) => name)
            }]);
            
            selectedEntry = [selection, filteredManifest[selection]];
          } else {
            // If auto-yes, take the first match
            selectedEntry = entries[0];
            console.log(chalk.yellow(`Multiple packages match, automatically selected: ${selectedEntry[0]}`));
          }
        } else {
          selectedEntry = entries[0];
        }
        
        const [name, entry] = selectedEntry;
        const remoteDir = entry.path;
        
        // Confirm before deletion
        if (!options?.yes) {
          const { confirm } = await inquirer.prompt([{
            type: 'confirm',
            name: 'confirm',
            message: chalk.red(`Are you sure you want to rebuild ${name}? This will DELETE and re-add ${remoteDir}`),
            default: false
          }]);
          
          if (!confirm) {
            console.log('Rebuild cancelled.');
            return;
          }
        }
        
        console.log(chalk.blue(`\nRebuilding ${chalk.bold(name)}...`));
        
        // Get normalized name for Git remote
        const remoteName = utils.normalizePackageName(name);
        
        // Form the GitHub URL
        const repoUrl = `https://github.com/${entry.repo}.git`;
        
        // Check if the directory exists
        const dirPath = path.join(utils.getMonorepoRoot(), remoteDir);
        
        if (fs.existsSync(dirPath)) {
          // Remove the directory
          await utils.runWithSpinner(
            `Removing directory ${remoteDir}`,
            async () => {
              // Using rimraf-like approach with git
              await utils.execGit(['rm', '-rf', remoteDir]);
              // Commit the removal
              await utils.execGit(['commit', '-m', `Remove ${name} for rebuild`]);

              await fs.promises.rm(remoteDir, { recursive: true, force: true });
            }
          );
        }
        
        // Add the remote if it doesn't exist
        if (!(await utils.remoteExists(remoteName))) {
          await utils.runWithSpinner(
            `Adding remote '${remoteName}'`,
            async () => {
              await utils.execGit(['remote', 'add', remoteName, repoUrl]);
            }
          );
        }
        
        // Add the subtree
        await utils.runWithSpinner(
          `Re-adding subtree for ${name}`,
          async () => {
            await utils.execGit([
              'subtree',
              'add',
              `--prefix=${entry.path}`,
              remoteName,
              entry.branch
            ]);
          }
        );
        
        console.log(chalk.green(`\nSuccessfully rebuilt ${name}!`));
        
      } catch (error) {
        console.error(chalk.red(`\nError: ${(error as Error).message}`));
        process.exit(1);
      }
    });
} 
