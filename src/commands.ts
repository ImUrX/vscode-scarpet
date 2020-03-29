"use strict";
import * as vscode from "vscode";

export function copyClipboard({ document }: vscode.TextEditor) {
  const clipboard = [];
  for (let i = 0; i < document.lineCount; i++) {
    if (/^\s*(\/\/|$)/.test(document.lineAt(i).text)) {
      continue;
    }
    const text = document.lineAt(i).text.replace(/\/\/.*/, "");

    if (text.startsWith("$")) {
      clipboard.push(text);
    } else {
      clipboard.push("$" + text);
    }
  }
  vscode.env.clipboard.writeText(clipboard.join("\n"));
}
