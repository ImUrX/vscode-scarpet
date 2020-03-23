"use strict";
import * as vscode from "vscode";
import CompletionProvider from "./completionProvider";
import { copyClipboard } from "./commands";
import { Reader } from "./reader";

export function activate(ctx: vscode.ExtensionContext): void {
  console.log("Scarpet is alive and doing well");

  const disposables: vscode.Disposable[] = [
    vscode.languages.registerCompletionItemProvider(
      "scarpet",
      new CompletionProvider()
    ),
    vscode.commands.registerTextEditorCommand(
      "scarpet.copyToClipboard",
      copyClipboard
    )
  ];

  ctx.subscriptions.push(...disposables);
}

export function deactivate(): void {}
