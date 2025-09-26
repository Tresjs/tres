import { Command } from 'commander';
import chalk from 'chalk';
import * as utils from '../../utils';
import fs from 'node:fs';

export function addCommand(program: Command): void {
  program
    .command('add')
    .description('Add subtrees from the manifest')
    .argument('[package]', 'Package name pattern to add (omit to add all)')
    .action(async (packageName?: string) => {
      try {
        // Read the manifest
        const manifest = utils.readManifest();
        
        // Filter the manifest if a package name is provided
        const filteredManifest = utils.filterManifestByPackage(manifest, packageName);
        
        // Validate that we have entries to process
        utils.validateFilteredManifest(filteredManifest, packageName);
        
        // Process each package
        for (const [name, entry] of Object.entries(filteredManifest)) {
          console.log(chalk.blue(`\nProcessing ${chalk.bold(name)}...`));
          
          // Get normalized name for Git remote
          const remoteName = utils.normalizePackageName(name);
          
          // Form the GitHub URL
          const repoUrl = `https://github.com/${entry.repo}.git`;
          
          // Add or update the remote
          await utils.runWithSpinner(
            `Adding/updating remote '${remoteName}'`,
            async () => {
              if (await utils.remoteExists(remoteName)) {
                await utils.execGit(['remote', 'set-url', remoteName, repoUrl]);
              } else {
                await utils.execGit(['remote', 'add', remoteName, repoUrl]);
              }
            }
          );
          
          // Add the subtree
          try {
            await utils.runWithSpinner(
              `Adding subtree for ${name}`,
              async () => {
                // Check if the directory already exists
                if (fs.existsSync(entry.path)) {
                  console.log(chalk.yellow(`  Directory ${entry.path} already exists, skipping...`));
                  return;
                }

                await utils.execGit([
                  'subtree',
                  'add',
                  `--prefix=${entry.path}`,
                  repoUrl,
                  entry.branch
                ]);
              }
            );
          } catch (error) {
            // Check if the directory already exists
            if ((error as Error).message.includes('already exists')) {
              console.log(chalk.yellow(`  Directory ${entry.path} already exists, skipping...`));
            } else {
              throw error;
            }
          }
        }
        
        console.log(chalk.green('\nAll subtrees have been added successfully!'));
        
      } catch (error) {
        console.error(chalk.red(`\nError: ${(error as Error).message}`));
        process.exit(1);
      }
    });
} 
