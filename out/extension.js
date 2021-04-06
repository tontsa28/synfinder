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
const vscode = require("vscode");
const node_fetch_1 = require("node-fetch");
function activate(context) {
    console.log('Congratulations, your extension "synfinder" is now active!');
    let disposable = vscode.commands.registerCommand('synfinder.synfinder', () => __awaiter(this, void 0, void 0, function* () {
        // Execute extension
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
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map