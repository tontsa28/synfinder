import * as vscode from 'vscode';
import fetch from 'node-fetch';

export function activate(context: vscode.ExtensionContext) {

	console.log('Congratulations, your extension "synfinder" is now active!');

	let disposable = vscode.commands.registerCommand('synfinder.synfinder', async() => {
		
		// Execute extension
		const editor = vscode.window.activeTextEditor;
		if (!editor) {
		vscode.window.showInformationMessage("Editor does not exist");
			return;
		}

		const text = editor.document.getText(editor.selection);
		// vscode.window.showInformationMessage(`Selected text: ${text}`);
		const response = await fetch(`https://api.datamuse.com/words?ml=${text.replace(' ', '+')}`);
		const data = await response.json();
		const quickPick = vscode.window.createQuickPick();
		quickPick.items = data.map((x: any) => ({label: x.word}));
		quickPick.onDidChangeSelection(([item]) => {
			if (item) {
				// vscode.window.showInformationMessage(item.label);
				editor.edit((edit) => {
					edit.replace(editor.selection, item.label);
				});
				quickPick.dispose();
			}
		});
		quickPick.onDidHide(() => quickPick.dispose());
		quickPick.show();
	});

	context.subscriptions.push(disposable);
}

export function deactivate() {}
