import * as vscode from 'vscode';
import * as clipboardy from 'clipboardy';

let disposables: vscode.Disposable[] = [];

function cleanupDisposables() {
  while (disposables.length > 0) {
    const DISP = disposables.shift();

    try {
      DISP.dispose();
    }
    catch (e) {
      vscode.window.showErrorMessage('Unknown error.');
    }
  }
}

// This function is called when the extension is activated
export function activate(context: vscode.ExtensionContext) {
  // Commands
  context.subscriptions.push(vscode.commands.registerCommand('markdownVSCode.copyMarkdown', () => {
    try {
      const editor = vscode.window.activeTextEditor;

      if (!editor) {
        throw new Error('No selected editor');
      }

      const { document, selection } = editor;
      const text = document.getText(selection);
      const markdown = '```' + document.languageId + '\n' + text + '\n```';

      clipboardy.writeSync(markdown);

      vscode.window.showInformationMessage('Code copied to the clipboard!');

    } catch (err) {
      vscode.window.showErrorMessage(err.message);
      throw err;
    }
  }));
}

// This function is called when the extension is deactivated
export function deactivate() {
  cleanupDisposables();
}
