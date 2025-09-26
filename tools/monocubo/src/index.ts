import { Command } from 'commander';
import { subtreeCommand } from './commands/subtree';

// Create the program
const program = new Command();

// Set up CLI metadata
program
  .name('cube')
  .description('CLI tool for managing the tres monorepo')
  .version('0.1.0');

// Register commands
subtreeCommand(program);

// Parse command line arguments
program.parse(); 
