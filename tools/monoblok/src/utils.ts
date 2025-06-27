import fs from 'fs';
import path from 'path';
import execa from 'execa';
import chalk from 'chalk';
import ora from 'ora';

// Types for the repo manifest
export interface ManifestEntry {
  repo: string;
  branch: string;
  path: string;
}

export interface RepoManifest {
  [packageName: string]: ManifestEntry;
}



export interface Package {
  name: string;
  path: string;
  version: string;
  dependencies: unknown
  devDependencies: unknown
}

// Get root directory of the monorepo
export function getMonorepoRoot(): string {
  return process.cwd();
}

// Read and parse the manifest file
export function readManifest(): RepoManifest {
  const manifestPath = path.join(getMonorepoRoot(), 'repo-manifest.json');
  
  if (!fs.existsSync(manifestPath)) {
    throw new Error(`Manifest file not found at ${manifestPath}`);
  }
  
  try {
    const manifestContent = fs.readFileSync(manifestPath, 'utf8');
    return JSON.parse(manifestContent);
  } catch (error) {
    throw new Error(`Failed to parse manifest file: ${(error as Error).message}`);
  }
}

// Normalize package name for use as remote name
export function normalizePackageName(packageName: string): string {
  return packageName.replace(/@/g, '').replace(/\//g, '-').replace(/\./g, '-');
}

// Execute a git command with proper error handling
export async function execGit(args: string[], options: { cwd?: string } = {}): Promise<string> {
  try {
    const { stdout } = await execa('git', args, {
      cwd: options.cwd || getMonorepoRoot(),
    });
    return stdout;
  } catch (error) {
    throw new Error(`Git command failed: ${(error as any).message || 'Unknown error'}`);
  }
}

// Check if a git remote exists
export async function remoteExists(remoteName: string): Promise<boolean> {
  try {
    const remotes = await execGit(['remote']);
    return remotes.split('\n').includes(remoteName);
  } catch (error) {
    return false;
  }
}

// Run a command with a loading spinner
export async function runWithSpinner<T>(
  message: string,
  fn: () => Promise<T>
): Promise<T> {
  const spinner = ora(message).start();
  try {
    const result = await fn();
    spinner.succeed(chalk.green(`${message} - done`));
    return result;
  } catch (error) {
    spinner.fail(chalk.red(`${message} - failed`));
    throw error;
  }
}

// Filter manifest entries by a package name pattern
export function filterManifestByPackage(
  manifest: RepoManifest,
  packageName?: string
): RepoManifest {
  if (!packageName) {
    return manifest;
  }
  
  const result: RepoManifest = {};
  
  Object.entries(manifest).forEach(([name, entry]) => {
    if (name.includes(packageName)) {
      result[name] = entry;
    }
  });
  
  return result;
}

// Validate if a filtered manifest has any entries
export function validateFilteredManifest(
  filteredManifest: RepoManifest,
  packageName?: string
): void {
  if (Object.keys(filteredManifest).length === 0) {
    if (packageName) {
      throw new Error(`No packages matching "${packageName}" found in manifest`);
    } else {
      throw new Error('Manifest is empty');
    }
  }
} 

export async function getPackageList(): Promise<Package[]> {
  const { stdout } = await execa('pnpm', ['recursive', 'ls', '--json']);
  return JSON.parse(stdout);
}

export async function getPackagePath(packageName: string): Promise<string> {
  const packageList = await getPackageList();
  const pkg = packageList.find((pkg: any) => pkg.name === packageName);
  if (!pkg) {
    throw new Error(`Package ${packageName} not found`);
  }
  return pkg.path;
}
