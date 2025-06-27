import { Command } from 'commander';
import { addCommand } from './add';
import { pullCommand } from './pull';
import { rebuildCommand } from './rebuild';

export function subtreeCommand(program: Command): void {
  const subtree = program
    .command('subtree')
    .description('Manage git subtrees for monorepo packages');

  // Add subtree-related subcommands
  addCommand(subtree);
  pullCommand(subtree);
  rebuildCommand(subtree);
} 
