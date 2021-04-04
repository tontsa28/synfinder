"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = void 0;
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require("vscode");
const node_fetch_1 = require("node-fetch");
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
function activate(context) {
    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    console.log('Congratulations, your extension "xtension" is now active!');
    // The command has been defined in the package.json file
    // Now provide the implementation of the command with registerCommand
    // The commandId parameter must match the command field in package.json
    let disposable = vscode.commands.registerCommand('xtension.helloWorld', () => __awaiter(this, void 0, void 0, function* () {
        // The code you place here will be executed every time your command is executed
        // Display a message box to the user
        const editor = vscode.window.activeTextEditor;
        if (!editor) {
            vscode.window.showInformationMessage("Editor does not exist");
            return;
        }
        const text = editor.document.getText(editor.selection);
        // vscode.window.showInformationMessage(`Selected text: ${text}`);
        const response = yield node_fetch_1.default(`https://api.datamuse.com/words?ml=${text.replace(' ', '+')}`);
        const data = yield response.json();
        const quickPick = vscode.window.createQuickPick();
        quickPick.items = data.map((x) => ({ label: x.word }));
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
    }));
    context.subscriptions.push(disposable);
}
exports.activate = activate;
// this method is called when your extension is deactivated
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map