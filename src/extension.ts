"use strict";
import * as vscode from "vscode";
import CompletionProvider from "./completionProvider";

export function activate(ctx: vscode.ExtensionContext): void {

	console.log("Scarpet is alive and doing well");
	const disposables: vscode.Disposable[] = [
		vscode.languages.registerCompletionItemProvider({
			scheme: "file",
			language: "scarpet"
		}, 
		new CompletionProvider())
	];

	ctx.subscriptions.push(...disposables);
}

export function deactivate(): void {}
