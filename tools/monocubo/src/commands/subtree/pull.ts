import { Command } from 'commander';
import chalk from 'chalk';
import * as utils from '../../utils';

export function pullCommand(program: Command): void {
  program
    .command('pull')
    .description('Pull updates for subtrees')
    .argument('[package]', 'Package name pattern to pull (omit to pull all)')
    .option('-f, --force', 'Force pull even if there are local changes', false)
    .action(async (packageName?: string, options?: { force?: boolean }) => {
      try {
        // Read the manifest
        const manifest = utils.readManifest();
        
        // Filter the manifest if a package name is provided
        const filteredManifest = utils.filterManifestByPackage(manifest, packageName);
        
        // Validate that we have entries to process
        utils.validateFilteredManifest(filteredManifest, packageName);
        
        // Process each package
        for (const [name, entry] of Object.entries(filteredManifest)) {
          console.log(chalk.blue(`\nPulling updates for ${chalk.bold(name)}...`));
          
          // Get normalized name for Git remote
          const remoteName = utils.normalizePackageName(name);
          
          // Check if remote exists
          if (!(await utils.remoteExists(remoteName))) {
            console.log(chalk.yellow(`  Remote '${remoteName}' does not exist, skipping...`));
            continue;
          }
          
          // Fetch the latest from remote
          await utils.runWithSpinner(
            `Fetching latest from ${remoteName}`,
            async () => {
              await utils.execGit(['fetch', remoteName]);
            }
          );
          
          // Pull the subtree
          try {
            const pullArgs = [
              'subtree',
              'pull',
              `--prefix=${entry.path}`,
              remoteName,
              entry.branch
            ];
            
            // Add --force if specified
            if (options?.force) {
              pullArgs.push('--force');
            }
            
            await utils.runWithSpinner(
              `Pulling subtree for ${name}`,
              async () => {
                await utils.execGit(pullArgs);
              }
            );
          } catch (error) {
            // If the pull has a conflict, we need to resolve it manually
            if ((error as Error).message.includes('CONFLICT')) {
              console.error(chalk.red(`  Failed to pull subtree: ${(error as Error).message}`));
              console.error(chalk.red(`  Please resolve the conflict manually and try again.`));
              process.exit(1);
            }
            
            console.error(chalk.red(`  Failed to pull subtree: ${(error as Error).message}`));
            process.exit(1);
          }
        }
        
        console.log(chalk.green('\nAll subtrees have been updated successfully!'));
        
      } catch (error) {
        console.error(chalk.red(`\nError: ${(error as Error).message}`));
        process.exit(1);
      }
    });
} 
